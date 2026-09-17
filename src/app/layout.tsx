import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "日本政策図鑑 | くらしに関わる国のルールを、データと図解で",
    template: "%s | 日本政策図鑑",
  },
  description: "くらしに関わる国のルールを、データと図解で。1500件以上の政策を両論併記・一次情報ソース付きでわかりやすく解説するシビックテックツール。",
  keywords: ["政策", "制度", "日本政策図鑑", "シビックテック", "給付金", "減税", "一次情報", "両論併記", "国のルール", "法律"],
  authors: [{ name: "日本政策図鑑" }],
  creator: "日本政策図鑑",
  publisher: "日本政策図鑑",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://poliscape.vercel.app"),
  openGraph: {
    title: "日本政策図鑑 | くらしに関わる国のルールを、データと図解で",
    description: "くらしに関わる国のルールを、データと図解で。1500件以上の政策を両論併記・一次情報ソース付きでわかりやすく解説。",
    siteName: "日本政策図鑑",
    locale: "ja_JP",
    type: "website",
    images: [
      {
        url: "/brand/x_header.jpg",
        width: 1200,
        height: 675,
        alt: "日本政策図鑑 - くらしに関わる国のルールを、データと図解で",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "日本政策図鑑 | くらしに関わる国のルールを、データと図解で",
    description: "くらしに関わる国のルールを、データと図解で。1500件以上の政策を両論併記・一次情報ソース付きでわかりやすく解説。",
    images: ["/brand/x_header.jpg"],
  },
};

import KeyboardWidgetNav from "@/components/KeyboardWidgetNav";
import { generateWebsiteJsonLd } from "@/lib/jsonld";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const websiteJsonLd = generateWebsiteJsonLd();

  return (
    <html lang="ja" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased">
        <KeyboardWidgetNav />
        {children}
      </body>
    </html>
  );
}
