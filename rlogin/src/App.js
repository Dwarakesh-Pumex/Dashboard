import React from 'react';
import Dashboard from './pages/Dashboard';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Create a custom dark theme
const theme = createTheme({
  palette: {
    mode: 'dark', // Enables dark mode
    primary: {
      main: '#01141A', // Dark teal as the primary color
    },
    secondary: {
      main: '#26A69A', // Light teal for accents
    },
    background: {
      default: '#01141A', // Set the background color to a dark shade close to #01141A
      paper: '#06282C', // Lighter dark color for card-like components
    },
    text: {
      primary: '#E0E0E0', // Light gray text for good contrast on dark background
      secondary: '#B0B0B0', // Slightly lighter secondary text
    },
    action: {
      active: '#26A69A', // Use secondary color for active icons and buttons
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <div>
      <Dashboard />
    </div>  
    </ThemeProvider>
  );
};

export default App;
