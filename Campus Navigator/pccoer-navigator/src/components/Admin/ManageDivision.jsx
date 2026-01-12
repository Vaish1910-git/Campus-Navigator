import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ManageDivision.css";

const ManageDivision = () => {
  const [divisionList, setDivisionList] = useState([]);
  const [formData, setFormData] = useState({
    year: "",
    department: "",
    name: "",
    divisionName: "",
  });
  const [editId, setEditId] = useState(null);

  const fetchDivisions = async () => {
    const res = await axios.get("http://localhost:5000/api/admin/division");
    setDivisionList(res.data);
  };

  useEffect(() => {
    fetchDivisions();
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...formData };

    if (editId) {
      await axios.put(`http://localhost:5000/api/admin/division/${editId}`, payload);
      setEditId(null);
    } else {
      await axios.post("http://localhost:5000/api/admin/division/add", payload);
    }
    setFormData({ year: "", department: "", name: "", divisionName: "" });
    fetchDivisions();
  };

  const handleEdit = (item) => {
    setFormData({
      year: item.year || "",
      department: item.department || "",
      name: item.name || "",
      divisionName: item.divisionName || "",
    });
    setEditId(item._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this division?")) {
      await axios.delete(`http://localhost:5000/api/admin/division/${id}`);
      fetchDivisions();
    }
  };

  return (
    <div className="manage-division">
      <h2>Manage Divisions</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="year"
          placeholder="Year (FE, SE, TE, BE)"
          value={formData.year}
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
          name="name"
          placeholder="Division Name (A, B, C...)"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          name="divisionName"
          placeholder="Full Division Name (e.g., SE Comp A)"
          value={formData.divisionName}
          onChange={handleChange}
          required
        />
        <button type="submit">{editId ? "Update" : "Add"}</button>
      </form>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Year</th>
              <th>Department</th>
              <th>Name</th>
              <th>Division Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {divisionList.map((d) => (
              <tr key={d._id}>
                <td>{d.year}</td>
                <td>{d.department}</td>
                <td>{d.name}</td>
                <td>{d.divisionName}</td>
                <td>
  <button className="edit-button" onClick={() => handleEdit(d)}>Edit</button>
  <button className="delete-button" onClick={() => handleDelete(d._id)}>Delete</button>
</td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageDivision;
