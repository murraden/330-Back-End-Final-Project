//routes.user.js

const express = require("express");
const { getUserProfile } = require("../daos/user");
const authenticate = require("../middleware/authenticate");

const router = express.Router();

router.get("/profile", authenticate, getUserProfile);

module.exports = router;
