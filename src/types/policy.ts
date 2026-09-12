export type PolicyCategory = "childcare" | "education" | "tax" | "pension" | "economy" | "environment" | "healthcare" | "transport" | "labor" | "digital" | "society";

export type PolicyStatus = "enacted" | "discussing" | "proposed";

export interface PolicyChangeItem {
  id: string;
  topic: string;
  before: string;
  after: string;
  highlight?: string;
  icon?: string;
}

export interface PolicyPerspectiveItem {
  id: string;
  title: string;
  summary: string;
  detail: string;
  simpleDetail: string;
  tag: string;
}

export interface PolicyTimelineStep {
  date: string;
  label: string;
  status: "completed" | "current" | "upcoming";
  description: string;
}

export interface PolicySource {
  organization: string; // 例: こども家庭庁、内閣府、国会会議録
  title: string;
  url: string;
  date: string;
  type: "official_document" | "press_release" | "diet_minutes" | "white_paper";
  typeLabel: string;
}

export interface PolicyTopic {
  id: string;
  title: string;
  catchphrase: string;
  category: PolicyCategory;
  categoryLabel: string;
  lastUpdated: string;
  effectiveDate?: string;
  status: PolicyStatus;
  statusLabel: string;

  // 3行でわかる要点まとめ
  summary: {
    standard: string[];
    simple: string[]; // やさしい日本語（ふりがな的配慮、専門用語排除）
  };

  // なぜこの政策が行われるのか（背景・目的）
  background: {
    standard: string;
    simple: string;
  };

  // ビフォーアフター（主な変更点）
  changes: PolicyChangeItem[];

  // 客観的・公平な両論併記（多角的な論点の整理）
  perspectives: {
    benefitsTitle: string; // 例: 「期待されている効果・メリット（賛成側の視点）」
    benefits: PolicyPerspectiveItem[];
    challengesTitle: string; // 例: 「検討されている課題・懸念点（慎重側の視点）」
    challenges: PolicyPerspectiveItem[];
  };

  // 決定までのタイムライン
  timeline: PolicyTimelineStep[];

  // 一次情報ソース（透明性・信頼性の担保）
  sources: PolicySource[];

  // バッジ（トップページのカードに表示する要約タグ）
  badges?: { text: string; color: string }[];
}
