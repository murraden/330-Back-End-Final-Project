const { Router } = require("express");
const router = Router();

const authRoutes = require("./authRoutes");
const recipeRoutes = require("./recipeRoutes");
const userRoutes = require("./userRoutes");

router.use("/authRoutes", authRoutes);
router.use("/recipeRoutes", recipeRoutes);
router.use("/userRoutes", userRoutes);

module.exports = router;
