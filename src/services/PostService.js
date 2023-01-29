const camelize = require('camelize');
const { BlogPost, PostCategory, User, Category } = require('../models');

const createNewPost = async ({ title, content, categoryIds }, id) => {
  //   console.log(userId);
  const newPost = await BlogPost.create({
    title,
    content,
    categoryIds,
    userId: id,
    updated: Date.now(),
    published: Date.now(),
  });

  const { dataValues } = newPost;

  //   console.log(newPost);

  const postCategory = categoryIds.map((category) => ({
    categoryId: category,
    postId: dataValues.id,
  }));

  console.log(postCategory);

  await PostCategory.bulkCreate(postCategory);

  return camelize(dataValues);
};

const getPostsByUserId = async (userId) => {
  const posts = await BlogPost.findAll({
    where: { userId },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      {
        model: Category,
        as: 'categories',
        through: { attributes: [] },
      },
    ],
  });

  return posts;
};

module.exports = {
  createNewPost,
  getPostsByUserId,
};
