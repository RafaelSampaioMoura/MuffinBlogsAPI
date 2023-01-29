// const jwt = require('jsonwebtoken');
const PostService = require('../services/PostService');

const createNewPost = async (req, res) => {
  try {
    const { body, user } = req;
    // const { authorization } = headers;
    const {
      dataValues: { id },
    } = user;
    // const {
    //   data: { userId },
    // } = jwt.decode(authorization);
    // console.log(id);
    const newPost = await PostService.createNewPost(body, id);

    return res.status(201).json(newPost);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getPostsByUserId = async (req, res) => {
  try {
    const { user } = req;
    const {
      dataValues: { id },
    } = user;

    const posts = await PostService.getPostsByUserId(id);

    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await PostService.getPostById(id);

    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const { body, params, user } = req;
    console.log(user);
    const { id } = params;
    await PostService.updatePost(id, body);
    const updatedPost = await PostService.getPostById(id);

    return res.status(200).json(updatedPost);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createNewPost,
  getPostsByUserId,
  getPostById,
  updatePost,
};
