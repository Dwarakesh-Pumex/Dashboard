import React, { useState } from "react";
import axios from "axios";
import "./Auth.css";
import { Button, TextField } from "@mui/material";
import { useNavigate,} from "react-router-dom";


const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [username,setUsername]= useState("")
  const navigate = useNavigate();

  const handleChangePassword = async () => {
    if ((!newPassword)&&(!oldPassword)&&(!username)) {
      alert("All Fields are required.");
      return;
    }

    const token = localStorage.getItem('jwtToken'); 

    try {
        const response = await axios.post(
            'http://localhost:8080/profile/change-password',
            {
                username,
                oldPassword,
                newPassword
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        console.log('Password changed successfully:', response.data.message);
        alert('Password changed successfully!');
        navigate("/login");
    } catch (error) {
        if (error.response) {
            console.error('Error response:', error.response.data.error);
            alert(`Error: ${error.response.data.error}`);
        } else {
            console.error('Error:', error.message);
            alert('Error changing password. Please try again.');
        }
    }
  };

  return (
    <div style={{backgroundImage: "url(/giphy.gif)", backgroundSize: "cover", height: "100vh",backgroundRepeat: "no-repeat"}}>
    <div className="auth-container">
      <div className="auth-frgtpswd">
      <h2>Change Password</h2>
        <h3>Enter Username</h3>
        <TextField
          label="Username"
          variant="outlined"
          type="text"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          margin="normal"
          InputProps={{
            style: { color: "black" } 
          }}
        />

        <h3>Enter Old Password</h3>
        <TextField
          label="old Password"
          variant="outlined"
          type="password"
          fullWidth
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          margin="normal"
          InputProps={{
            style: { color: "black" } 
          }}
        />

        <h3>Enter New Password</h3>
        <TextField
          label="New Password"
          variant="outlined"
          type="password"
          fullWidth
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          margin="normal"
          InputProps={{
            style: { color: "black" } 
           
          }}
        />
        <Button onClick={handleChangePassword} variant="contained" color="primary">
          Submit
        </Button>
      </div>
    </div>
    </div>
  );
};

export default ChangePassword;
