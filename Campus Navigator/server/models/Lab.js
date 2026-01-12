const mongoose = require("mongoose");

const LabSchema = new mongoose.Schema({
  name: { type: String, required: true },         // e.g., Fluid Mechanics
  room: { type: String, required: true },         // e.g., 111
  floor: { type: String },                        // e.g., 1st Floor
  department: { type: String, required: true },   // e.g., Mechanical
});

// Explicitly bind model name 'Lab' to collection 'Labs'
module.exports = mongoose.model("Lab", LabSchema, "Labs");
