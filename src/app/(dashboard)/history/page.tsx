"use client";
import Card from "@/components/card";
import { axiosInstance } from "@/utils/axios";
import { Box, CircularProgress, Stack } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function Page() {
  const [loading, setLoading] = useState(true);

  const { data: userEarned } = useQuery({
    queryKey: ["get-user-earned"],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`https://api.grouplancing.com/crm/api/user-earned-stats/`);
      setLoading(false);
      return data;
    },
    staleTime: 60000,
  });

  return (
    <div className="page active">
      <div className="ph">
        <div>
          <div className="ph-title">تاریخچه ماه‌ها</div>
          <div className="ph-sub">مقایسه عملکرد</div>
        </div>
      </div>
      <Stack direction={"row"} gap={2}>
        <div className="kg4" style={{ display: "flex", width: "100%" }}>
          <div className="kc g">
            <div className="kc-label">بیشترین درامد دلاری</div>
            <div className="kc-val g">{userEarned?.highest.value}$</div>
            <div className="kc-sub">{userEarned?.highest.shamsi_month}</div>
          </div>
        </div>
        <div className="kg4" style={{ display: "flex", width: "100%" }}>
          <div className="kc g">
            <div className="kc-label">میانگین ۶ ماه</div>
            <div className="kc-val g">{userEarned?.last_6_months_average}$</div>
            <div className="kc-sub"></div>
          </div>
        </div>
        <div className="kg4" style={{ display: "flex", width: "100%" }}>
          <div className="kc g">
            <div className="kc-label">کمترین درآمد</div>
            <div className="kc-val g">{userEarned?.lowest.value}$</div>
            <div className="kc-sub">{userEarned?.lowest.shamsi_month}</div>
          </div>
        </div>
        <div className="kg4" style={{ display: "flex", width: "100%" }}>
          <div className="kc g">
            <div className="kc-label">رشد MoM فعلی</div>
            <div className="kc-val g" dir="ltr" style={{ textAlign: "right" }}>
              {userEarned?.vs_last_month.change_percent}%
            </div>
            <div className="kc-sub">نسبت به ماه قبل</div>
          </div>
        </div>
      </Stack>

      <Box>
        <Card title="تاریخچه کامل">
          <Box sx={{ overflowX: "auto" }}>
            <table className="tbl" style={{ minWidth: 600 }}>
              <thead>
                <tr>
                  <th>ماه</th>
                  <th>درآمد دلاری</th>
                  <th>سود ناخالص</th>
                  <th>فروش تکانش</th>
                  <th>مشارکت‌کنندگان</th>
                  <th>دوره فروخته</th>
                  <th>MoM</th>
                </tr>
              </thead>
              <tbody>
                {userEarned?.last_10_months_data.map(
                  (
                    data: {
                      shamsi_month: string;
                      sum_user_input_amount: string;
                      sum_gp_gross_amount: string;
                      users_count: string;
                      percent_change_vs_last_month: string;
                    },
                    index: number,
                  ) => (
                    <tr key={index}>
                      <td>
                        <span className="mtag">{data.shamsi_month}</span>
                      </td>
                      <td className="rv y">${data.sum_user_input_amount}</td>
                      <td className="rv y">${data.sum_gp_gross_amount}</td>
                      <td className="rv r">-</td>
                      <td className="rv p">{data.users_count}</td>
                      <td className="rv b">-</td>
                      <td>
                        <span dir="ltr">{data.percent_change_vs_last_month}٪</span>
                      </td>
                    </tr>
                  ),
                )}
              </tbody>
            </table>
            {loading && (
              <Box textAlign={"center"} p={5}>
                <CircularProgress color="primary" />
              </Box>
            )}
          </Box>
        </Card>
      </Box>
    </div>
  );
}
