module.exports = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define(
    "PostCategory",
    {
      categoryId: { type: DataTypes.INTEGER, foreignKey: true },
      postId: { type: DataTypes.INTEGER, foreignKey: true },
    },
    { timestamps: false, tableName: "posts_categories", underscored: true }
  );

  PostCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      as: "blog_posts",
      through: PostCategory,
      foreignKey: "categoryId",
      otherKey: "postId",
    });
    models.Category.belongsToMany(models.BlogPost, {
      as: "categories",
      through: PostCategory,
      foreignKey: "postId",
      otherKey: "categoryId",
    });
  };

  return PostCategory;
};
