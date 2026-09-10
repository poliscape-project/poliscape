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
  title: {
    default: "ポリスケープ (PoliScape) | 公的データで知る、くらしと政策",
    template: "%s | ポリスケープ (PoliScape)",
  },
  description: "対立をあおらず、公的データ（一次情報）に基づいて政策のメリット・課題をわかりやすく伝える初心者向け政策可視化シビックテックツール",
  keywords: ["政策", "政治", "シビックテック", "給付金", "減税", "一次情報", "両論併記", "ポリスケープ"],
  authors: [{ name: "PoliScape Project" }],
  creator: "PoliScape Project",
  publisher: "PoliScape Project",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://poliscape.vercel.app"),
  openGraph: {
    title: "ポリスケープ (PoliScape) | 公的データで知る、くらしと政策",
    description: "対立をあおらず、公的データに基づいて政策のメリット・課題をわかりやすく伝えるシビックテックツール",
    siteName: "ポリスケープ (PoliScape)",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ポリスケープ (PoliScape) | 公的データで知る、くらしと政策",
    description: "対立をあおらず、公的データに基づいて政策のメリット・課題をわかりやすく伝えるシビックテックツール",
  },
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
