"use client";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import Image from "next/image";
import Logo from "@/assets/logo.jpg";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/utils/axios";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const [mobile, setMobile] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleVerify = () => {
    setLoading(true);
    otpRequestMutation.mutateAsync({ identity: mobile });
  };

  const otpRequestMutation = useMutation({
    mutationFn: (variables: any) => axiosInstance.post(`https://etekanesh.com/account/api/otp/send/`, variables),
    onError: (error) => alert(error),
    onSettled: () => setLoading(false),
    onSuccess: () => setStep(1),
  });

  const fetchUser = async () => {
    setLoading(true);
    const { data } = await axiosInstance.get(`https://etekanesh.com/api/account/detail/`);
    setLoading(false);
    return data;
  };

  // Use the tanstack composable
  const { refetch } = useQuery({
    queryKey: ["get-user"], // unique cache key
    queryFn: fetchUser, // the async function
    staleTime: 0,
    enabled: false,
  });

  const handleLogin = () => {
    setLoading(true);
    loginMutation.mutateAsync({ identity: mobile, otp: code });
  };

  const loginMutation = useMutation({
    mutationFn: (variables: any) => axiosInstance.post(`https://etekanesh.com/account/api/otp/verify/`, variables),
    onError: (error) => alert(error),
    onSettled: () => setLoading(false),
    onSuccess: () => {
      router.replace("/dashboard");
      return;
      refetch().then((response) => {
        if (response.status === "success") {
          if (response.data.role === 1) {
            router.replace("/dashboard");
          }
        }
      });
    },
  });

  return (
    <>
      <Box flex={1} minHeight={"100vh"} display="flex" justifyContent="center" alignItems={"center"}>
        <Box>
          <Box textAlign={"center"}>
            <Image
              src={Logo.src}
              width={100}
              height={100}
              alt="بشری"
              style={{ marginBottom: 40, boxShadow: "0 5px 30px 10px #2873ac96" }}
            />
            <Typography variant="h4">پنل هلدینگ بشری</Typography>
          </Box>

          {step === 0 ? (
            <Paper sx={{ p: 5, my: 5, borderRadius: 3 }}>
              <label>شماره موبایل</label>
              <TextField
                fullWidth
                size="small"
                type="number"
                margin="dense"
                sx={{ mb: 3 }}
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
              <Button loading={loading} variant="contained" fullWidth sx={{ mt: 5 }} onClick={() => handleVerify()}>
                درخواست کد تایید
              </Button>
            </Paper>
          ) : step === 1 ? (
            <Paper sx={{ p: 5, my: 5, borderRadius: 3 }}>
              <label>لطفا کد پیامک شده را وارد کنید</label>
              <TextField
                fullWidth
                size="small"
                type="number"
                margin="dense"
                sx={{ mb: 3 }}
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
              <Button loading={loading} variant="contained" fullWidth sx={{ mt: 5 }} onClick={() => handleLogin()}>
                ورود
              </Button>
              <Button onClick={() => setStep(0)} sx={{ mt: 1 }}>
                تغییر شماره {mobile}
              </Button>
            </Paper>
          ) : (
            ""
          )}
        </Box>
      </Box>
    </>
  );
}
