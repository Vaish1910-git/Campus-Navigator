const express = require("express");
const router = express.Router();
const Timetable = require("../models/Timetable");
const Faculty = require("../models/Faculty"); // ✅ make sure this path is correct
const Classroom = require("../models/Classroom"); // ✅ make sure this path is correct

// UPDATE timetable by ID
router.put("/:id", async (req, res) => {
  try {
    const updated = await Timetable.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) return res.status(404).json({ error: "Timetable not found" });

    res.status(200).json(updated);
  } catch (err) {
    console.error("Error updating timetable:", err);
    res.status(500).json({ message: "Failed to update timetable" });
  }
});

// GET all unique subjects
router.get("/subjects", async (req, res) => {
  try {
    const timetables = await Timetable.find({}, "schedule");
    const subjectsSet = new Set();

    timetables.forEach((timetable) => {
      const schedule = timetable.schedule;
      for (const day in schedule) {
        const lectures = schedule[day];
        if (Array.isArray(lectures)) {
          lectures.forEach((lecture) => {
            if (Array.isArray(lecture.subject)) {
              lecture.subject.forEach((subj) => {
                if (subj && subj.trim()) subjectsSet.add(subj.trim());
              });
            } else if (typeof lecture.subject === "string" && lecture.subject.trim()) {
              subjectsSet.add(lecture.subject.trim());
            }
          });
        }
      }
    });

    res.json(Array.from(subjectsSet));
  } catch (error) {
    console.error("Error fetching subjects:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// GET full timetable with manual population
router.get("/", async (req, res) => {
  try {
    const timetables = await Timetable.find().populate("division_id").lean();

    for (const tt of timetables) {
      for (const day in tt.schedule) {
        tt.schedule[day] = await Promise.all(
          tt.schedule[day].map(async (lecture) => {
            // Normalize faculty_id and classroom_id
            const facultyIds = Array.isArray(lecture.faculty_id)
              ? lecture.faculty_id
              : lecture.faculty_id
              ? [lecture.faculty_id]
              : [];

            const classroomIds = Array.isArray(lecture.classroom_id)
              ? lecture.classroom_id
              : lecture.classroom_id
              ? [lecture.classroom_id]
              : [];

            // Populate them
            const facultyDocs = facultyIds.length
              ? await Faculty.find({ _id: { $in: facultyIds } }).lean()
              : [];

            const classroomDocs = classroomIds.length
              ? await Classroom.find({ _id: { $in: classroomIds } }).lean()
              : [];

            return {
              ...lecture,
              faculty_id: facultyDocs,
              classroom_id: classroomDocs,
            };
          })
        );
      }
    }

    res.json(timetables);
  } catch (err) {
    console.error("❌ Error fetching timetable:", err);
    res.status(500).json({ error: "Failed to fetch timetables" });
  }
});

// DELETE timetable
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Timetable.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Timetable not found" });

    res.status(200).json({ message: "Timetable deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting timetable: " + err.message });
  }
});

// CREATE timetable
router.post("/", async (req, res) => {
  try {
    const newTimetable = new Timetable(req.body);
    await newTimetable.save();
    res.status(201).json(newTimetable);
  } catch (error) {
    console.error("Error creating timetable:", error);
    res.status(500).json({ message: "Failed to create timetable" });
  }
});

module.exports = router;
