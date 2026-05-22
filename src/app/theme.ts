"use client";

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  direction: 'rtl',
  palette: {
    mode: "dark",
  },
  typography: {
    fontFamily: 'ISX, Arial, sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides:{
        contained: {
          background: 'linear-gradient(135deg, var(--green), var(--blue))',
          height:46
        }
      }
    },
  },
});

export default theme;
