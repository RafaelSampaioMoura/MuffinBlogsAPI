const UserService = require('../services/UserService');
const generateToken = require('../utils/generateToken');

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

module.exports = { createUser };
