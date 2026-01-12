const express = require("express");
const router = express.Router();
const Timetable = require("../models/Timetable");

// Utility function to deeply populate schedule for each day
const populateSchedule = async () => {
  return await Timetable.find()
    .populate("division_id")
    .lean()
    .then((timetables) =>
      Promise.all(
        timetables.map(async (tt) => {
          const schedule = tt.schedule;
          const days = Object.keys(schedule);

          for (const day of days) {
            schedule[day] = await Promise.all(
              schedule[day].map(async (lec) => {
                // Manual population of faculty and classroom
                const facultyDocs = await Promise.all(
                  lec.faculty_id.map((id) =>
                    require("../models/Faculty").findById(id).lean()
                  )
                );
                const classroomDocs = await Promise.all(
                  lec.classroom_id.map((id) =>
                    require("../models/Classroom").findById(id).lean()
                  )
                );
                return {
                  ...lec,
                  faculty_id: facultyDocs,
                  classroom_id: classroomDocs,
                };
              })
            );
          }

          return {
            ...tt,
            schedule,
          };
        })
      )
    );
};

// GET all timetables with populated schedule
router.get("/", async (req, res) => {
  try {
    const populated = await populateSchedule();
    res.json(populated);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch timetables: " + err.message });
  }
});

// GET timetable by ID with populated schedule
router.get("/:id", async (req, res) => {
  try {
    const timetable = await Timetable.findById(req.params.id)
      .populate("division_id")
      .lean();

    if (!timetable) return res.status(404).json({ error: "Timetable not found" });

    const days = Object.keys(timetable.schedule);
    for (const day of days) {
      timetable.schedule[day] = await Promise.all(
        timetable.schedule[day].map(async (lec) => {
          const facultyDocs = await Promise.all(
            lec.faculty_id.map((id) =>
              require("../models/Faculty").findById(id).lean()
            )
          );
          const classroomDocs = await Promise.all(
            lec.classroom_id.map((id) =>
              require("../models/Classroom").findById(id).lean()
            )
          );
          return {
            ...lec,
            faculty_id: facultyDocs,
            classroom_id: classroomDocs,
          };
        })
      );
    }

    res.json(timetable);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch timetable: " + err.message });
  }
});

// POST new timetable
router.post("/", async (req, res) => {
  try {
    const newTimetable = new Timetable(req.body);
    const saved = await newTimetable.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: "Failed to add timetable: " + err.message });
  }
});

// PUT update timetable
router.put("/:id", async (req, res) => {
  try {
    const updated = await Timetable.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: "Timetable not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: "Failed to update timetable: " + err.message });
  }
});

// DELETE timetable
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Timetable.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Timetable not found" });
    res.json({ message: "Timetable deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: "Failed to delete timetable: " + err.message });
  }
});

module.exports = router;
