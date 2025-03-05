import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Auth.css";
import { Button, TextField } from "@mui/material";



const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleForgotPassword = async () => {
    try {
      if (!email) {
        alert("Email field is required");
        return;
      }
  
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert("Enter a valid email address");
        return;
      }
  
      const payload = {
        email: email,
        storefrontUrl: "http://localhost:3000",
      };
  
      const response = await axios.post(
        "http://localhost:8080/api/auth/forgot-password",
        payload,
        { headers: { "Content-Type": "application/json" } }
      );
  
      if (response.status === 200) {
        alert("Password reset link has been sent to your email.");
        navigate("/login");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Error sending password reset link");
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"

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
