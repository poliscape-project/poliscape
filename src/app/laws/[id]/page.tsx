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
      title: "法律が見つかりません | ポリスケープ",
    };
  }

  return {
    title: `${law.name} の要点・課題と関連政策 | ポリスケープ`,
    description: law.catchphrase,
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
