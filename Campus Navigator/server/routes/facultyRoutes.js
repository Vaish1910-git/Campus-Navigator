const express = require("express");
const router = express.Router();
const Faculty = require("../models/Faculty"); // Import Faculty model

router.get("/all", async (req, res) => {
    try {
        const faculties = await Faculty.find();
        res.json(faculties);
    } catch (error) {
        console.error("Error fetching all faculties:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// GET faculties by department
router.get("/", async (req, res) => {
    try {
        const { department } = req.query;

        if (!department) {
            return res.status(400).json({ message: "Department is required" });
        }

        // Find faculties matching the department
        const faculties = await Faculty.find({ department: { $in: [department] } });


        if (!faculties.length) {
            return res.status(404).json({ message: "No faculties found for this department" });
        }

        res.json(faculties);
    } catch (error) {
        console.error("Error fetching faculties:", error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;

