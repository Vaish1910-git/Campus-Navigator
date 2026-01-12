const mongoose = require("mongoose");

const DivisionSchema = new mongoose.Schema({
  name: { type: String , required: true },
  
  department: String,
  year: String,
  divisionName: String
}, { collection: "Division",  versionKey: false, });



module.exports = mongoose.models.Division || mongoose.model("Division", DivisionSchema);
