const express = require("express");
const mongoose = require("mongoose");
const Classroom = require("../models/Classroom");
const Timetable = require("../models/Timetable");
const Faculty = require("../models/Faculty");
const router = express.Router();

// Route to find where a faculty is at the current time
router.get("/", async (req, res) => {
  try {
    const { faculty } = req.query;
    if (!faculty) return res.status(400).json({ message: "Faculty ID is required" });

    if (!mongoose.Types.ObjectId.isValid(faculty)) {
      return res.status(400).json({ message: "Invalid Faculty ID" });
    }

    const facultyId = new mongoose.Types.ObjectId(faculty);
    const facultyData = await Faculty.findById(facultyId);
    if (!facultyData) return res.status(404).json({ message: "Faculty not found" });

    // 🔁 HARD-CODED TEST TIME AND DAY FOR SIMULATION
    //const currentDay = "Wednesday";     // Change as needed
    //const currentTime = "13:30";        // Change as needed

    // ✅ Real-time with optional query override for testing
    const now = new Date();
     const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
     const currentDay = req.query.day || days[now.getDay()];
    const currentTime = req.query.time || now.toTimeString().slice(0, 5);

    
    console.log("✅ Checking Faculty ID:", facultyId);
    console.log("✅ Checking Faculty Name:", facultyData.name);
    console.log(`✅ Current Day: ${currentDay} | Current Time: ${currentTime}`);
    console.log("Testing Day:", currentDay);
    console.log("Testing Time:", currentTime);
 

    // ⛔️ Outside college hours
    if (
      currentDay === "Sunday" ||
      currentTime < "09:30" ||
      currentTime >= "17:00"
    ) {
      return res.json({ message: "Not available at this time", cabin: facultyData });
    }

    // 🔍 Check timetable for ongoing lecture
    const timetable = await Timetable.findOne({
      [`schedule.${currentDay}`]: {
        $elemMatch: {
          faculty_id: facultyId,
          start: { $lte: currentTime },
          end: { $gt: currentTime },
        },
      },
    });

    if (!timetable) {
      return res.json({ cabin: facultyData });
    }

    const lectures = timetable.schedule[currentDay] || [];
    const ongoingLecture = lectures.find((lecture) => {
  const facId = lecture.faculty_id;
  const match =
    (Array.isArray(facId)
      ? facId.some((id) => id.toString() === facultyId.toString())
      : facId.toString() === facultyId.toString()) &&
    lecture.start <= currentTime &&
    lecture.end > currentTime;
  return match;
});

    if (ongoingLecture) {
      const classroomIds = (ongoingLecture.classroom_id || []).map((id) =>
        typeof id === "string" ? new mongoose.Types.ObjectId(id) : id
      );
      const index = ongoingLecture.faculty_id.findIndex(
        (id) => id.toString() === facultyId.toString()
      );
      const classroomId = classroomIds[index];
      const location = await Classroom.findById(classroomId);

      return res.json({
        name: facultyData.name,
        classroom: {
          subject: ongoingLecture.subject?.[index] || "Unknown Subject",
          start: ongoingLecture.start,
          end: ongoingLecture.end,
          floor: location?.floor || "Unknown Floor",
          room: location?.room || "Unknown Room",
        },
      });
    }

    // No ongoing lecture, return cabin info
    return res.json({ cabin: facultyData });

  } catch (error) {
    console.error("❌ Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
