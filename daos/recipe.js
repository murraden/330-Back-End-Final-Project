//.daos.recipe.js

const recipe = require("../models/recipe");

const createRecipe = async (req, res) => {
  const { title, ingredients, instructions, tags } = req.body;
  try {
    const recipe = new recipe({
      title,
      ingredients,
      instructions,
      tags,
      author: req.user.id,
    });
    await recipe.save();
    res.status(201).json(recipe);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getRecipes = async (req, res) => {
  try {
    const recipes = await recipe.find().populate("author", "username");
    res.json(recipes);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getRecipeById = async (req, res) => {
  try {
    const recipe = await recipe
      .findById(req.params.id)
      .populate("author", "username");
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });
    res.json(recipe);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const updateRecipe = async (req, res) => {
  const { title, ingredients, instructions, tags } = req.body;
  try {
    const recipe = await recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });
    if (recipe.author.toString() !== req.user.id)
      return res.status(403).json({ message: "Unauthorized" });

    recipe.title = title || recipe.title;
    recipe.ingredients = ingredients || recipe.ingredients;
    recipe.instructions = instructions || recipe.instructions;
    recipe.tags = tags || recipe.tags;
    await recipe.save();
    res.json(recipe);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteRecipe = async (req, res) => {
  try {
    const recipe = await recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });
    if (recipe.author.toString() !== req.user.id)
      return res.status(403).json({ message: "Unauthorized" });

    await recipe.remove();
    res.json({ message: "Recipe removed" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const searchRecipes = async (req, res) => {
  try {
    const { query } = req.query;
    const recipes = await recipe
      .find({ $text: { $search: query } })
      .populate("author", "username");
    res.json(recipes);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  createRecipe,
  getRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  searchRecipes,
};
