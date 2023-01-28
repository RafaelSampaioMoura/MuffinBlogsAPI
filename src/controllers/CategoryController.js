const CategoryService = require('../services/CategoryService');

const createNewCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const newCategory = await CategoryService.createNewCategory(name);

    return res.status(201).json(newCategory);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getAllCategories = async (_req, res) => {
  try {
    const categories = await CategoryService.getAllCategories();

    return res.status(200).json(categories);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createNewCategory,
  getAllCategories,
};
