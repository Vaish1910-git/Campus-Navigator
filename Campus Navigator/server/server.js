const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const connectDB = require("./config/db");
dotenv.config();
const divisionRoutes = require("./routes/divisionRoutes");
const timetableRoutes = require("./routes/timetableRoutes");
const labRoutes = require("./routes/labRoutes");
const adminDivisionRoutes = require("./routes/adminDivisionRoutes");
const classroomRoutes = require("./routes/classroomRoutes");
const facultyRoutes = require("./routes/facultyRoutes");
const findFacultyRoutes = require("./routes/findFacultyRoutes");
const adminLoginRoutes = require("./routes/adminLogin");
const imageUploadRoute = require("./routes/imageUploadRoute"); 
const adminFacultyRoutes = require("./routes/adminFacultyRoutes");
const infrastructureRoutes = require("./routes/infrastructureRoutes");
const adminClassroomRoutes = require("./routes/adminClassroomRoutes");
const adminTimetableRoutes = require("./routes/adminTimetableRoutes");

mongoose.connection.once("open", () => {
  console.log("✅ Connected to MongoDB:", mongoose.connection.db.databaseName);
});

connectDB();
const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running...");
});

app.use("/api/division", divisionRoutes);
app.use("/api/classroom", classroomRoutes);
app.use("/api/admin/timetable", adminTimetableRoutes);
app.use("/api/admin", adminLoginRoutes);
app.use("/api/admin/division", adminDivisionRoutes);
app.use("/api/admin/classroom", adminClassroomRoutes);
app.use("/api/faculty", facultyRoutes);
app.use("/api/findfaculty", findFacultyRoutes);
app.use("/api/image", imageUploadRoute);
app.use("/api/timetable", timetableRoutes);
app.use("/api/labs", labRoutes);
app.use("/api/infrastructure", infrastructureRoutes);
app.use("/api/admin/faculty", adminFacultyRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


