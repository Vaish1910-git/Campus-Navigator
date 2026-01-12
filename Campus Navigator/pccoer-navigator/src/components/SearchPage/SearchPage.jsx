// SearchPage.js
import React, { useState } from "react";
import "./SearchPage.css";
import { useNavigate } from "react-router-dom";

// We only need class names now
const buttons = [
  { label: "Find Classroom", path: "/classroom", className: "hover-classroom" },
  { label: "Find Faculty", path: "/faculty", className: "hover-faculty" },
  { label: "Find Others", path: "/infrastructure", className: "hover-others" },
  { label: "Find Practical Labs", path: "/practicallabs", className: "hover-labs" },
];

const SearchPage = () => {
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className={`home-container ${hoveredIndex !== null ? "hover-active" : ""}`}>
      {/* Dim + blur everything behind hovered button */}
      <div className="dim-blur-overlay" />

      <div className="button-container">
        {buttons.map((btn, index) => (
          <button
            key={index}
            className={`search-button ${btn.className} ${hoveredIndex === index ? "hovered" : ""}`}
            onClick={() => navigate(btn.path)}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <span>{btn.label}</span>
          </button>
        ))}
      </div>

      
  <button onClick={() => navigate("/admin/login")} className="admin-button">
    Admin Login
  </button>


    </div>
  );
};

export default SearchPage;
