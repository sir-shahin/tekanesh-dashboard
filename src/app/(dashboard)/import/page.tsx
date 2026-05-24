'use client';

import Card from "@/components/card";
import { Box, Button, Stack, TextField } from "@mui/material";

export default function Page() {

  function handleFile(ev: React.ChangeEvent<HTMLInputElement>){
    if(ev.target.files){
      const f=ev.target.files[0];if(!f)return;
      // const r=new FileReader();r.onload=e=>parseCSV(e.target.result,f.name);r.readAsText(f,'UTF-8');
    }
  }

  function dlCSV(){
    const h='month,dollar_revenue,gross_profit,takanesh_sales,contributors,courses_sold_total,wallet_rial,wallet_dollar,wallet_other';
    const r='1403/04,40000,6000,50,12,350,9000,5000,';
    const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([h+'\n'+r],{type:'text/csv;charset=utf-8;'}));a.download='beshri_monthly.csv';a.click();
  }


  return (
    <div className="page active">
      <div className="ph">
        <div>
          <div className="ph-title">ورود داده ماهانه</div>
          {/* <div className="ph-sub">CSV آپلود</div> */}
        </div>
      </div>

      <Stack direction={'row'} gap={2}>
        <Box flex={1}>
          <Card title="آپلود فایل csv">
            <div className="cb">
              <div className="ibox b"><strong>فرمت ستون‌ها:</strong><br/>
              <Box style={{border: '1px solid #555'}} borderRadius={3} p={2} my={2}>
                <code>month, dollar_revenue, gross_profit, takanesh_sales, contributors, courses_sold_total, wallet_rial, wallet_dollar, wallet_other</code>
              </Box>
            </div>
              <div className="upload" id="upzone">
                <div style={{fontSize:'10px',color:'var(--t3)'}}> کلیک کن برای انتخاب</div>
                <input type="file" accept=".csv" onChange={() =>handleFile} />
              </div>
              <div id="csv-prev"></div>
            </div>
          </Card>
        </Box>

        <Box flex={1}>
            <Card title="ورود دستی">
              <Stack direction={"row"} p={3} gap={3}>
                <Box display={"flex"} flexDirection={"column"} flex={1}>
                  <label>ماه</label>
                  <TextField size="small" fullWidth placeholder="مثل: 1405/01" />
                </Box>
                <Box display={"flex"} flexDirection={"column"} flex={1}>
                  <label>درامد دلاری ($)</label>
                  <TextField size="small" fullWidth type="number" />
                </Box>
              </Stack>

              <Stack direction={"row"} p={3} gap={3}>
                <Box display={"flex"} flexDirection={"column"} flex={1}>
                  <label>سود ناخالص ($)</label>
                  <TextField size="small" fullWidth type="number" />
                </Box>
                <Box display={"flex"} flexDirection={"column"} flex={1}>
                  <label>فروش تکانش (م)</label>
                  <TextField size="small" fullWidth type="number" />
                </Box>
              </Stack>

              <Stack direction={"row"} p={3} gap={3}>
                <Box display={"flex"} flexDirection={"column"} flex={1}>
                  <label>مشارکت‌کنندگان</label>
                  <TextField size="small" fullWidth type="number" />
                </Box>
                <Box display={"flex"} flexDirection={"column"} flex={1}>
                  <label>دوره فروخته (تجمیعی)</label>
                  <TextField size="small" fullWidth type="number" />
                </Box>
              </Stack>
              <Stack direction={"row"} p={3} gap={3}>
                <Box display={"flex"} flexDirection={"column"} flex={1}>
                  <label>ولت ریالی (م)</label>
                  <TextField size="small" fullWidth type="number" />
                </Box>
                <Box display={"flex"} flexDirection={"column"} flex={1}>
                  <label>ولت دلاری ($)</label>
                  <TextField size="small" fullWidth type="number" />
                </Box>
              </Stack>

              <Box p={3} textAlign={"center"}>
                <Button variant="contained" fullWidth>ذخیره این ماه</Button>
              </Box>
            </Card>
        </Box>
        
      </Stack>

      <Card title="دانلود فرمت csv نمونه">
        <Box className="cb" display={'flex'} alignItems={'center'} gap={2}>
          <button className="btn btn-ghost" onClick={dlCSV}>⬇️ دانلود CSV نمونه</button>
          <span style={{fontSize:10}}>هر ماه پر کن و آپلود کن — داشبورد خودکار بروز میشه</span>
        </Box>
      </Card>
    </div>
  );
}
