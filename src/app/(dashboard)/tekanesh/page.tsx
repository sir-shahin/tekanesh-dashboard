"use client";
import Card from "@/components/card";
import { axiosInstance } from "@/utils/axios";
import { Box, Button, Stack, TextField } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function Page() {
  const [start, setStart] = useState<null | string>("");
  const [end, setEnd] = useState<null | string>("");

  const handleResetDate = () => {
    setStart("");
    setEnd("");
    getTopCourseRefetch();
  };
  const handleFilter = () => {
    getTopCourseRefetch();
  };

  //
  const { data: bestSaleOfMonth } = useQuery({
    queryKey: ["get-bestsaleofmonth"],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/reports/?action=best_sale_in_month_in_last_year`);
      return data.data;
    },
    staleTime: 60000,
  });
  //
  const { data: activeStudents } = useQuery({
    queryKey: ["get-active-stu"],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/student-reports/?action=active_students`);
      return data.data;
    },
    staleTime: 60000,
  });
  //
  const { data: newStudents } = useQuery({
    queryKey: ["get-new-stu"],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/student-reports/?action=new_students`);
      return data.data;
    },
    staleTime: 60000,
  });
  //
  const { data: topCourse } = useQuery({
    queryKey: ["get-top-course"],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/top-seller/?action=top_selling_course_by_teacher`);
      return data.data;
    },
    staleTime: 60000,
  });
  //
  const { data: topCoursePeriod, refetch: getTopCourseRefetch } = useQuery({
    queryKey: ["get-top-course-period"],
    queryFn: async () => {
      const { data } = await axiosInstance.get(
        `/top-seller/?action=top_selling_course_by_teacher&start=${start}&end=${end}`,
      );
      return data.data;
    },
    staleTime: 60000,
  });
  //
  const { data: totalSold } = useQuery({
    queryKey: ["get-total-sold"],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/total-course-sold/?action=total_courses_sold`);
      return data.data;
    },
    staleTime: 60000,
  });
  //
  const { data: revenuePerTeacher } = useQuery({
    queryKey: ["get-rev-teacher"],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/revenue-report/?action=revenue_per_teacher`);
      return data.data;
    },
    staleTime: 60000,
  });
  //
  const { data: completedStudents } = useQuery({
    queryKey: ["get-completed-stu"],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/student-reports/?action=completed_students_count`);
      return data.data;
    },
    staleTime: 60000,
  });
  //
  const { data: courses } = useQuery({
    queryKey: ["get-courses-list"],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/course-list/?action=courses_report`);
      return data.data;
    },
    staleTime: 60000,
  });
  //
  const { data: teachers } = useQuery({
    queryKey: ["get-teachers"],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/teacher-list/?action=teachers_report`);
      return data.data;
    },
    staleTime: 60000,
  });

  return (
    <div className="page active">
      <div className="ph">
        <div>
          <div className="ph-title">تکانش</div>
          <div className="ph-sub">بستر آموزش</div>
        </div>
      </div>

      <Stack direction={"row"} mb={3} gap={2}>
        <TextField
          value={start}
          onChange={(e) => setStart(e.target.value)}
          size="small"
          label="از تاریخ"
          placeholder="مثال 1405/02/02"
        />
        <TextField
          value={end}
          onChange={(e) => setEnd(e.target.value)}
          size="small"
          label="تا تاریخ"
          placeholder="مثال 1405/02/02"
        />
        <Button onClick={handleFilter} variant="contained" sx={{ height: 40 }}>
          اعمال فیلتر
        </Button>

        <Button onClick={handleResetDate}>حذف تاریخ</Button>
      </Stack>

      <Stack direction={"row"} gap={2} mb={3}>
        <Box className="kg" flex={1}>
          <div className="kc g">
            <div className="kc-label">فروش کل (کل تاریخ)</div>
            <div className="kc-val g">{revenuePerTeacher?.total_revenue.toLocaleString("fa-IR")}</div>
            <div className="kc-sub">پرداخت شده</div>
          </div>
        </Box>
        <Box className="kg" flex={1}>
          <div className="kc g">
            <div className="kc-label">اوج فروش (بهترین ماه سال گذشته)</div>
            <div className="kc-val g">{bestSaleOfMonth?.total_sale.toLocaleString("fa-IR")}</div>
            <div className="kc-sub">{bestSaleOfMonth?.month_name + " " + bestSaleOfMonth?.year}</div>
          </div>
        </Box>
        <Box className="kg" flex={1}>
          <div className="kc g">
            <div className="kc-label">دانشجوی فعال کل تاریخ</div>
            <div className="kc-val g">{activeStudents?.count}</div>
            {/* <div className="kc-sub"> ↓ از ۳۸۰ اوج</div> */}
          </div>
        </Box>
        <Box className="kg" flex={1}>
          <div className="kc g">
            <div className="kc-label">دانشجوی جدید (کل تاریخ)</div>
            <div className="kc-val g">{newStudents?.count}</div>
          </div>
        </Box>
      </Stack>

      <Stack direction={"row"} gap="2" mb={3}>
        <Box className="kg" flex={1}>
          <div className="kc g">
            <div className="kc-label"> نرخ ریزش دانشجو</div>
            <div className="kc-val g">-</div>
            <div className="kc-sub">بالاتر از حد مجاز</div>
          </div>
        </Box>
        <Box className="kg" flex={1}>
          <div className="kc g">
            <div className="kc-label">دانشجو فارق التحصیل (کل)</div>
            <div className="kc-val g">{completedStudents?.count}</div>
            <div className="kc-sub"> هدف: -٪</div>
          </div>
        </Box>
        <Box className="kg" flex={1}>
          <div className="kc g">
            <div className="kc-label"> مدرس فعال</div>
            <div className="kc-val g">{revenuePerTeacher?.teachers_count}</div>
            <div className="kc-sub"> تعداد کل</div>
          </div>
        </Box>
        <Box className="kg" flex={1}>
          <div className="kc g">
            <div className="kc-label">میانگین رضایت</div>
            <div className="kc-val g">-</div>
            <div className="kc-sub"> از نظرسنجی دانشجویان</div>
          </div>
        </Box>
      </Stack>

      <Stack direction={"row"} gap={2} mb={3}>
        <Box className="kg" flex={1}>
          <div className="kc g">
            <div className="kc-label"> دوره‌های فروخته (کل تاریخ)</div>
            <div className="kc-val g">{totalSold?.count}</div>
          </div>
        </Box>
        <Box className="kg" flex={1}>
          <div className="kc g">
            <div className="kc-label"> پرفروش ترین دوره (کل تاریخ)</div>
            <div className="kc-val g" style={{ fontSize: 18 }}>
              {topCourse?.course}
            </div>
            <div className="kc-sub">{topCourse?.total_sales.toLocaleString("fa-IR")} تومان</div>
          </div>
        </Box>
        <Box className="kg" flex={1}>
          <div className="kc g">
            <div className="kc-label">مدرس پرفروش (کل تاریخ)</div>
            <div className="kc-val g" style={{ fontSize: 18 }}>
              {topCoursePeriod?.teacher?.name}
            </div>
          </div>
        </Box>
        <Box className="kg" flex={1}>
          <div className="kc g">
            <div className="kc-label"> درآمد به ازای هر مدرس</div>
            <div className="kc-val g">{revenuePerTeacher?.revenue_per_teacher.toLocaleString("fa-IR")}</div>
            <div className="kc-sub"> میانگین </div>
          </div>
        </Box>
      </Stack>

      <Stack direction={"row"} gap={2}>
        <Card title="دوره‌ها — عملکرد جزئی">
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
        </Card>
        <Card title="مدرس‌ها و منتورها">
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
        </Card>
      </Stack>
    </div>
  );
}
