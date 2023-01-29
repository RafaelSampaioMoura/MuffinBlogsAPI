const camelize = require('camelize');
const { Op } = require('sequelize');
const { BlogPost, PostCategory, User, Category } = require('../models');

const getAllPosts = async () => {
  const posts = await BlogPost.findAll({
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

const getPostById = async (postId) => {
  const post = await BlogPost.findOne({
    where: { id: postId },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      {
        model: Category,
        as: 'categories',
        through: { attributes: [] },
      },
    ],
  });

  return post;
};

const searchPost = async (text) => {
  const post = await BlogPost.findAll({
    where: {
      [Op.or]: [{ title: text }, { content: text }],
    },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      {
        model: Category,
        as: 'categories',
        through: { attributes: [] },
      },
    ],
  });

  return post;
};

const updatePost = async (postId, { title, content }) => {
  const post = await BlogPost.update(
    { title, content, update: Date.now() },
    {
      where: { id: postId },
    },
  );

  return post;
};

const deletePost = async (postId) => {
  const deletedPost = await BlogPost.destroy({ where: { id: postId } });

  console.log(deletedPost);

  return deletedPost;
};

module.exports = {
  getAllPosts,
  createNewPost,
  getPostsByUserId,
  getPostById,
  updatePost,
  deletePost,
  searchPost,
};
