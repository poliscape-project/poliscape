import React from "react";
import type { Metadata } from "next";
import { LifeEventsIndexView } from "@/components/LifeEventsIndexView";

export const metadata: Metadata = {
  title: "くらしの逆引きガイド — 人生のできごとから政策を探す | ポリスケープ",
  description: "出産・子育て、就職・転職、住まい、病気・ケガ、年金・老後など、人生のできごとやお困りごとから関連する国の制度・政策を逆引きで探せます。",
  openGraph: {
    title: "くらしの逆引きガイド — 人生のできごとから政策を探す | ポリスケープ",
    description: "出産・子育て、就職・転職、住まい、病気・ケガ、年金・老後など、人生のできごとやお困りごとから関連する国の制度・政策を逆引きで探せます。",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "くらしの逆引きガイド | ポリスケープ",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "くらしの逆引きガイド — 人生のできごとから政策を探す | ポリスケープ",
    description: "出産・子育て、就職・転職、住まい、病気・ケガ、年金・老後など、人生のできごとやお困りごとから関連する国の制度・政策を逆引きで探せます。",
    images: ["/og-image.png"],
  },
};

export default function LifeEventsPage() {
  return <LifeEventsIndexView />;
}
