const jwt = require('jsonwebtoken');

require('dotenv/config');
const UserService = require('../services/UserService');

const secret = process.env.JWT_SECRET || 'maçãemel';

const tokenExists = async (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({
      message: 'Token not found',
    });
  }

  next();
};

const tokenIsValid = async (req, res, next) => {
  try {
    const token = req.header('Authorization');
    const decoded = jwt.verify(token, secret);
    // console.log(decoded);
    const user = await UserService.getUserById(decoded.data.userId);

    if (!user) {
      return res
        .status(401)
        .json({ message: 'Erro ao procurar usuário do token.' });
    }

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({
      message: 'Expired or invalid token',
    });
  }
};

module.exports = {
  tokenExists,
  tokenIsValid,
};
