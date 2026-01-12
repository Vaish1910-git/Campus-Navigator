import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("http://localhost:5000/api/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      // ✅ Step 1: Store login flag in localStorage
      sessionStorage.setItem("isAdminAuthenticated", "true");


      // ✅ Step 2: Show alert and redirect
      alert(data.message); // "Login successful"
      navigate("/admin/dashboard");
    } else {
      alert(data.message); // "Invalid username/password"
    }
  } catch (error) {
    console.error("Login error:", error);
    alert("Server error");
  }
};



  return (
    <div style={{ textAlign: "center" }}>
      <div className="admin-login-container">
        <h2>Admin Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>

       <p
        style={{
          marginTop: "200px",
          color: "red",
          fontWeight: "bold",
          fontSize: "38px",
          textAlign: "center",
          letterSpacing: "1px",
        }}
      >
        AUTHORIZED USERS ONLY
      </p>
    </div>
  );
};


export default Login;
