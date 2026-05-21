"use client";

import { ThemeProvider } from "@emotion/react";
import { SnackbarProvider } from "notistack";

import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import CssBaseline from "@mui/material/CssBaseline";

import theme from "@/app/theme";


export function Providers(props: { children: React.ReactNode }) {



  return (
    <AppRouterCacheProvider options={{ enableCssLayer: true }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <SnackbarProvider
          autoHideDuration={3000} // 3 seconds
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        />

        
          {/* <APIProvider>
            <AuthProvider> */}
              {/* The rest of the application */}
              {props.children}
            {/* </AuthProvider>
          </APIProvider> */}
        
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
