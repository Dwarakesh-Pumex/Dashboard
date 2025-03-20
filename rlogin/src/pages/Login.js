import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Auth.css";
import { Button} from "@mui/material";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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
  const [error, setError] = useState("");


  const notifySuccess = (message) => {
    toast.success(message);
};

const notifyError = (message) => {
    toast.error(message);
};


  const handleLogin = async (e) => {
    e.preventDefault(); 

    try {
      if (!username || !password) {
        notifyError("Both Email and Password fields are required");
        return;
      }

      const response = await axios.post(
        "http://localhost:8080/auth/login",
        { username, password },
        { headers: { "Content-Type": "application/json" } }
      );

      const { token } = response.data;
      localStorage.setItem("jwtToken", token);
      localStorage.setItem("username", username);

      notifySuccess(`Login Succesful\nWelcome,${username}!`);
      navigate("/dashboard");
    } 
    catch (err) {
      if (err.response) {
        const errorMessage = err.response.data?.error || "Invalid email or password";
        setError(errorMessage);
        notifyError(errorMessage);
      } else if (err.request) {
        const networkError = "Network error: Unable to connect to server.";
        setError(networkError);
        notifyError(networkError);
      } else {
        const unexpectedError = "Unexpected error occurred.";
        setError(unexpectedError);
        notifyError(unexpectedError);
      }
    }
  };

  return (
    
    <div
      style={{
        backgroundImage: "url(/giphy.gif)",
        backgroundSize: "cover",
        height: "100vh",
        backgroundRepeat: "no-repeat"
      }}
    >
      <div className="auth-container">

        <div className="auth-box">
          <div className="auth-left">
            <h2>System Metrics Dashboard</h2>
            <h3>Log In</h3>
            {error && <p className="error">{error}</p>}

            <form onSubmit={handleLogin}>
  <input
    type="email"
    placeholder="Enter Mail ID"
    value={username}
    onChange={(e) => setUsername(e.target.value)}
    autoComplete="username"  
  />
  <input
    type="password"
    placeholder="Enter Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    autoComplete="current-password"  
    style={{ color: "black" }}
  />
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
