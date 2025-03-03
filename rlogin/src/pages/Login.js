import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import { Button } from "@mui/material";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: email, password }),
      });

      const data = await response.json();
      if (response.status === 200) {
        alert("Login successful!");
        navigate("/dashboard");
      } else {
        alert(data.error);
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="auth-left">
          <h2>Sample Dashboard</h2>
          <h3>Log In</h3>
          <input
            type="email"
            placeholder="Enter Mail ID"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleLogin} variant="contained" color="primary">
            Login
          </Button>
          <p>
            Do not have an account? <a href="/signup">Create One</a>
          </p>
        </div>
        <div className="auth-right">
          <img src="/image.png" alt="Login Visual" />
        </div>
      </div>
    </div>
  );
};

export default Login;
