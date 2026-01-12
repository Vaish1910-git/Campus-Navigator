// server/routes/adminClassroomRoutes.js
const express = require("express");
const router = express.Router();
const Classroom = require("../models/classroom");

// GET all classrooms
router.get("/", async (req, res) => {
  try {
    const rooms = await Classroom.find();
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ADD classroom
router.post("/add", async (req, res) => {
  try {
    const newRoom = new Classroom(req.body);
    await newRoom.save();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE classroom
router.put("/:id", async (req, res) => {
  try {
    await Classroom.findByIdAndUpdate(req.params.id, req.body);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE classroom
router.delete("/:id", async (req, res) => {
  try {
    await Classroom.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
