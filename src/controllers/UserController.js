const UserService = require('../services/UserService');
const generateToken = require('../utils/generateToken');

const getAllUsers = async (_req, res) => {
  try {
    const users = await UserService.getAllUsers();

    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { body } = req;

    const user = await UserService.getUserByEmail(body.email);

    if (user) {
      return res.status(409).json({
        message: 'User already registered',
      });
    }

    const newUser = await UserService.createUser(body);

    const token = generateToken(newUser);

    res.status(201).json({ token });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error interno', error: error.message });
  }
};

module.exports = { createUser, getAllUsers };
