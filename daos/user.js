//daos.user.js

const user = require("../models/user");

const getUserProfile = async (req, res) => {
  try {
    const user = await user.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { getUserProfile };
