const camelize = require('camelize');
const { Category } = require('../models');

const createNewCategory = async (name) => {
  const newCategory = await Category.create({ name });

  return newCategory;
};

const getAllCategories = async () => {
  const categories = await Category.findAll({ attribute: ['name'] });
  const categoriesData = categories.map((category) => category.dataValues);

  return camelize(categoriesData);
};

module.exports = { createNewCategory, getAllCategories };
