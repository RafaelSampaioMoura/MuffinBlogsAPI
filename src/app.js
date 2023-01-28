const express = require('express');
const { Login, UserController } = require('./controllers');
const loginValidation = require('./middlewares/loginValidations');
const newUserValidations = require('./middlewares/newUserValidations');
const { tokenExists, tokenIsValid } = require('./auth/validateJWT');

// ...

const app = express();

app.use(express.json());

app.get('/user', tokenExists, tokenIsValid, UserController.getAllUsers);
app.post('/login', loginValidation.validateBody, Login);
app.post(
  '/user',
  newUserValidations.validateDisplayName,
  newUserValidations.validateEmail,
  newUserValidations.validatePassword,
  UserController.createUser,
);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
