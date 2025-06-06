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
import ResetPswdSuccess from './pages/ResetPswdSuccess';
import ForgotPswdMail from './pages/ForgotPswdMail';
import ChangePswdSuccess from './pages/ChangePswdSuccess';
import { WeatherMetricsProvider } from './context/WeatherMetricsContext';
import { Slide, ToastContainer } from 'react-toastify';


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
    <ToastContainer position="top-right"
autoClose={3000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss={false}
draggable={false}
pauseOnHover
theme="dark"
transition={Slide}/>
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/ForgotPswd" element={<ForgotPswd />} />
          <Route path="/ForgotPswdMail" element={<ForgotPswdMail/>} />
          <Route path="/resetpassword" element={<ResetPswd />} />
          <Route path="/resetpasswordsuccess" element={<ResetPswdSuccess />} />
          <Route path="/changepasswordsuccess" element={<ChangePswdSuccess />} />
          {/* Private Routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/overview" element={<Overview />} />
            <Route path="/changepassword" element={<ChangePswd />} />
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
        SMD Ver 1.1
      </div>
    </ThemeProvider>
    </WeatherMetricsProvider>
    </SystemMetricsProvider>
);

export default App;
