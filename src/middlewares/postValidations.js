const CategoryService = require('../services/CategoryService');

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

module.exports = { hasAllFields, allCategoriesExist };
