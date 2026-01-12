// routes/labRoutes.js
const express = require("express");
const router = express.Router();
const Lab = require("../models/Lab");
const Classroom = require("../models/Classroom"); // ✅ NEW: import Classroom model

// ✅ GET labs from both Labs and Classroom collections
router.get("/", async (req, res) => {
  try {
    const { department } = req.query;
    // Get from Labs collection
    const labFilter = department ? { department } : {};
    const labsFromLabs = await Lab.find(labFilter);

    // Get from Classroom collection (only those with name + department)
    const classroomFilter = department
      ? { name: { $exists: true, $ne: "" }, department }
      : { name: { $exists: true, $ne: "" }, department: { $exists: true } };

    const labsFromClassrooms = await Classroom.find(classroomFilter).select(
      "name room floor department"
    );

    // Merge both results
    const allLabs = [...labsFromLabs, ...labsFromClassrooms];
    res.json(allLabs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ POST - Add a new lab to Labs collection
router.post("/", async (req, res) => {
  try {
    const { name, room, floor, department } = req.body;
    const newLab = new Lab({ name, room, floor, department });
    await newLab.save();
    res.status(201).json(newLab);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
