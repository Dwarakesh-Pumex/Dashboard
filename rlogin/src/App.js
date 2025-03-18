import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {SystemMetricsProvider} from './context/SystemMetricsContext'; 
import Dashboard from './pages/Dashboard';
import Overview from './pages/Overview';
import Login from './pages/Login';
import ForgotPswd from './pages/ForgotPswd';
import PrivateRoute from './components/Navigation/Overview/PrivateRoute';
import ResetPswd from './pages/ResetPswd';
import ChangePswd from './pages/ChangePswd';
import { WeatherMetricsProvider } from './context/WeatherMetricsContext';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#01141A' },
    secondary: { main: '#26A69A' },
    background: { default: '#01141A', paper: '#06282C' },
    text: { primary: '#E0E0E0', secondary: '#B0B0B0' },
    action: { active: '#26A69A' },
  },
});

const App = () => (
  <SystemMetricsProvider>
    <WeatherMetricsProvider>
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/ForgotPswd" element={<ForgotPswd />} />
          <Route path="/reset-password" element={<ResetPswd />} />

          {/* Private Routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/overview" element={<Overview />} />
            <Route path="/change-password" element={<ChangePswd />} />
          </Route>

          {/* Redirect unknown paths to login */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
      <div
        style={{
          color: 'white',
          textAlign: 'right',
          paddingRight: '10px',
          fontSize: '10px',
        }}
      >
        SMD Ver 0.1
      </div>
    </ThemeProvider>
    </WeatherMetricsProvider>
    </SystemMetricsProvider>
);

export default App;
