import React, { useEffect, useState } from "react";
import axios from "axios";
import { useMemo } from "react"; 
import "./ManageTimetable.css";

const ManageTimetable = () => {
  const [timetableList, setTimetableList] = useState([]);
  const [divisionList, setDivisionList] = useState([]);
  const [facultyList, setFacultyList] = useState([]);
  const [classroomList, setClassroomList] = useState([]);
  const [subjectOptions, setSubjectOptions] = useState([]);

  

  const [formData, setFormData] = useState({
    division_id: "",
    name: "",
    schedule: {
      Monday: [],
      Tuesday: [],
      Wednesday: [],
      Thursday: [],
      Friday: [],
    },
  });

  // ✅ New state for View modal
  const [selectedTimetable, setSelectedTimetable] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleViewTimetable = (timetable) => {
  setSelectedTimetable(timetable);
  setShowModal(true);
  };


  const [lectureForm, setLectureForm] = useState({
    day: "Monday",
    subject: [],
    faculty_id: [],
    classroom_id: [],
    start: "",
    end: "",
    
  });

  const [editId, setEditId] = useState(null);

  const validStartTimes = [
  "09:40",
  "10:30",
  "11:20",
  "12:10",
  "13:40",
  "14:30",
  "15:20",
  "16:10",
];

const validEndTimes = [
  "10:30",
  "11:20",
  "12:10",
  "13:00",
  "14:30",
  "15:20",
  "16:10",
  "17:00",
];


  useEffect(() => {
    fetchTimetables();
    fetchDivisions();
    fetchFaculty();
    fetchClassrooms();
    fetchSubjects();
  }, []);

  const facultyMap = useMemo(() => {
  const map = {};
  facultyList.forEach((f) => {
    map[f._id] = f.name;
  });
  return map;
}, [facultyList]);

const classroomMap = useMemo(() => {
  const map = {};
  classroomList.forEach((c) => {
     map[c._id] = c.room;
  });
  return map;
}, [classroomList]);
console.log("🗺️ classroomMap created:", classroomMap);


  const fetchTimetables = async () => {
    const res = await axios.get("http://localhost:5000/api/timetable");
    setTimetableList(res.data);
  };

  const fetchDivisions = async () => {
    const res = await axios.get("http://localhost:5000/api/division/all");
    setDivisionList(res.data);
  };

  const fetchFaculty = async () => {
    const res = await axios.get("http://localhost:5000/api/faculty/all");
    setFacultyList(res.data);
  };

  const fetchClassrooms = async () => {
  const res = await axios.get("http://localhost:5000/api/classroom/all");
  setClassroomList(res.data);
  console.log("📦 Classroom list from backend:", res.data); // ✅ ADD THIS
};


  const fetchSubjects = async () => {
  try {
    const res = await axios.get("http://localhost:5000/api/timetable/subjects");
    // Remove duplicates and exclude "Lunch Break"
    const filtered = [...new Set(res.data)].filter(subject => subject !== "Lunch Break");
    setSubjectOptions(filtered);
  } catch (error) {
    console.error("Error fetching subjects:", error);
  }
};



  const handleLectureInputChange = (e) => {
  const { name, value } = e.target;

  // Handle array-type fields
  if (["faculty_id", "classroom_id", "subject"].includes(name)) {
    setLectureForm({ ...lectureForm, [name]: [value] }); // always wrap in array
  } else {
    setLectureForm({ ...lectureForm, [name]: value });
  }
};


  const addLecture = () => {
    const updatedSchedule = { ...formData.schedule };
    updatedSchedule[lectureForm.day] = [
      ...(updatedSchedule[lectureForm.day] || []),
      {
        subject: lectureForm.subject,
        faculty_id: lectureForm.faculty_id,
        classroom_id: lectureForm.classroom_id,
        start: lectureForm.start,
        end: lectureForm.end,
        
      },
    ];
    setFormData({ ...formData, schedule: updatedSchedule });
    setLectureForm({
      day: "Monday",
      subject: [],
      faculty_id: [],
      classroom_id: [],
      start: "",
      end: "",
      
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const selectedDivision = divisionList.find(
    (div) => div._id === formData.division_id
  );

  const updatedFormData = {
    ...formData,
    name: selectedDivision ? selectedDivision.divisionName : "",
  };

  if (editId) {
    await axios.put(`http://localhost:5000/api/timetable/${editId}`, updatedFormData);
  } else {
    await axios.post("http://localhost:5000/api/timetable", updatedFormData);
  }

  fetchTimetables();
  setFormData({
    division_id: "",
    name: "",
    schedule: {
      Monday: [],
      Tuesday: [],
      Wednesday: [],
      Thursday: [],
      Friday: [],
      
    },
  });
  setEditId(null);
};


 const handleEdit = (timetable) => {
  setFormData({
    division_id: timetable.division_id?._id || timetable.division_id,
    name: timetable.name || "",
    schedule: timetable.schedule,
  });
  setEditId(timetable._id);
};



  const handleDelete = async (id) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this timetable?");
  if (!confirmDelete) return;

  try {
    await axios.delete(`http://localhost:5000/api/timetable/${id}`);
    // Optionally refresh the list after deletion
    fetchTimetables(); // or whatever your fetch function is
  } catch (error) {
    console.error("Error deleting timetable:", error);
  }
};

const getDivisionNameById = (id) => {
  const division = divisionList.find((div) => div._id === id);
  return division ? division.divisionName : "Not Selected";
};



return (
  <div className="manage-timetable">
    <h2>Manage Timetable</h2>
    <form onSubmit={handleSubmit}>

      {/* Row 1: 4 Dropdowns */}
      <div className="form-row">
        <div className="form-group-inline">
          <label>Division</label>
          <select
            name="division_id"
            value={formData.division_id}
            onChange={(e) => setFormData({ ...formData, division_id: e.target.value })}
          >
            <option value="">Select Division</option>
            {divisionList.map((div) => (
              <option key={div._id} value={div._id}>{div.divisionName}</option>
            ))}
          </select>
        </div>

        <div className="form-group-inline">
          <label>Day</label>
          <select name="day" value={lectureForm.day} onChange={handleLectureInputChange}>
            {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day) => (
              <option key={day} value={day}>{day}</option>
            ))}
          </select>
        </div>

        <div className="form-group-inline">
          <label>Subject</label>
          <select
            name="subject"
            value={lectureForm.subject}
            onChange={handleLectureInputChange}
          >
            <option value="">Select Subject</option>
            {subjectOptions.map((subject, idx) => (
              <option key={idx} value={subject}>{subject}</option>
            ))}
          </select>
        </div>

        <div className="form-group-inline">
          <label>Faculty</label>
          <select
            name="faculty_id"
            value={lectureForm.faculty_id}
            onChange={handleLectureInputChange}
          >
            <option value="">Select Faculty</option>
            {facultyList.map((f) => (
              <option key={f._id} value={f._id}>{f.name}</option>
            ))}
          </select>
        </div>
      </div>

      <br />

      {/* Row 2: 3 Dropdowns */}
      {/* Row 2: 4 Inputs (Classroom, Start, End, Name) */}
<div className="form-row">
  <div className="form-group-inline">
    <label>Classroom</label>
    <select
      name="classroom_id"
      value={lectureForm.classroom_id}
      onChange={handleLectureInputChange}
    >
      <option value="">Select Classroom</option>
      {classroomList.map((cls) => (
        <option key={cls._id} value={cls._id}>{cls.room}</option>
      ))}
    </select>
  </div>

  <div className="form-group-inline">
    <label>Start Time</label>
    <select name="start" value={lectureForm.start} onChange={handleLectureInputChange}>
      <option value="">Select Start</option>
      {validStartTimes.map((time) => (
        <option key={time} value={time}>{time}</option>
      ))}
    </select>
  </div>

  <div className="form-group-inline">
    <label>End Time</label>
    <select name="end" value={lectureForm.end} onChange={handleLectureInputChange}>
      <option value="">Select End</option>
      {validEndTimes.map((time) => (
        <option key={time} value={time}>{time}</option>
      ))}
    </select>
  </div>

<div className="form-group-inline">
  <label>Name</label>
  <div className="readonly-box">
    {getDivisionNameById(formData.division_id)}
  </div>
</div>


</div>


      {/* Row 3: Action Buttons */}
      <div className="form-row">
        <button
  type="button"
  style={{ backgroundColor: "#2881a7ff" }}
  onClick={addLecture}
>
  ➕ Add to {lectureForm.day}
</button>

<button
  type="submit"
  style={{ backgroundColor: "#ff9800" }}
>
  {editId ? "Update" : "Save Timetable"}
</button>

      </div>
    </form>

    {/* Timetable List */}
    <h3 style={{ marginTop: "2rem" }}>All Timetables</h3>
<table className="timetable-table">
  <thead>
    <tr>
      <th>Division</th>
      <th className="action-header">Actions</th>

    </tr>
  </thead>
  <tbody>
    {timetableList.map((tt) => (
      <tr key={tt._id}>
        <td>{tt.division_id?.divisionName || "Unknown Division"}</td>
        <td>
          <div className="action-buttons">
  <button
    className="view-btn"
    onClick={() => handleViewTimetable(tt)}
  >
    View
  </button>
  <button
    className="edit-btn"
    onClick={() => handleEdit(tt)}
  >
    Edit
  </button>
  <button
    className="delete-btn"
    onClick={() => handleDelete(tt._id)}
  >
    Delete
  </button>
</div>
</td>

      </tr>
    ))}
  </tbody>
</table>

{showModal && selectedTimetable && (
  <div className="modal-overlay">
    <div className="modal-content">
      <h3>{selectedTimetable.name} Timetable</h3>
<table className="real-timetable">
  <thead>
    <tr>
      <th>Day / Time</th>
      {/* Dynamically generate time slots */}
      {selectedTimetable.schedule?.Monday?.map((lecture, i) => (
        <th key={i}>
          {lecture.start}–{lecture.end}
        </th>
      ))}
    </tr>
  </thead>
  <tbody>
    {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day) => (
      <React.Fragment key={day}>
        <tr>
          <td>{day}</td>
          {selectedTimetable.schedule?.[day]?.map((lecture, i) => {
            if (!lecture || lecture.subject?.length === 0) {
              return <td key={i}>—</td>;
            }
            return (
              <td key={i}>
  {(Array.isArray(lecture.subject) ? lecture.subject : [lecture.subject]).map((subj, idx) => {
  const facultyId = Array.isArray(lecture.faculty_id) ? lecture.faculty_id[idx] : lecture.faculty_id;
  const classroomId = Array.isArray(lecture.classroom_id) ? lecture.classroom_id[idx] : lecture.classroom_id;

  const facultyName = facultyMap[facultyId] || "—";
  let classroomName = "—";

  // if classroomId is object (populated), use its fields
  if (typeof classroomId === "object" && classroomId !== null) {
    classroomName = classroomId.room || classroomId.name || "—";
  } else {
    // fallback: look up in classroomMap
    classroomName = classroomMap[classroomId] || "—";
  }

  console.log("👨‍🏫 Lecture object:", lecture);
              console.log("🔢 Index:", idx);
              console.log("🆔 Faculty ID:", facultyId);
              console.log("🧭 facultyMap lookup:", facultyMap[facultyId]);

  return (
    <div key={idx} className="lecture-cell" style={{ marginBottom: "8px" }}>
      <strong>{subj || "—"}</strong><br />
      {facultyName}<br />
      {classroomName}
    </div>
  );
})}

</td>




            );
          })}
        </tr>

        
        
      </React.Fragment>
    ))}
  </tbody>
</table>

      <br />
      <button onClick={() => setShowModal(false)}>Close</button>
    </div>
  </div>
)}


  </div>
);


};

export default ManageTimetable;
