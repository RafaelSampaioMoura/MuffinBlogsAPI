const camelize = require('camelize');
const { BlogPost, PostCategory } = require('../models');

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

module.exports = {
  createNewPost,
};
