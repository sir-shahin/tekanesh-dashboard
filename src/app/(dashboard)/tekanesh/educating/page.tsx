"use client";
import Card from "@/components/card";
import { ReportItem } from "@/schemas";
import { axiosInstance } from "@/utils/axios";
import { Autocomplete, Box, Button, Grid, Stack, TextField, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useQuery } from "@tanstack/react-query";
import moment from "moment-jalaali";
import { useEffect, useState } from "react";

export default function MarketingPage() {
  const [start, setStart] = useState<null | string>("");
  const [end, setEnd] = useState<null | string>("");
  const [search, setSearch] = useState<string[]>([]);
  const [list, setList] = useState<{ value: string; label: string }[]>([]);

  //
  const {
    data: teacherData,
    isLoading,
    isFetching,
    isPending,
    isRefetching,
    refetch,
  } = useQuery({
    queryKey: ["get-teacher-reports"],
    queryFn: async () => {
      const selectedTeachers = search.map((uuid) => `&teacher=${uuid}`).join("");
      const { data } = await axiosInstance.get(
        `https://etekanesh.com/api/boshri/reports/teacher-summary/?${selectedTeachers}&from_date=${start}&to_date=${end}`,
      );
      return data.data;
    },
    staleTime: 60000,
    retry: false,
  });

  const handleReset = () => {
    setStart("");
    setEnd("");
    setSearch([]);
  };

  useEffect(() => {
    if (!isLoading && teacherData) {
      const _list = [...teacherData?.teachers];
      setList(
        _list?.map((item: { uuid: string; name: string }) => ({
          value: item.uuid,
          label: item.name,
        })),
      );
    }
  }, [isLoading]);

  const handleFilter = () => {
    refetch();
  };

  return (
    <>
      <div className="page active">
        <div className="ph">
          <div>
            <div className="ph-title">دپارتمان آموزش</div>
          </div>
        </div>
      </div>

      <Box borderRadius={3} bgcolor={"#080d14"} py={3} mb={3} px={2} minHeight={"0 !important"}>
        <Box mb={3} maxWidth={1400}>
          <Typography gutterBottom fontSize={13}>
            مدرس‌ها را انتخاب کنید
          </Typography>
          <Stack direction={"row"} gap={2}>
            <Autocomplete
              multiple
              fullWidth
              disableClearable
              disableCloseOnSelect
              options={list}
              sx={{ textAlign: "right" }}
              value={list.filter((item) => search.includes(item.value))}
              isOptionEqualToValue={(option, _value) => option?.value === _value?.value}
              onChange={(_, value) => {
                const selectedValues = value.map((item) => item.value);
                setSearch(selectedValues);
              }}
              renderInput={(params) => <TextField dir="rtl" {...params} />}
            />
            <Button sx={{ minWidth: 100 }} onClick={handleReset}>
              ⊗ حذف فیلتر
            </Button>
          </Stack>
        </Box>
        <Stack direction={"row"} columnGap={2} alignItems={"center"} maxWidth={1400}>
          <DatePicker
            label="از تاریخ"
            value={start ? moment(start, "jYYYY-jMM-jDD") : null}
            onChange={(v) => setStart(moment(v).format("jYYYY-jMM-jDD").toString())}
            sx={{ width: "100%", direction: "ltr" }}
          />
          <DatePicker
            label="تا تاریخ"
            value={end ? moment(end, "jYYYY-jMM-jDD") : null}
            onChange={(v) => setEnd(moment(v).format("jYYYY-jMM-jDD").toString())}
            sx={{ width: "100%", direction: "ltr" }}
          />

          <Button
            loading={isLoading || isFetching || isPending || isRefetching}
            fullWidth
            onClick={handleFilter}
            variant="contained"
          >
            اعمال فیلتر
          </Button>
        </Stack>
      </Box>

      <Grid container spacing={2} mb={3}>
        <Grid size={3} className="kg">
          <div className="kc r">
            <div className="kc-label"> مجموع درآمد</div>
            <div className="kc-val r">
              {teacherData?.reports.reduce((sum: number, item: ReportItem) => sum + item.students_total_income, 0)}
            </div>
          </div>
        </Grid>
        <Grid size={3} className="kg">
          <div className="kc g">
            <div className="kc-label"> مجموع سهم مدرس‌ها</div>
            <div className="kc-val g">
              {teacherData?.reports.reduce((sum: number, item: ReportItem) => sum + item.teacher_share, 0)}
            </div>
          </div>
        </Grid>
        <Grid size={3} className="kg">
          <div className="kc b">
            <div className="kc-label"> مجموع دانشجو</div>
            <div className="kc-val b">
              {teacherData?.reports.reduce((sum: number, item: ReportItem) => sum + item.students_count, 0)}
            </div>
          </div>
        </Grid>
        <Grid size={3} className="kg">
          <div className="kc y">
            <div className="kc-label"> دانشجویان با حساب</div>
            <div className="kc-val y">
              {teacherData?.reports.reduce(
                (sum: number, item: ReportItem) => sum + item.with_account_students_count,
                0,
              )}
            </div>
          </div>
        </Grid>
        <Grid size={3} className="kg">
          <div className="kc b">
            <div className="kc-label"> دانشجویان با درآمد</div>
            <div className="kc-val b">
              {teacherData?.reports.reduce((sum: number, item: ReportItem) => sum + item.with_income_students_count, 0)}
            </div>
          </div>
        </Grid>
        <Grid size={3} className="kg">
          <div className="kc r">
            <div className="kc-label"> دانشجویان اولین درآمد</div>
            <div className="kc-val r">
              {teacherData?.reports.reduce(
                (sum: number, item: ReportItem) => sum + item.first_income_students_count,
                0,
              )}
            </div>
          </div>
        </Grid>
        <Grid size={3} className="kg">
          <div className="kc p">
            <div className="kc-label">مجموع وبینارها</div>
            <div className="kc-val p">
              {teacherData?.reports.reduce((sum: number, item: ReportItem) => sum + item.total_webinars_in_month, 0)}
            </div>
          </div>
        </Grid>
      </Grid>
      {/* Table */}
      <Box>
        <Card title="جدول کامل داده‌ها">
          <Box sx={{ overflowX: "auto" }}>
            <table className="tbl" style={{ minWidth: 600 }}>
              <thead>
                <tr>
                  <th>نام مدرس</th>
                  <th> تعداد دانشجو</th>
                  <th> دانشجویان با حساب</th>
                  <th> تعداد درخواست اکانت</th>
                  <th>دانشجویان با درامد</th>
                  <th>دانشجویان اولین درآمد </th>
                  <th>نرخ ثبت‌نام به اکانت</th>
                  <th>نرخ اکانت به درآمد</th>
                  <th>درآمد کل ($)</th>
                  <th>سهم مدرس</th>
                  <th>تعداد وبینارها</th>
                </tr>
              </thead>
              <tbody>
                {teacherData?.reports.map((item: ReportItem, i: number) => (
                  <tr key={i}>
                    <td className="rv">{item.teacher_name || "-"}</td>
                    <td className="rv">{item.students_count}</td>
                    <td className="rv">{item.with_account_students_count}</td>
                    <td className="rv">{item.with_requested_for_account_students_count}</td>
                    <td className="rv">{item.with_income_students_count}</td>
                    <td className="rv">{item.first_income_students_count}</td>
                    <td className="rv">{item.register_to_account_rate}</td>
                    <td className="rv">{item.account_to_income_rate}</td>
                    <td className="rv">{item.students_total_income}</td>
                    <td className="rv">{item.teacher_share}</td>
                    <td className="rv">{item.total_webinars_in_month}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Box>
        </Card>
      </Box>
    </>
  );
}
