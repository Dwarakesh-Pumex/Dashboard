import React, { useState } from "react";
import axios from "axios";
import "./Auth.css";
import { Button, TextField } from "@mui/material";
import { useNavigate,} from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [username,setUsername]= useState("")
  const navigate = useNavigate();

  const handleChangePassword = async () => {
    if ((!newPassword)&&(!oldPassword)&&(!username)) {
      toast.warn("All Fields are required.");
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

        toast.success(response.data.message);
        navigate("/login");
    } catch (error) {
        if (error.response) {
            
            toast.error(error.response.data.error);
        } else {
            toast.error(error.response.data.error)
        }
    }
  };

  return (
    <div style={{backgroundImage: "url(/giphy.gif)", backgroundSize: "cover", height: "100vh",backgroundRepeat: "no-repeat"}}>
    <div className="auth-container">
      <div className="auth-frgtpswd">
      <h2>Change Password</h2>
        <h3>Enter Username</h3>
        <form onSubmit={handleChangePassword} >
        <TextField
          variant="outlined"
          type="text"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          margin="normal"
          autoComplete="username"
          InputProps={{
            style: { color: "black" } 
          }}
        />

        <h3>Enter Old Password</h3>
        <TextField
          variant="outlined"
          type="password"
          fullWidth
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          margin="normal"
          autoComplete="oldPassword"
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
          autoComplete="newpassword"
          InputProps={{
            style: { color: "black" } 
           
          }}
        />
        </form>
        <Button onClick={handleChangePassword} variant="contained" color="primary">
          Submit
        </Button>
      </div>
    </div>
    </div>
  );
};

export default ChangePassword;
