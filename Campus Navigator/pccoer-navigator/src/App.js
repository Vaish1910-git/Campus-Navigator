import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./components/HomePage/LandingPage";
import Login from "./components/Admin/Login";
import AdminSessionWatcher from "./components/Admin/AdminSessionWatcher";
import Dashboard from "./components/Admin/Dashboard";
import ManageFaculty from "./components/Admin/ManageFaculty";
import Breadcrumbs from "./components/Breadcrumbs/Breadcrumbs";
import SearchPage from "./components/SearchPage/SearchPage";
import ManageTimetable from "./components/Admin/ManageTimetable";
import RefreshButton from "./components/RefreshButton/RefreshButton";
import FindClassroom from "./components/Classroom/FindStudent";
import ManageClassroom from "./components/Admin/ManageClassroom";
import ProtectedRoute from "./components/Admin/ProtectedRoute";
import ManageDivision from "./components/Admin/ManageDivision";
import FindFaculty from "./components/Faculty/FindFaculty";
import CollegeMap from "./components/CollegeMap/CollegeMap";
import PracticalLabs from "./components/PracticalLabs/PracticalLabs";
import BackButton from "./components/BackButton/BackButton";
import "bootstrap/dist/css/bootstrap.min.css";

function AppWrapper() {
  
  return (
    <>
      <BackButton />
      <Breadcrumbs />
      <RefreshButton />
      <AdminSessionWatcher /> {/* Ensures auth check on every route */}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/classroom" element={<FindClassroom />} />
        <Route path="/faculty" element={<FindFaculty />} />
        <Route path="/infrastructure" element={<CollegeMap />} />
        <Route path="/practicallabs" element={<PracticalLabs />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<Navigate to="/admin/login" />} />
        <Route path="/admin/login" element={<Login />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/classrooms"
          element={
            <ProtectedRoute>
              <ManageClassroom />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/divisions"
          element={
            <ProtectedRoute>
              <ManageDivision />
            </ProtectedRoute>
          }
        />
        <Route
  path="/admin/timetable"
  element={
    <ProtectedRoute>
      <ManageTimetable />
    </ProtectedRoute>
  }
/>

        <Route
          path="/admin/faculty"
          element={
            <ProtectedRoute>
              <ManageFaculty />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
