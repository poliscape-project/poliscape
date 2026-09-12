import { PolicyTopic } from "@/types/policy";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://poliscape.vercel.app";

/**
 * サイト全体の共通構造化データ (WebSite & Organization)
 */
export function generateWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${BASE_URL}/#website`,
        "url": BASE_URL,
        "name": "PoliScape (ポリスケープ)",
        "description": "公的データと客観的事実で知る、日本の政策カタログ",
        "publisher": {
          "@id": `${BASE_URL}/#organization`,
        },
        "inLanguage": "ja",
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": `${BASE_URL}/?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "Organization",
        "@id": `${BASE_URL}/#organization`,
        "name": "PoliScape Project",
        "url": BASE_URL,
        "logo": {
          "@type": "ImageObject",
          "url": `${BASE_URL}/og-image.png`,
          "width": 1200,
          "height": 630,
        },
        "sameAs": [
          "https://x.com/poliscape_jp",
          "https://github.com/poliscape-project/poliscape",
        ],
      },
    ],
  };
}

/**
 * 各政策詳細ページ用の構造化データ (Article + BreadcrumbList + FAQPage)
 */
export function generatePolicyJsonLd(policy: PolicyTopic) {
  const policyUrl = `${BASE_URL}/policies/${policy.id}`;
  const ogImageUrl = `${BASE_URL}/policies/${policy.id}/opengraph-image`;

  // 1. パンくずリスト
  const breadcrumbList = {
    "@type": "BreadcrumbList",
    "@id": `${policyUrl}#breadcrumb`,
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "ホーム",
        "item": BASE_URL,
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": policy.categoryLabel || "政策一覧",
        "item": `${BASE_URL}/?category=${policy.category}`,
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": policy.title,
        "item": policyUrl,
      },
    ],
  };

  // 2. 記事 / 公的政策解説 (Article)
  const citations = (policy.sources || []).map((source) => ({
    "@type": "CreativeWork",
    "name": source.title,
    "url": source.url,
    "publisher": {
      "@type": "Organization",
      "name": source.organization,
    },
  }));

  const article = {
    "@type": "Article",
    "@id": `${policyUrl}#article`,
    "isPartOf": {
      "@id": `${BASE_URL}/#website`,
    },
    "headline": policy.title,
    "description": policy.catchphrase || policy.summary?.standard?.[0] || "",
    "dateModified": policy.lastUpdated,
    "mainEntityOfPage": policyUrl,
    "image": [ogImageUrl],
    "inLanguage": "ja",
    "author": {
      "@type": "Organization",
      "name": "PoliScape Project",
      "url": BASE_URL,
    },
    "publisher": {
      "@type": "Organization",
      "name": "PoliScape (ポリスケープ)",
      "url": BASE_URL,
      "logo": {
        "@type": "ImageObject",
        "url": `${BASE_URL}/og-image.png`,
      },
    },
    ...(citations.length > 0 ? { "citation": citations } : {}),
  };

  // 3. FAQPage (Google検索結果にQ&Aスニペットを表示)
  const faqItems: { question: string; answer: string }[] = [];

  // Q1: 主な変更点
  if (policy.changes && policy.changes.length > 0) {
    const changesText = policy.changes
      .slice(0, 4)
      .map((c) => `【${c.topic}】${c.before} → ${c.after}`)
      .join("\n");
    faqItems.push({
      question: `${policy.title}の主な変更点（新旧のちがい）は何ですか？`,
      answer: changesText,
    });
  }

  // Q2: メリット・賛成意見
  if (policy.perspectives?.benefits && policy.perspectives.benefits.length > 0) {
    const benefitsText = policy.perspectives.benefits
      .slice(0, 3)
      .map((b) => `・${b.title}: ${b.summary}`)
      .join("\n");
    faqItems.push({
      question: `${policy.title}に期待されている主な効果・メリットは何ですか？`,
      answer: benefitsText,
    });
  }

  // Q3: 課題・懸念点
  if (policy.perspectives?.challenges && policy.perspectives.challenges.length > 0) {
    const challengesText = policy.perspectives.challenges
      .slice(0, 3)
      .map((c) => `・${c.title}: ${c.summary}`)
      .join("\n");
    faqItems.push({
      question: `${policy.title}に関してどのような課題や懸念点が議論されていますか？`,
      answer: challengesText,
    });
  }

  const faqPage =
    faqItems.length > 0
      ? {
          "@type": "FAQPage",
          "@id": `${policyUrl}#faq`,
          "mainEntity": faqItems.map((item) => ({
            "@type": "Question",
            "name": item.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": item.answer,
            },
          })),
        }
      : null;

  return {
    "@context": "https://schema.org",
    "@graph": [breadcrumbList, article, ...(faqPage ? [faqPage] : [])],
  };
}
