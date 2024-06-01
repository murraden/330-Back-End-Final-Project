require("dotenv").config();
const Recipe = require("../models/recipe");

const authorize = async (req, res, next) => {
  try {
    const recipe = await Recipe.findById(req.params._id);
    if (!recipe) {
      return next();
    }
    if (recipe.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    req.recipe = recipe;
    next();
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(404).json({ message: "Recipe not found" });
    }
    res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = authorize;
