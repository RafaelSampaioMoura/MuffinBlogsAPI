const camelize = require('camelize');
const { User } = require('../models');

const getAllUsers = async () => {
  const users = await User.findAll({
    attributes: ['display_name', 'email', 'image'],
  });
  // console.log(users);
  const filteredUsers = users.map((user) => user.dataValues);
  return camelize(filteredUsers);
};

const getUserByEmail = async (email) => User.findOne({ where: { email } });

const getUserById = async (userId) => User.findByPk(userId);

const createUser = async ({ displayName, email, password, image }) => {
  const newUser = await User.create({ displayName, email, password, image });

  return newUser;
};

module.exports = {
  getUserByEmail,
  getUserById,
  createUser,
  getAllUsers,
};
