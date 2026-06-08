"use client";
import Card from "@/components/card";
import { axiosInstance } from "@/utils/axios";
import { Backdrop, Box, Button, CircularProgress, Stack, Tab, Tabs, TextField } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import moment from "moment-jalaali";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

interface TabPanelProps {
  children?: React.ReactNode;
  value: number;
  index: number;
}

export default function Page() {
  const [start, setStart] = useState<null | string>(moment().startOf("jMonth").format("jYYYY/jMM/jDD"));
  const [end, setEnd] = useState<null | string>(moment().format("jYYYY/jMM/jDD"));
  const [loading, setLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [hint, setHint] = useState("");
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleResetDate = () => {
    setStart("");
    setEnd("");
    setTimeout(() => {
      activeProcessUsersRefetch();
      partnerIncomeRefetch();
      totalSalesRefetch();
      topTecherRefetch();
      topCourseRefetch();
      revenuePerTeacherRefetch();
      newStudentsRefetch();
    }, 1000);
  };
  const handleFilter = async () => {
    if (!end || !start) {
      setHint("بازه را مشخص کنید");
      return;
    }
    setBtnLoading(true);
    await newStudentsRefetch();
    await revenuePerTeacherRefetch();
    await topCourseRefetch();
    await topTecherRefetch();
    await totalSalesRefetch();
    await activeProcessUsersRefetch();
    await partnerIncomeRefetch();
    setBtnLoading(false);
  };

  //
  const { data: bestSaleOfMonth, isLoading: l1 } = useQuery({
    queryKey: ["get-bestsaleofmonth"],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/reports/?action=best_sale_in_month_in_last_year`);
      return data.data;
    },
    staleTime: 60000,
  });
  //
  const {
    data: totalSales,
    isLoading: l0,
    refetch: totalSalesRefetch,
  } = useQuery({
    queryKey: ["get-total-sales"],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/reports/?action=total_sales&start=${start}&end=${end}`);
      return data.data;
    },
    staleTime: 60000,
  });

  //
  const {
    data: newStudents,
    isLoading: l3,
    refetch: newStudentsRefetch,
  } = useQuery({
    queryKey: ["get-new-stu"],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/student-reports/?action=new_students&start=${start}&end=${end}`);
      return data.data;
    },
    staleTime: 60000,
  });
  //
  const {
    data: topCourse,
    isLoading: l4,
    refetch: topCourseRefetch,
  } = useQuery({
    queryKey: ["get-top-course"],
    queryFn: async () => {
      const { data } = await axiosInstance.get(
        `/top-seller/?action=top_selling_course_by_revenue&start=${start}&end=${end}`,
      );
      return data.data;
    },
    staleTime: 60000,
  });
  //

  const {
    data: topTecher,
    isLoading: l11,
    refetch: topTecherRefetch,
  } = useQuery({
    queryKey: ["get-top-teacher"],
    queryFn: async () => {
      const { data } = await axiosInstance.get(
        `/top-seller/?action=top_selling_course_by_count&start=${start}&end=${end}`,
      );
      return data.data;
    },
    staleTime: 60000,
  });
  //
  const { data: totalSold, isLoading: l6 } = useQuery({
    queryKey: ["get-total-sold"],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/total-course-sold/?action=total_courses_sold`);
      return data.data;
    },
    staleTime: 60000,
  });
  //
  const {
    data: revenuePerTeacher,
    isLoading: l7,
    refetch: revenuePerTeacherRefetch,
  } = useQuery({
    queryKey: ["get-rev-teacher"],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/revenue-report/?action=revenue_per_teacher&start=${start}&end=${end}`);
      return data.data;
    },
    staleTime: 60000,
  });
  //
  const { data: completedStudents, isLoading: l8 } = useQuery({
    queryKey: ["get-completed-stu"],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/student-reports/?action=completed_students_count`);
      return data.data;
    },
    staleTime: 60000,
  });
  //
  const { data: courses, isLoading: l9 } = useQuery({
    queryKey: ["get-courses-list"],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/course-list/?action=courses_report`);
      return data.data;
    },
    staleTime: 60000,
  });
  //
  const toApiDate = (date: string | null) => (date ?? "").replace(/\//g, "-");

  const {
    data: activeProcessUsers,
    refetch: activeProcessUsersRefetch,
    isLoading: l12,
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

  const {
    data: partnerIncome,
    refetch: partnerIncomeRefetch,
    isLoading: l13,
  } = useQuery({
    queryKey: ["get-partner-income-tekanesh"],
    queryFn: async () => {
      const { data } = await axiosInstance.get(
        `https://api.grouplancing.com/dashboard/api/dashboard/income-stats/?start_date=${toApiDate(start)}&end_date=${toApiDate(end)}`,
      );
      return data;
    },
    staleTime: 60000,
  });

  const { data: teachers, isLoading: l10 } = useQuery({
    queryKey: ["get-teachers"],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/teacher-list/?action=teachers_report`);
      return data.data;
    },
    staleTime: 60000,
  });

  useEffect(() => {
    if (
      l0 == false &&
      l1 == false &&
      l3 == false &&
      l4 == false &&
      l6 == false &&
      l7 == false &&
      l8 == false &&
      l9 == false &&
      l10 == false &&
      l12 == false &&
      l11 == false &&
      l13 == false
    ) {
      setLoading(false);
    } else setLoading(true);
  }, [l0, l1, l3, l4, l6, l7, l8, l9, l10, l11, l12, l13]);

  return (
    <div className="page active">
      <div className="ph">
        <div>
          <div className="ph-title">تکانش</div>
          <div className="ph-sub">بستر آموزش</div>
        </div>
      </div>

      <Box borderRadius={3} bgcolor={"#080d14"} py={3} mb={3} px={2} minHeight={"0 !important"}>
        <Stack direction={"row"} columnGap={2} alignItems={"center"} maxWidth={1400}>
          <DatePicker
            label="تا تاریخ"
            value={start ? moment(start, "jYYYY/jMM/jDD") : null}
            onChange={(v) => setStart(moment(v).format("jYYYY/jMM/jDD").toString())}
            sx={{ width: "100%", direction: "ltr" }}
          />
          <DatePicker
            label="تا تاریخ"
            value={end ? moment(end, "jYYYY/jMM/jDD") : null}
            onChange={(v) => setEnd(moment(v).format("jYYYY/jMM/jDD").toString())}
            sx={{ width: "100%", direction: "ltr" }}
          />

          <Button fullWidth loading={btnLoading} onClick={handleFilter} variant="contained">
            اعمال فیلتر
          </Button>

          <Button sx={{ minWidth: 100 }} onClick={handleResetDate}>
            حذف تاریخ
          </Button>
        </Stack>
        <p style={{ fontSize: 10, color: "red", textAlign: "center" }}>{hint}</p>
      </Box>

      <Stack direction={"row"} gap={2} mb={3}>
        <Box className="kg" flex={1}>
          <div className="kc r">
            <div className="kc-label">فروش کل</div>
            <div className="kc-val r">{totalSales?.total != null ? totalSales.total.toLocaleString("fa-IR") : "-"}</div>
            <div className="kc-sub">پرداخت شده</div>
          </div>
        </Box>
        <Box className="kg" flex={1}>
          <div className="kc g">
            <div className="kc-label">اوج فروش (بهترین ماه سال گذشته)</div>
            <div className="kc-val g">
              {bestSaleOfMonth?.total_sale != null ? bestSaleOfMonth.total_sale.toLocaleString("fa-IR") : "-"}
            </div>
            <div className="kc-sub">{bestSaleOfMonth?.month_name + " " + bestSaleOfMonth?.year}</div>
          </div>
        </Box>
        <Box className="kg" flex={1}>
          <div className="kc b">
            <div className="kc-label">دانشجوی فعال </div>
            <div className="kc-val b">{activeProcessUsers?.users_count ?? "-"}</div>
            {/* <div className="kc-sub"> ↓ از ۳۸۰ اوج</div> */}
          </div>
        </Box>
        <Box className="kg" flex={1}>
          <div className="kc p">
            <div className="kc-label">دانشجوی جدید </div>
            <div className="kc-val p">{newStudents?.count}</div>
          </div>
        </Box>
      </Stack>

      <Stack direction={"row"} gap={2} mb={3}>
        <Box className="kg" flex={1}>
          <div className="kc r">
            <div className="kc-label">درآمد دلاری تکانش</div>
            <div className="kc-val r">{partnerIncome?.partner_gross_income ?? "-"}</div>
          </div>
        </Box>
        <Box className="kg" flex={1}>
          <div className="kc y">
            <div className="kc-label">دانشجو فارق التحصیل (کل)</div>
            <div className="kc-val y">{completedStudents?.count}</div>
            <div className="kc-sub"> هدف: -٪</div>
          </div>
        </Box>
        <Box className="kg" flex={1}>
          <div className="kc r">
            <div className="kc-label"> مدرس فعال</div>
            <div className="kc-val r">{revenuePerTeacher?.teachers_count}</div>
            <div className="kc-sub"> تعداد کل</div>
          </div>
        </Box>
        <Box className="kg" flex={1}>
          <div className="kc y">
            <div className="kc-label">میانگین رضایت</div>
            <div className="kc-val y">-</div>
            <div className="kc-sub"> از نظرسنجی دانشجویان</div>
          </div>
        </Box>
      </Stack>

      <Stack direction={"row"} gap={2} mb={3}>
        <Box className="kg" flex={1}>
          <div className="kc b">
            <div className="kc-label"> دوره‌های فروخته </div>
            <div className="kc-val b">{totalSold?.count}</div>
          </div>
        </Box>
        <Box className="kg" flex={1}>
          <div className="kc g">
            <div className="kc-label"> پرفروش ترین دوره </div>
            <div className="kc-val g" style={{ fontSize: 18 }}>
              {topCourse?.course.name}
            </div>
            <div className="kc-sub">
              {topCourse?.total_sales != null ? topCourse.total_sales.toLocaleString("fa-IR") : "-"} تومان
            </div>
          </div>
        </Box>
        <Box className="kg" flex={1}>
          <div className="kc y">
            <div className="kc-label">مدرس پرفروش </div>
            <div className="kc-val y" style={{ fontSize: 18 }}>
              {topTecher?.teacher.name}
            </div>
          </div>
        </Box>
        <Box className="kg" flex={1}>
          <div className="kc p">
            <div className="kc-label"> درآمد به ازای هر مدرس</div>
            <div className="kc-val p">
              {revenuePerTeacher?.revenue_per_teacher != null
                ? revenuePerTeacher.revenue_per_teacher.toLocaleString("fa-IR")
                : "-"}
            </div>
            <div className="kc-sub"> میانگین </div>
          </div>
        </Box>
      </Stack>

      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={value} onChange={handleChange}>
            <Tab label="دوره‌ها | عملکرد جزئی" />
            <Tab label="مدرس‌ها و منتورها" />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Box sx={{ overflowX: "auto" }}>
            <table className="tbl" style={{ minWidth: 300 }}>
              <thead>
                <tr>
                  <th>نام دوره</th>
                  <th>فروش ماه</th>
                  <th>تجمیعی</th>
                  <th>قیمت</th>
                  <th>تکمیل</th>
                  <th>وضعیت</th>
                </tr>
              </thead>
              <tbody>
                {courses?.map(
                  (course: {
                    title: string;
                    last_month_sales: string;
                    total_sales: string;
                    current_price: string;
                    completion_rate: string;
                    is_soldout: string;
                    id: number;
                  }) => (
                    <tr style={{ fontSize: 12 }} key={course.id}>
                      <td style={{ color: "var(--t1)" }}>{course.title}</td>
                      <td style={{ color: "var(--green)" }}>{course.last_month_sales}</td>
                      <td>{course.total_sales}</td>
                      <td>{course.current_price}</td>
                      <td>
                        <span className="tag up">{course.completion_rate}٪</span>
                      </td>
                      <td>
                        <span className="badge g">{courses.is_soldout ? "غ فعال" : "فعال"}</span>
                      </td>
                    </tr>
                  ),
                )}
              </tbody>
            </table>
          </Box>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Box sx={{ overflowX: "auto" }}>
            <table className="tbl" style={{ minWidth: 300 }}>
              <thead>
                <tr>
                  <th>نام </th>
                  <th> حوزه</th>
                  <th>سهم</th>
                  <th>درامد م</th>
                  <th>رضایت</th>
                </tr>
              </thead>
              <tbody>
                {teachers?.map(
                  (Teacher: { id: number; name: string; courses: { title: string }[]; total_income: string }) => (
                    <tr style={{ fontSize: 12 }} key={Teacher.id}>
                      <td style={{ color: "var(--t1)" }}>{Teacher.name}</td>
                      <td style={{ color: "var(--green)" }}>
                        {Teacher?.courses.map((c: { title: string }) => (
                          <span key={c.title}>
                            <span>{c.title}</span>
                            <span> - </span>
                          </span>
                        ))}
                      </td>
                      <td>-</td>
                      <td>{Teacher.total_income}</td>
                      <td>
                        <span className="tag up">-</span>
                      </td>
                    </tr>
                  ),
                )}
              </tbody>
            </table>
          </Box>
        </TabPanel>
      </Box>

      <Backdrop open={loading}>
        <CircularProgress color="primary" size={64} thickness={4} />
      </Backdrop>
    </div>
  );
}

function TabPanel({ children, value, index }: TabPanelProps) {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}
