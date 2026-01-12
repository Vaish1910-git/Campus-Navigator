const express = require("express");
const router = express.Router();
const Faculty = require("../models/Faculty");

// GET all faculty
router.get("/", async (req, res) => {
  try {
    const facultyList = await Faculty.find();
    res.json(facultyList);
  } catch (err) {
    res.status(500).json({ error: "Error fetching faculty list: " + err.message });
  }
});

// ADD new faculty
router.post("/", async (req, res) => {
  const { name, department, cabin, floor } = req.body;

  try {
    const newFaculty = new Faculty({ name, department, cabin, floor });
    const saved = await newFaculty.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: "Error adding faculty: " + err.message });
  }
});

// UPDATE existing faculty
router.put("/:id", async (req, res) => {
  const { name, department, cabin, floor } = req.body;

  try {
    const updated = await Faculty.findByIdAndUpdate(
      req.params.id,
      { name, department, cabin, floor },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ error: "Faculty not found" });
    }
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: "Error updating faculty: " + err.message });
  }
});

// DELETE faculty
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Faculty.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Faculty not found" });
    }
    res.json({ message: "Faculty deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: "Error deleting faculty: " + err.message });
  }
});

module.exports = router;
