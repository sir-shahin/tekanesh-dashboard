"use client";
import Card from "@/components/card";
import { axiosInstance } from "@/utils/axios";
import { Backdrop, CircularProgress, Stack } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { localDate } from "@/utils";
import { useEffect, useState } from "react";

export default function OverviewPage() {
  const start = localDate().monthAgo;
  const end = localDate().fullDate;
  const [loading, setLoading] = useState(false);

  const { data: tekaneshIncome, isLoading: l1 } = useQuery({
    queryKey: ["get-rev-teacher"],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/revenue-report/?action=revenue_per_teacher`);
      return data.data;
    },
    staleTime: 60000,
  });
  //
  const { data: reports, isLoading: l2 } = useQuery({
    queryKey: ["get-bestsaleofmonth"],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/reports/?action=best_sale_in_month_in_last_year`);
      return data.data;
    },
    staleTime: 60000,
  });
  //
  const fetchIncome = async () => {
    const { data } = await axiosInstance.get(
      `https://api.grouplancing.com/dashboard/api/dashboard/income-stats?start_date=${start}&end_date=${end}`,
    );
    return data;
  };
  const { data: dashboardData, isLoading: l3 } = useQuery({
    queryKey: ["get-income-state"],
    queryFn: fetchIncome,
    staleTime: 60000,
  });

  const { data: totalSold, isLoading: l4 } = useQuery({
    queryKey: ["get-total-sold"],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/total-course-sold/?action=total_courses_sold`);
      return data.data;
    },
    staleTime: 60000,
  });

  useEffect(() => {
    if (l1 == false && l2 == false && l3 == false && l4 == false) {
      setLoading(false);
    } else setLoading(true);
  }, [l1, l2, l3, l4]);

  return (
    <div className="page active">
      <div className="ph">
        <div>
          <div className="ph-title">داشبورد اجرایی</div>
          <div className="ph-sub"> محاسبه از {start} — آخرین بروزرسانی: امروز</div>
        </div>
      </div>

      <div className="kg4">
        <div className="kc g">
          <div className="kc-icon">💵</div>
          <div className="kc-label">درآمد دلاری ماهانه</div>
          <div className="kc-val g">-</div>
          <div className="kc-sub">{/* <span className="tag dn">↓ ۷۳٪ از اوج</span> اوج: $150K */}</div>
        </div>
        <div className="kc y">
          <div className="kc-icon">📈</div>
          <div className="kc-label">سود ناخالص گروپلنسینگ</div>
          <div className="kc-val y">{dashboardData?.gross_income != null ? dashboardData.gross_income.toLocaleString("fa-IR") : "-"}</div>
          <div className="kc-sub">
            <span className="tag nt">در یکماه</span>
          </div>
        </div>
        <div className="kc b">
          <div className="kc-icon">🎓</div>
          <div className="kc-label">فروش تکانش</div>
          <div className="kc-val r">{tekaneshIncome?.total_revenue != null ? tekaneshIncome.total_revenue.toLocaleString("fa-IR") : "-"}</div>
          <div className="kc-sub">اوج: {reports?.total_sale?.toLocaleString("fa-IR")}</div>
        </div>
        <div className="kc">
          <div className="kc-icon">⏳</div>
          <div className="kc-label">Runway</div>
          <div className="kc-val">-</div>
          <div className="kc-sub">{/* <span className="tag dn">بحرانی</span> هزینه: ۱,۵۰۰م/ماه */}</div>
        </div>
      </div>

      <div className="kg4">
        <div className="kc p">
          <div className="kc-icon">👷</div>
          <div className="kc-label">مشارکت‌کنندگان گروپلنسینگ</div>
          <div className="kc-val p">{dashboardData?.income_participants} نفر</div>
          <div className="kc-sub">در یکماه</div>
        </div>
        <div className="kc b">
          <div className="kc-icon">📚</div>
          <div className="kc-label">دوره‌های فروخته (تجمیعی)</div>
          <div className="kc-val b">{totalSold?.count}</div>
          {/* <div className="kc-sub">
            <span className="tag up">+۲۸ این ماه</span>
          </div> */}
        </div>
        <div className="kc c">
          <div className="kc-icon">💎</div>
          <div className="kc-label">نسبت هزینه به درآمد</div>
          <div className="kc-val r">-</div>
        </div>
        <div className="kc g">
          <div className="kc-icon">🏦</div>
          <div className="kc-label">کل نقدینگی (ریالی)</div>
          <div className="kc-val g">-</div>
          <div className="kc-sub">{/* <span className="tag nt">۶ ماه runway</span> */}</div>
        </div>
      </div>

      <Stack direction={"row"} gap={2}>
        <Card title="روند درامد دلاری - ۶ ماه اخیر"></Card>
        <Card title="تقسیم درآمد گروپلنسینگ">
          {/* <div className="cb">
            <div className="ri">
              <div className="rl">مجریان پروژه (۷۰٪)</div>
              <div className="rv r">$28,000</div>
            </div>
            <div className="ri">
              <div className="rl">صراف (۵٪)</div>
              <div className="rv r">$2,000</div>
            </div>
            <div className="ri">
              <div className="rl">سهم تکانش (۵٪)</div>
              <div className="rv b">$2,000</div>
            </div>
            <div className="ri">
              <div className="rl">سهم منتورها (۵٪)</div>
              <div className="rv p">$2,000</div>
            </div>
            <div className="ri">
              <div className="rl" style={{ fontWeight: 700, color: "var(--t1)" }}>
                خالص گروپلنسینگ
              </div>
              <div className="rv g">$6,000</div>
            </div>
            <div className="pb-wrap" style={{ marginTop: "12px" }}>
              <div className="pb-labels">
                <span>فعلی $40K</span>
                <span>هدف $150K</span>
              </div>
              <div className="pb">
                <div
                  className="pb-fill"
                  style={{ width: "27%", background: "linear-gradient(90deg,var(--yellow),var(--green))" }}
                ></div>
              </div>
            </div>
          </div> */}
        </Card>
      </Stack>

      <Stack direction={"row"} gap={2}>
        <Card title="نقدینگی ولت‌ها">
          {/* <div className="cb">
            <div className="ri">
              <div className="rl">ولت ریالی</div>
              <div className="rv g">۹,۰۰۰ میلیون</div>
            </div>
          </div> */}
        </Card>
      </Stack>

      <Backdrop open={loading}>
        <CircularProgress color="primary" size={64} thickness={4} />
      </Backdrop>
    </div>
  );
}
