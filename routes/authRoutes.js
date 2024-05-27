//routes.authRoutes.js

const express = require("express");
const { register, login } = require("../daos/auth");

const router = express.Router();

router.post("/signup", register);
router.post("/login", login);

module.exports = router;
