import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./Auth.css";
import { Button, TextField } from "@mui/material";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  const handleResetPassword = async () => {
    if (!password) {
      alert("Password field is required.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
        return;
    }

    try {
      const payload = {
        token: token,
        new_password: password,
      };

      const response = await axios.post(
        "http://localhost:8080/auth/reset-password",
        payload,
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 200) {
        alert("Password reset successful! You can now log in.");
        navigate("/login");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Error resetting password. Try again.");
    }
  };

  return (
    <div style={{backgroundImage: "url(/giphy.gif)", backgroundSize: "cover", height: "100vh",backgroundRepeat: "no-repeat"}}>
    <div className="auth-container">
      <div className="auth-frgtpswd">
        <h2>Reset Password</h2>
        <h3>Enter New Password</h3>
        <TextField
          label="New Password"
          variant="outlined"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
          InputProps={{
            style: { color: "black" } 
          }}
        />
        <h3>Confirm New Password</h3>
        <TextField
          label="New Password"
          variant="outlined"
          type="password"
          fullWidth
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          margin="normal"
          InputProps={{
            style: { color: "black" } 
          }}
        />
        <Button onClick={handleResetPassword} variant="contained" color="primary">
          Submit
        </Button>
      </div>
    </div>
    </div>
  );
};

export default ResetPassword;
