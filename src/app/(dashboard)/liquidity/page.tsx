import Card from "@/components/card";
import { Box, Stack } from "@mui/material";

export default function Page() {
  return (
    <div className="page active">
      <div className="ph">
        <div>
          <div className="ph-title">نقدینگی و مالی</div>
          <div className="ph-sub">وضعیت مالی</div>
        </div>
      </div>
      <Stack direction={"row"} gap={2} mb={3}>
        <Box className="kg" flex={1}>
          <div className="kc g">
            <div className="kc-label">ولت ریالی</div>
            <div className="kc-val g">500م</div>
            <div className="kc-sub">موجودی فعلی</div>
          </div>
        </Box>
        <Box className="kg" flex={1}>
          <div className="kc g">
            <div className="kc-label"> ولت دلاری / USDT</div>
            <div className="kc-val g">500$</div>
            <div className="kc-sub"> معادل ~۴۵۰ م</div>
          </div>
        </Box>
        <Box className="kg" flex={1}>
          <div className="kc g">
            <div className="kc-label"> Burn Rate واقعی</div>
            <div className="kc-val g">150م</div>
            <div className="kc-sub"> کسری خالص ماهانه</div>
          </div>
        </Box>
        <Box className="kg" flex={1}>
          <div className="kc g">
            <div className="kc-label"> Runway</div>
            <div className="kc-val g">6ماه</div>
            <div className="kc-sub"> بر اساس موجودی فعلی</div>
          </div>
        </Box>
      </Stack>

      <Stack direction={"row"} gap={2}>
        <Box flex={1}>
          <Card title="صورت سود و زیان ماهان">
            <div className="cb">
              <div>درآمدها</div>
              <div className="ri">
                <div className="rl">گروپلنسینگ (خالص)</div>
                <div className="rv g">+$6,000 (~۵۴۰م)</div>
              </div>
              <div className="ri">
                <div className="rl">فروش تکانش</div>
                <div className="rv g">+۵۰ م</div>
              </div>
              <div className="ri">
                <div className="rl">جمع درآمد</div>
                <div className="rv g">~+۵۹۰ م</div>
              </div>
              <div className="sdiv"></div>
              <div>هزینه‌ها</div>
              <div className="ri">
                <div className="rl">حقوق (۳۵ نفر)</div>
                <div className="rv r">-۱,۰۰۰ م</div>
              </div>
              <div className="ri">
                <div className="rl">اجاره و زیرساخت</div>
                <div className="rv r">-۳۰۰ م</div>
              </div>
              <div className="ri">
                <div className="rl">بیمه و مالیات</div>
                <div className="rv r">-۱۲۰ م</div>
              </div>
              <div className="ri">
                <div className="rl">ابزار و نرم‌افزار</div>
                <div className="rv r">-۵۰ م</div>
              </div>
              <div className="ri">
                <div className="rl">متفرقه</div>
                <div className="rv r">-۳۰ م</div>
              </div>
              <div className="ri">
                <div className="rl">جمع هزینه</div>
                <div className="rv r">-۱,۵۰۰ م</div>
              </div>
              <div className="sdiv"></div>
              <div className="ri">
                <div className="rl">کسری خالص ماهانه</div>
                <div className="rv r">-۹۱۰ م</div>
              </div>
            </div>
          </Card>
        </Box>

        <Box flex={1}>
          <Card title="نسبت‌های مالی کلیدی">
            <div className="cb">
              <div className="ri">
                <div className="rl">نسبت هزینه به درآمد</div>
                <div className="rv r">۲۵۴٪ ⚠️</div>
              </div>
              <div className="ri">
                <div className="rl">نسبت ارزی (دلار/ریال)</div>
                <div className="rv y">۶۵/۳۵</div>
              </div>
              <div className="ri">
                <div className="rl">درآمد به ازای هر نفر</div>
                <div className="rv y">$1,143</div>
              </div>
              <div className="ri">
                <div className="rl">هزینه به ازای هر نفر</div>
                <div className="rv r">۴۲.۸ م</div>
              </div>
              <div className="ri">
                <div className="rl">MoM رشد درآمد</div>
                <div className="rv g">+۲۳٪</div>
              </div>
            </div>
          </Card>
          <Card title="در صورت بازگشت به عادی" />
        </Box>
      </Stack>
    </div>
  );
}
