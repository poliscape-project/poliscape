import React from "react";
import type { Metadata } from "next";
import { LifeEventsIndexView } from "@/components/LifeEventsIndexView";

export const metadata: Metadata = {
  title: "くらしの逆引きガイド — 人生のできごとから政策を探す | 日本政策図鑑",
  description: "出産・子育て、就職・転職、住まい、病気・ケガ、年金・老後など、人生のできごとやお困りごとから関連する国の制度・政策を逆引きで探せます。",
  openGraph: {
    title: "くらしの逆引きガイド — 人生のできごとから政策を探す | 日本政策図鑑",
    description: "出産・子育て、就職・転職、住まい、病気・ケガ、年金・老後など、人生のできごとやお困りごとから関連する国の制度・政策を逆引きで探せます。",
    images: [
      {
        url: "/brand/x_header.jpg",
        width: 1200,
        height: 675,
        alt: "くらしの逆引きガイド | 日本政策図鑑",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "くらしの逆引きガイド — 人生のできごとから政策を探す | 日本政策図鑑",
    description: "出産・子育て、就職・転職、住まい、病気・ケガ、年金・老後など、人生のできごとやお困りごとから関連する国の制度・政策を逆引きで探せます。",
    images: ["/brand/x_header.jpg"],
  },
};

export default function LifeEventsPage() {
  return <LifeEventsIndexView />;
}
