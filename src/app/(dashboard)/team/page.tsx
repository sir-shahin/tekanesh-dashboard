"use client";

import { useState, useRef, useEffect } from "react";
import { Box, Stack } from "@mui/material";
import * as XLSX from "xlsx";
import Card from "@/components/card";

// ------------------------------------------------------------
// Types based on the new Excel template
// ------------------------------------------------------------
type Gender = "آقا" | "خانم" | "";
type MainBusiness = "گروپلنسینگ" | "تکانش" | "";
type Seniority = "جونیور" | "میدلول" | "سنیور" | "لید" | "مدیر" | "";
type RiskLevel = "پایین" | "متوسط" | "بالا" | "";
type Status = "فعال" | "مرخصی" | "هشدار" | "";

// Interface matching the exact Persian column names from the new Excel file
interface TeamMember {
  نام: string;
  "نام خانوادگی": string;
  جنسیت: Gender;
  "بخش اصلی": MainBusiness;
  "بخش دوم (اگه مشترک)": string;
  "نقش / عنوان شغلی": string;
  "سطح ارشدیت": Seniority;
  "نوع قرارداد": string;
  "حضوری یا دورکار": string;
  شهر: string;
  "مدیر مستقیم": string;
  "تاریخ استخدام": string;
  "حقوق ماهانه (میلیون)": number | string;
  "آخرین افزایش حقوق": string;
  "درصد افزایش حقوق سالانه": number | string;
  "امتیاز عملکرد (۱-۱۰)": number | string;
  "تعداد پروژه فعال": number | string;
  "ساعت کاری ماهانه": number | string;
  "مهارت‌های کلیدی": string;
  "دوره تکانش تکمیل شده": number | string;
  "ریسک ترک": RiskLevel;
  "نرخ غیبت ماهانه (٪)": number | string;
  وضعیت: Status;
  یادداشت: string;
}

// Raw data from Excel before mapping
type RawRow = Record<string, string | number | null | undefined>;

// List of columns to display in the table (for horizontal scrolling)
const DISPLAY_COLUMNS: (keyof TeamMember)[] = [
  "نام",
  "نام خانوادگی",
  "جنسیت",
  "بخش اصلی",
  "بخش دوم (اگه مشترک)",
  "نقش / عنوان شغلی",
  "سطح ارشدیت",
  "نوع قرارداد",
  "حضوری یا دورکار",
  "شهر",
  "مدیر مستقیم",
  "حقوق ماهانه (میلیون)",
  "امتیاز عملکرد (۱-۱۰)",
  "تعداد پروژه فعال",
  "مهارت‌های کلیدی",
  "ریسک ترک",
  "نرخ غیبت ماهانه (٪)",
  "وضعیت",
  "یادداشت",
];

// Minimum required columns for validation
const REQUIRED_COLUMNS: (keyof TeamMember)[] = [
  "نام",
  "نام خانوادگی",
  "بخش اصلی",
  "نقش / عنوان شغلی",
  "وضعیت",
  "ریسک ترک",
];

// ------------------------------------------------------------
// Helpers for encoding repair (mojibake)
// ------------------------------------------------------------
function fixMojibake(str: string): string {
  const bytes = new Uint8Array(str.length);
  for (let i = 0; i < str.length; i++) {
    bytes[i] = str.charCodeAt(i) & 0xff;
  }
  return new TextDecoder("utf-8").decode(bytes);
}

function isGarbled(str: string): boolean {
  return /[À-ÿ]/.test(str);
}

function repairStrings<T>(data: T): T {
  if (typeof data === "string") {
    return (isGarbled(data) ? fixMojibake(data) : data) as T;
  }
  if (Array.isArray(data)) {
    return data.map((item) => repairStrings(item)) as T;
  }
  if (data && typeof data === "object") {
    const newObj: Record<string, unknown> = {};
    for (const key in data) {
      newObj[repairStrings(key)] = repairStrings((data as Record<string, unknown>)[key]);
    }
    return newObj as T;
  }
  return data;
}

// ------------------------------------------------------------
// LocalStorage key and version management
// ------------------------------------------------------------
const STORAGE_KEY = "teamData";
const STORAGE_VERSION = "v2"; // Bump version to avoid old schema conflict

