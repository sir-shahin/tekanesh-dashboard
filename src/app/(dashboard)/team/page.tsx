"use client";
import { Stack } from "@mui/material";

export default function Page() {
  const loadTeamExcel = async () => {};

  return (
    <div className="page active">
      <div className="ph">
        <div>
          <div className="ph-title">تیم</div>
          <div className="ph-sub">آپلود اکسل ماهانه برای بروزرسانی</div>
        </div>
        <div className="ph-actions">
          <label className="btn btn-g btn-sm" style={{ cursor: "pointer" }}>
            📂 آپلود اکسل تیم
            <input
              type="file"
              accept=".xlsx,.csv"
              style={{ display: "none" }}
              onChange={() => loadTeamExcel()}
            />
          </label>
        </div>
      </div>
      <Stack>
        <div className="card">
          <div className="ch">
            <div className="ct">
              <span className="dot" style={{ background: "var(--purple)" }}></span>لیست کامل اعضا
            </div>
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <select
                id="team-filter-biz"
                style={{
                  background: "var(--s2)",
                  border: "1px solid var(--b1)",
                  borderRadius: "6px",
                  padding: "4px 10px",
                  color: "var(--t2)",
                  fontSize: "10px",
                  outline: "none",
                }}
              >
                <option value="">همه بخش‌ها</option>
                <option value="گروپلنسینگ">گروپلنسینگ</option>
                <option value="تکانش">تکانش</option>
                <option value="هر دو">مشترک</option>
              </select>
              <select
                id="team-filter-status"
                style={{
                  background: "var(--s2)",
                  border: "1px solid var(--b1)",
                  borderRadius: "6px",
                  padding: "4px 10px",
                  color: "var(--t2)",
                  fontSize: "10px",
                  outline: "none",
                }}
              >
                <option value="">همه وضعیت‌ها</option>
                <option value="فعال">فعال</option>
                <option value="مرخصی">مرخصی</option>
                <option value="هشدار">هشدار</option>
              </select>
              <select
                id="team-filter-risk"
                style={{
                  background: "var(--s2)",
                  border: "1px solid var(--b1)",
                  borderRadius: "6px",
                  padding: "4px 10px",
                  color: "var(--t2)",
                  fontSize: "10px",
                  outline: "none",
                }}
              >
                <option value="">همه ریسک‌ها</option>
                <option value="بالا">ریسک بالا</option>
                <option value="متوسط">ریسک متوسط</option>
                <option value="پایین">ریسک پایین</option>
              </select>
            </div>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table className="tbl" id="team-full-table">
              <thead>
                <tr>
                  <th>نام</th>
                  <th>جنسیت</th>
                  <th>نقش</th>
                  <th>سطح</th>
                  <th>کسب‌وکار</th>
                  <th>تیم</th>
                  <th>قرارداد</th>
                  <th>محل</th>
                  <th>حقوق (م)</th>
                  <th>عملکرد</th>
                  <th>پروژه</th>
                  <th>ریسک ترک</th>
                  <th>وضعیت</th>
                  <th>مهارت‌ها</th>
                </tr>
              </thead>
              <tbody id="team-table-body">
                <tr>
                  <td colSpan={14} className="etd">
                    اکسل تیم را آپلود کنید
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Stack>
    </div>
  );
}
