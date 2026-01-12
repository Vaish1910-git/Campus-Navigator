const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH;

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (username !== ADMIN_USERNAME) {
    return res.status(401).json({ success: false, message: "Invalid username" });
  }

  const isMatch = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
  if (!isMatch) {
    return res.status(401).json({ success: false, message: "Invalid password" });
  }

  res.json({ success: true, message: "Login successful" });
});

module.exports = router;
