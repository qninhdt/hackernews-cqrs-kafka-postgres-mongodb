const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

DATABASE_USER = process.env.COMMAND_DATABASE_USER;
DATABASE_PASSWORD = process.env.COMMAND_DATABASE_PASSWORD;
DATABASE_HOST = process.env.COMMAND_DATABASE_HOST;
DATABASE_PORT = process.env.COMMAND_DATABASE_PORT;
DATABASE_NAME = process.env.COMMAND_DATABASE_NAME;
DATABASE_URL = `postgres://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}`;

const sequelize = new Sequelize(DATABASE_URL, {
  dialect: "postgres",
  logging: false,
});

// Import models
const Post = require("./post")(sequelize);
const Comment = require("./comment")(sequelize);
const Tag = require("./tag")(sequelize);
const PostTag = require("./postTag")(sequelize);

// Define associations
// A Post can have many Tags (many-to-many)
Post.belongsToMany(Tag, { through: PostTag, foreignKey: "post_id" });
Tag.belongsToMany(Post, { through: PostTag, foreignKey: "tag_id" });

// A Post has many Comments, and each Comment belongs to a Post.
Post.hasMany(Comment, { foreignKey: "post_id", onDelete: "CASCADE" });
Comment.belongsTo(Post, { foreignKey: "post_id" });

module.exports = {
  sequelize,
  Post,
  Comment,
  Tag,
  PostTag,
};
