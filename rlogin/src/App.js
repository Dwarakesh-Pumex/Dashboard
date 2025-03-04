import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Dashboard from "./pages/Dashboard";
import Overview from "./pages/Overview";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute"; 

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#01141A" },
    secondary: { main: "#26A69A" },
    background: { default: "#01141A", paper: "#06282C" },
    text: { primary: "#E0E0E0", secondary: "#B0B0B0" },
    action: { active: "#26A69A" },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />


          {/* Private Routes (Require Authentication) */}
          <Route element={<PrivateRoute/>}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/overview" element={<Overview />} />
          </Route>

          {/* Redirect unknown paths to login */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
