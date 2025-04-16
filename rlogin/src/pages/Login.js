import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Auth.css";
import { Button } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Login = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("jwtToken");

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState("");

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const notifySuccess = (message) => {
    toast.success(message);
  };

  const notifyError = (message) => {
    toast.error(message);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Both Email and Password fields are required");
      notifyError("Both Email and Password fields are required");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/auth/login",
        { username, password },
        { headers: { "Content-Type": "application/json" } }
      );

      const { token } = response.data;
      localStorage.setItem("jwtToken", token);
      localStorage.setItem("username", username);
      const firstName = localStorage.getItem("firstName");
      if (firstName) {
        notifySuccess(`Login Successful\nWelcome, ${firstName}!`);
      }
      else {
        notifySuccess(`Login Successful\nWelcome, (Set Name in Profile)`);
      }
      navigate("/dashboard");
    } catch (err) {
      let errorMessage = "Unexpected error occurred.";
      if (err.response) {
        errorMessage = "Invalid email or password";
      } else if (err.request) {
        errorMessage = "Network error: Unable to connect to server.";
      }
      setError(errorMessage);
      notifyError(errorMessage);
    }
  };

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    if (error) {
      setError("");
    }
  };

  return (
    <div
      style={{
        backgroundImage: "url(/giphy.gif)",
        backgroundSize: "cover",
        height: "100vh",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="auth-container">
        <div className="auth-box">
          <div className="auth-left">
            <h2>System Metrics Dashboard</h2>
            <h3>Log In</h3>
            <div style={{ color: "red", fontSize: "18px" }}>
              {error && <p className="error">{error}</p>}
            </div>
            <form onSubmit={handleLogin}>
              <input
                type="email"
                placeholder="Enter Mail ID"
                value={username}
                onChange={handleInputChange(setUsername)}
                autoComplete="username"
              />
<div className="password-field">
  <input
    type={passwordVisible ? "text" : "password"}
    placeholder="Enter Password"
    value={password}
    onChange={handleInputChange(setPassword)}
    autoComplete="current-password"
    id="password"
    style={{ color: "black" }}
  />
  <button type="button" id="show-password" onClick={togglePasswordVisibility}>
    <img src={passwordVisible ? "/eye-open.svg" : "/eye-closed.svg"} alt="Toggle visibility" />
  </button>
</div>

              <Button type="submit" variant="contained" color="primary">
                Login
              </Button>
            </form>
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
