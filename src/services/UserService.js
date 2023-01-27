const { User } = require('../models');

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
};
