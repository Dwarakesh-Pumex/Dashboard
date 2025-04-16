import React, { useState } from "react";
import axios from "axios";
import "./Auth.css";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [username, setUsername] = useState("");
  const [oldpasswordVisible, setoldPasswordVisible] = useState(false);
  const [newpasswordVisible, setnewPasswordVisible] = useState(false);
  const [error, setError] = useState("");
  const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  const navigate = useNavigate();

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    if (error) {
      setError("");
    }
  };

  const toggleoldPasswordVisibility = () => {
    setoldPasswordVisible(!oldpasswordVisible);
  };

  const togglenewPasswordVisibility = () => {
    setnewPasswordVisible(!newpasswordVisible);
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (!newPassword || !oldPassword || !username) {
      toast.error("All Fields are required.");
      return;
    }

    if (!strongPassword.test(newPassword)) {
      setError("Password must be at least 8 characters and include uppercase, lowercase, number, and special character.");
      return;
    }

    if (newPassword === oldPassword) {
      toast.error("New Password and Old Password should not be same.");
      return;
    }

    const token = localStorage.getItem('jwtToken');

    try {
      const response = await axios.post(
        'http://localhost:8080/profile/change-password',
        { username, oldPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      toast.success(response.data.message);
      navigate("/changepasswordsuccess");
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.error);
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };

  return (
    <div style={{ backgroundImage: "url(/giphy.gif)", backgroundSize: "cover", height: "100vh", backgroundRepeat: "no-repeat" }}>
      <div className="auth-container">
        <div className="auth-frgtpswd">
          <h2>Change Password</h2>
          <form onSubmit={handleChangePassword}>
            <div style={{ marginBottom: "24px" }}>
              <h3>Enter Username</h3>
              <TextField
                variant="outlined"
                type="text"
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#A9A9A9" },
                    "&:hover fieldset": { borderColor: "black" },
                    "&.Mui-focused fieldset": { borderColor: "black" },
                  },
                }}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                InputProps={{
                  style: { color: "black" }
                }}
              />
            </div>

            <div style={{ marginBottom: "24px" }}>
              <h3>Enter Old Password</h3>
              <div style={{ position: 'relative' }}>
                <TextField
                  variant="outlined"
                  type={oldpasswordVisible ? "text" : "password"}
                  fullWidth
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "#A9A9A9" },
                      "&:hover fieldset": { borderColor: "black" },
                      "&.Mui-focused fieldset": { borderColor: "black" },
                    },
                  }}
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  autoComplete="oldPassword"
                  InputProps={{
                    style: { color: "black" }
                  }}
                />
                <div style={{ position: 'absolute', top: '55%', right: '30px', transform: 'translateY(-50%)' }}>
                <button
  type="button"
  onClick={toggleoldPasswordVisibility} 
  style={{
    background: "transparent",
    border: "none",
    padding: "0",
    cursor: "pointer",
    outline: "none",
    width: "24px",
    height: "24px",
  }}
>
  <img
    src={oldpasswordVisible ? "/eye-open.svg" : "/eye-closed.svg"} 
    alt="Toggle visibility"
    style={{
      opacity: "0.7",
      width: "45px",
      height: "45px",
    }}
  />
</button>
                </div>
              </div>
            </div>

            <div style={{ marginBottom: "24px" }}>
              <h3>Enter New Password</h3>
              <div style={{ position: 'relative' }}>
                <TextField
                  variant="outlined"
                  type={newpasswordVisible ? "text" : "password"}
                  fullWidth
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "#A9A9A9" },
                      "&:hover fieldset": { borderColor: "black" },
                      "&.Mui-focused fieldset": { borderColor: "black" },
                    },
                  }}
                  value={newPassword}
                  onChange={handleInputChange(setNewPassword)}
                  autoComplete="newpassword"
                  InputProps={{
                    style: { color: "black" }
                  }}
                />
                <div style={{ position: 'absolute', top: '55%', right: '30px', transform: 'translateY(-50%)' }}>
                <button
  type="button"
  onClick={togglenewPasswordVisibility} 
  style={{
    background: "transparent",
    border: "none",
    padding: "0",
    cursor: "pointer",
    outline: "none",
    width: "24px",
    height: "24px",
  }}
>
  <img
    src={newpasswordVisible ? "/eye-open.svg" : "/eye-closed.svg"} 
    alt="Toggle visibility"
    style={{
      opacity: "0.7",
      width: "45px",
      height: "45px",
    }}
  />
</button>

                </div>
              </div>
            </div>

            {error && (
              <div style={{ color: "red", fontSize: "15px", marginBottom: "24px" }}>
                <p className="error">{error}</p>
              </div>
            )}

            <div style={{ display: "flex", justifyContent: "center", marginTop: "24px" }}>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
