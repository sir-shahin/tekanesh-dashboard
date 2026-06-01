import axios from "axios";
import type { z } from "zod";

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
