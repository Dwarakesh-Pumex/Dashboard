import React, { useState } from "react";
import { List, ListItem, ListItemText, Drawer, ThemeProvider, createTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
const theme = createTheme();

export default function Side() {
  const [dialog, setDialog] = useState('');
  const navigate = useNavigate();
  
  const handleClick = (name) => {
    setDialog(name);
    alert(name);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login"); 
  };

  return (
    <ThemeProvider theme={theme}>
      <Drawer variant="permanent" anchor="left">
        <List>
          <ListItem button onClick={() => handleClick("Dashboard")}>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button onClick={() => handleClick("Reports")}>
            <ListItemText primary="Reports" />
          </ListItem>
          <ListItem button onClick={() => handleClick("Settings")}>
            <ListItemText primary="Settings" />
          </ListItem>
          <ListItem button variant="contained" color="warning" onClick={handleLogout}>
            <ListItemText primary="Delete Account" />
          </ListItem>
        </List>
      </Drawer>
    </ThemeProvider>
  );
}
