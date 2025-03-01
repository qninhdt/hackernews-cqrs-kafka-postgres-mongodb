const express = require("express");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const dotenv = require("dotenv");
const { sequelize, Post, Comment, Tag } = require("./models");
const { connectProducer, sendMessage } = require("./kafkaProducer");
const fs = require("fs");
const path = require("path");

dotenv.config();

const app = express();
app.use(express.json());

// Synchronize database tables (in production use migrations)
sequelize
  .sync()
  .then(() => {
    console.log("PostgreSQL connected and models synchronized.");
  })
  .catch((err) => console.error("DB error:", err));

// Connect Kafka producer
connectProducer().then(() => console.log("Kafka Producer connected"));

// Read the RSA public key from file 'jwt_public.pub'
const PUBLIC_KEY_PATH = path.join(__dirname, "..", "jwt_public.pub");
const RSA_PUBLIC_KEY = fs.readFileSync(PUBLIC_KEY_PATH, "utf8");

// Middleware to decode JWT token from Authorization header
const authenticate = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json({ error: "Missing token" });

  const token = authHeader.split(" ")[1];
  try {
    // Verify token using the RSA public key loaded from file
    const decoded = jwt.verify(token, RSA_PUBLIC_KEY, {
      algorithms: ["RS256"],
    });
    req.user = decoded; // decoded token contains full author info
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

// -------- API Endpoints --------

// Get latest posts, paginated by query param "page" (default page=1, limit=10)
app.get("/post", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  try {
    const posts = await Post.findAll({
      order: [["created_at", "DESC"]],
      offset: (page - 1) * limit,
      limit,
    });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: "Error fetching posts" });
  }
});

// Get a single post by id
app.get("/post/:id", async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id, {
      include: { model: Tag, through: { attributes: [] } }, // include associated tags
    });
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: "Error fetching post" });
  }
});

// Create a new post (JWT required)
// Expecting JSON body: { content: "Post content", tags: ["tag1", "tag2", ...] }
app.post("/post", authenticate, async (req, res) => {
  const { content, tags } = req.body;
  if (!content) return res.status(400).json({ error: "Content required" });

  try {
    // Create the post record
    const newPost = await Post.create({
      author_id: req.user.user_id, // assume token has an "id" field for the author
      content,
    });

    let tagNames = [];
    if (Array.isArray(tags)) {
      // For each tag name, either find or create a Tag, then associate with the post.
      const tagPromises = tags.map(async (tagName) => {
        tagNames.push(tagName);
        const [tag] = await Tag.findOrCreate({ where: { name: tagName } });
        await newPost.addTag(tag);
      });
      await Promise.all(tagPromises);
    }

    // Get denormalized data for the Kafka event:
    // - Post data including author info (from req.user)
    // - Tag names (denormalized)
    const denormalizedPost = {
      id: newPost.id,
      author: req.user, // full author info from decoded JWT
      content: newPost.content,
      tags: tagNames,
      created_at: newPost.created_at,
    };

    // Publish to Kafka topic "post-created"
    await sendMessage("post-created", denormalizedPost);

    res.status(201).json(denormalizedPost);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error creating post" });
  }
});

// Get all comments for a given post id
app.get("/post/:id/comment", async (req, res) => {
  try {
    const comments = await Comment.findAll({
      where: { post_id: req.params.id },
      order: [["created_at", "ASC"]],
    });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: "Error fetching comments" });
  }
});

// Create a new comment for a given post id (JWT required)
// Expecting JSON body: { content: "Comment content" }
app.post("/post/:id/comment", authenticate, async (req, res) => {
  const { content } = req.body;
  if (!content) return res.status(400).json({ error: "Content required" });

  try {
    // Verify that the post exists
    const post = await Post.findByPk(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });

    // Create the comment record
    const newComment = await Comment.create({
      post_id: post.id,
      author_id: req.user.user_id,
      content,
    });

    // Denormalize comment data with author info
    const denormalizedComment = {
      id: newComment.id,
      post_id: post.id,
      author: req.user,
      content: newComment.content,
      created_at: newComment.created_at,
    };

    // Publish to Kafka topic "comment-created"
    await sendMessage("comment-created", denormalizedComment);

    res.status(201).json(denormalizedComment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error creating comment" });
  }
});

// Start server
const port = 80;
app.listen(port, () => {
  console.log(`Command service running on port ${port}`);
});
