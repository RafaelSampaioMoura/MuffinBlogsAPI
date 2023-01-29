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

const getUserById = async (userId) => {
  const user = await User.findByPk(userId, {
    attributes: {
      exclude: ['password'],
    },
  });

  return camelize(user);
};

const createUser = async ({ displayName, email, password, image }) => {
  const newUser = await User.create({ displayName, email, password, image });

  return newUser;
};

const deleteUser = async (userId) => {
  const deletedUser = await User.destroy({ where: { id: userId } });

  return deletedUser;
};

module.exports = {
  getUserByEmail,
  getUserById,
  createUser,
  getAllUsers,
  deleteUser,
};
