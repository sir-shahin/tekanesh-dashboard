"use client";
import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { axiosInstance } from "@/utils/axios";
import Logo from "@/assets/logo.jpg";
import Image from "next/image";

export default function LoginPages() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    identity: "",
    otp: "",
  });
  const [otpSent, setOtpSent] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const postLogin = async (data: any) => {
    const response = await axiosInstance.post("https://etekanesh.com/account/login/", data);
    return response;
  };

  const postOtp = async (data: any) => {
    const response = await axiosInstance.post("https://etekanesh.com/account/api/otp/send/", data);
    return response;
  };

  const handleSubmit = (e: any) => {
    if (otpSent) {
      e.preventDefault();
      router.replace("/dashboard");
      postLogin(formData).then((res) => {
        if (res) {
          // router.replace("/dashboard");
        }
      });
    } else {
      e.preventDefault();
      postOtp(formData).then((res) => {
        if (res) {
          setOtpSent(true);
        }
      });
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
            name="identity"
            placeholder="شماره تلفن"
            value={formData.identity}
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
            onChange={handleChange}
          />
          {otpSent && (
            <TextField
              type="text"
              name="otp"
              placeholder="Enter OTP"
              value={formData.otp}
              sx={{
                "& .MuiOutlinedInput-root": {
                  height: "34px",
                  borderRadius: "8px",
                  "& .MuiInputBase-input": {
                    fontSize: "12px",
                  },
                },
              }}
              onChange={handleChange}
            />
          )}

          <Button type="submit" variant="contained">
            ورود
          </Button>
        </form>
      </Box>
    </Box>
  );
}
