const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Timetable = require("../models/Timetable");
const Classroom = require("../models/Classroom");
const Division = require("../models/Division");
const Faculty = require("../models/Faculty");

router.get("/", async (req, res) => {
  try {
    const { division, day, time } = req.query;
    if (!division) return res.status(400).json({ error: "Division ID is required" });

    const divisionId = new mongoose.Types.ObjectId(division);
    const divisionDoc = await Division.findById(divisionId);
    if (!divisionDoc) return res.status(404).json({ error: "Division not found" });

    const now = new Date();
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const currentDay = day || days[now.getDay()]; //"Friday"; // //isko toggle karo
    const currentTime = time || now.toTimeString().slice(0, 5);   //"14:30" //  //isko toggle karo

    const timetable = await Timetable.findOne({ division_id: divisionId });
    if (!timetable || !timetable.schedule[currentDay]) {
      return res.json({ message: "No timetable found", division: divisionDoc.divisionName });
    }

    const lecture = timetable.schedule[currentDay].find(
      (lec) => lec.start <= currentTime && lec.end > currentTime
    );

    if (!lecture) {
      return res.json({ message: "No ongoing lecture", division: divisionDoc.divisionName });
    }

    const subjectArray = Array.isArray(lecture.subject) ? lecture.subject : [lecture.subject];
    const facultyArray = Array.isArray(lecture.faculty_id) ? lecture.faculty_id : [lecture.faculty_id];
    const classroomArray = Array.isArray(lecture.classroom_id) ? lecture.classroom_id : [lecture.classroom_id];

    // Handle lunch break
    if (
      subjectArray.length === 1 &&
      subjectArray[0] &&
      subjectArray[0].toLowerCase().includes("break")
    ) {
      return res.json({
    message: "Lunch Break",
    timeRange: `(${lecture.start} to ${lecture.end})`,
    division: divisionDoc.divisionName
  });
    }

    const lectureDetails = [];
    const batchCount = Math.max(subjectArray.length, facultyArray.length, classroomArray.length);

    for (let i = 0; i < batchCount; i++) {
      const subject = subjectArray[i];
      const facultyId = facultyArray[i];
      const classroomId = classroomArray[i];

      console.log("🧪 Lecture Batch", i + 1);
console.log("➡️ Subject:", subject);
console.log("👩‍🏫 Faculty ID:", facultyId);
console.log("🏫 Classroom ID:", classroomId);
console.log("Testing Day:", currentDay);
console.log("Testing Time:", currentTime);



      if (!subject || subject.toLowerCase().includes("break")) continue;

      let facultyName = "Unknown Faculty";
      let classroomName = "Unknown Room";

      if (facultyId && mongoose.Types.ObjectId.isValid(facultyId)) {
        const facultyDoc = await Faculty.findById(facultyId);
        if (facultyDoc?.name) facultyName = facultyDoc.name;
      }

      if (classroomId && mongoose.Types.ObjectId.isValid(classroomId)) {
        const clsDoc = await Classroom.findById(classroomId);
        if (clsDoc) classroomName = `${clsDoc.floor} - Room ${clsDoc.room}`;
      }

      lectureDetails.push({
        subject,
        faculty: facultyName,
        classroom: classroomName,
      });
    }

    res.json({
      division: divisionDoc.divisionName,
      lectureDetails,
    });

  } catch (err) {
    console.error("❌ Error in /api/classroom:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ Route to get all classrooms (for dropdowns etc.)
router.get("/all", async (req, res) => {
  try {
    const classrooms = await Classroom.find();
    res.json(classrooms);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch classrooms" });
  }
});


module.exports = router;
