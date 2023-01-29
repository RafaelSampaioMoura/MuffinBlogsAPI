const CategoryService = require('../services/CategoryService');
const PostService = require('../services/PostService');

const hasAllFields = async (req, res, next) => {
  const { body } = req;

  const bodyContent = Object.values(body);
  const fieldsExist = bodyContent.map((field) => {
    if (!field) {
      return false;
    }
    return true;
  });

  if (fieldsExist.every((e) => e === true)) {
    next();
  } else {
    return res.status(400).json({
      message: 'Some required fields are missing',
    });
  }
};

const allCategoriesExist = async (req, res, next) => {
  const { categoryIds } = req.body;
  const categoriesFromModel = await CategoryService.getAllCategories();
  const categoryIdsInsideModel = categoriesFromModel.map(
    (category) => category.id,
  );

  const checkCategoryIds = categoryIds.map((categoryId) => {
    if (categoryIdsInsideModel.includes(categoryId)) {
      return true;
    }
    return false;
  });

  if (checkCategoryIds.every((e) => e === true)) {
    next();
  } else {
    return res.status(400).json({
      message: 'one or more "categoryIds" not found',
    });
  }
};

const verifyUser = async (req, res, next) => {
  const { id } = req.user.dataValues;
  const { params } = req;
  const post = await PostService.getPostById(params.id);

  console.log(post);

  if (id !== post.userId) {
    return res.status(401).json({
      message: 'Unauthorized user',
    });
  }

  next();
};

const postExists = async (req, res, next) => {
  const { id } = req.params;
  const post = await PostService.getPostById(id);

  if (!post) {
    return res.status(404).json({
      message: 'Post does not exist',
    });
  }

  next();
};

module.exports = { hasAllFields, allCategoriesExist, postExists, verifyUser };
