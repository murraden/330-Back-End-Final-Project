//routes.recipe.js

const express = require("express");
const {
  createRecipe,
  getRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  searchRecipes,
} = require("../daos/recipe");
const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");

const router = express.Router();

router.post("/", authenticate, createRecipe);
router.get("/", getRecipes);
router.get("/search", searchRecipes);
router.get("/:id", getRecipeById);
router.put("/:id", authenticate, authorize, updateRecipe);
router.delete("/:id", authenticate, authorize, deleteRecipe);

module.exports = router;
