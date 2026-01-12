import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ManageClassroom.css";

const ManageClassroom = () => {
  const [classroomList, setClassroomList] = useState([]);
  const [formData, setFormData] = useState({
    room: "",   // correct MongoDB field
    floor: "",  // correct MongoDB field
  });
  const [editId, setEditId] = useState(null);

  const fetchClassrooms = async () => {
    const res = await axios.get("http://localhost:5000/api/admin/classroom");
    setClassroomList(res.data);
  };

  useEffect(() => {
    fetchClassrooms();
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await axios.put(`http://localhost:5000/api/admin/classroom/${editId}`, formData);
      setEditId(null);
    } else {
      await axios.post("http://localhost:5000/api/admin/classroom/add", formData);

    }
    setFormData({ room: "", floor: "" });
    fetchClassrooms();
  };

  const handleEdit = (classroom) => {
    setFormData({
      room: classroom.room || "",
      floor: classroom.floor || "",
    });
    setEditId(classroom._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this classroom?")) {
      await axios.delete(`http://localhost:5000/api/admin/classroom/${id}`);
      fetchClassrooms();
    }
  };

  return (
    <div className="manage-classroom">
      <h2>Manage Classrooms</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="room"
          placeholder="Room Number"
          value={formData.room}
          onChange={handleChange}
          required
        />
        <input
          name="floor"
          placeholder="Floor"
          value={formData.floor}
          onChange={handleChange}
          required
        />
        <button type="submit">{editId ? "Update" : "Add"}</button>
      </form>

      <div className="classroom-table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Room No</th>
              <th>Floor</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {classroomList.map((room) => (
              <tr key={room._id}>
                <td>{room.room}</td>
                <td>{room.floor}</td>
                <td>
  <button className="edit-button" onClick={() => handleEdit(room)}>Edit</button>
  <button className="delete-button" onClick={() => handleDelete(room._id)}>Delete</button>
</td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageClassroom;
