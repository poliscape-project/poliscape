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
  organization?: string; // 例: こども家庭庁、内閣府、国会会議録
  title: string;
  url: string;
  date?: string;
  type?: "official_document" | "press_release" | "diet_minutes" | "white_paper" | string;
  typeLabel?: string;
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

  // 注目ポイントカード（特大数字・ハイライト4点）
  highlights?: HighlightCardItem[];

  // 市民・関係者の声（両論併記の具体例）
  voices?: VoiceSetItem;

  // 海外主要国のルール比較（国際比較データ）
  international?: PolicyInternationalComparison;
}

export interface InternationalCountryData {
  country: string; // 国名（例: "フランス"）
  countryCode: string; // 国コード（例: "FR"）
  flag: string; // 国旗絵文字（例: "🇫🇷"）
  systemName: string; // 現地制度名（例: "Allocations familiales"）
  amount?: string; // 金額・給付水準
  ageLimit?: string; // 対象年齢・期間
  incomeLimit?: string; // 所得制限の有無と仕組み
  statusOrLevel?: string; // 制度の運用形態や普及状況
  keyFeature: string; // 制度の設計思想・日本との違い（前提条件の解説）
  source: {
    organization: string; // 公的機関名（例: "フランス家族手当金庫 (CAF)"）
    title: string; // 公式資料タイトル
    url: string; // 公式URL
  };
}

export interface PolicyInternationalComparison {
  title: string; // セクション見出し
  comparisonSummary: string; // 各国比較の総括・全体トレンド解説
  countries: InternationalCountryData[];
}

export interface HighlightCardItem {
  labelSimple?: string;
  labelStandard?: string;
  label?: string;
  value: string;
  unit: string;
  oldValue: string;
  description?: string;
  descriptionSimple?: string;
  descriptionStandard?: string;
  badge: string;
  badgeColor: string;
  icon: string; // Lucide icon name, e.g. "Smartphone", "Clock"
}

export interface VoiceEntryItem {
  speaker: string;
  commentStandard: string;
  commentSimple: string;
}

export interface VoiceSetItem {
  benefits: VoiceEntryItem[];
  challenges: VoiceEntryItem[];
}
