"use client";

import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import { isAxiosError } from "axios";
import Image from "next/image";

import { axiosInstance } from "@/utils/axios";
import { useAuthStore } from "@/stores";
import Logo from "@/assets/logo.jpg";

type LoginResponse = {
  data: {
    access: string;
    refresh: string;
    role: number;
  };
};

const LOGIN_ERRORS: Record<number, string> = {
  400: "نام کاربری و رمز عبور الزامی است.",
  401: "نام کاربری یا رمز عبور اشتباه است.",
  403: "شما مجاز به دسترسی به گزارش‌ها نیستید.",
};

export default function LoginPage() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const setAuth = useAuthStore.useSetAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axiosInstance.post<LoginResponse>("https://etekanesh.com/api/boshri/login/", {
        username,
        password,
      });
      console.log(data.data.access);
      setAuth(data.data.access, data.data.refresh, data.data.role);
      router.replace("/dashboard");
    } catch (error) {
      if (isAxiosError(error)) {
        const status = error.response?.status;
        const message =
          (error.response?.data as { message?: string } | undefined)?.message ??
          (status ? LOGIN_ERRORS[status] : undefined) ??
          "ورود ناموفق بود. لطفاً دوباره تلاش کنید.";

        enqueueSnackbar(message, { variant: "error" });
      } else {
        enqueueSnackbar("خطایی رخ داد. لطفاً دوباره تلاش کنید.", { variant: "error" });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box height={"100vh"} display={"flex"} alignItems={"center"} justifyContent={"center"}>
      <Box>
        <Box textAlign={"center"} mb={5}>
          <Image
            src={Logo.src}
            width={100}
            height={100}
            alt="بشری"
            style={{ marginBottom: 40, boxShadow: "0 5px 30px 10px #2873ac96" }}
          />
          <Typography variant="h4">پنل هلدینگ بشری</Typography>
        </Box>
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "300px",
            gap: "30px",
          }}
        >
          <TextField
            type="text"
            name="username"
            placeholder="نام کاربری"
            fullWidth
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                height: "34px",
                borderRadius: "8px",
                "& .MuiInputBase-input": {
                  fontSize: "12px",
                },
              },
            }}
          />
          <TextField
            type="password"
            name="password"
            placeholder="پسورد"
            fullWidth
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                height: "34px",
                borderRadius: "8px",
                "& .MuiInputBase-input": {
                  fontSize: "12px",
                },
              },
            }}
          />
          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? "در حال ورود..." : "ورود"}
          </Button>
        </form>
      </Box>
    </Box>
  );
}
