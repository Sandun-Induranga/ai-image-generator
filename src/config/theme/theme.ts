import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'dark', // Enables dark mode
    primary: {
      main: '#00ACC1', // Teal/Cyan - Vibrant yet sophisticated
      contrastText: '#FFFFFF', // White text for readability
    },
    secondary: {
      main: '#AB47BC', // Magenta/Purple - Bold and modern
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#212121', // Dark gray with a subtle cool tone
      paper: '#2D2D2D', // Slightly lighter for cards and surfaces
    },
    text: {
      primary: '#E0E0E0', // Light gray for main text
      secondary: '#B0BEC5', // Muted gray-blue for secondary text
    },
  },
  components: {
    // Optional: Customize component styles for a polished look
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(90deg, #00ACC1, #1976D2)', // Gradient for header
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#2D2D2D',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)', // Subtle shadow
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', // Modern lowercase buttons
          borderRadius: 8, // Rounded corners
        },
      },
    },
  },
});
