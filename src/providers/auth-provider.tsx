"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import { useAuthStore, useHydration } from "@/stores";

const PUBLIC_ROUTES = ["/"];

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();
  const hydrated = useHydration();
  const access = useAuthStore.useAccess();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!hydrated) return;

    const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

    if (!access && !isPublicRoute) {
      router.replace("/");
      return;
    }

    // if (access && isPublicRoute) {
    //   router.replace("/dashboard");
    //   return;
    // }

    setReady(true);
  }, [hydrated, access, pathname, router]);

  if (!hydrated || !ready) {
    return (
      <Backdrop open invisible>
        <CircularProgress color="secondary" size={64} thickness={4} />
      </Backdrop>
    );
  }

  return <>{children}</>;
};
