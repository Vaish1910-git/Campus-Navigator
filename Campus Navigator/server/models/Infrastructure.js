const mongoose = require("mongoose");

const infraSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  rooms: [String],
  student: [Number],
  staff: [Number],
  disabled: [Number],
});

module.exports = mongoose.model("Infrastructure", infraSchema, "Infrastructure");

