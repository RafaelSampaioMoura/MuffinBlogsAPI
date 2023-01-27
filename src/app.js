const express = require('express');
const { Login } = require('./controllers');
const loginValidation = require('./middlewares/loginValidations');

// ...

const app = express();

app.use(express.json());

app.post('/login', loginValidation.validateBody, Login);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
