import React from "react";
import { getAllFoundationLaws, getPolicyCountByLawId } from "@/lib/laws";
import { LawsIndexView, LawWithCount } from "@/components/LawsIndexView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "根拠法・基本ルールアーカイブ（主要53法律） | ポリスケープ",
  description: "日々の政策や制度改革の土台となっている国の主要53法律を一覧化。制定の目的、現代の課題、基本ルール3点と関連政策をわかりやすく解説します。",
  openGraph: {
    title: "根拠法・基本ルールアーカイブ（主要53法律） | ポリスケープ",
    description: "日々の政策や制度改革の土台となっている国の主要53法律を一覧化。制定の目的、現代の課題、基本ルール3点と関連政策をわかりやすく解説します。",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "根拠法アーカイブ | ポリスケープ",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "根拠法・基本ルールアーカイブ（主要53法律） | ポリスケープ",
    description: "日々の政策や制度改革の土台となっている国の主要53法律を一覧化。制定の目的、現代の課題、基本ルール3点と関連政策をわかりやすく解説します。",
    images: ["/og-image.png"],
  },
};

export default function LawsPage() {
  const laws = getAllFoundationLaws();

  const lawsWithCount: LawWithCount[] = laws.map((law) => ({
    ...law,
    policyCount: getPolicyCountByLawId(law.id),
  }));

  return <LawsIndexView initialLaws={lawsWithCount} />;
}
