"use client";
import Card from "@/components/card";
import { axiosInstance } from "@/utils/axios";
import { Backdrop, Box, Button, CircularProgress, Stack, TextField } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import moment from "moment-jalaali";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function Page() {
  const [loading, setLoading] = useState(false);
  const [btnLoad, setBtnLoad] = useState(false);
  const [start, setStart] = useState<null | string>(moment().startOf("jMonth").format("jYYYY-jMM-jDD"));
  const [end, setEnd] = useState<null | string>(moment().format("jYYYY-jMM-jDD"));

  const handleResetDate = () => {
    setStart(moment().startOf("jMonth").format("jYYYY-jMM-jDD"));
    setEnd(moment().format("jYYYY-jMM-jDD"));
    setTimeout(() => {
      fetchPlatRefetch();
      fetchIncomeRefetch();
      fetchIncomeRefetch();
      activeProcessUsersRefetch();
    }, 1000);
  };
  const handleFilter = async () => {
    setBtnLoad(true);
    await fetchPlatRefetch();
    await fetchIncomeRefetch();
    await fetchIncomeRefetch();
    await activeProcessUsersRefetch();
    setBtnLoad(false);
  };

  const fetchPlat = async () => {
    const { data } = await axiosInstance.get(
      `https://api.grouplancing.com/crm/api/platform-earned-stats/?start_date=${moment(start, "jYYYY-jMM-jDD").format("yyyy-MM-DD")}&end_date=${moment(end, "jYYYY-jMM-jDD").format("yyyy-MM-DD")}`,
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

  const { data: userEarned, isLoading: l3 } = useQuery({
    queryKey: ["get-user-earned-gpl"],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`https://api.grouplancing.com/crm/api/user-earned-stats/`);
      return data;
    },
    staleTime: 60000,
  });
  const toApiDate = (date: string | null) => (date ?? "").replace(/\//g, "-");
  const {
    data: activeProcessUsers,
    refetch: activeProcessUsersRefetch,
    isLoading: l4,
  } = useQuery({
    queryKey: ["get-active-process-users"],
    queryFn: async () => {
      const { data } = await axiosInstance.get(
        `https://api.grouplancing.com/dashboard/api/dashboard/completed-process-users-count/?start_date=${toApiDate(start)}&end_date=${toApiDate(end)}`,
      );
      return data;
    },
    staleTime: 60000,
  });

  useEffect(() => {
    if (l1 == false && l2 == false && l3 == false && l4 == false) setLoading(false);
    else setLoading(true);
  }, [l1, l2, l3, l4]);

  return (
    <div className="page active">
      <div className="ph">
        <div>
          <div className="ph-title">گروپلنسینگ</div>
          <div className="ph-sub">پروژه‌های نرم‌افزاری</div>
        </div>
      </div>

      <Box borderRadius={3} bgcolor={"#080d14"} py={3} mb={3} px={2} minHeight={"0 !important"}>
        <Stack direction={"row"} alignItems={"center"} maxWidth={1400} columnGap={2}>
          <DatePicker
            label="از تاریخ"
            value={moment(start, "jYYYY-jMM-jDD")}
            onChange={(v) => setStart(moment(v).format("jYYYY-jMM-jDD").toString())}
            sx={{ width: "100%", direction: "ltr" }}
          />
          <DatePicker
            label="تا تاریخ"
            value={moment(end, "jYYYY-jMM-jDD")}
            onChange={(v) => setEnd(moment(v).format("jYYYY-jMM-jDD").toString())}
            sx={{ width: "100%", direction: "ltr" }}
          />

          <Button fullWidth loading={btnLoad} onClick={handleFilter} variant="contained">
            اعمال فیلتر
          </Button>

          <Button sx={{ minWidth: 100 }} onClick={handleResetDate}>
            ریست تاریخ
          </Button>
        </Stack>
      </Box>

      <Stack direction={"row"} gap={2}>
        <div className="kg4" style={{ display: "flex", width: "100%" }}>
          <div className="kc g">
            <div className="kc-label">درآمد ناخالص فعلی</div>
            <div className="kc-val g">{pricesDataTable?.total_amount.toLocaleString("fa-IR")}</div>
            {/* <div className="kc-sub">73% از اوج</div> */}
          </div>
        </div>
        <div className="kg4" style={{ display: "flex", width: "100%" }}>
          <div className="kc r">
            <div className="kc-label">خالص گروپلنسینگ</div>
            <div className="kc-val r">{dashboardData?.gpl_gross_income.toLocaleString("fa-IR")}</div>
            {/* <div className="kc-sub">۱۵٪ margin</div> */}
          </div>
        </div>
        <div className="kg4" style={{ display: "flex", width: "100%" }}>
          <div className="kc y">
            <div className="kc-label">پروژه‌های فعال</div>
            <div className="kc-val y">{activeProcessUsers?.users_count}</div>
            {/* <div className="kc-sub">+۲ ماه قبل</div> */}
          </div>
        </div>
        <div className="kg4" style={{ display: "flex", width: "100%" }}>
          <div className="kc b">
            <div className="kc-label">مشارکت‌کنندگان</div>
            <div className="kc-val b">{dashboardData?.income_participants} نفر</div>
          </div>
        </div>
      </Stack>
      <Stack direction={"row"} gap={2}>
        <div className="kg4" style={{ display: "flex", width: "100%" }}>
          <div className="kc g">
            <div className="kc-label">تعداد درآمد اولی ها</div>
            <div className="kc-val g">{dashboardData?.new_income_starters}</div>
          </div>
        </div>
        <div className="kg4" style={{ display: "flex", width: "100%" }}>
          <div className="kc b">
            <div className="kc-label">پروژه‌های از دست رفته</div>
            <div className="kc-val b">{dashboardData?.monthly_loss}</div>
          </div>
        </div>
        <div className="kg4" style={{ display: "flex", width: "100%" }}>
          <div className="kc p">
            <div className="kc-label">میانگین درآمد هر نفر</div>
            <div className="kc-val p">{dashboardData?.average_income_per_person.toFixed(2)}</div>
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
            <div className="kc-val g">{dashboardData?.most_valuable_platform ?? "پرپلی"}</div>
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
          <div className="kc r">
            <div className="kc-label">هدف ماه بعد</div>
            <div className="kc-val r">۲۰٪</div>
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
        <Card title="پیشرفت به هدف">
          <div className="cb">
            {/* Bar chart */}
            {(() => {
              const months: { shamsi_month: string; sum_user_input_amount: string }[] =
                userEarned?.last_10_months_data ?? [];
              const maxVal = Math.max(...months.map((m) => Number(m.sum_user_input_amount)), 1);
              return (
                <>
                  <div className="spark" style={{ height: 80, gap: 6 }}>
                    {months.map((m, i) => (
                      <div
                        key={i}
                        className="spark-bar"
                        style={{
                          height: `${(Number(m.sum_user_input_amount) / maxVal) * 100}%`,
                          background: i === months.length - 1 ? "var(--green)" : "var(--b3)",
                          flex: 1,
                        }}
                        title={`${m.shamsi_month}: $${m.sum_user_input_amount}`}
                      />
                    ))}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: 6,
                      fontSize: 9,
                      color: "var(--t3)",
                    }}
                  >
                    {months.map((m, i) => (
                      <span key={i} style={{ flex: 1, textAlign: "center" }}>
                        {m.shamsi_month?.slice(-2)}
                      </span>
                    ))}
                  </div>

                  {/* Progress toward peak */}
                  <div className="pb-wrap" style={{ marginTop: 16 }}>
                    <div className="pb-labels">
                      <span>این ماه: ${userEarned?.last_10_months_data?.at(-1)?.sum_user_input_amount ?? 0}</span>
                      <span>اوج: ${userEarned?.highest?.value}</span>
                    </div>
                    <div className="pb">
                      <div
                        className="pb-fill"
                        style={{
                          width: `${userEarned?.highest?.value > 0 ? (Number(userEarned?.last_10_months_data?.at(-1)?.sum_user_input_amount ?? 0) / userEarned.highest.value) * 100 : 0}%`,
                          background: "linear-gradient(90deg, var(--blue), var(--green))",
                        }}
                      />
                    </div>
                  </div>

                  {/* Summary */}
                  <div style={{ marginTop: 12 }}>
                    <div className="ri">
                      <div className="rl">میانگین ۶ ماه</div>
                      <div className="rv y">${userEarned?.last_6_months_average}</div>
                    </div>
                    <div className="ri">
                      <div className="rl">رشد نسبت به ماه قبل</div>
                      <div className="rv b" dir="ltr">
                        {userEarned?.vs_last_month?.change_percent}٪
                      </div>
                    </div>
                    <div className="ri">
                      <div className="rl">بهترین ماه ({userEarned?.highest?.shamsi_month})</div>
                      <div className="rv g">${userEarned?.highest?.value}</div>
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
        </Card>
      </Box>

      <Backdrop open={loading}>
        <CircularProgress color="primary" size={64} thickness={4} />
      </Backdrop>
    </div>
  );
}
