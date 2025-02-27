import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AppBar, Toolbar, Button } from "@mui/material";
import Dashboard from "./pages/Dashboard";
import Overview from "./pages/Overview";

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
        {/* Navigation Bar */}
        <AppBar position="fixed" sx={{ backgroundColor: "#01141A" }}>
          <Toolbar sx={{ display: "flex", justifyContent: "flex-end" }}>
            
            <Button color="inherit" component={Link} to="/">
              Dashboard
            </Button>
            <Button color="inherit" component={Link} to="/overview">
              Overview
            </Button>
          </Toolbar>
        </AppBar>

        {/* Page Routing */}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/overview" element={<Overview />} />
          

        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
