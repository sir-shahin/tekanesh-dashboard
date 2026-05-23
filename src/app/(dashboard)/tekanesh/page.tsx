import Card from "@/components/card";
import { Box, Stack } from "@mui/material";

export default function Page() {
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
            <div className="kc-val g">5م</div>
            <div className="kc-sub">↓ ۹۷٪ از اوج</div>
          </div>
        </Box>
        <Box className="kg" flex={1}>
          <div className="kc g">
            <div className="kc-label">اوج فروش</div>
            <div className="kc-val g">5م</div>
            <div className="kc-sub">شرایط عادی (دی)</div>
          </div>
        </Box>
        <Box className="kg" flex={1}>
          <div className="kc g">
            <div className="kc-label">دانشجوی فعال این ماه</div>
            <div className="kc-val g">5</div>
            <div className="kc-sub"> ↓ از ۳۸۰ اوج</div>
          </div>
        </Box>
        <Box className="kg" flex={1}>
          <div className="kc g">
            <div className="kc-label">دانشجوی جدید</div>
            <div className="kc-val g">5</div>
            <div className="kc-sub"> این ماه</div>
          </div>
        </Box>
      </Stack>

      <Stack direction={"row"} gap="2" mb={3}>
        <Box className="kg" flex={1}>
          <div className="kc g">
            <div className="kc-label"> نرخ ریزش دانشجو</div>
            <div className="kc-val g">5</div>
            <div className="kc-sub">بالاتر از حد مجاز</div>
          </div>
        </Box>
        <Box className="kg" flex={1}>
          <div className="kc g">
            <div className="kc-label"> نرخ تکمیل دوره</div>
            <div className="kc-val g">58%</div>
            <div className="kc-sub"> هدف: ۷۵٪</div>
          </div>
        </Box>
        <Box className="kg" flex={1}>
          <div className="kc g">
            <div className="kc-label"> مدرس فعال</div>
            <div className="kc-val g">5</div>
            <div className="kc-sub"> از ۱۱ مدرس ثبت‌نام</div>
          </div>
        </Box>
        <Box className="kg" flex={1}>
          <div className="kc g">
            <div className="kc-label">میانگین رضایت</div>
            <div className="kc-val g">۷.۲/۱۰</div>
            <div className="kc-sub"> از نظرسنجی دانشجویان</div>
          </div>
        </Box>
      </Stack>

      <Stack direction={"row"} gap={2} mb={3}>
        <Box className="kg" flex={1}>
          <div className="kc g">
            <div className="kc-label"> دوره‌های فروخته (تجمیعی)</div>
            <div className="kc-val g">۷</div>
            <div className="kc-sub">کل تاریخ </div>
          </div>
        </Box>
        <Box className="kg" flex={1}>
          <div className="kc g">
            <div className="kc-label"> درآمد از گروپلنسینگ</div>
            <div className="kc-val g">2000$</div>
            <div className="kc-sub"> ۵٪ + مازاد منتور</div>
          </div>
        </Box>
        <Box className="kg" flex={1}>
          <div className="kc g">
            <div className="kc-label"> بیشترین فروش — یک دوره</div>
            <div className="kc-val g">180 م</div>
            <div className="kc-sub"> دوره برندسازی</div>
          </div>
        </Box>
        <Box className="kg" flex={1}>
          <div className="kc g">
            <div className="kc-label"> درآمد به ازای هر مدرس</div>
            <div className="kc-val g">180 م</div>
            <div className="kc-sub"> میانگین ماهانه</div>
          </div>
        </Box>
      </Stack>

      <Stack direction={"row"} gap={2}>
        <Card title="دوره‌ها — عملکرد جزئی" />
        <Card title="مدرس‌ها و منتورها" />
      </Stack>
    </div>
  );
}
