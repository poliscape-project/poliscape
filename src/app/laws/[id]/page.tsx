import React from "react";
import { notFound } from "next/navigation";
import { getAllFoundationLaws, getFoundationLawById, getPolicyIdsByLawId } from "@/lib/laws";
import { getPolicyById } from "@/lib/policies";
import { LawDetailView } from "@/components/LawDetailView";
import { PolicyTopic } from "@/types/policy";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const laws = getAllFoundationLaws();
  return laws.map((law) => ({
    id: law.id,
  }));
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const law = getFoundationLawById(id);
  if (!law) {
    return {
      title: "法律が見つかりません | 日本政策図鑑",
    };
  }

  return {
    title: `${law.name} の要点・課題と関連政策 | 日本政策図鑑`,
    description: law.catchphrase,
    openGraph: {
      title: `${law.name} の要点・課題と関連政策 | 日本政策図鑑`,
      description: law.catchphrase,
      images: [
        {
          url: "/brand/x_header.jpg",
          width: 1200,
          height: 675,
          alt: law.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${law.name} の要点・課題と関連政策 | 日本政策図鑑`,
      description: law.catchphrase,
      images: ["/brand/x_header.jpg"],
    },
  };
}

export default async function LawDetailPage({ params }: PageProps) {
  const { id } = await params;
  const law = getFoundationLawById(id);

  if (!law) {
    notFound();
  }

  // この法律に紐づく関連政策を取得
  const policyIds = getPolicyIdsByLawId(law.id);
  const relatedPolicies: PolicyTopic[] = policyIds
    .map((pId) => getPolicyById(pId))
    .filter((p): p is PolicyTopic => p !== undefined);

  return <LawDetailView law={law} relatedPolicies={relatedPolicies} />;
}
