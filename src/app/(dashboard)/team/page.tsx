"use client";

import { useState, useRef, useEffect } from "react";
import { Stack } from "@mui/material";
import * as XLSX from "xlsx";

// ------------------------------------------------------------
// Types
// ------------------------------------------------------------
type Gender = "مرد" | "زن" | "";
type Role = string;
type Level = string;
type Business = "گروپلنسینگ" | "تکانش" | "هر دو" | "";
type Team = string;
type Contract = string;
type Location = string;
type Salary = number | string;
type Performance = string;
type Project = string;
type RiskLevel = "بالا" | "متوسط" | "پایین" | "";
type Status = "فعال" | "مرخصی" | "هشدار" | "";

interface TeamMember {
  نام: string;
  جنسیت: Gender;
  نقش: Role;
  سطح: Level;
  کسب‌وکار: Business;
  تیم: Team;
  قرارداد: Contract;
  محل: Location;
  "حقوق (م)": Salary;
  عملکرد: Performance;
  پروژه: Project;
  "ریسک ترک": RiskLevel;
  وضعیت: Status;
  مهارت‌ها: string;
}

// Raw data from Excel before mapping
type RawRow = Record<string, string | number | null | undefined>;

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
// LocalStorage key
// ------------------------------------------------------------
const STORAGE_KEY = "teamData";

// ------------------------------------------------------------
// Main component
// ------------------------------------------------------------
export default function TeamPage() {
  const [teamData, setTeamData] = useState<TeamMember[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [filterBiz, setFilterBiz] = useState<Business | "">("");
  const [filterStatus, setFilterStatus] = useState<Status | "">("");
  const [filterRisk, setFilterRisk] = useState<RiskLevel | "">("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load from localStorage after mount (client only)
  useEffect(() => {
    setIsClient(true);
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as TeamMember[];
        if (Array.isArray(parsed)) setTeamData(parsed);
      } catch (err) {
        console.error("Failed to load team data from localStorage", err);
      }
    }
  }, []);

  // Save to localStorage whenever data changes (client only)
  useEffect(() => {
    if (isClient) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(teamData));
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
          // Repair potential mojibake in the whole CSV content
          const repairedText = fixMojibake(text);
          workbook = XLSX.read(repairedText, { type: "string" });
        } else {
          const data = e.target?.result as ArrayBuffer;
          workbook = XLSX.read(data, { type: "array" });
        }

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

        const expectedHeaders = [
          "نام",
          "جنسیت",
          "نقش",
          "سطح",
          "کسب‌وکار",
          "تیم",
          "قرارداد",
          "محل",
          "حقوق (م)",
          "عملکرد",
          "پروژه",
          "ریسک ترک",
          "وضعیت",
          "مهارت‌ها",
        ];

        const missingHeaders = expectedHeaders.filter((h) => !actualHeaders.includes(h));
        if (missingHeaders.length) {
          alert(
            `سرستون‌های زیر در فایل پیدا نشد:\n${missingHeaders.join(", ")}\n` +
              "لطفاً از ستون‌های دقیق با املای فارسی استفاده کنید.",
          );
          return;
        }

        const mappedData: TeamMember[] = repairedData.map((row: RawRow) => ({
          نام: String(row["نام"] ?? ""),
          جنسیت: String(row["جنسیت"] ?? "") as Gender,
          نقش: String(row["نقش"] ?? ""),
          سطح: String(row["سطح"] ?? ""),
          کسب‌وکار: String(row["کسب‌وکار"] ?? "") as Business,
          تیم: String(row["تیم"] ?? ""),
          قرارداد: String(row["قرارداد"] ?? ""),
          محل: String(row["محل"] ?? ""),
          "حقوق (م)": row["حقوق (م)"] ?? "",
          عملکرد: String(row["عملکرد"] ?? ""),
          پروژه: String(row["پروژه"] ?? ""),
          "ریسک ترک": String(row["ریسک ترک"] ?? "") as RiskLevel,
          وضعیت: String(row["وضعیت"] ?? "") as Status,
          مهارت‌ها: String(row["مهارت‌ها"] ?? ""),
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
    }
  };

  // ------------------------------------------------------------
  // Filtered data
  // ------------------------------------------------------------
  const filteredData = teamData.filter((member) => {
    if (filterBiz && member.کسب‌وکار !== filterBiz) return false;
    if (filterStatus && member.وضعیت !== filterStatus) return false;
    if (filterRisk && member["ریسک ترک"] !== filterRisk) return false;
    return true;
  });

  // ------------------------------------------------------------
  // Table renderer
  // ------------------------------------------------------------
  const renderTableBody = () => {
    if (teamData.length === 0) {
      return (
        <tr>
          <td colSpan={14} className="etd">
            اکسل تیم را آپلود کنید
          </td>
        </tr>
      );
    }
    if (filteredData.length === 0) {
      return (
        <tr>
          <td colSpan={14} className="etd">
            داده‌ای با فیلترهای انتخاب شده یافت نشد
          </td>
        </tr>
      );
    }
    return filteredData.map((member, idx) => (
      <tr key={idx}>
        <td>{member.نام}</td>
        <td>{member.جنسیت}</td>
        <td>{member.نقش}</td>
        <td>{member.سطح}</td>
        <td>{member.کسب‌وکار}</td>
        <td>{member.تیم}</td>
        <td>{member.قرارداد}</td>
        <td>{member.محل}</td>
        <td>{member["حقوق (م)"]}</td>
        <td>{member.عملکرد}</td>
        <td>{member.پروژه}</td>
        <td>{member["ریسک ترک"]}</td>
        <td>{member.وضعیت}</td>
        <td>{member.مهارت‌ها}</td>
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

          <a href="/team-sample.xlsx" className="btn btn-sm" style={{ backgroundColor: "#fff" }}>
            نمونه اکسل
          </a>
        </div>
      </div>
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
                onChange={(e) => setFilterBiz(e.target.value as Business | "")}
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
              <tbody>{renderTableBody()}</tbody>
            </table>
          </div>
        </div>
      </Stack>
    </div>
  );
}
