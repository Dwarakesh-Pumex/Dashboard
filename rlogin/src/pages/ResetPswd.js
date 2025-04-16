import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./Auth.css";
import { Button, TextField } from "@mui/material";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [newpasswordVisible, setnewPasswordVisible] = useState(false);
  const [confirmpasswordVisible, setconfirmPasswordVisible] = useState(false);

  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");
  const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;


  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    if (error) {
      setError("");
    }
  };
  
  const togglenewPasswordVisibility = () => {
    setnewPasswordVisible(!newpasswordVisible)
  };
  const toggleconfirmPasswordVisibility = () => {
    setconfirmPasswordVisible(!confirmpasswordVisible);
  };

  const handleResetPassword = async () => {
    if(!password && !confirmPassword) {
      toast.warn("All fields are required.");
      return;
    }
    if (!password) {
      toast.warn("New Password field is required.");
      return;
    }
    if (!confirmPassword) {
      toast.warn("Confirm Password field is required.");
      return;
    }

    if(!(strongPassword.test(password))){
      setError("Password must be at least 8 characters and include uppercase, lowercase, number, and special character.");
      return
    } 

    if (password !== confirmPassword) {
      toast.warn("Passwords do not match.");
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
        navigate("/resetpasswordsuccess");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error resetting password. Try again.");
    }
  };

  return (
    <div style={{backgroundImage: "url(/giphy.gif)", backgroundSize: "cover", height: "100vh",backgroundRepeat: "no-repeat"}}>
    <div className="auth-container">
      <div className="auth-frgtpswd">
        <h2>Reset Password</h2>
        <h3>Enter New Password</h3>
        <div style={{position: 'relative'}}>
        <TextField
          variant="outlined"
          type={newpasswordVisible ? "text" : "password"}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#A9A9A9" }, 
              "&:hover fieldset": { borderColor: "black" }, 
              "&.Mui-focused fieldset": { borderColor: "black" }, 
            },
          }}
          fullWidth
          value={password}
          onChange={handleInputChange(setPassword)}
          margin="normal"
          InputProps={{
            style: { color: "black" } 
          }}
        />
        <div style={{position: 'absolute', top: '55%', right: '20px', transform: 'translateY(-50%)'}}>
        <button type="button" id="show-password" onClick={togglenewPasswordVisibility} style={{
         background: "transparent",
         border: "none",
         padding: "10px",
         cursor: "pointer",
         outline: "none",
        }} >
             <img src={newpasswordVisible ? "/eye-open.svg" : "/eye-closed.svg"} alt="Toggle visibility"/>
        </button>
        </div>
        </div>
        <div style={{ color: "red", fontSize: "15px"}}>
              {error && <p className="error">{error}</p>}
        </div>

        <h3>Confirm New Password</h3>
        <div style={{position: 'relative', marginBottom: '20px'}}>
        <TextField
          variant="outlined"
          type={confirmpasswordVisible ? "text" : "password"}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#A9A9A9" }, 
              "&:hover fieldset": { borderColor: "black" }, 
              "&.Mui-focused fieldset": { borderColor: "black" }, 
            },
          }}
          fullWidth
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          margin="normal"
          InputProps={{
            style: { color: "black" } 
          }}
        />
        <div style={{position: 'absolute', top: '55%', right: '20px', transform: 'translateY(-50%)'}}>
        <button type="button" id="show-password" onClick={toggleconfirmPasswordVisibility} style={{
         background: "transparent",
         border: "none",
         padding: "10px",
         cursor: "pointer",
         outline: "none",
        }} >
             <img src={confirmpasswordVisible ? "/eye-open.svg" : "/eye-closed.svg"} alt="Toggle visibility"/>
        </button>
        </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
        <Button onClick={handleResetPassword} variant="contained" color="primary">
          Submit
        </Button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ResetPassword;
