// src/components/Admin/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = sessionStorage.getItem("isAdminAuthenticated") === "true"; // ✅ FIXED

  return isAuthenticated ? children : <Navigate to="/admin/login" />;
};

export default ProtectedRoute;
