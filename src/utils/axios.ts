import axios from "axios";
import type { z } from "zod";

import { authStore, getStoredAccessToken } from "@/stores/auth-store";

declare module "axios" {
  export interface AxiosRequestConfig {
    schema?: z.ZodType;
  }
}

export const axiosInstance = axios.create({
  baseURL: "https://etekanesh.com/api/boshri",
  timeout: 20000,
  timeoutErrorMessage: "Request timed out. Please check your internet connection and try again.",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Accept-Language": "en",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const isLoginRequest = config.url?.includes("/login/");

  if (!isLoginRequest) {
    const token = getStoredAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const isLoginRequest = error.config?.url?.includes("/login/");

    if (status === 401 && status === 403 && !isLoginRequest) {
      authStore.getState().clearAuth();

      if (typeof window !== "undefined" && window.location.pathname !== "/") {
        window.location.href = "/";
      }
    }

    return Promise.reject(error);
  },
);

// GroupLancing's API does not use auth and rejects requests carrying the
// etekanesh Authorization header, so it needs its own instance without
// axiosInstance's request/response interceptors.
export const grouplancingAxiosInstance = axios.create({
  baseURL: "https://api.grouplancing.com",
  timeout: 20000,
  timeoutErrorMessage: "Request timed out. Please check your internet connection and try again.",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
