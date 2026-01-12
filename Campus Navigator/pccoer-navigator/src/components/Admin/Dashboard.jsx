// src/components/Admin/Dashboard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="admin-dashboard-container">
      <h1>Welcome, Admin</h1>

      {/* ✅ Logout Button */}
<button
  onClick={() => {
    sessionStorage.removeItem("isAdminAuthenticated");
    window.location.href = "/admin/login";
  }}
  style={{
    position: "absolute",     // ⬅️ Make it absolutely positioned
    top: "70px",              // ⬅️ Distance from top
    right: "30px",             // ⬅️ Distance from left
    padding: "10px 20px",
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    zIndex: 10,               // ⬅️ Keep it on top
  }}
>
  Logout
</button>


      <div className="admin-buttons">
        <button onClick={() => navigate("/admin/faculty")}>Manage Faculty</button>
        <button onClick={() => navigate("/admin/classrooms")}>Manage Classrooms</button>
        <button onClick={() => navigate("/admin/divisions")}>Manage Divisions</button>
        <button onClick={() => navigate("/admin/timetable")}>Manage Timetable</button>
      </div>
    </div>
  );
};

export default Dashboard;
