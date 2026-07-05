"use client";
import Card from "@/components/card";
import { Autocomplete, Box, Button, Grid, Stack, TextField, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import moment from "moment-jalaali";
import { useState } from "react";

const attendanceItems = [
  {
    value: 111,
    label: "الهام محمدی",
  },
  {
    value: 222,
    label: "تیدا گودرزی",
  },
];
export default function MarketingPage() {
  const [start, setStart] = useState<null | string>();
  const [end, setEnd] = useState<null | string>();
  const [search, setSearch] = useState<number[]>([]);

  const handleFilter = () => {};
  const handleReset = () => {
    setStart("");
    setEnd("");
    setSearch([]);
  };
  return (
    <>
      <div className="page active">
        <div className="ph">
          <div>
            <div className="ph-title">دپارتمان بازاریابی</div>
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
              options={attendanceItems}
              sx={{ textAlign: "right" }}
              value={attendanceItems.filter((item) => search.includes(Number(item.value)))}
              isOptionEqualToValue={(option, _value) => option?.value === _value?.value}
              onChange={(_, value) => {
                const selectedValues = value.map((item) => Number(item.value));
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

          <Button fullWidth onClick={handleFilter} variant="contained">
            اعمال فیلتر
          </Button>
        </Stack>
      </Box>

      <Grid container spacing={2} mb={3}>
        <Grid size={3} className="kg">
          <div className="kc r">
            <div className="kc-label"> مجموع درآمد</div>
            <div className="kc-val r">{20}</div>
          </div>
        </Grid>
        <Grid size={3} className="kg">
          <div className="kc g">
            <div className="kc-label"> مجموع سهم مدرس‌ها</div>
            <div className="kc-val g">{20}</div>
          </div>
        </Grid>
        <Grid size={3} className="kg">
          <div className="kc b">
            <div className="kc-label"> مجموع دانشجو</div>
            <div className="kc-val b">{20}</div>
          </div>
        </Grid>
        <Grid size={3} className="kg">
          <div className="kc y">
            <div className="kc-label"> دانشجویان با حساب</div>
            <div className="kc-val y">{20}</div>
          </div>
        </Grid>
        <Grid size={3} className="kg">
          <div className="kc b">
            <div className="kc-label"> دانشجویان با درآمد</div>
            <div className="kc-val b">{20}</div>
          </div>
        </Grid>
        <Grid size={3} className="kg">
          <div className="kc r">
            <div className="kc-label"> دانشجویان اولین درآمد</div>
            <div className="kc-val r">{20}</div>
          </div>
        </Grid>
        <Grid size={3} className="kg">
          <div className="kc p">
            <div className="kc-label">مجموع وبینارها</div>
            <div className="kc-val p">{20}</div>
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
                  <th>نرخ اکانت به درآمد</th>
                  <th>درآمد کل ($)</th>
                  <th>سهم مدرس</th>
                  <th>تعداد وبینارها</th>
                </tr>
              </thead>
              <tbody>
                {[].map((item, i) => (
                  <tr key={i}>
                    <td className="rv"></td>
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
