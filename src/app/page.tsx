"use client";
import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { axiosInstance } from "@/utils/axios";
import Logo from "@/assets/logo.jpg";
import Image from "next/image";

type Props = {
  identity: string;
  otp: string;
};
export default function LoginPages() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.replace("/dashboard");
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
            name="identity"
            placeholder="نام کاربری"
            fullWidth
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
            type="text"
            name="identity"
            placeholder="پسورد"
            fullWidth
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
          <Button type="submit" variant="contained">
            ورود
          </Button>
        </form>
      </Box>
    </Box>
  );
}
