const express = require("express");
const router = express.Router();
const Infrastructure = require("../models/infrastructure");

// GET all infrastructure locations
router.get("/", async (req, res) => {
  try {
    const data = await Infrastructure.find({});
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
