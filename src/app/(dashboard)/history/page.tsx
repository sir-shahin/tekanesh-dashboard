import Card from "@/components/card";
import { Box, Stack } from "@mui/material";

export default function Page() {
  return (
    <div className="page active">
      <div className="ph">
        <div>
          <div className="ph-title">تاریخچه ماه‌ها</div>
          <div className="ph-sub">مقایسه عملکرد</div>
        </div>
      </div>
      <Stack direction={'row'} gap={2}>
        <div className="kg4" style={{ display: 'flex', width: '100%'}}>
          <div className="kc g">
            <div className="kc-label">بیشترین درامد دلاری</div>
            <div className="kc-val g">۱۵۰۰$</div>
            <div className="kc-sub">دی ۱۴۰۵</div>
          </div>
        </div>
        <div className="kg4" style={{ display: 'flex', width: '100%'}}>
          <div className="kc g">
            <div className="kc-label">میانگین ۶ ماه</div>
            <div className="kc-val g">۱۵۰۰$</div>
            <div className="kc-sub">دی ۱۴۰۵</div>
          </div>
        </div>
        <div className="kg4" style={{ display: 'flex', width: '100%'}}>
          <div className="kc g">
            <div className="kc-label">کمترین درآمد</div>
            <div className="kc-val g">۱۵۰۰$</div>
            <div className="kc-sub">دی ۱۴۰۵</div>
          </div>
        </div>
        <div className="kg4" style={{ display: 'flex', width: '100%'}}>
          <div className="kc g">
            <div className="kc-label">رشد MoM فعلی</div>
            <div className="kc-val g">+23%</div>
            <div className="kc-sub">نسبت به ماه قبل</div>
          </div>
        </div>
      </Stack>
      

      <Box>
        <Card title="تاریخچه کامل">

          <table className="tbl">
      <thead><tr><th>ماه</th><th>درآمد دلاری</th><th>سود ناخالص</th><th>فروش تکانش</th><th>مشارکت‌کنندگان</th><th>دوره فروخته</th><th>Burn Rate</th><th>MoM</th></tr></thead>
      <tbody>
        <tr><td><span className="mtag">خرداد ۱۴۰۳</span></td><td className="rv y">$40,000</td><td className="rv y">$6,000</td><td className="rv r">۵۰م</td><td className="rv p">۱۲</td><td className="rv b">۲۸</td><td className="rv r">۱,۵۰۰م</td><td><span className="tag up">+۲۳٪</span></td></tr>
        <tr><td><span className="mtag">اردیبهشت ۱۴۰۳</span></td><td className="rv y">$32,500</td><td className="rv y">$4,875</td><td className="rv r">۳۵م</td><td className="rv p">۹</td><td className="rv b">۲۱</td><td className="rv r">۱,۵۰۰م</td><td><span className="tag up">+۲۱٪</span></td></tr>
        <tr><td><span className="mtag">فروردین ۱۴۰۳</span></td><td className="rv r">$26,800</td><td className="rv r">$4,020</td><td className="rv r">۲۸م</td><td className="rv p">۷</td><td className="rv b">۱۵</td><td className="rv r">۱,۵۰۰م</td><td><span className="tag up">+۴۸٪</span></td></tr>
        <tr><td><span className="mtag">اسفند ۱۴۰۲</span></td><td className="rv r">$18,100</td><td className="rv r">$2,715</td><td className="rv r">۱۵م</td><td className="rv p">۵</td><td className="rv b">۸</td><td className="rv r">۱,۵۰۰م</td><td><span className="tag dn">-۶۴٪</span></td></tr>
        <tr><td><span className="mtag">بهمن ۱۴۰۲</span></td><td className="rv y">$50,000</td><td className="rv y">$7,500</td><td className="rv y">۴۵۰م</td><td className="rv p">۳۱</td><td className="rv b">۱۱۲</td><td className="rv r">۱,۵۰۰م</td><td><span className="tag dn">-۶۷٪</span></td></tr>
        <tr><td><span className="mtag">دی ۱۴۰۲</span></td><td className="rv g">$150,000</td><td className="rv g">$22,500</td><td className="rv g">۱,۵۰۰م</td><td className="rv p">۸۹</td><td className="rv b">۳۴۰</td><td className="rv r">۱,۵۰۰م</td><td><span className="tag up">اوج</span></td></tr>
      </tbody>
    </table>

        </Card>
      </Box>
    </div>
  );
}