//middleware.authorize.js
require("dotenv").config();
const Recipe = require("../models/recipe");

const authorize = async (req, res, next) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });
    if (recipe.author.toString() !== req.user.id)
      return res.status(401).json({ message: "Unauthorized" });

    req.recipe = recipe;
    next();
  } catch (err) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = authorize;
