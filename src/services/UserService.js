const { User } = require('../models');

const getUserByEmail = async (email) => User.findOne({ where: { email } });

const getUserById = async (userId) => User.findByPk(userId);

module.exports = {
  getUserByEmail,
  getUserById,
};
