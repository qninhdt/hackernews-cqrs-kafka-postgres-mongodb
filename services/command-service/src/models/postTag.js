const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "PostTag",
    {
      post_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      tag_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
    },
    {
      tableName: "post_tags",
      timestamps: false,
    }
  );
};
