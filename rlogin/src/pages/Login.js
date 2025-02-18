import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import { Button, TextField, Container, Typography } from "@mui/material";
 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      alert("No user found. Please sign up.");
      return;
    }

    if (storedUser.email === email && storedUser.password === password) {
      alert("Login successful!");
      navigate("/Dashboard");
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="auth-left">
          <h2>Sample Dashboard</h2>
          <h3>Log In</h3>
          <input type="email" placeholder="Enter Mail ID" onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} />
          <Button onClick={handleLogin} variant="contained" color="primary">
        Login
      </Button>
          <p>Do not have an account? <a href="/signup">Create One</a></p>
        </div>
        <div className="auth-right">
          <img src="/image.png" alt="Login Visual" />
        </div>
      </div>
    </div>
  );
};

export default Login;