// ------------------------------------------------------------
// Main component
// ------------------------------------------------------------
export default function TeamPage() {
  const [teamData, setTeamData] = useState<TeamMember[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [sumSallary, setSumSallary] = useState(0);
  const [sumWellDone, setSumWellDone] = useState(0);
  const [sumAbsence, setSumAbsence] = useState(0);
  const [sumProject, setSumProject] = useState(0);
  const [filterBiz, setFilterBiz] = useState<MainBusiness | "">("");
  const [filterStatus, setFilterStatus] = useState<Status | "">("");
  const [filterRisk, setFilterRisk] = useState<RiskLevel | "">("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load from localStorage after mount (client only) with schema validation
  useEffect(() => {
    setIsClient(true);
    const savedVersion = localStorage.getItem(`${STORAGE_KEY}_version`);
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved && savedVersion === STORAGE_VERSION) {
      try {
        const parsed = JSON.parse(saved) as TeamMember[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Quick validation: check if first item has 'بخش اصلی' (new schema) instead of 'کسب‌وکار' (old)
          if (parsed[0] && "بخش اصلی" in parsed[0]) {
            setTeamData(parsed);
          } else {
            // Old schema detected, clear storage
            localStorage.removeItem(STORAGE_KEY);
            localStorage.removeItem(`${STORAGE_KEY}_version`);
            console.warn("Old data schema removed. Please upload a new Excel file.");
          }
        } else if (Array.isArray(parsed)) {
          setTeamData(parsed);
        }
      } catch (err) {
        console.error("Failed to load team data from localStorage", err);
      }
    }
  }, []);

  // Save to localStorage whenever data changes (client only)
  useEffect(() => {
    let sum = 0;
    let sum2 = 0;
    let sum3 = 0;
    let sum4 = 0;
    setSumSallary(teamData.map((t) => (sum += Number(t["حقوق ماهانه (میلیون)"])))[teamData.length - 1]);
    setSumWellDone(teamData.map((t) => (sum2 += Number(t["امتیاز عملکرد (۱-۱۰)"])))[teamData.length - 1]);
    setSumAbsence(teamData.map((t) => (sum3 += Number(t["نرخ غیبت ماهانه (٪)"])))[teamData.length - 1]);
    setSumProject(teamData.map((t) => (sum4 += Number(t["تعداد پروژه فعال"])))[teamData.length - 1]);

    if (isClient && teamData.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(teamData));
      localStorage.setItem(`${STORAGE_KEY}_version`, STORAGE_VERSION);
    } else if (isClient && teamData.length === 0) {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(`${STORAGE_KEY}_version`);
    }
  }, [teamData, isClient]);

  // ------------------------------------------------------------
  // Excel / CSV upload
  // ------------------------------------------------------------
  const loadTeamExcel = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const isCSV = file.name.endsWith(".csv");
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        let workbook: XLSX.WorkBook;
        if (isCSV) {
          const text = e.target?.result as string;
          const repairedText = fixMojibake(text);
          workbook = XLSX.read(repairedText, { type: "string" });
        } else {
          const data = e.target?.result as ArrayBuffer;
          workbook = XLSX.read(data, { type: "array" });
        }

        // Use first sheet (typically 'team')
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const rawData: RawRow[] = XLSX.utils.sheet_to_json(worksheet, { defval: "" });

        if (!rawData.length) {
          setTeamData([]);
          return;
        }

        // Repair any garbled keys/values
        const repairedData = repairStrings(rawData);
        const firstRow = repairedData[0];
        const actualHeaders = Object.keys(firstRow);

        // Check for required columns
        const missingHeaders = REQUIRED_COLUMNS.filter((h) => !actualHeaders.includes(h));
        if (missingHeaders.length) {
          alert(
            `ستون‌های ضروری زیر در فایل پیدا نشد:\n${missingHeaders.join(
              ", ",
            )}\n\nلطفاً از الگوی صحیح اکسل استفاده کنید.`,
          );
          return;
        }

        // Map raw data to TeamMember type (fill missing optional fields with empty string)
        const mappedData: TeamMember[] = repairedData.map((row: RawRow) => ({
          نام: String(row["نام"] ?? ""),
          "نام خانوادگی": String(row["نام خانوادگی"] ?? ""),
          جنسیت: (row["جنسیت"] === "آقا" || row["جنسیت"] === "خانم" ? row["جنسیت"] : "") as Gender,
          "بخش اصلی": (row["بخش اصلی"] === "گروپلنسینگ" || row["بخش اصلی"] === "تکانش"
            ? row["بخش اصلی"]
            : "") as MainBusiness,
          "بخش دوم (اگه مشترک)": String(row["بخش دوم (اگه مشترک)"] ?? ""),
          "نقش / عنوان شغلی": String(row["نقش / عنوان شغلی"] ?? ""),
          "سطح ارشدیت": (["جونیور", "میدلول", "سنیور", "لید", "مدیر"].includes(String(row["سطح ارشدیت"]))
            ? String(row["سطح ارشدیت"])
            : "") as Seniority,
          "نوع قرارداد": String(row["نوع قرارداد"] ?? ""),
          "حضوری یا دورکار": String(row["حضوری یا دورکار"] ?? ""),
          شهر: String(row["شهر"] ?? ""),
          "مدیر مستقیم": String(row["مدیر مستقیم"] ?? ""),
          "تاریخ استخدام": String(row["تاریخ استخدام"] ?? ""),
          "حقوق ماهانه (میلیون)": row["حقوق ماهانه (میلیون)"] ?? "",
          "آخرین افزایش حقوق": String(row["آخرین افزایش حقوق"] ?? ""),
          "درصد افزایش حقوق سالانه": row["درصد افزایش حقوق سالانه"] ?? "",
          "امتیاز عملکرد (۱-۱۰)": row["امتیاز عملکرد (۱-۱۰)"] ?? "",
          "تعداد پروژه فعال": row["تعداد پروژه فعال"] ?? "",
          "ساعت کاری ماهانه": row["ساعت کاری ماهانه"] ?? "",
          "مهارت‌های کلیدی": String(row["مهارت‌های کلیدی"] ?? ""),
          "دوره تکانش تکمیل شده": row["دوره تکانش تکمیل شده"] ?? "",
          "ریسک ترک": (["پایین", "متوسط", "بالا"].includes(String(row["ریسک ترک"]))
            ? String(row["ریسک ترک"])
            : "") as RiskLevel,
          "نرخ غیبت ماهانه (٪)": row["نرخ غیبت ماهانه (٪)"] ?? "",
          وضعیت: (["فعال", "مرخصی", "هشدار"].includes(String(row["وضعیت"])) ? String(row["وضعیت"]) : "") as Status,
          یادداشت: String(row["یادداشت"] ?? ""),
        }));

        setTeamData(mappedData);
      } catch (error) {
        console.error("Excel parsing error", error);
        alert("خطا در خواندن فایل. لطفاً از فرمت صحیح اکسل (xlsx) یا CSV با کدگذاری UTF‑8 استفاده کنید.");
      } finally {
        if (fileInputRef.current) fileInputRef.current.value = "";
      }
    };

    if (isCSV) {
      reader.readAsText(file, "UTF-8");
    } else {
      reader.readAsArrayBuffer(file);
    }
  };

  // ------------------------------------------------------------
  // Clear all stored data
  // ------------------------------------------------------------
  const clearStorage = () => {
    if (confirm("آیا از پاک کردن تمام داده‌های تیم اطمینان دارید؟")) {
      setTeamData([]);
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(`${STORAGE_KEY}_version`);
    }
  };

  // ------------------------------------------------------------
  // Filtered data
  // ------------------------------------------------------------
  const filteredData = teamData.filter((member) => {
    if (filterBiz && member["بخش اصلی"] !== filterBiz) return false;
    if (filterStatus && member["وضعیت"] !== filterStatus) return false;
    if (filterRisk && member["ریسک ترک"] !== filterRisk) return false;
    return true;
  });

  // ------------------------------------------------------------
  // Helper to render cell value (handle numbers and empty strings)
  // ------------------------------------------------------------
  const renderCellValue = (value: unknown): string => {
    if (value === undefined || value === null || value === "") return "—";
    return String(value);
  };

  // ------------------------------------------------------------
  // Table renderer
  // ------------------------------------------------------------
  const renderTableBody = () => {
    if (teamData.length === 0) {
      return (
        <tr>
          <td colSpan={DISPLAY_COLUMNS.length} className="etd">
            اکسل تیم را آپلود کنید
          </td>
        </tr>
      );
    }
    if (filteredData.length === 0) {
      return (
        <tr>
          <td colSpan={DISPLAY_COLUMNS.length} className="etd">
            داده‌ای با فیلترهای انتخاب شده یافت نشد
          </td>
        </tr>
      );
    }
    return filteredData.map((member, idx) => (
      <tr key={idx}>
        {DISPLAY_COLUMNS.map((col) => (
          <td key={col}>{renderCellValue(member[col])}</td>
        ))}
      </tr>
    ));
  };

  // ------------------------------------------------------------
  // JSX
  // ------------------------------------------------------------
  return (
    <div className="page active">
      <div className="ph">
        <div>
          <div className="ph-title">تیم</div>
          <div className="ph-sub">آپلود اکسل ماهانه برای بروزرسانی</div>
        </div>
        <div className="ph-actions" style={{ display: "flex", gap: "8px" }}>
          <label className="btn btn-g btn-sm" style={{ cursor: "pointer" }}>
            📂 آپلود اکسل تیم
            <input
              ref={fileInputRef}
              type="file"
              accept=".xlsx, .xls, .csv"
              style={{ display: "none" }}
              onChange={loadTeamExcel}
            />
          </label>

          <button onClick={clearStorage} className="btn btn-sm" style={{ background: "#dc3545", color: "white" }}>
            🗑️ پاک کردن داده
          </button>

          <a href="/team-excel.xlsx" className="btn btn-sm" style={{ backgroundColor: "#fff" }}>
            نمونه اکسل
          </a>
        </div>
      </div>

      <div className="ibox y">
        اکسل نمونه رو دانلود کن، پر کن و آپلود کن — همه متریک‌ها خودکار محاسبه میشن. دقت کن ستون «کسب‌وکار» می‌تونه «هر
        دو» باشه برای اعضای مشترک.
      </div>
      {teamData.length && (
        <Box>
          <Stack direction={"row"} gap={2}>
            <div className="kg4" style={{ display: "flex", width: "100%" }}>
              <div className="kc b">
                <div className="kc-label">کل تیم</div>
                <div className="kc-val b">{teamData.length}</div>
                <div className="kc-sub"></div>
              </div>
            </div>
            <div className="kg4" style={{ display: "flex", width: "100%" }}>
              <div className="kc p">
                <div className="kc-label">نسبت خانم / اقا</div>
                <div className="kc-val p">
                  {(
                    teamData.filter((t) => t["جنسیت"] === "خانم").length /
                    teamData.filter((t) => t["جنسیت"] === "آقا").length
                  ).toFixed(2)}
                </div>
                <div className="kc-sub"></div>
              </div>
            </div>
            <div className="kg4" style={{ display: "flex", width: "100%" }}>
              <div className="kc y">
                <div className="kc-label">نرخ ترک (ریسک بالا)</div>
                <div className="kc-val y">-</div>
                <div className="kc-sub">افراد با رسیک بالا</div>
              </div>
            </div>
            <div className="kg4" style={{ display: "flex", width: "100%" }}>
              <div className="kc g">
                <div className="kc-label">درآمد سرانه</div>
                <div className="kc-val g" dir="ltr" style={{ textAlign: "right" }}>
                  -
                </div>
                <div className="kc-sub">درامد دلاری / نفر</div>
              </div>
            </div>
          </Stack>
          <Stack direction={"row"} gap={2}>
            <div className="kg4" style={{ display: "flex", width: "100%" }}>
              <div className="kc b">
                <div className="kc-label">جمع حقوق ماهانه </div>
                <div className="kc-val b">{sumSallary}</div>
                <div className="kc-sub">میلیون تومان</div>
              </div>
            </div>
            <div className="kg4" style={{ display: "flex", width: "100%" }}>
              <div className="kc b">
                <div className="kc-label">میانگین حقوق</div>
                <div className="kc-val b">{(sumSallary / teamData.length).toFixed(2)}</div>
                <div className="kc-sub"></div>
              </div>
            </div>
            <div className="kg4" style={{ display: "flex", width: "100%" }}>
              <div className="kc g">
                <div className="kc-label">میانگین عملکرد</div>
                <div className="kc-val g">{(sumWellDone / teamData.length).toFixed(2)}</div>
                <div className="kc-sub"></div>
              </div>
            </div>
            <div className="kg4" style={{ display: "flex", width: "100%" }}>
              <div className="kc r">
                <div className="kc-label">میانگین روز غیبت</div>
                <div className="kc-val r" dir="ltr" style={{ textAlign: "right" }}>
                  {sumAbsence > -1 && sumAbsence / teamData.length}
                </div>
                <div className="kc-sub">درصد</div>
              </div>
            </div>
          </Stack>
          <Stack direction={"row"} gap={2}>
            <div className="kg4" style={{ display: "flex", width: "100%" }}>
              <div className="kc b">
                <div className="kc-label">اعضای مشترک (هردو)</div>
                <div className="kc-val b">
                  {teamData.filter((t) => t["بخش دوم (اگه مشترک)"].includes("تکانش")).length +
                    teamData.filter((t) => t["بخش دوم (اگه مشترک)"].includes("گروپلنسینگ")).length}
                </div>
                <div className="kc-sub">گروپلنسینگ + تلانش</div>
              </div>
            </div>
            <div className="kg4" style={{ display: "flex", width: "100%" }}>
              <div className="kc g">
                <div className="kc-label">تمام وقت</div>
                <div className="kc-val g">{teamData.filter((t) => t["نوع قرارداد"] === "تمام‌وقت").length}</div>
                <div className="kc-sub"></div>
              </div>
            </div>
            <div className="kg4" style={{ display: "flex", width: "100%" }}>
              <div className="kc p">
                <div className="kc-label">دورکار</div>
                <div className="kc-val p">{teamData.filter((t) => t["حضوری یا دورکار"] === "دورکار").length}</div>
                <div className="kc-sub"></div>
              </div>
            </div>
            <div className="kg4" style={{ display: "flex", width: "100%" }}>
              <div className="kc y">
                <div className="kc-label">میانگین پروژه/نفر</div>
                <div className="kc-val y" dir="ltr" style={{ textAlign: "right" }}>
                  {(sumProject / teamData.length).toFixed(2)}
                </div>
                <div className="kc-sub"></div>
              </div>
            </div>
          </Stack>
        </Box>
      )}

      <Stack direction={"row"} gap={2}>
        <Box flex={1}>
          <Card title="توزیع تیم بین بخش‌ها" />
        </Box>
        <Box flex={1}>
          <Card title="نسبت جنسیت و سطح ارشدیت" />
        </Box>
      </Stack>

      {/* list table */}
      <Stack>
        <div className="card">
          <div className="ch">
            <div className="ct">
              <span className="dot" style={{ background: "var(--purple)" }}></span>
              لیست کامل اعضا
            </div>
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <select
                value={filterBiz}
                onChange={(e) => setFilterBiz(e.target.value as MainBusiness | "")}
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
              </select>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as Status | "")}
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
                value={filterRisk}
                onChange={(e) => setFilterRisk(e.target.value as RiskLevel | "")}
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
                <option value="پایین">ریسک پایین</option>
                <option value="متوسط">ریسک متوسط</option>
                <option value="بالا">ریسک بالا</option>
              </select>
            </div>
          </div>
          {/* Horizontal scroll container */}
          <div style={{ overflowX: "auto", width: "100%" }}>
            <table className="tbl" id="team-full-table" style={{ minWidth: "100%" }}>
              <thead>
                <tr>
                  {DISPLAY_COLUMNS.map((col) => (
                    <th key={col}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>{renderTableBody()}</tbody>
            </table>
          </div>
        </div>
      </Stack>
    </div>
  );
}
