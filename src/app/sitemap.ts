import type { MetadataRoute } from "next";
import { getAllPolicies } from "@/lib/policies";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://poliscape.vercel.app";
  const policies = getAllPolicies();

  const policyUrls = policies.map((policy) => ({
    url: `${baseUrl}/policies/${policy.id}`,
    lastModified: new Date(policy.lastUpdated || new Date()),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    ...policyUrls,
  ];
}
