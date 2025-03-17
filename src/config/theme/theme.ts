import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00ACC1',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#AB47BC',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#212121',
      paper: '#2D2D2D',
    },
    text: {
      primary: '#E0E0E0',
      secondary: '#B0BEC5',
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(90deg, #00ACC1, #1976D2)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#2D2D2D',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
  },
});
