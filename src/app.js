const express = require('express');
const {
  Login,
  UserController,
  CategoryController,
  PostController,
} = require('./controllers');
const loginValidation = require('./middlewares/loginValidations');
const newUserValidations = require('./middlewares/newUserValidations');
const categoryValidations = require('./middlewares/categoryValidations');
const postValidations = require('./middlewares/postValidations');
const { tokenExists, tokenIsValid } = require('./auth/validateJWT');

// ...

const app = express();

app.use(express.json());

app.get('/user/:id', tokenExists, tokenIsValid, UserController.getUserById);
app.get('/user', tokenExists, tokenIsValid, UserController.getAllUsers);
app.get(
  '/categories',
  tokenExists,
  tokenIsValid,
  CategoryController.getAllCategories,
);
app.get(
  '/post/:id',
  tokenExists,
  tokenIsValid,
  postValidations.postExists,
  PostController.getPostById,
);
app.get('/post', tokenExists, tokenIsValid, PostController.getPostsByUserId);

app.post(
  '/categories',
  tokenExists,
  tokenIsValid,
  categoryValidations.nameIsPresent,
  CategoryController.createNewCategory,
);
app.post('/login', loginValidation.validateBody, Login);
app.post(
  '/user',
  newUserValidations.validateDisplayName,
  newUserValidations.validateEmail,
  newUserValidations.validatePassword,
  UserController.createUser,
);
app.post(
  '/post',
  tokenExists,
  tokenIsValid,
  postValidations.hasAllFields,
  postValidations.allCategoriesExist,
  PostController.createNewPost,
);

app.put(
  '/post/:id',
  tokenExists,
  tokenIsValid,
  postValidations.verifyUser,
  postValidations.postExists,
  postValidations.hasAllFields,
  PostController.updatePost,
);

app.delete(
  '/post/:id',
  tokenExists,
  tokenIsValid,
  postValidations.postExists,
  postValidations.verifyUser,
  PostController.deletePost,
);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
