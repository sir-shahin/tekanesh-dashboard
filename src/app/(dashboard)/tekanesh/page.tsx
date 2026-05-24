"use client";
import Card from "@/components/card";
import { axiosInstance } from "@/utils/axios";
import { Box, Stack } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

export default function Page() {
  //
  const { data: totalSales } = useQuery({
    queryKey: ["get-totalsale"],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/reports/?action=total_sales`);
      return data.data;
    },
    staleTime: 60000,
  });
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
  const { data: topCoursePeriod } = useQuery({
    queryKey: ["get-top-course-period"],
    queryFn: async () => {
      const { data } = await axiosInstance.get(
        `/top-seller/?action=top_selling_course_by_teacher&start=1403/01/01&end=1403/06/30`,
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
      <Stack direction={"row"} gap={2} mb={3}>
        <Box className="kg" flex={1}>
          <div className="kc g">
            <div className="kc-label">فروش ماهانه (فعلی)</div>
            <div className="kc-val g">{totalSales?.total}</div>
            <div className="kc-sub"></div>
          </div>
        </Box>
        <Box className="kg" flex={1}>
          <div className="kc g">
            <div className="kc-label">اوج فروش</div>
            <div className="kc-val g">{bestSaleOfMonth?.total_sale}</div>
            <div className="kc-sub">شرایط عادی</div>
          </div>
        </Box>
        <Box className="kg" flex={1}>
          <div className="kc g">
            <div className="kc-label">دانشجوی فعال این ماه</div>
            <div className="kc-val g">{activeStudents?.count}</div>
            {/* <div className="kc-sub"> ↓ از ۳۸۰ اوج</div> */}
          </div>
        </Box>
        <Box className="kg" flex={1}>
          <div className="kc g">
            <div className="kc-label">دانشجوی جدید</div>
            <div className="kc-val g">{newStudents?.count}</div>
            <div className="kc-sub"> این ماه</div>
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
            <div className="kc-label"> نرخ تکمیل دوره</div>
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
            <div className="kc-label"> دوره‌های فروخته (تجمیعی)</div>
            <div className="kc-val g">{totalSold?.count}</div>
            <div className="kc-sub">کل تاریخ </div>
          </div>
        </Box>
        <Box className="kg" flex={1}>
          <div className="kc g">
            <div className="kc-label"> درآمد از {topCourse?.course}</div>
            <div className="kc-val g">{topCourse?.total_sales}</div>
            <div className="kc-sub"> -٪ + مازاد منتور</div>
          </div>
        </Box>
        <Box className="kg" flex={1}>
          <div className="kc g">
            <div className="kc-label"> بیشترین فروش — یک دوره</div>
            <div className="kc-val g">{topCoursePeriod?.total_sales}</div>
            <div className="kc-sub"> {topCoursePeriod?.course}</div>
          </div>
        </Box>
        <Box className="kg" flex={1}>
          <div className="kc g">
            <div className="kc-label"> درآمد به ازای هر مدرس</div>
            <div className="kc-val g">{revenuePerTeacher?.revenue_per_teacher}</div>
            <div className="kc-sub"> میانگین ماهانه</div>
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
