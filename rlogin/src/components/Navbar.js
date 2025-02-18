import React, { useContext } from "react";
import { AppBar, Toolbar, Button, Typography } from "@mui/material";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Dashboard
        </Typography>
        {user && (
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
