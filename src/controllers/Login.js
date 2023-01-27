require('dotenv/config');
const jwt = require('jsonwebtoken');
const UserService = require('../services/UserService');

const secret = process.env.JWT_SECRET || 'maçãemel';

module.exports = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await UserService.getUserByEmail(email);

    if (!user) {
      return res.status(400).json({ message: 'Invalid fields' });
    }

    const jwtConfig = {
      expiresIn: '30m',
      algorithm: 'HS256',
    };

    const token = jwt.sign({ data: { userId: user.id } }, secret, jwtConfig);

    res.status(200).json({ token });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Erro interno', error: error.message });
  }
};
