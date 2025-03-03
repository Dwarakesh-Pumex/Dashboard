import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Dashboard from "./pages/Dashboard";
import Overview from "./pages/Overview";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

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

// Function to check if the user is authenticated (e.g., session cookie or token in localStorage)
const isAuthenticated = async () => {
  try {
    const response = await fetch("http://localhost:8080/dashboard", {
      method: "GET",
      credentials: "include",
    });

    return response.ok;
  } catch {
    return false;
  }
};

// Function to clear session on logout
const logout = async () => {
  await fetch("http://localhost:8080/logout", {
    method: "POST",
    credentials: "include",
  });

  // Clear local storage
  localStorage.clear();

  // Clear session storage if used
  sessionStorage.clear();

  // Redirect to login
  window.location.href = "/login";
};

// ProtectedRoute Component - Only accessible if authenticated
const ProtectedRoute = ({ children }) => {
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = await isAuthenticated();
      setAuth(authenticated);
      setLoading(false);
    };
    checkAuth();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return auth ? children : <Navigate to="/login" replace />;
};


const App = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const auth = await isAuthenticated();
      setIsAuth(auth);
      setLoading(false);
    };
    checkAuth();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={!isAuth ? <Navigate to="/login" replace /> : <Navigate to="/dashboard" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard logout={logout} /></ProtectedRoute>} />
          <Route path="/overview" element={<ProtectedRoute><Overview logout={logout} /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>

  );
};

export default App;
