import type { Metadata } from "next";
import { cinzel, notoSerif, inter } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tarotism — AI-Powered Tarot Reading",
  description:
    "ดูดวงไพ่ทาโรต์ด้วย AI ตีความอย่างลึกซึ้ง เลือกหัวข้อ สุ่มไพ่ และรับคำทำนายแบบ Real-time",
  keywords: ["tarot", "ไพ่ทาโรต์", "ดูดวง", "AI", "fortune telling"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th" className={`${cinzel.variable} ${notoSerif.variable} ${inter.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="bg-surface text-on-surface antialiased">
        {children}
      </body>
    </html>
  );
}
