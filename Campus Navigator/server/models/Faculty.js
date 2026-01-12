const mongoose = require("mongoose");

const FacultySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
  department: [{ type: String }],
  cabin: { type: String },
  floor: { type: String },
  },
  {
    collection: "Faculty",
    versionKey: false, // 🚫 disables the __v field
  }
);

module.exports = mongoose.models.Faculty || mongoose.model("Faculty", FacultySchema);
