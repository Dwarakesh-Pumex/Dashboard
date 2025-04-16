import React from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import { Button} from "@mui/material";
import 'react-toastify/dist/ReactToastify.css';

const ChangePasswordSuccess = () => {
  localStorage.removeItem("jwtToken"); 
  localStorage.removeItem("username");
  let navigate = useNavigate();
  return (
    <div
      style={{
        backgroundImage: "url(/giphy.gif)",
        backgroundSize: "cover",
        height: "100vh",
        backgroundRepeat: "no-repeat",
      }}
    >
    <div className="forgot-password-container">
      <div className="blurred-bg"></div>      
        <div className="message-box">
          <h2>Change Password Request</h2>
          <img src="\check-green.gif" alt="Email Icon"  style={{ width: "80px", height: "80px" }} />
          <p>Password has been succesfully changed.<br/>Login with New Password.</p>
          <Button variant="contained" color="primary" onClick={() => navigate("/login")}>
            Go to Login
          </Button>
        </div>
    </div>
    </div>
  );
};

export default ChangePasswordSuccess;
