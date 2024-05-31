//models.recipe.js

const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  ingredients: {
    type: String,
    required: true,
  },
  instructions: {
    type: String,
    required: true,
  },
  tags: [String],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

RecipeSchema.index({ title: "text", ingredients: "text", tags: "text" });

const Recipe = mongoose.model("Recipe", RecipeSchema);

module.exports = Recipe;
