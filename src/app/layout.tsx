import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/providers";
// import DashboardLayoutComponent from "./(dashboard)/DashboardLayout";

export const metadata: Metadata = {
  title: "پنل هلدینگ بشری",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Providers>
          {/* <DashboardLayoutComponent> */}
          {children}
          {/* </DashboardLayoutComponent> */}
        </Providers>
      </body>
    </html>
  );
}
