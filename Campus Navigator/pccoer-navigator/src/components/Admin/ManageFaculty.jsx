import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ManageFaculty.css";

const ManageFaculty = () => {
  const [facultyList, setFacultyList] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    department: "",
    cabin: "",
    floor: "",
  });
  const [editId, setEditId] = useState(null);

  const fetchFaculty = async () => {
    const res = await axios.get("http://localhost:5000/api/admin/faculty");

    setFacultyList(res.data);
  };

  useEffect(() => {
    fetchFaculty();
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
  e.preventDefault();
const formattedData = {
  ...formData,
  department: formData.department
    .split(",")
    .map((d) => d.trim())
    .filter((d) => d),
};

if (editId) {
  await axios.put(`http://localhost:5000/api/admin/faculty/${editId}`, formattedData);
  setEditId(null);
} else {
  await axios.post("http://localhost:5000/api/admin/faculty", formattedData);
}

  setFormData({ name: "", department: "", cabin: "", floor: "" });
  fetchFaculty();
};


  const handleEdit = (faculty) => {
  setFormData({
    ...faculty,
    department: Array.isArray(faculty.department)
      ? faculty.department.join(", ")
      : faculty.department,
  });
  setEditId(faculty._id);
};


  const handleDelete = async (id) => {
    if (window.confirm("Delete this faculty?")) {
      await axios.delete(`http://localhost:5000/api/admin/faculty/${id}`);

      fetchFaculty();
    }
  };

  return (
    <div className="manage-faculty">
      <h2>Manage Faculty</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Faculty Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          name="department"
          placeholder="Department"
          value={formData.department}
          onChange={handleChange}
          required
        />
        <input
          name="cabin"
          placeholder="Cabin No"
          value={formData.cabin}
          onChange={handleChange}
        />
        <input
          name="floor"
          placeholder="Floor"
          value={formData.floor}
          onChange={handleChange}
        />
        <button type="submit">{editId ? "Update" : "Add"}</button>
      </form>
    <div className="table-scroll">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Department</th>
            <th>Cabin</th>
            <th>Floor</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {facultyList.map((f) => (
            <tr key={f._id}>
              <td>{f.name}</td>
              <td>{Array.isArray(f.department) ? f.department.join(", ") : f.department}</td>

              <td>{f.cabin}</td>
              <td>{f.floor}</td>
              <td>
  <button className="edit-button" onClick={() => handleEdit(f)}>Edit</button>
  <button className="delete-button" onClick={() => handleDelete(f._id)}>Delete</button>
</td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>  
    </div>
  );
};

export default ManageFaculty;
