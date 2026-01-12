const mongoose = require("mongoose");

const ClassroomSchema = new mongoose.Schema(
  {
    
    room: { type: String, required: true },
    floor: { type: String },
    name: { type: String }, // ✅ ADD THIS
    department: { type: String }, // ✅ ADD THIS
  },
  { collection: "Classroom", versionKey: false, }
);


module.exports = mongoose.models.Classroom || mongoose.model("Classroom", ClassroomSchema);
