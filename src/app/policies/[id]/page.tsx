import React from "react";
import { notFound } from "next/navigation";
import { getAllPolicies, getPolicyById } from "@/lib/policies";
import { PolicyDetailView } from "@/components/PolicyDetailView";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const policies = getAllPolicies();
  return policies.map((policy) => ({
    id: policy.id,
  }));
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const policy = getPolicyById(id);
  if (!policy) {
    return {
      title: "政策が見つかりません | ポリスケープ",
    };
  }

  return {
    title: `${policy.title} | ポリスケープ (PoliScape)`,
    description: policy.catchphrase,
  };
}

export default async function PolicyDetailPage({ params }: PageProps) {
  const { id } = await params;
  const policy = getPolicyById(id);

  if (!policy) {
    notFound();
  }

  return <PolicyDetailView policy={policy} />;
}
