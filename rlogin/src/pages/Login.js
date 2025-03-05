import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Auth.css";
import { Button } from "@mui/material";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        setError("Both Email and Password fields are required");
        return;
      }
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      const { token } = response.data;
      localStorage.setItem("jwtToken", token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password");
    }
  };

  return (
    <div style={{backgroundImage: "url(/giphy.gif)", backgroundSize: "cover", height: "100vh",backgroundRepeat: "no-repeat"}}>
    <div className="auth-container">
      <div className="auth-box">
        <div className="auth-left">
          <h2>System Metrics Dashboard</h2>
          <h3>Log In</h3>
          {error && <p className="error">{error}</p>}
          <input
            type="email"
            placeholder="Enter Mail ID"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{color:"black"}}
          />
          <Button onClick={handleLogin} variant="contained" color="primary">
            Login
          </Button>
          <p>
          <a href="/ForgotPswd">Forgot Password</a>
          </p>
        </div>
        <div className="auth-right">
          <img src="/image.png" alt="Login Visual" />
        </div>
      </div>
    </div>
    </div>
  );
};

export default Login;
