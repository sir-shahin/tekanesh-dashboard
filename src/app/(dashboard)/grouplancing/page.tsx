"use client";
import Card from "@/components/card";
import { axiosInstance } from "@/utils/axios";
import { Backdrop, Box, Button, CircularProgress, Stack, TextField } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function Page() {
  const [loading, setLoading] = useState(false);
  const [btnLoad, setBtnLoad] = useState(false);
  const [start, setStart] = useState<null | string>("1405-01-01");
  const [end, setEnd] = useState<null | string>("1406-01-01");

  const handleResetDate = () => {
    setStart("1405-01-01");
    setEnd("1406-01-01");
    fetchPlatRefetch();
    fetchIncomeRefetch();
    fetchIncomeRefetch();
  };
  const handleFilter = async () => {
    setBtnLoad(true);
    await fetchPlatRefetch();
    await fetchIncomeRefetch();
    await fetchIncomeRefetch();
    setBtnLoad(false);
  };

  const fetchPlat = async () => {
    const { data } = await axiosInstance.get(
      `https://api.grouplancing.com/crm/api/platform-earned-stats/?start_date=${start}&end_date=${end}`,
    );
    return data;
  };

  //
  const {
    data: pricesDataTable,
    refetch: fetchPlatRefetch,
    isLoading: l1,
  } = useQuery({
    queryKey: ["get-platforms"], // unique cache key
    queryFn: fetchPlat, // the async function
    staleTime: 60000,
  });

  const fetchIncome = async () => {
    const { data } = await axiosInstance.get(
      `https://api.grouplancing.com/dashboard/api/dashboard/income-stats/?start_date=${start}&end_date=${end}`,
    );
    return data;
  };

  //
  const {
    data: dashboardData,
    refetch: fetchIncomeRefetch,
    isLoading: l2,
  } = useQuery({
    queryKey: ["get-income-states"],
    queryFn: fetchIncome,
    staleTime: 60000,
  });

  useEffect(() => {
    if (l1 == false && l2 == false) setLoading(false);
    else setLoading(true);
  }, [l1, l2]);

  return (
    <div className="page active">
      <div className="ph">
        <div>
          <div className="ph-title">گروپلنسینگ</div>
          <div className="ph-sub">پروژه‌های نرم‌افزاری</div>
        </div>
      </div>
      <Stack direction={"row"} mb={4} gap={2}>
        <TextField
          value={start}
          onChange={(e) => setStart(e.target.value)}
          size="small"
          label="از تاریخ"
          placeholder="مثال 1405-02-02"
        />
        <TextField
          value={end}
          onChange={(e) => setEnd(e.target.value)}
          size="small"
          label="تا تاریخ"
          placeholder="مثال 1405-02-02"
        />
        <Button loading={btnLoad} onClick={handleFilter} variant="contained" sx={{ height: 40 }}>
          اعمال فیلتر
        </Button>

        <Button onClick={handleResetDate}>ریست تاریخ</Button>
      </Stack>

      <Stack direction={"row"} gap={2}>
        <div className="kg4" style={{ display: "flex", width: "100%" }}>
          <div className="kc g">
            <div className="kc-label">درآمد ناخالص فعلی</div>
            <div className="kc-val g">{dashboardData?.gross_income}</div>
            {/* <div className="kc-sub">73% از اوج</div> */}
          </div>
        </div>
        <div className="kg4" style={{ display: "flex", width: "100%" }}>
          <div className="kc g">
            <div className="kc-label">خالص گروپلنسینگ</div>
            <div className="kc-val g">{dashboardData?.grouplancing_net_incone}</div>
            {/* <div className="kc-sub">۱۵٪ margin</div> */}
          </div>
        </div>
        <div className="kg4" style={{ display: "flex", width: "100%" }}>
          <div className="kc g">
            <div className="kc-label">پروژه‌های فعال</div>
            <div className="kc-val g">{dashboardData?.with_sub}</div>
            {/* <div className="kc-sub">+۲ ماه قبل</div> */}
          </div>
        </div>
        <div className="kg4" style={{ display: "flex", width: "100%" }}>
          <div className="kc g">
            <div className="kc-label">مشارکت‌کنندگان</div>
            <div className="kc-val g">{dashboardData?.income_participants} نفر</div>
            <div className="kc-sub">در این تاریخ</div>
          </div>
        </div>
      </Stack>
      <Stack direction={"row"} gap={2}>
        <div className="kg4" style={{ display: "flex", width: "100%" }}>
          <div className="kc g">
            <div className="kc-label">تعداد درآمد اولی ها</div>
            <div className="kc-val g">{dashboardData?.new_income_starters}</div>
            <div className="kc-sub">در این تاریخ</div>
          </div>
        </div>
        <div className="kg4" style={{ display: "flex", width: "100%" }}>
          <div className="kc g">
            <div className="kc-label">پروژه‌های از دست رفته</div>
            <div className="kc-val g">{dashboardData?.monthly_loss}</div>
            <div className="kc-sub">در این تاریخ</div>
          </div>
        </div>
        <div className="kg4" style={{ display: "flex", width: "100%" }}>
          <div className="kc g">
            <div className="kc-label">میانگین درآمد هر نفر</div>
            <div className="kc-val g">{dashboardData?.average_income_per_person}</div>
            {/* <div className="kc-sub">+۲ ماه قبل</div> */}
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
            <div className="kc-val g">{dashboardData?.most_valuable_platform}</div>
            {/* <div className="kc-sub"> ریسک تمرکز بالا</div> */}
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
            <div className="kc-val g">۲۰٪</div>
            <div className="kc-sub"> رشد هدف</div>
          </div>
        </div>
      </Stack>

      <Stack direction={"row"} gap={3}>
        {/* <Card title="پروژه‌های فعال"></Card> */}

        <Card title="توزیع درآمد بین پلتفرم ها">
          <div className="cb">
            {pricesDataTable?.platforms.map(
              (data: { platform_uuid: string; platform_name: string; percentage: string; amount: string }) => (
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
              ),
            )}
          </div>
        </Card>
      </Stack>
      <Box>
        <Card title={`پیشرفت به هدف`}></Card>
      </Box>

      <Backdrop open={loading}>
        <CircularProgress color="primary" size={64} thickness={4} />
      </Backdrop>
    </div>
  );
}
