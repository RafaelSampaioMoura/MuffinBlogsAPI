// const jwt = require('jsonwebtoken');
const PostService = require('../services/PostService');

const createNewPost = async (req, res) => {
  try {
    const { body, user } = req;
    // const { authorization } = headers;
    const { dataValues: { id } } = user;
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

module.exports = {
  createNewPost,
};
