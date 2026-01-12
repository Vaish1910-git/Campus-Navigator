const express = require("express");
const Division = require("../models/Division"); // Make sure the model path is correct
const router = express.Router();
// Fetch divisions based on department and year
router.get("/", async (req, res) => {
  try {
    const { department, year } = req.query;

    console.log("Received Query Params:", { department, year }); // DEBUGGING

    if (!department || !year) {
      return res.status(400).json({ message: "Department and year are required" });
    }

    const divisions = await Division.find({ department, year });

    console.log("Fetched Divisions:", divisions); // DEBUGGING

    if (divisions.length === 0) {
        return res.status(404).json({ message: "No divisions found" });
      }
      
    res.json(divisions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Fetch all divisions (for dropdown)
router.get("/all", async (req, res) => {
  try {
    const divisions = await Division.find();
    res.json(divisions);
  } catch (error) {
    console.error("Error fetching divisions:", error);
    res.status(500).json({ error: "Failed to fetch divisions" });
  }
});


module.exports = router;
