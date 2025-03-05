import React, { useState } from "react";
import axios from "axios";

import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ThemeProvider,
  createTheme,
  IconButton,
  CssBaseline,
  ListItemIcon,
  Box,
} from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu as MenuIcon, ChevronLeft as ChevronLeftIcon } from "@mui/icons-material";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#01141A",
    },
    background: {
      default: "#01141A",
      paper: "#02232E",
    },
    text: {
      primary: "#FFFFFF",
    },
  },
});

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:8080/api/auth/logout"); // 🔹 Ensure this matches backend
      localStorage.removeItem("token"); // Clear stored token
      navigate("/login"); // Redirect to login page
    } catch (error) {
      console.error("Logout failed:", error.response?.data || error.message);
      alert("Logout failed. Please try again.");
    }
  };
  

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          width: open ? 240 : 70,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: open ? 240 : 70,
            transition: "width 0.3s ease-in-out",
            overflow: "hidden",
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            opacity: "0.7",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between", 
          },
        }}
      >
        <Box>
          <IconButton onClick={toggleDrawer} sx={{ margin: "10px", color: theme.palette.text.primary }}>
            {open ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>
          <List>
            {/* Dashboard */}
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/dashboard"
                sx={{
                  backgroundColor: location.pathname === "/dashboard" ? "#134E2A" : "transparent",
                  "&:hover": { backgroundColor: "#055060" },
                }}
              >
                <ListItemIcon sx={{ minWidth: open ? "40px" : "50px", marginRight: "25px" }}>
                  <img src="./dashboard icon.png" alt="Dashboard" style={{ width: "38px", height: "38px" }} />
                </ListItemIcon>
                <ListItemText
                  primary="Dashboard"
                  sx={{
                    color: theme.palette.text.primary,
                    display: open ? "block" : "none",
                    alignContent: "center",
                  }}
                />
              </ListItemButton>
            </ListItem>

            {/* Overview */}
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/overview"
                sx={{
                  backgroundColor: location.pathname === "/overview" ? "#134E2A" : "transparent",
                  "&:hover": { backgroundColor: "#055060" },
                }}
              >
                <ListItemIcon sx={{ minWidth: open ? "40px" : "50px", marginRight: "25px" }}>
                  <img src="./overview icon.png" alt="Overview" style={{ width: "38px", height: "38px" }} />
                </ListItemIcon>
                <ListItemText
                  primary="Overview"
                  sx={{
                    color: theme.palette.text.primary,
                    display: open ? "block" : "none",
                  }}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>

        {/* Logout Button at Bottom */}
        <Box>
          <List>
            <ListItem disablePadding>
              <ListItemButton
                onClick={handleLogout}
                sx={{
                  backgroundColor: location.pathname === "/logout" ? "#033544" : "transparent",
                  "&:hover": { backgroundColor: "#BF2525" },
                }}
              >
                <ListItemIcon sx={{ minWidth: open ? "40px" : "50px", marginLeft: "5px", marginRight: "24px" }}>
                  <img src="./logout icon.png" alt="Logout" style={{ width: "30px", height: "30px" }} />
                </ListItemIcon>
                <ListItemText
                  primary="Logout"
                  sx={{
                    color: theme.palette.text.primary,
                    display: open ? "block" : "none",
                  }}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </ThemeProvider>
  );
}
