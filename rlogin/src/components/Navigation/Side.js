import React, { useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
    const t = localStorage.getItem("jwtToken")?.trim();
    if (!t) {
      alert("No valid token found. Please log in again.");
      navigate("/login");
      return;
    }
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
    try {
      const response = await axios.post(
        "http://localhost:8080/profile/logout",
        {}, 
        {
          headers: {
            Authorization: `Bearer ${t}`,
            "Content-Type": "application/json",
          },
        }
      );
      localStorage.removeItem("jwtToken"); 
      localStorage.removeItem("username");
      toast.success(response.data.message || "Logged out successfully.");
      navigate("/login");
    } catch (error) {
      toast.error("Logout failed. Please try again.");
    }
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
          width: open ? 160 : 60,
          flexShrink: 8,
          "& .MuiDrawer-paper": {
            width: open ? 160 : 60,
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
                <ListItemIcon sx={{ minWidth: open ? "40px" : "50px" }}>
                  <img src="./dashboard icon.png" alt="Dashboard" style={{ width: "28px", height: "28px" }} />
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
                <ListItemIcon sx={{ minWidth: open ? "40px" : "50px"}}>
                  <img src="./overview icon.png" alt="Overview" style={{ width: "28px", height: "px" }} />
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
                <ListItemIcon sx={{ minWidth: open ? "40px" : "50px"}}>
                  <img src="./logout icon.png" alt="Logout" style={{ width: "28px", height: "28px" }} />
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
