require("dotenv").config();
const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();
const PORT = 80;

const DATABSE_USER = process.env.QUERY_DATABASE_USER;
const DATABASE_PASSWORD = process.env.QUERY_DATABASE_PASSWORD;
const DATABASE_HOST = process.env.QUERY_DATABASE_HOST;
const DATABASE_PORT = process.env.QUERY_DATABASE_PORT;
const MONGO_URI = `mongodb://${DATABSE_USER}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}`;
const DATABASE_NAME = process.env.QUERY_DATABASE_NAME;

let db, postsCollection, commentsCollection;

// Connect to MongoDB
MongoClient.connect(MONGO_URI, { useUnifiedTopology: true })
  .then((client) => {
    db = client.db(DATABASE_NAME);
    postsCollection = db.collection("posts");
    commentsCollection = db.collection("comments");
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  });

// Helper: convert query param "page" to integer with default = 1
const getPage = (pageStr) => {
  const page = parseInt(pageStr, 10);
  return isNaN(page) || page < 1 ? 1 : page;
};

// replace _id with id
const replaceId = (obj) => {
  // check if obj is an array
  if (Array.isArray(obj)) {
    return obj.map((item) => {
      if (item._id) {
        item.id = item._id;
        delete item._id;
      }
      return item;
    });
  } else {
    if (obj._id) {
      obj.id = obj._id;
      delete obj._id;
    }
    return obj;
  }
};

// GET /post?page=num - Get paginated posts sorted by created_at descending
app.get("/post", async (req, res) => {
  const page = getPage(req.query.page);
  const limit = 10;
  const skip = (page - 1) * limit;

  try {
    const posts = await postsCollection
      .find({})
      .sort({ created_at: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();
    res.json(replaceId(posts));
  } catch (err) {
    console.error("Error fetching posts:", err);
    res.status(500).json({ error: "Error fetching posts" });
  }
});

// GET /post/:id - Get a single post by its _id (which is the Postgres key)
app.get("/post/:id", async (req, res) => {
  const id = Number(req.params.id);
  try {
    // Here we assume that the id stored in MongoDB is a string.
    // If you stored it as an ObjectId, you may need to convert it.
    const post = await postsCollection.findOne({ _id: id });
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json(replaceId(post));
  } catch (err) {
    console.error("Error fetching post:", err);
    res.status(500).json({ error: "Error fetching post" });
  }
});

// GET /post/:id/comment?page=num - Get paginated comments for a post, sorted by created_at ascending
app.get("/post/:id/comment", async (req, res) => {
  const postId = Number(req.params.id);
  const page = getPage(req.query.page);
  const limit = 10;
  const skip = (page - 1) * limit;

  try {
    const comments = await commentsCollection
      .find({ post_id: postId })
      .sort({ created_at: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();
    res.json(replaceId(comments));
  } catch (err) {
    console.error("Error fetching comments:", err);
    res.status(500).json({ error: "Error fetching comments" });
  }
});

app.listen(PORT, () => {
  console.log(`Query service running on port ${PORT}`);
});
