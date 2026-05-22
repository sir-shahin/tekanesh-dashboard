'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Logo from "@/assets/logo.jpg"

const menuItems = [
  { section: 'نمای کلی', items: [
    { href: '/dashboard', icon: '📊', label: 'داشبورد' },
    { href: '/history', icon: '📅', label: 'تاریخچه ماه‌ها' }
  ]},
  { section: 'کسب‌وکارها', items: [
    { href: '/grouplancing', icon: '💼', label: 'گروپلنسینگ' },
    { href: '/tekanesh', icon: '🎓', label: 'تکانش' }
  ]},
  { section: 'مالی و تیم', items: [
    { href: '/liquidity', icon: '💰', label: 'نقدینگی' },
    { href: '/team', icon: '👥', label: 'تیم' },
    { href: '/risks', icon: '⚠️', label: 'ریسک‌ها' }
  ]},
  { section: 'سیستم', items: [
    { href: '/import', icon: '📂', label: 'ورود داده' },
    { href: '/apisettings', icon: '🔌', label: 'تنظیمات API' }
  ]}
];

const isActive = (href: string, pathname: string) => {
  if (href === '/') return pathname === '/';
  return pathname.startsWith(href);
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="app">
      <header>
        <div className="logo">
          <div className="logo-mark">
            <Image src={Logo.src} width={35} height={35} alt="boshra" style={{borderRadius:8}}/>
          </div>
          <div className="logo-info">
            <div className="name">هلدینگ بشری</div>
            <div className="sub">Executive Dashboard</div>
          </div>
        </div>
        <div className="hd-right">
          <div className="pill pill-warn">در حال بازیابی</div>
          <div className="hd-time" id="clock">—</div>
        </div>
      </header>

      <div className="layout">
        <aside className="sidebar">
          {menuItems.map((section) => (
            <div key={section.section} className="nav-section">
              <div className="nav-label">{section.section}</div>
              {section.items.map((item) => (
                <Link key={item.href} href={item.href} style={{ textDecoration: 'none' }}>
                  <div className={`nav-item ${isActive(item.href, pathname) ? 'active' : ''}`}>
                    <span className="nav-icon">{item.icon}</span>
                    {item.label}
                  </div>
                </Link>
              ))}
            </div>
          ))}
        </aside>

        <main className="main">{children}</main>
      </div>
    </div>
  );
}
