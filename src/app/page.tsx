export default function OverviewPage() {
  return (
    <div className="page active">
      <div className="ph">
        <div>
          <div className="ph-title">داشبورد اجرایی</div>
          <div className="ph-sub">خرداد ۱۴۰۳ — آخرین بروزرسانی: امروز</div>
        </div>
        <div className="ph-actions">
          <button className="btn btn-ghost btn-sm">+ ورود داده</button>
        </div>
      </div>

      <div className="kg4">
        <div className="kc g">
          <div className="kc-icon">💵</div>
          <div className="kc-label">درآمد دلاری ماهانه</div>
          <div className="kc-val g">$40,000</div>
          <div className="kc-sub"><span className="tag dn">↓ ۷۳٪ از اوج</span> اوج: $150K</div>
        </div>
        <div className="kc y">
          <div className="kc-icon">📈</div>
          <div className="kc-label">سود ناخالص</div>
          <div className="kc-val y">$6,000</div>
          <div className="kc-sub"><span className="tag nt">۱۵٪ margin</span></div>
        </div>
        <div className="kc b">
          <div className="kc-icon">🎓</div>
          <div className="kc-label">فروش تکانش</div>
          <div className="kc-val r">۵۰ م</div>
          <div className="kc-sub"><span className="tag dn">↓ ۹۷٪ از اوج</span> اوج: ۱,۵۰۰م</div>
        </div>
        <div className="kc r">
          <div className="kc-icon">⏳</div>
          <div className="kc-label">Runway</div>
          <div className="kc-val r">۶ ماه</div>
          <div className="kc-sub"><span className="tag dn">بحرانی</span> هزینه: ۱,۵۰۰م/ماه</div>
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
          <div className="kc-sub"><span className="tag up">+۲۸ این ماه</span></div>
        </div>
        <div className="kc c">
          <div className="kc-icon">💎</div>
          <div className="kc-label">نسبت هزینه به درآمد</div>
          <div className="kc-val r">۸۶٪</div>
          <div className="kc-sub"><span className="tag dn">بحرانی</span> هدف: زیر ۶۰٪</div>
        </div>
        <div className="kc g">
          <div className="kc-icon">🏦</div>
          <div className="kc-label">کل نقدینگی (ریالی)</div>
          <div className="kc-val g">۹,۰۰۰ م</div>
          <div className="kc-sub"><span className="tag nt">۶ ماه runway</span></div>
        </div>
      </div>
    </div>
  );
}
