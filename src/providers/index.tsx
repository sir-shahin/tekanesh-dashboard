"use client";

import { ThemeProvider } from "@emotion/react";
import { SnackbarProvider } from "notistack";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import CssBaseline from "@mui/material/CssBaseline";

import theme from "@/app/theme";
import { APIProvider } from "./api-provider";
import { AuthProvider } from "./auth-provider";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMomentJalaali } from "@mui/x-date-pickers/AdapterMomentJalaali";

export function Providers(props: { children: React.ReactNode }) {
  return (
    <AppRouterCacheProvider options={{ enableCssLayer: true }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <SnackbarProvider
          autoHideDuration={3000} // 3 seconds
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        />

        <APIProvider>
          <AuthProvider>
            <LocalizationProvider dateAdapter={AdapterMomentJalaali}>
              {/* The rest of the application */}
              {props.children}
            </LocalizationProvider>
          </AuthProvider>
        </APIProvider>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
