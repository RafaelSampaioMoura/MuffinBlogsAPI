require('dotenv/config');
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'maçãemel';

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

module.exports = (object) => {
  const token = jwt.sign({ data: { userId: object.id } }, secret, jwtConfig);

  return token;
};
