import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Auth.css";
import { Button, TextField } from "@mui/material";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ForgotPassword = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleForgotPassword = async () => {
    try {
      if (!username) {
        alert("Email field is required");
        return;
      }
  
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(username)) {
        alert("Enter a valid email address");
        return;
      }
  
      const payload = {
        username: username,
      };
  
      const response = await axios.post(
        "http://localhost:8080/auth/forgot-password",
        payload,
        { headers: { "Content-Type": "application/json" } }
      );
  
      if (response.status === 200) {
        toast.info("Password reset link has been sent to your email.");
        navigate("/login");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Error sending password reset link");
    }
  };
  

  return (
    <div style={{ backgroundImage: "url(/giphy.gif)", backgroundSize: "cover", height: "100vh", backgroundRepeat: "no-repeat" }}>
      <div className="auth-container">
        <div className="auth-frgtpswd">
          <h2>Forgot Password</h2>
          <h3>Enter Registered Email ID</h3>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            margin="normal"
            InputProps={{
              style: { color: "black" } 
            }}

          />
          <Button onClick={handleForgotPassword} variant="contained" color="primary">
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
