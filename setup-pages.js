#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

// Create directories
const baseDir = path.join(__dirname, "src", "app");
const routes = [
  { name: "history", title: "تاریخچه ماه‌ها", subtitle: "مقایسه عملکرد" },
  { name: "grouplancing", title: "گروپلنسینگ", subtitle: "پروژه‌های نرم‌افزاری" },
  { name: "takanesh", title: "تکانش", subtitle: "بستر آموزش" },
  { name: "liquidity", title: "نقدینگی و مالی", subtitle: "وضعیت مالی" },
  { name: "risks", title: "ریسک‌ها", subtitle: "پایش تهدیدات" },
  { name: "team", title: "تیم", subtitle: "آپلود اکسل" },
  { name: "import", title: "ورود داده ماهانه", subtitle: "CSV آپلود" },
  { name: "apisettings", title: "تنظیمات API", subtitle: "اتصال پلتفرم‌ها" },
];

const pageTemplate = (title, subtitle) => `export default function Page() {
  return (
    <div className="page active">
      <div className="ph">
        <div>
          <div className="ph-title">${title}</div>
          <div className="ph-sub">${subtitle}</div>
        </div>
      </div>
      <div className="kg4">
        <div className="kc g">
          <div className="kc-label">مثال</div>
          <div className="kc-val g">۱۲۳</div>
          <div className="kc-sub">اطلاعات</div>
        </div>
      </div>
    </div>
  );
}`;

routes.forEach((route) => {
  const routePath = path.join(baseDir, route.name);
  if (!fs.existsSync(routePath)) {
    fs.mkdirSync(routePath, { recursive: true });
  }
  const pagePath = path.join(routePath, "page.tsx");
  if (!fs.existsSync(pagePath)) {
    fs.writeFileSync(pagePath, pageTemplate(route.title, route.subtitle));
  }
  console.log(`✓ ${route.name}`);
});

console.log("\n✓ All pages created successfully!");
