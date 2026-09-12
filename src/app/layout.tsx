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
    default: "PoliScape ポリスケープ | 公的データと客観的事実で知る、日本の政策カタログ",
    template: "%s | PoliScape ポリスケープ",
  },
  description: "公的データと客観的事実で知る、日本の政策カタログ。500件以上の政策を両論併記・一次情報ソース付きでわかりやすく解説するシビックテックツール。",
  keywords: ["政策", "政治", "シビックテック", "給付金", "減税", "一次情報", "両論併記", "ポリスケープ", "PoliScape"],
  authors: [{ name: "PoliScape Project" }],
  creator: "PoliScape Project",
  publisher: "PoliScape Project",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://poliscape.vercel.app"),
  openGraph: {
    title: "PoliScape ポリスケープ | 公的データと客観的事実で知る、日本の政策カタログ",
    description: "公的データと客観的事実で知る、日本の政策カタログ。500件以上の政策を両論併記・一次情報ソース付きでわかりやすく解説。",
    siteName: "PoliScape ポリスケープ",
    locale: "ja_JP",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PoliScape ポリスケープ - 公的データと客観的事実で知る、日本の政策カタログ",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PoliScape ポリスケープ | 公的データと客観的事実で知る、日本の政策カタログ",
    description: "公的データと客観的事実で知る、日本の政策カタログ。500件以上の政策を両論併記・一次情報ソース付きでわかりやすく解説。",
    images: ["/og-image.png"],
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
