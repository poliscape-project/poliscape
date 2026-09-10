import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ポリスケープ (PoliScape) | 公的データで知る、くらしと政策",
  description: "対立をあおらず、公的データ（一次情報）に基づいて政策のメリット・課題をわかりやすく伝える初心者向け政策可視化シビックテックツール",
};

import KeyboardWidgetNav from "@/components/KeyboardWidgetNav";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased">
        <KeyboardWidgetNav />
        {children}
      </body>
    </html>
  );
}
