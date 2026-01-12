// server/routes/adminDivisionRoutes.js
const express = require("express");
const router = express.Router();
const Division = require("../models/Division");

// GET all divisions
router.get("/", async (req, res) => {
  try {
    const divisions = await Division.find();
    res.json(divisions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ADD division
router.post("/add", async (req, res) => {
  try {
    const newDiv = new Division(req.body);
    await newDiv.save();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE division
router.put("/:id", async (req, res) => {
  try {
    await Division.findByIdAndUpdate(req.params.id, req.body);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE division
router.delete("/:id", async (req, res) => {
  try {
    await Division.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
