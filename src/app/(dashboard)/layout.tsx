"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Logo from "@/assets/logo.jpg";
import { localDate } from "@/utils";

const menuItems = [
  {
    section: "نمای کلی",
    items: [
      { href: "/dashboard", icon: "📊", label: "داشبورد" },
      { href: "/history", icon: "📅", label: "تاریخچه ماه‌ها" },
    ],
  },
  {
    section: "کسب‌وکارها",
    items: [
      { href: "/grouplancing", icon: "💼", label: "گروپلنسینگ" },
      {
        href: "#",
        icon: "🎓",
        label: "تکانش",
        children: [
          { href: "/tekanesh", label: "جامع تکانش" },
          { href: "/tekanesh/educating", label: "دپارتمان آموزش" },
          { href: "/tekanesh/marketing", label: "دپارتمان بازاریابی" },
        ],
      },
    ],
  },
  {
    section: "مالی و تیم",
    items: [{ href: "/team", icon: "👥", label: "تیم" }],
  },
  // {
  //   section: "سیستم",
  //   items: [
  //     { href: "/import", icon: "📂", label: "ورود داده" },
  //     { href: "/apisettings", icon: "🔌", label: "تنظیمات API" },
  //   ],
  // },
];

const isActive = (href: string, pathname: string) => {
  if (href === "/") return pathname === "/";

  return pathname.startsWith(href);
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [dynamicTime, setDynamicTime] = useState("");
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({
    "/tekanesh": pathname.startsWith("/tekanesh"),
  });

  useEffect(() => {
    // Function to update time
    const updateTime = () => {
      setDynamicTime(localDate().time);
    };

    // Set interval only once after mount
    const intervalId = setInterval(updateTime, 1000);

    // Cleanup interval on unmount
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (pathname.startsWith("/tekanesh")) {
      setOpenMenus((prev) => ({ ...prev, "/tekanesh": true }));
    }
  }, [pathname]);

  const toggleMenu = (href: string) => {
    setOpenMenus((prev) => ({ ...prev, [href]: !prev[href] }));
  };

  return (
    <div className="app">
      <header>
        <div className="logo">
          <div className="logo-mark">
            <Image src={Logo.src} width={35} height={35} alt="boshra" style={{ borderRadius: 8 }} />
          </div>
          <div className="logo-info">
            <div className="name">هلدینگ بشری</div>
            <div className="sub">Executive Dashboard</div>
          </div>
        </div>
        <div className="hd-right">
          <div className="pill pill-warn" style={{ width: "135px" }}>
            {localDate().fullDate + "  " + dynamicTime}
          </div>
        </div>
      </header>

      <div className="layout">
        <aside className="sidebar">
          {menuItems.map((section) => (
            <div key={section.section} className="nav-section">
              <div className="nav-label">{section.section}</div>
              {section.items.map((item, i) => {
                const hasChildren = Boolean(item.children?.length);
                const isOpen = hasChildren && openMenus[item.href];
                const itemActive = isActive(item.href, pathname);

                return (
                  <div key={item.label + i}>
                    {hasChildren ? (
                      <div
                        className={`nav-item has-children ${itemActive ? "active" : ""}`}
                        onClick={() => toggleMenu(item.href)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(event) => {
                          if (event.key === "Enter" || event.key === " ") {
                            event.preventDefault();
                            toggleMenu(item.href);
                          }
                        }}
                      >
                        <span className="nav-item-left">
                          <span className="nav-icon">{item.icon}</span>
                          {item.label}
                        </span>
                        <span className={`nav-arrow ${isOpen ? "open" : ""}`}>▾</span>
                      </div>
                    ) : (
                      <Link key={item.href} href={item.href} style={{ textDecoration: "none" }}>
                        <div className={`nav-item ${itemActive ? "active" : ""}`}>
                          <span className="nav-icon">{item.icon}</span>
                          {item.label}
                        </div>
                      </Link>
                    )}

                    {hasChildren && isOpen ? (
                      <div className="nav-sublist">
                        {item.children!.map((subItem) => (
                          <Link key={subItem.href} href={subItem.href} style={{ textDecoration: "none" }}>
                            <div className={`nav-subitem ${isActive(subItem.href, pathname) ? "active" : ""}`}>
                              {subItem.label}
                            </div>
                          </Link>
                        ))}
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          ))}
        </aside>

        <main className="main">{children}</main>
      </div>
    </div>
  );
}
