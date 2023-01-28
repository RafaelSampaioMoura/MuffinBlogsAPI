module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define(
    "BlogPost",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true },
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      user_id: { type: DataTypes.INTEGER, foreignKey: true },
      published: DataTypes.DATE,
      updated: DataTypes.DATE,
    },
    {
      timestamps: false,
      tableName: "blog_posts",
    }
  );

  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.User, { foreignKey: "user_id", as: "users" });
  };

  return BlogPost;
};
