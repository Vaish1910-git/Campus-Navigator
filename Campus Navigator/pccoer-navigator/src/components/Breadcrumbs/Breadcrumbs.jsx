import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Breadcrumbs.css";

// Convert route paths to readable names
const routeNameMap = {
  "": "Home",
  search: "Search",
  classroom: "Find Classroom",
  faculty: "Find Faculty",
  infrastructure: "Infrastructure",
  practicallabs: "Find Practical Labs",
};

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <nav className="breadcrumb-container">
      <Link to="/">Home</Link>

      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;
        const label = routeNameMap[value] || value;

        return isLast ? (
          <span key={to}> / {label}</span>
        ) : (
          <span key={to}>
            {" "}
            / <Link to={to}>{label}</Link>
          </span>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;
