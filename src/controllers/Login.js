const UserService = require('../services/UserService');
const generateToken = require('../utils/generateToken');

module.exports = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await UserService.getUserByEmail(email);

    if (!user) {
      return res.status(400).json({ message: 'Invalid fields' });
    }

    const token = generateToken(user);

    res.status(200).json({ token });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Erro interno', error: error.message });
  }
};
