const mongoose = require("mongoose");

const lectureSchema = new mongoose.Schema({
  subject: { type: [String], required: true },
  faculty_id: [{ type: mongoose.Schema.Types.ObjectId, ref: "Faculty", required: true }],
  classroom_id: [{ type: mongoose.Schema.Types.ObjectId, ref: "Classroom", required: true }],
  start: { type: String, required: true },
  end: { type: String, required: true },
},
{_id: false}
);



const TimeTableSchema = new mongoose.Schema({
  division_id: { type: mongoose.Schema.Types.ObjectId, ref: "Division", required: true },
  schedule: {
    Monday: [lectureSchema],
    Tuesday: [lectureSchema],
    Wednesday: [lectureSchema],
    Thursday: [lectureSchema],
    Friday: [lectureSchema],
    
  },
  name: { type: String }
}, { collection: "Timetable", versionKey: false, });

module.exports = mongoose.model("Timetable", TimeTableSchema);
