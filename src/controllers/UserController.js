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

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserService.getUserById(id);

    if (!user) {
      return res.status(404).json({
        message: 'User does not exist',
      });
    }

    return res.status(200).json(user.dataValues);
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

const deleteUser = async (req, res) => {
  try {
    const { id } = req.user.dataValues;
    await UserService.deleteUser(id);

    return res.status(204).json({ message: '' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { createUser, getAllUsers, getUserById, deleteUser };
