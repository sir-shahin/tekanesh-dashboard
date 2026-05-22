import Card from "@/components/card";
import { Box, Button, Stack, TextField } from "@mui/material";

export default function Page() {
  return (
    <div className="page active">
      <div className="ph">
        <div>
          <div className="ph-title">ورود داده ماهانه</div>
          <div className="ph-sub">CSV آپلود</div>
        </div>
      </div>

      <Box>
        <Card title="ورود دستی">

          <Stack direction={'row'} p={3} gap={3}>
            <Box display={'flex'} flexDirection={'column'} flex={1}>
              <label>ماه</label>
              <TextField size="small" fullWidth placeholder="مثل: 1405/01"/>
            </Box>
            <Box display={'flex'} flexDirection={'column'} flex={1}>
                <label>درامد دلاری ($)</label>
                <TextField size="small" fullWidth type="number"/>
            </Box>
          </Stack>

          <Stack direction={'row'} p={3} gap={3}>
            <Box display={'flex'} flexDirection={'column'} flex={1}>
              <label>سود ناخالص ($)</label>
              <TextField size="small" fullWidth type="number"/>
            </Box>
            <Box display={'flex'} flexDirection={'column'} flex={1}>
                <label>فروش تکانش (م)</label>
                <TextField size="small" fullWidth type="number"/>
            </Box>
          </Stack>

          <Stack direction={'row'} p={3} gap={3}>
            <Box display={'flex'} flexDirection={'column'} flex={1}>
              <label>مشارکت‌کنندگان</label>
              <TextField size="small" fullWidth type="number"/>
            </Box>
            <Box display={'flex'} flexDirection={'column'} flex={1}>
                <label>دوره فروخته (تجمیعی)</label>
                <TextField size="small" fullWidth type="number"/>
            </Box>
          </Stack>
          <Stack direction={'row'} p={3} gap={3}>
            <Box display={'flex'} flexDirection={'column'} flex={1}>
              <label>ولت ریالی (م)</label>
              <TextField size="small" fullWidth type="number"/>
            </Box>
            <Box display={'flex'} flexDirection={'column'} flex={1}>
                <label>ولت دلاری ($)</label>
                <TextField size="small" fullWidth type="number"/>
            </Box>
          </Stack>

          <Box p={3} textAlign={'center'}>
            <Button variant="contained">ذخیره این ماه</Button>
          </Box>
          
        </Card>
      </Box>
    </div>
  );
}