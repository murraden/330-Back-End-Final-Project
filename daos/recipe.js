const Recipe = require("../models/recipe");

const createRecipe = async (req, res) => {
  const { title, ingredients, instructions, tags } = req.body;

  if (!title || typeof title !== "string") {
    return res.status(400).json({
      message: "Bad format: Title is required and should be a string",
    });
  }
  if (!ingredients || typeof ingredients !== "string") {
    return res.status(400).json({
      message: "Bad format: Ingredients are required and should be a string",
    });
  }
  if (!instructions || typeof instructions !== "string") {
    return res.status(400).json({
      message: "Bad format: Instructions are required and should be a string",
    });
  }
  if (!Array.isArray(tags)) {
    return res
      .status(400)
      .json({ message: "Bad format: Tags should be an array" });
  }
  try {
    const recipe = new Recipe({
      title,
      ingredients,
      instructions,
      tags,
      author: req.user.id,
    });
    await recipe.save();
    res.status(201).json(recipe);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find().populate("author", "username");
    res.status(200).json(recipes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getRecipeById = async (req, res) => {
  try {
    const recipeId = req.params.id;
    console.log(`Getting recipe by ID: ${recipeId}`);
    const recipe = await Recipe.findById(recipeId).exec();
    if (!recipe) {
      console.log(`Recipe not found: ${recipeId}`);
      return res.status(404).json({ message: "Recipe not found" });
    }
    res.json(recipe);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

const updateRecipe = async (req, res) => {
  const { title, ingredients, instructions, tags } = req.body;
  try {
    const recipe = await Recipe.findById(req.params.id);
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
    res.status(500).json({ error: err.message });
  }
};

const deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    if (recipe.author.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    console.log("this user id", req.user.id);
    console.log("this recipe id", recipe.author.toString());

    await recipe.deleteOne();
    res.json({ message: "Recipe removed" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const searchRecipes = async (req, res) => {
  try {
    const { query } = req.query;
    console.log(`Searching recipes with query: ${query}`);
    const recipes = await Recipe.find({ $text: { $search: query } })
      .populate("author", "username")
      .exec();
    if (recipes.length === 0) {
      console.log(`No recipes found with query: ${query}`);
      return res.status(404).json({ message: "No recipes found" });
    }
    res.json(recipes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
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
