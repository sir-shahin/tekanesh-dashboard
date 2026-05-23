import Card from "@/components/card";
import { Box, Stack } from "@mui/material";
import Link from "next/link";

export default function OverviewPage() {
  return (
    <div className="page active">
      <div className="ph">
        <div>
          <div className="ph-title">داشبورد اجرایی</div>
          <div className="ph-sub">خرداد ۱۴۰۳ — آخرین بروزرسانی: امروز</div>
        </div>
        <div className="ph-actions">
          <Link href="/import" className="btn btn-ghost">
            + ورود داده
          </Link>
        </div>
      </div>

      <div className="kg4">
        <div className="kc g">
          <div className="kc-icon">💵</div>
          <div className="kc-label">درآمد دلاری ماهانه</div>
          <div className="kc-val g">$40,000</div>
          <div className="kc-sub">
            <span className="tag dn">↓ ۷۳٪ از اوج</span> اوج: $150K
          </div>
        </div>
        <div className="kc y">
          <div className="kc-icon">📈</div>
          <div className="kc-label">سود ناخالص</div>
          <div className="kc-val y">$6,000</div>
          <div className="kc-sub">
            <span className="tag nt">۱۵٪ margin</span>
          </div>
        </div>
        <div className="kc b">
          <div className="kc-icon">🎓</div>
          <div className="kc-label">فروش تکانش</div>
          <div className="kc-val r">۵۰ م</div>
          <div className="kc-sub">
            <span className="tag dn">↓ ۹۷٪ از اوج</span> اوج: ۱,۵۰۰م
          </div>
        </div>
        <div className="kc r">
          <div className="kc-icon">⏳</div>
          <div className="kc-label">Runway</div>
          <div className="kc-val r">۶ ماه</div>
          <div className="kc-sub">
            <span className="tag dn">بحرانی</span> هزینه: ۱,۵۰۰م/ماه
          </div>
        </div>
      </div>

      <div className="kg4">
        <div className="kc p">
          <div className="kc-icon">👷</div>
          <div className="kc-label">مشارکت‌کنندگان پروژه</div>
          <div className="kc-val p">۱۲ نفر</div>
          <div className="kc-sub">این ماه فعال</div>
        </div>
        <div className="kc b">
          <div className="kc-icon">📚</div>
          <div className="kc-label">دوره‌های فروخته (تجمیعی)</div>
          <div className="kc-val b">۳۵۰</div>
          <div className="kc-sub">
            <span className="tag up">+۲۸ این ماه</span>
          </div>
        </div>
        <div className="kc c">
          <div className="kc-icon">💎</div>
          <div className="kc-label">نسبت هزینه به درآمد</div>
          <div className="kc-val r">۸۶٪</div>
          <div className="kc-sub">
            <span className="tag dn">بحرانی</span> هدف: زیر ۶۰٪
          </div>
        </div>
        <div className="kc g">
          <div className="kc-icon">🏦</div>
          <div className="kc-label">کل نقدینگی (ریالی)</div>
          <div className="kc-val g">۹,۰۰۰ م</div>
          <div className="kc-sub">
            <span className="tag nt">۶ ماه runway</span>
          </div>
        </div>
      </div>

      <Stack direction={"row"} gap={2}>
        <Card title="روند درامد دلاری - ۶ ماه اخیر"></Card>
        <Card title="تقسیم درآمد گروپلنسینگ">
          <div className="cb">
            <div className="ri">
              <div className="rl">مجریان پروژه (۷۰٪)</div>
              <div className="rv r">$28,000</div>
            </div>
            <div className="ri">
              <div className="rl">صراف (۵٪)</div>
              <div className="rv r">$2,000</div>
            </div>
            <div className="ri">
              <div className="rl">سهم تکانش (۵٪)</div>
              <div className="rv b">$2,000</div>
            </div>
            <div className="ri">
              <div className="rl">سهم منتورها (۵٪)</div>
              <div className="rv p">$2,000</div>
            </div>
            <div className="ri">
              <div className="rl" style={{ fontWeight: 700, color: "var(--t1)" }}>
                خالص گروپلنسینگ
              </div>
              <div className="rv g">$6,000</div>
            </div>
            <div className="pb-wrap" style={{ marginTop: "12px" }}>
              <div className="pb-labels">
                <span>فعلی $40K</span>
                <span>هدف $150K</span>
              </div>
              <div className="pb">
                <div
                  className="pb-fill"
                  style={{ width: "27%", background: "linear-gradient(90deg,var(--yellow),var(--green))" }}
                ></div>
              </div>
            </div>
          </div>
        </Card>
      </Stack>

      <Stack direction={"row"} gap={2}>
        <Card title="Runway بصری">
          <div className="cb">
            <div className="runway">
              <div className="rm safe">
                <span>خرداد</span>
              </div>
              <div className="rm safe">
                <span>تیر</span>
              </div>
              <div className="rm warn">
                <span>مرداد</span>
              </div>
              <div className="rm warn">
                <span>شهریور</span>
              </div>
              <div className="rm danger">
                <span>مهر</span>
              </div>
              <div className="rm danger">
                <span>آبان</span>
              </div>
              <div className="rm empty">
                <span>آذر</span>
              </div>
              <div className="rm empty">
                <span>دی</span>
              </div>
            </div>
          </div>
        </Card>
        <Card title="نقدینگی ولت‌ها">
          <div className="cb">
            <div className="ri">
              <div className="rl">ولت ریالی</div>
              <div className="rv g">۹,۰۰۰ میلیون</div>
            </div>
            <div className="ri">
              <div className="rl">ولت دلاری / USDT</div>
              <div className="rv g">$5,000</div>
            </div>
            <div className="ri">
              <div className="rl">Burn Rate ماهانه</div>
              <div className="rv r">۱,۵۰۰ میلیون</div>
            </div>
            <div className="ri">
              <div className="rl">درآمد ماهانه ریالی</div>
              <div className="rv y">~۵۵۰ میلیون</div>
            </div>
            <div className="ri">
              <div className="rl">کسری ماهانه</div>
              <div className="rv r">~۹۵۰ میلیون</div>
            </div>
          </div>
        </Card>
      </Stack>
    </div>
  );
}
