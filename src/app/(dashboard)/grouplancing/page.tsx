"use client";
import Card from "@/components/card";
import { axiosInstance } from "@/utils/axios";
import { Box, CircularProgress, Stack } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const dashboardData = {
  gross_income: 40000,
  gross_income_target: 150000,
  gross_grouplancing_income: 6000,
  active_projects: 8,
  new_income_starters: 3,
  average_income_per_person: 5000,
  platform_dependency_percent: 38,
  monthly_loss: 9500,
};

export default function Page() {
  const [loading, setLoading] = useState(true);

  const fetchPlat = async () => {
    const { data } = await axiosInstance.get(`/platform-earned-stats/?start_date=2024-01-01&end_date=2026-08-23`);
    setLoading(false);
    return data;
  };

  //
  const { data: pricesDataTable } = useQuery({
    queryKey: ["get-platforms"], // unique cache key
    queryFn: fetchPlat, // the async function
    staleTime: 60000,
  });

  // const fetchIncome = async () => {
  //   const { data } = await axiosInstance.get(`/dashboard/income-stats/?start_date=1400-01-01&end_date=1406-08-23`);
  //   return data;
  // };

  // //
  // const { data: dashboardData } = useQuery({
  //   queryKey: ["get-income-states"],
  //   queryFn: fetchIncome,
  //   staleTime: 60000,
  // });

  return (
    <div className="page active">
      <div className="ph">
        <div>
          <div className="ph-title">گروپلنسینگ</div>
          <div className="ph-sub">پروژه‌های نرم‌افزاری</div>
        </div>
      </div>
      <Stack direction={"row"} gap={2}>
        <div className="kg4" style={{ display: "flex", width: "100%" }}>
          <div className="kc g">
            <div className="kc-label">درآمد ناخالص فعلی</div>
            <div className="kc-val g">${dashboardData.gross_income}$</div>
            <div className="kc-sub">73% از اوج</div>
          </div>
        </div>
        <div className="kg4" style={{ display: "flex", width: "100%" }}>
          <div className="kc g">
            <div className="kc-label">خالص گروپلنسینگ</div>
            <div className="kc-val g">${dashboardData.gross_grouplancing_income}$</div>
            <div className="kc-sub">۱۵٪ margin</div>
          </div>
        </div>
        <div className="kg4" style={{ display: "flex", width: "100%" }}>
          <div className="kc g">
            <div className="kc-label">پروژه‌های فعال</div>
            <div className="kc-val g">{dashboardData.active_projects}</div>
            <div className="kc-sub">+۲ ماه قبل</div>
          </div>
        </div>
        <div className="kg4" style={{ display: "flex", width: "100%" }}>
          <div className="kc g">
            <div className="kc-label">مشارکت‌کنندگان</div>
            <div className="kc-val g">- نفر</div>
            <div className="kc-sub">این ماه</div>
          </div>
        </div>
      </Stack>
      <Stack direction={"row"} gap={2}>
        <div className="kg4" style={{ display: "flex", width: "100%" }}>
          <div className="kc g">
            <div className="kc-label">تعداد درآمد اولی ها</div>
            <div className="kc-val g">{dashboardData.new_income_starters}</div>
            <div className="kc-sub">این ماه</div>
          </div>
        </div>
        <div className="kg4" style={{ display: "flex", width: "100%" }}>
          <div className="kc g">
            <div className="kc-label">پروژه‌های از دست رفته</div>
            <div className="kc-val g">{dashboardData.monthly_loss}</div>
            <div className="kc-sub">این ماه</div>
          </div>
        </div>
        <div className="kg4" style={{ display: "flex", width: "100%" }}>
          <div className="kc g">
            <div className="kc-label">میانگین درآمد هر نفر</div>
            <div className="kc-val g">{dashboardData.average_income_per_person}$</div>
            <div className="kc-sub">+۲ ماه قبل</div>
          </div>
        </div>
        <div className="kg4" style={{ display: "flex", width: "100%" }}>
          <div className="kc">
            <div className="kc-label">نرخ تبدیل Proposal</div>
            <div className="kc-val">-</div>
            <div className="kc-sub">این ماه</div>
          </div>
        </div>
      </Stack>
      <Stack direction={"row"} gap={2}>
        <div className="kg4" style={{ display: "flex", width: "100%" }}>
          <div className="kc">
            <div className="kc-label">تعداد مشتریان فعال</div>
            <div className="kc-val">-</div>
            <div className="kc-sub">این ماه</div>
          </div>
        </div>
        <div className="kg4" style={{ display: "flex", width: "100%" }}>
          <div className="kc g">
            <div className="kc-label">بیشترین وابستگی به پلتفرم</div>
            <div className="kc-val g">{dashboardData.platform_dependency_percent}%</div>
            <div className="kc-sub"> ریسک تمرکز بالا</div>
          </div>
        </div>
        <div className="kg4" style={{ display: "flex", width: "100%" }}>
          <div className="kc ">
            <div className="kc-label">زمان متوسط اتمام</div>
            <div className="kc-val ">-</div>
            <div className="kc-sub">میانگین پروژه‌ها</div>
          </div>
        </div>
        <div className="kg4" style={{ display: "flex", width: "100%" }}>
          <div className="kc g">
            <div className="kc-label">هدف ماه بعد</div>
            <div className="kc-val g">{dashboardData.gross_income_target}$</div>
            <div className="kc-sub"> رشد هدف</div>
          </div>
        </div>
      </Stack>

      <Stack direction={"row"} gap={3}>
        {/* <Card title="پروژه‌های فعال"></Card> */}

        <Card title="توزیع درآمد بین پلتفرم ها">
          <div className="cb">
            {loading && (
              <Box textAlign={"center"}>
                <CircularProgress color="primary" />
              </Box>
            )}
            {pricesDataTable?.platforms.map((data: any) => (
              <div className="cmp" key={data.platform_uuid}>
                <div className="cmp-label">{data.platform_name}</div>
                <div className="cmp-bar-wrap">
                  <div
                    className="cmp-bar-fill"
                    style={{ width: `${data.percentage}%`, background: "var(--green)" }}
                  ></div>
                </div>
                <div className="cmp-val">${data.amount}</div>
              </div>
            ))}
          </div>
        </Card>
      </Stack>
      <Box>
        <Card title={`پیشرفت به هدف $${dashboardData.gross_income_target}`}></Card>
      </Box>
    </div>
  );
}
