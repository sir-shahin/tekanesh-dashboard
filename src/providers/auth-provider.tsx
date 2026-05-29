import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

// import { useGlobalStore, useHydration } from "@/stores";

// import { PUBLIC_ONLY_ROUTES, PUBLIC_ROUTES, ROUTES } from "@/routes";
import { axiosInstance } from "@/utils/axios";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const router = useRouter();
  // const token = useGlobalStore.use.token();
  // const setUser = useGlobalStore.use.setUser();
  const [loading, setLoading] = useState(false);

  const fetchUser = async () => {
    setLoading(true);
    const { data } = await axiosInstance.get(`https://etekanesh.com/api/account/detail/`);
    setLoading(false);
    return data;
  };
  // Use the tanstack composable
  const { data, refetch } = useQuery({
    queryKey: ["get-user"], // unique cache key
    queryFn: fetchUser, // the async function
    staleTime: 0,
    enabled: false,
    retry: false,
  });

  useEffect(() => {
    if (pathname !== "/") {
      refetch().then((response) => {
        if (response.status === "success") {
          if (response.data.role === 1) {
            router.replace("/dashboard");
          }
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, data]);

  if (loading) {
    return (
      <Backdrop open invisible>
        <CircularProgress color="secondary" size={64} thickness={4} />
      </Backdrop>
    );
  }

  return <>{children}</>;
};
