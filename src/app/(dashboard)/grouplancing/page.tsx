import Card from "@/components/card";
import { Box, Stack } from "@mui/material";

export default function Page() {
  return (
    <div className="page active">
      <div className="ph">
        <div>
          <div className="ph-title">گروپلنسینگ</div>
          <div className="ph-sub">پروژه‌های نرم‌افزاری</div>
        </div>
      </div>
      <Stack direction={'row'} gap={2}>
        <div className="kg4" style={{ display: 'flex', width: '100%'}}>
          <div className="kc g">
            <div className="kc-label">درآمد ناخالص فعلی</div>
            <div className="kc-val g">۱۵۰۰$</div>
            <div className="kc-sub">73% از اوج</div>
          </div>
        </div>
        <div className="kg4" style={{ display: 'flex', width: '100%'}}>
          <div className="kc g">
            <div className="kc-label">خالص گروپلنسینگ</div>
            <div className="kc-val g">۱۵۰۰$</div>
            <div className="kc-sub">۱۵٪ margin</div>
          </div>
        </div>
        <div className="kg4" style={{ display: 'flex', width: '100%'}}>
          <div className="kc g">
            <div className="kc-label">پروژه‌های فعال</div>
            <div className="kc-val g">۸</div>
            <div className="kc-sub">+۲ ماه قبل</div>
          </div>
        </div>
        <div className="kg4" style={{ display: 'flex', width: '100%'}}>
          <div className="kc g">
            <div className="kc-label">مشارکت‌کنندگان</div>
            <div className="kc-val g">۱۲ نفر</div>
            <div className="kc-sub">این ماه</div>
          </div>
        </div>
      </Stack>
      <Stack direction={'row'} gap={2}>
        <div className="kg4" style={{ display: 'flex', width: '100%'}}>
          <div className="kc g">
            <div className="kc-label">پروژه‌های جدید جذب شده</div>
            <div className="kc-val g">۱۵</div>
            <div className="kc-sub">این ماه</div>
          </div>
        </div>
        <div className="kg4" style={{ display: 'flex', width: '100%'}}>
          <div className="kc g">
            <div className="kc-label">پروژه‌های از دست رفته</div>
            <div className="kc-val g">۱۵۰۰$</div>
            <div className="kc-sub">این ماه</div>
          </div>
        </div>
        <div className="kg4" style={{ display: 'flex', width: '100%'}}>
          <div className="kc g">
            <div className="kc-label">میانگین ارزش هر پروژه</div>
            <div className="kc-val g">۱۵۰۰$</div>
            <div className="kc-sub">+۲ ماه قبل</div>
          </div>
        </div>
        <div className="kg4" style={{ display: 'flex', width: '100%'}}>
          <div className="kc g">
            <div className="kc-label">نرخ تبدیل Proposal</div>
            <div className="kc-val g">۱۲ %</div>
            <div className="kc-sub">این ماه</div>
          </div>
        </div>
      </Stack>
      <Stack direction={'row'} gap={2}>
        <div className="kg4" style={{ display: 'flex', width: '100%'}}>
          <div className="kc g">
            <div className="kc-label">تعداد مشتریان فعال</div>
            <div className="kc-val g">۱۵</div>
            <div className="kc-sub">این ماه</div>
          </div>
        </div>
        <div className="kg4" style={{ display: 'flex', width: '100%'}}>
          <div className="kc g">
            <div className="kc-label">بیشترین وابستگی مشتری</div>
            <div className="kc-val g">38%</div>
            <div className="kc-sub"> ریسک تمرکز بالا</div>
          </div>
        </div>
        <div className="kg4" style={{ display: 'flex', width: '100%'}}>
          <div className="kc g">
            <div className="kc-label">زمان متوسط اتمام</div>
            <div className="kc-val g">15 روز</div>
            <div className="kc-sub">میانگین پروژه‌ها</div>
          </div>
        </div>
        <div className="kg4" style={{ display: 'flex', width: '100%'}}>
          <div className="kc g">
            <div className="kc-label">هدف ماه بعد</div>
            <div className="kc-val g">۶۵۰۰۰$</div>
            <div className="kc-sub"> +۳۷٪ رشد هدف</div>
          </div>
        </div>
      </Stack>

      <Stack direction={'row'} gap={3}>
        <Card title="پروژه‌های فعال">
          <table className="tbl">
            <thead><tr><th>نام پروژه</th><th>مشتری</th><th>ارزش ماهانه</th><th>وضعیت</th><th>مجری</th></tr></thead>
            <tbody>
              <tr><td style={{color:"var(--t1)"}}>پلتفرم ای‌کامرس</td><td>ClientCo DE</td><td style={{color:"var(--green)"}}>$8,500</td><td><span className="badge g">فعال</span></td><td>علی م.</td></tr>
              <tr><td style={{color:"var(--t1)"}}>اپ موبایل</td><td>StartupX UK</td><td style={{color:"var(--green)"}}>$6,200</td><td><span className="badge g">فعال</span></td><td>سارا ر.</td></tr>
              <tr><td style={{color:"var(--t1)"}}>داشبورد تحلیل</td><td>DataFirm NL</td><td style={{color:"var(--green)"}}>$5,800</td><td><span className="badge g">فعال</span></td><td>رضا ک.</td></tr>
              <tr><td style={{color:"var(--t1)"}}>API Integration</td><td>TechCorp CA</td><td style={{color:"var(--green)"}}>$4,900</td><td><span className="badge g">فعال</span></td><td>مهدی ت.</td></tr>
              <tr><td style={{color:"var(--t1)"}}>وب‌سایت کارپوریت</td><td>Agency AU</td><td style={{color:"var(--yellow)"}}>$3,600</td><td><span className="badge y">بازبینی</span></td><td>نگار ش.</td></tr>
              <tr><td style={{color:"var(--t1)"}}>CRM سفارشی</td><td>RetailCo SE</td><td style={{color:"var(--green)"}}>$5,200</td><td><span className="badge g">فعال</span></td><td>امیر ج.</td></tr>
              <tr><td style={{color:"var(--t1)"}}>سیستم حسابداری</td><td>Finance FR</td><td style={{color:"var(--green)"}}>$4,100</td><td><span className="badge g">فعال</span></td><td>فاطمه ن.</td></tr>
              <tr><td style={{color:"var(--t1)"}}>پنل ادمین</td><td>SaaSCo US</td><td style={{color:"var(--yellow)"}}>$2,700</td><td><span className="badge y">آغاز</span></td><td>حسین ع.</td></tr>
            </tbody>
          </table>
        </Card>

        <Card title="توزیع درآمد بین مشتریان">
          <div className="cb">
            <div className="cmp"><div className="cmp-label">ClientCo DE</div><div className="cmp-bar-wrap"><div className="cmp-bar-fill"></div></div><div className="cmp-val" >$8,500 ⚠️</div></div>
            <div className="cmp"><div className="cmp-label">RetailCo SE</div><div className="cmp-bar-wrap"><div className="cmp-bar-fill" ></div></div><div className="cmp-val" >$5,200</div></div>
            <div className="cmp"><div className="cmp-label">DataFirm NL</div><div className="cmp-bar-wrap"><div className="cmp-bar-fill" ></div></div><div className="cmp-val" >$5,800</div></div>
            <div className="cmp"><div className="cmp-label">StartupX UK</div><div className="cmp-bar-wrap"><div className="cmp-bar-fill" ></div></div><div className="cmp-val" >$6,200</div></div>
            <div className="cmp"><div className="cmp-label">سایر</div><div className="cmp-bar-wrap"><div className="cmp-bar-fill" ></div></div><div className="cmp-val" >$14,300</div></div>
          </div>
        </Card>
      </Stack>
      <Box>
        <Card title="پیشرفت به هدف $150K"></Card>
      </Box>
    </div>
  );
}