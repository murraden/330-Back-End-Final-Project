const { Router } = require("express");
const router = Router();

const authRoutes = require("./auth");
const recipeRoutes = require("./recipe");
const userRoutes = require("./user");

router.use("/auth", authRoutes);
router.use("/recipe", recipeRoutes);
router.use("/user", userRoutes);

module.exports = router;
