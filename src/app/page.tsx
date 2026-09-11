"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { getAllPolicies } from "@/lib/policies";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Baby,
  GraduationCap,
  Wallet,
  HeartPulse,
  Scale,
  CheckCircle2,
  Car,
  Shield,
  Briefcase, Trees, Leaf, Hotel, BookOpen, Ban, Smartphone,
  Search, X, LayoutGrid, List, ChevronDown, Clock, RotateCcw,
  ArrowUpDown, Users, Landmark
} from "lucide-react";

// シミュレーターまたは判定ナビが実装されている主要37テーマ
const SIMULATOR_POLICY_IDS = new Set([
  "child-allowance-expansion",
  "university-tuition-waiver",
  "income-barrier",
  "myna-health-insurance",
  "new-nisa",
  "furusato-tax",
  "invoice-system",
  "pension-start-age",
  "zaishoku-pension",
  "elderly-healthcare-cost",
  "childcare-leave-benefit",
  "energy-subsidies",
  "childcare-support-fund",
  "inheritance-registration",
  "myna-drivers-license",
  "severance-pay-tax",
  "gasoline-subsidies-trigger",
  "nursing-care-copay",
  "electric-kickboard-rules",
  "school-lunch-free",
  "ideco-expansion",
  "kodomo-daretemo-tsuen",
  "high-school-tuition-free",
  "pension-contribution-45years",
  "abandoned-house-tax-hike",
  "accommodation-tax-tourism",
  "forest-environment-tax",
  "customer-harassment-prevention",
  "reskilling-education-benefit",
  "income-barrier-career-up",
  "financial-income-tax",
  "high-cost-medical-cap",
  "bicycle-blue-ticket",
  "paternity-leave-at-birth",
  "solar-panel-mandate",
  "otc-similar-drug-restriction",
  "stealth-marketing-regulation"
]);

// カテゴリごとの表示名称とアイコンのマッピング設定（全20カテゴリ完全対応）
const CATEGORY_CONFIG: Record<
  string,
  { label: string; icon: React.ElementType; order: number }
> = {
  economy: { label: "経済・産業・消費", icon: Scale, order: 1 },
  tax: { label: "税金・お金", icon: Wallet, order: 2 },
  childcare: { label: "子育て・家族", icon: Baby, order: 3 },
  healthcare: { label: "医療・健康・福祉", icon: HeartPulse, order: 4 },
  pension: { label: "年金・老後資産", icon: Wallet, order: 5 },
  education: { label: "教育・学生・人づくり", icon: GraduationCap, order: 6 },
  labor: { label: "働き方・雇用", icon: Briefcase, order: 7 },
  employment: { label: "雇用環境・労働法", icon: Briefcase, order: 8 },
  digital: { label: "デジタル・IT・AI", icon: Smartphone, order: 9 },
  transport: { label: "交通・地域・モビリティ", icon: Car, order: 10 },
  traffic: { label: "交通安全・物流", icon: Car, order: 11 },
  environment: { label: "環境・エネルギー", icon: Leaf, order: 12 },
  living: { label: "住まい・土地・防災", icon: Trees, order: 13 },
  regional: { label: "地方創生・都市", icon: Hotel, order: 14 },
  defense: { label: "外交・安全保障", icon: Shield, order: 15 },
  security: { label: "防衛・国家安全", icon: Shield, order: 16 },
  society: { label: "社会・共生・司法", icon: Users, order: 17 },
  social: { label: "司法・社会規範", icon: Scale, order: 18 },
  governance: { label: "政治・統治改革", icon: Landmark, order: 19 },
  medical: { label: "先端医療・薬事", icon: HeartPulse, order: 20 },
};

export type SortOption = "latest" | "oldest" | "effective" | "simulators" | "title";

export default function HomePage() {
  const [isSimpleMode, setIsSimpleMode] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<"all" | "enacted" | "discussing">("all");
  const [sortOption, setSortOption] = useState<SortOption>("latest");
  const [viewMode, setViewMode] = useState<"grid" | "compact">("grid");
  const [displayCount, setDisplayCount] = useState<number>(24);
  const [isCatExpandedMobile, setIsCatExpandedMobile] = useState<boolean>(false);

  const policies = getAllPolicies();

  // 初回マウント時にURLパラメータからフィルター状態を復元
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const q = params.get("q");
      const status = params.get("status");
      const view = params.get("view");
      const cat = params.get("category");
      const sort = params.get("sort");

      if (q) setSearchQuery(q);
      if (status === "enacted" || status === "discussing") setSelectedStatus(status);
      if (view === "compact" || view === "grid") setViewMode(view);
      if (cat) setSelectedCategory(cat);
      if (
        sort === "latest" ||
        sort === "oldest" ||
        sort === "effective" ||
        sort === "simulators" ||
        sort === "title"
      ) {
        setSortOption(sort as SortOption);
      }
    }
  }, []);

  // フィルター・検索・ソート等の状態をURLクエリに同期（ブラウザ履歴へのプッシュなしのreplaceState）
  useEffect(() => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);

    if (searchQuery.trim()) {
      url.searchParams.set("q", searchQuery.trim());
    } else {
      url.searchParams.delete("q");
    }

    if (selectedCategory !== "all") {
      url.searchParams.set("category", selectedCategory);
    } else {
      url.searchParams.delete("category");
    }

    if (selectedStatus !== "all") {
      url.searchParams.set("status", selectedStatus);
    } else {
      url.searchParams.delete("status");
    }

    if (viewMode !== "grid") {
      url.searchParams.set("view", viewMode);
    } else {
      url.searchParams.delete("view");
    }

    if (sortOption !== "latest") {
      url.searchParams.set("sort", sortOption);
    } else {
      url.searchParams.delete("sort");
    }

    window.history.replaceState({}, "", url.pathname + url.search);
  }, [searchQuery, selectedCategory, selectedStatus, viewMode, sortOption]);

  const handleToggleSimpleMode = () => {
    setIsSimpleMode((prev) => !prev);
  };

  // policiesデータから全カテゴリを動的に収集・生成（全20カテゴリ完全対応）
  const categories = useMemo(() => {
    const catCountMap = new Map<string, number>();
    const catFallbackLabels = new Map<string, string>();

    policies.forEach((p) => {
      catCountMap.set(p.category, (catCountMap.get(p.category) || 0) + 1);
      if (!catFallbackLabels.has(p.category) && p.categoryLabel) {
        catFallbackLabels.set(p.category, p.categoryLabel);
      }
    });

    const list = Array.from(catCountMap.entries()).map(([id, count]) => {
      const config = CATEGORY_CONFIG[id];
      return {
        id,
        label: config?.label || catFallbackLabels.get(id) || id,
        icon: config?.icon || Sparkles,
        count,
        order: config?.order ?? 999,
      };
    });

    // 件数が多い順にソート（同数ならorder順）
    list.sort((a, b) => {
      if (b.count !== a.count) return b.count - a.count;
      return a.order - b.order;
    });

    return [
      {
        id: "all",
        label: "すべての政策",
        icon: Sparkles,
        count: policies.length,
        order: 0,
      },
      ...list,
    ];
  }, [policies]);

  // 政策ごとの代表バッジマッピング
  const badgeMap: Record<string, { text: string; color: string }[]> = {
  // 第15弾（注目政策40テーマ追加・全300政策）
  "online-medical-care-first-visit-deregulation": [
    { text: "初診恒久化", color: "bg-blue-50 text-blue-700 border-blue-200" },
    { text: "処方薬宅配", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    { text: "不適切処方防止", color: "bg-rose-50 text-rose-700 border-rose-200" }
  ],
  "electronic-prescriptions-refill-prescriptions-promotion": [
    { text: "電子処方箋", color: "bg-indigo-50 text-indigo-700 border-indigo-200" },
    { text: "リフィル最大3回", color: "bg-teal-50 text-teal-700 border-teal-200" },
    { text: "重複投薬防止", color: "bg-emerald-50 text-emerald-700 border-emerald-200" }
  ],
  "primary-care-physician-reporting-system": [
    { text: "かかりつけ機能", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    { text: "2025年4月施行", color: "bg-blue-50 text-blue-700 border-blue-200" },
    { text: "受診先公表", color: "bg-teal-50 text-teal-700 border-teal-200" }
  ],
  "designated-intractable-diseases-genome-drug-discovery": [
    { text: "340疾患超助成", color: "bg-purple-50 text-purple-700 border-purple-200" },
    { text: "ゲノム創薬", color: "bg-blue-50 text-blue-700 border-blue-200" },
    { text: "高額薬価管理", color: "bg-amber-50 text-amber-700 border-amber-200" }
  ],
  "ambulance-service-fee-charge-triage": [
    { text: "軽症有料化議論", color: "bg-rose-50 text-rose-700 border-rose-200" },
    { text: "選定療養費徴収", color: "bg-amber-50 text-amber-700 border-amber-200" },
    { text: "#7119全国網羅", color: "bg-blue-50 text-blue-700 border-blue-200" }
  ],
  "nipt-prenatal-testing-accreditation-guidelines": [
    { text: "出生前検査認証", color: "bg-pink-50 text-pink-700 border-pink-200" },
    { text: "遺伝カウンセリング", color: "bg-purple-50 text-purple-700 border-purple-200" },
    { text: "無認証対策", color: "bg-rose-50 text-rose-700 border-rose-200" }
  ],
  "hpv-vaccine-male-vaccination-public-subsidy": [
    { text: "男子HPV公費助成", color: "bg-teal-50 text-teal-700 border-teal-200" },
    { text: "中咽頭がん予防", color: "bg-blue-50 text-blue-700 border-blue-200" },
    { text: "集団免疫構築", color: "bg-emerald-50 text-emerald-700 border-emerald-200" }
  ],
  "long-term-care-insurance-copayment-increase-review": [
    { text: "介護自己負担2割", color: "bg-rose-50 text-rose-700 border-rose-200" },
    { text: "現役世代負担減", color: "bg-blue-50 text-blue-700 border-blue-200" },
    { text: "2027年改定焦点", color: "bg-amber-50 text-amber-700 border-amber-200" }
  ],
  "reskilling-job-training-individual-subsidy-expansion": [
    { text: "リスキリング最大80%", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    { text: "5年1兆円枠", color: "bg-blue-50 text-blue-700 border-blue-200" },
    { text: "個人直接給付", color: "bg-indigo-50 text-indigo-700 border-indigo-200" }
  ],
  "domestic-workers-housekeeping-labor-standards-act": [
    { text: "労基法適用へ", color: "bg-indigo-50 text-indigo-700 border-indigo-200" },
    { text: "70年ぶり見直し", color: "bg-purple-50 text-purple-700 border-purple-200" },
    { text: "待機時間適正化", color: "bg-teal-50 text-teal-700 border-teal-200" }
  ],
  "short-time-workers-social-insurance-expansion-all-firms": [
    { text: "社保規模要件撤廃", color: "bg-blue-50 text-blue-700 border-blue-200" },
    { text: "将来年金底上げ", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    { text: "中小企業折半負担", color: "bg-amber-50 text-amber-700 border-amber-200" }
  ],
  "senior-employment-securing-measures-age-70-mandate": [
    { text: "70歳就業義務化論", color: "bg-indigo-50 text-indigo-700 border-indigo-200" },
    { text: "生涯現役社会", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    { text: "業務委託・創業支援", color: "bg-blue-50 text-blue-700 border-blue-200" }
  ],
  "job-hunting-harassment-student-protection-regulations": [
    { text: "就活セクハラ防止", color: "bg-rose-50 text-rose-700 border-rose-200" },
    { text: "就活生法的保護", color: "bg-indigo-50 text-indigo-700 border-indigo-200" },
    { text: "オワハラ規制", color: "bg-amber-50 text-amber-700 border-amber-200" }
  ],
  "discretionary-labor-system-scope-expansion-health": [
    { text: "裁量労働同意必須", color: "bg-teal-50 text-teal-700 border-teal-200" },
    { text: "M&A・企画追加", color: "bg-blue-50 text-blue-700 border-blue-200" },
    { text: "インターバル義務", color: "bg-emerald-50 text-emerald-700 border-emerald-200" }
  ],
  "multiple-job-holders-workers-accident-compensation": [
    { text: "副業労災全合算", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    { text: "複数賃金補償", color: "bg-blue-50 text-blue-700 border-blue-200" },
    { text: "過労死合算判定", color: "bg-purple-50 text-purple-700 border-purple-200" }
  ],
  "resignation-agency-service-legal-framework-regulation": [
    { text: "退職代行法規制", color: "bg-amber-50 text-amber-700 border-amber-200" },
    { text: "非弁行為線引き", color: "bg-rose-50 text-rose-700 border-rose-200" },
    { text: "即日退職の自由", color: "bg-blue-50 text-blue-700 border-blue-200" }
  ],
  "food-agriculture-rural-basic-act-food-security-emergency": [
    { text: "食料有事増産指示", color: "bg-amber-50 text-amber-700 border-amber-200" },
    { text: "25年ぶり基本法改正", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    { text: "コスト適正転嫁", color: "bg-blue-50 text-blue-700 border-blue-200" }
  ],
  "smart-agriculture-promotion-act-ai-robot-tractors": [
    { text: "無人トラクター", color: "bg-cyan-50 text-cyan-700 border-cyan-200" },
    { text: "スマート農業法", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    { text: "税制・低利融資", color: "bg-blue-50 text-blue-700 border-blue-200" }
  ],
  "organic-farming-expansion-school-lunch-local-produce": [
    { text: "有機給食推進", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    { text: "2050年25%目標", color: "bg-teal-50 text-teal-700 border-teal-200" },
    { text: "みどりの食料戦略", color: "bg-green-50 text-green-700 border-green-200" }
  ],
  "farmland-intermediary-management-bank-consolidation": [
    { text: "農地バンク集約", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    { text: "地域計画10年地図", color: "bg-blue-50 text-blue-700 border-blue-200" },
    { text: "所有者不明農地裁定", color: "bg-indigo-50 text-indigo-700 border-indigo-200" }
  ],
  "total-allowable-catch-tac-marine-resources-management": [
    { text: "TAC漁獲枠拡大", color: "bg-blue-50 text-blue-700 border-blue-200" },
    { text: "IQ個別割当方式", color: "bg-indigo-50 text-indigo-700 border-indigo-200" },
    { text: "未成魚保護", color: "bg-teal-50 text-teal-700 border-teal-200" }
  ],
  "forest-environment-tax-nationwide-collection-fund-usage": [
    { text: "森林税年1000円", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    { text: "放置林間伐整備", color: "bg-teal-50 text-teal-700 border-teal-200" },
    { text: "使途公表義務化", color: "bg-amber-50 text-amber-700 border-amber-200" }
  ],
  "wild-boar-deer-damage-prevention-gibier-utilization": [
    { text: "鳥獣捕獲報奨金", color: "bg-amber-50 text-amber-700 border-amber-200" },
    { text: "ICT罠・ドローン", color: "bg-blue-50 text-blue-700 border-blue-200" },
    { text: "国産ジビエ認証", color: "bg-emerald-50 text-emerald-700 border-emerald-200" }
  ],
  "plastic-resource-circulation-amenity-fee-expansion": [
    { text: "使い捨てプラ12品目", color: "bg-teal-50 text-teal-700 border-teal-200" },
    { text: "スプーン有料化", color: "bg-amber-50 text-amber-700 border-amber-200" },
    { text: "製品プラ一括回収", color: "bg-emerald-50 text-emerald-700 border-emerald-200" }
  ],
  "doctoral-students-postdoc-living-allowance-support": [
    { text: "博士生活費年240万", color: "bg-indigo-50 text-indigo-700 border-indigo-200" },
    { text: "SPRING事業3倍", color: "bg-blue-50 text-blue-700 border-blue-200" },
    { text: "研究力再生", color: "bg-purple-50 text-purple-700 border-purple-200" }
  ],
  "space-basic-act-one-trillion-yen-space-strategy-fund": [
    { text: "宇宙戦略基金1兆円", color: "bg-purple-50 text-purple-700 border-purple-200" },
    { text: "民生ロケット支援", color: "bg-indigo-50 text-indigo-700 border-indigo-200" },
    { text: "デュアルユース推進", color: "bg-blue-50 text-blue-700 border-blue-200" }
  ],
  "club-activities-regional-transition-middle-school": [
    { text: "部活動地域移行", color: "bg-blue-50 text-blue-700 border-blue-200" },
    { text: "教員休日負担ゼロ", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    { text: "地域クラブ会費制", color: "bg-amber-50 text-amber-700 border-amber-200" }
  ],
  "kyutokuho-teacher-salary-special-measures-reform": [
    { text: "教職調整額10%超へ", color: "bg-indigo-50 text-indigo-700 border-indigo-200" },
    { text: "給特法50年ぶり改定", color: "bg-blue-50 text-blue-700 border-blue-200" },
    { text: "定額働かせ放題論争", color: "bg-rose-50 text-rose-700 border-rose-200" }
  ],
  "school-lunch-complete-free-provision-nationwide": [
    { text: "給食完全無償化論", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    { text: "年5万円負担解消", color: "bg-teal-50 text-teal-700 border-teal-200" },
    { text: "全国一律国費支援", color: "bg-blue-50 text-blue-700 border-blue-200" }
  ],
  "higher-education-free-tuition-stem-priority-allocation": [
    { text: "理系無償化年収600万", color: "bg-cyan-50 text-cyan-700 border-cyan-200" },
    { text: "文理差額上乗せ", color: "bg-blue-50 text-blue-700 border-blue-200" },
    { text: "理系学生比率5割へ", color: "bg-indigo-50 text-indigo-700 border-indigo-200" }
  ],
  "special-needs-education-inclusive-education-support-staff": [
    { text: "特別支援員7万人", color: "bg-purple-50 text-purple-700 border-purple-200" },
    { text: "インクルーシブ教育", color: "bg-teal-50 text-teal-700 border-teal-200" },
    { text: "通常学級サポート", color: "bg-emerald-50 text-emerald-700 border-emerald-200" }
  ],
  "generative-ai-education-guidelines-school-use": [
    { text: "学校AIガイドライン", color: "bg-indigo-50 text-indigo-700 border-indigo-200" },
    { text: "探究・英語対話", color: "bg-blue-50 text-blue-700 border-blue-200" },
    { text: "感想文丸写し禁止", color: "bg-rose-50 text-rose-700 border-rose-200" }
  ],
  "local-autonomy-act-revision-national-directive-power": [
    { text: "非常時国の指示権", color: "bg-rose-50 text-rose-700 border-rose-200" },
    { text: "地方自治法改正", color: "bg-amber-50 text-amber-700 border-amber-200" },
    { text: "地方分権後退懸念", color: "bg-purple-50 text-purple-700 border-purple-200" }
  ],
  "unmanaged-abandoned-houses-tax-break-removal-enforcement": [
    { text: "管理不全空家6倍増税", color: "bg-rose-50 text-rose-700 border-rose-200" },
    { text: "特定空家代執行", color: "bg-amber-50 text-amber-700 border-amber-200" },
    { text: "900万戸対策", color: "bg-blue-50 text-blue-700 border-blue-200" }
  ],
  "level-4-autonomous-driving-rural-bus-service": [
    { text: "レベル4完全無人バス", color: "bg-cyan-50 text-cyan-700 border-cyan-200" },
    { text: "遠隔監視システム", color: "bg-blue-50 text-blue-700 border-blue-200" },
    { text: "過疎地交通維持", color: "bg-emerald-50 text-emerald-700 border-emerald-200" }
  ],
  "local-railway-reconstruction-council-bus-transition": [
    { text: "再構築協議会", color: "bg-indigo-50 text-indigo-700 border-indigo-200" },
    { text: "輸送密度1000人未満", color: "bg-rose-50 text-rose-700 border-rose-200" },
    { text: "BRT専用道転換", color: "bg-teal-50 text-teal-700 border-teal-200" }
  ],
  "ride-sharing-complete-deregulation-private-drivers": [
    { text: "ライドシェア全面解禁", color: "bg-blue-50 text-blue-700 border-blue-200" },
    { text: "IT企業参入議論", color: "bg-indigo-50 text-indigo-700 border-indigo-200" },
    { text: "タクシー不足解消", color: "bg-emerald-50 text-emerald-700 border-emerald-200" }
  ],
  "tokuryu-yami-baito-crackdown-wiretapping-regulations": [
    { text: "トクリュウ重点対策", color: "bg-rose-50 text-rose-700 border-rose-200" },
    { text: "通信傍受対象拡大", color: "bg-purple-50 text-purple-700 border-purple-200" },
    { text: "SNS募集即時削除", color: "bg-amber-50 text-amber-700 border-amber-200" }
  ],
  "bicycle-traffic-violation-blue-ticket-penalty-system": [
    { text: "自転車青切符導入", color: "bg-blue-50 text-blue-700 border-blue-200" },
    { text: "反則金5000円〜", color: "bg-amber-50 text-amber-700 border-amber-200" },
    { text: "16歳以上110違反", color: "bg-rose-50 text-rose-700 border-rose-200" }
  ],
  "active-cyber-defense-legal-framework-national-security": [
    { text: "能動的サイバー防御", color: "bg-purple-50 text-purple-700 border-purple-200" },
    { text: "先制アクセス無害化", color: "bg-indigo-50 text-indigo-700 border-indigo-200" },
    { text: "通信の秘密と相克", color: "bg-rose-50 text-rose-700 border-rose-200" }
  ],
  // 第16弾（注目政策40テーマ追加・全340政策）
  "smartphone-competition-promotion-act-app-stores": [
    { text: "アプリストア開放", color: "bg-blue-50 text-blue-700 border-blue-200" },
    { text: "外部決済義務化", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    { text: "売上高20%課徴金", color: "bg-rose-50 text-rose-700 border-rose-200" }
  ],
  "nhk-internet-distribution-mandatory-service-fee": [
    { text: "ネット必須業務化", color: "bg-indigo-50 text-indigo-700 border-indigo-200" },
    { text: "アプリ登録で受信料", color: "bg-teal-50 text-teal-700 border-teal-200" },
    { text: "テレビなし世帯対象", color: "bg-amber-50 text-amber-700 border-amber-200" }
  ],
  "deepfake-disinformation-election-interference-regulation": [
    { text: "ディープフェイク規制", color: "bg-purple-50 text-purple-700 border-purple-200" },
    { text: "選挙偽情報対策", color: "bg-rose-50 text-rose-700 border-rose-200" },
    { text: "真正性証明技術", color: "bg-blue-50 text-blue-700 border-blue-200" }
  ],
  "online-platform-defamation-countermeasures-act": [
    { text: "情プラ対処法", color: "bg-blue-50 text-blue-700 border-blue-200" },
    { text: "1週間以内削除判断", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    { text: "詐欺広告・中傷撲滅", color: "bg-rose-50 text-rose-700 border-rose-200" }
  ],
  "residence-card-mynumber-card-unification-act": [
    { text: "特定在留カード", color: "bg-teal-50 text-teal-700 border-teal-200" },
    { text: "入管・自治体一体化", color: "bg-blue-50 text-blue-700 border-blue-200" },
    { text: "偽造在留カード撲滅", color: "bg-emerald-50 text-emerald-700 border-emerald-200" }
  ],
  "drone-level-4-urban-delivery-deregulation": [
    { text: "レベル4有人地帯", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    { text: "都市部配送解禁", color: "bg-blue-50 text-blue-700 border-blue-200" },
    { text: "物流危機・即時配送", color: "bg-indigo-50 text-indigo-700 border-indigo-200" }
  ],
  "foreign-streaming-services-domestic-content-quota": [
    { text: "文化クオータ制", color: "bg-purple-50 text-purple-700 border-purple-200" },
    { text: "外資に国内制作投資", color: "bg-amber-50 text-amber-700 border-amber-200" },
    { text: "アニメ・映画振興", color: "bg-blue-50 text-blue-700 border-blue-200" }
  ],
  "digital-salary-payment-cashless-wage-transfer": [
    { text: "給与デジタル払い", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    { text: "PayPay等へ直送金", color: "bg-teal-50 text-teal-700 border-teal-200" },
    { text: "上限20万・全額保証", color: "bg-blue-50 text-blue-700 border-blue-200" }
  ],
  "crypto-assets-separate-declaration-taxation-reform": [
    { text: "暗号資産20%分離課税", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    { text: "3年損失繰越控除", color: "bg-blue-50 text-blue-700 border-blue-200" },
    { text: "最大55%総合脱却", color: "bg-purple-50 text-purple-700 border-purple-200" }
  ],
  "ideco-age-limit-increase-70-contribution-expansion": [
    { text: "iDeCo70歳引上げ", color: "bg-teal-50 text-teal-700 border-teal-200" },
    { text: "全額所得控除維持", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    { text: "拠出限度額拡大", color: "bg-blue-50 text-blue-700 border-blue-200" }
  ],
  "tower-mansion-tax-loophole-reform-fairness": [
    { text: "タワマン節税適正化", color: "bg-rose-50 text-rose-700 border-rose-200" },
    { text: "時価6割最低ライン", color: "bg-amber-50 text-amber-700 border-amber-200" },
    { text: "4要素補正算定式", color: "bg-blue-50 text-blue-700 border-blue-200" }
  ],
  "credit-card-interchange-fee-transparency-disclosure": [
    { text: "カード手数料開示", color: "bg-indigo-50 text-indigo-700 border-indigo-200" },
    { text: "隠れコスト可視化", color: "bg-teal-50 text-teal-700 border-teal-200" },
    { text: "加盟店負担軽減へ", color: "bg-emerald-50 text-emerald-700 border-emerald-200" }
  ],
  "global-minimum-tax-multinational-corporations-15-percent": [
    { text: "最低法人税率15%", color: "bg-blue-50 text-blue-700 border-blue-200" },
    { text: "タックスヘイブン封殺", color: "bg-indigo-50 text-indigo-700 border-indigo-200" },
    { text: "OECD第2の柱適用", color: "bg-emerald-50 text-emerald-700 border-emerald-200" }
  ],
  "adult-guardianship-system-fundamental-reform-flexibility": [
    { text: "成年後見の抜本見直し", color: "bg-purple-50 text-purple-700 border-purple-200" },
    { text: "スポット・期間後見", color: "bg-teal-50 text-teal-700 border-teal-200" },
    { text: "意思決定支援転換", color: "bg-emerald-50 text-emerald-700 border-emerald-200" }
  ],
  "high-denomination-banknote-phaseout-cashless-promotion": [
    { text: "高額紙幣廃止論", color: "bg-rose-50 text-rose-700 border-rose-200" },
    { text: "100兆円タンス預金", color: "bg-amber-50 text-amber-700 border-amber-200" },
    { text: "地下経済・脱税撲滅", color: "bg-purple-50 text-purple-700 border-purple-200" }
  ],
  "testamentary-substitute-trust-single-elderly-affairs": [
    { text: "おひとりさま信託", color: "bg-teal-50 text-teal-700 border-teal-200" },
    { text: "死後事務・遺品整理", color: "bg-blue-50 text-blue-700 border-blue-200" },
    { text: "身寄りなし高齢支援", color: "bg-emerald-50 text-emerald-700 border-emerald-200" }
  ],
  "gender-wage-gap-disclosure-human-capital-reporting": [
    { text: "男女賃金格差開示", color: "bg-blue-50 text-blue-700 border-blue-200" },
    { text: "有報人的資本3指標", color: "bg-indigo-50 text-indigo-700 border-indigo-200" },
    { text: "女性管理職登用加速", color: "bg-purple-50 text-purple-700 border-purple-200" }
  ],
  "childcare-short-time-work-wage-subsidy-benefit": [
    { text: "育児時短給与10%給付", color: "bg-pink-50 text-pink-700 border-pink-200" },
    { text: "2歳未満手取り補填", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    { text: "2025年4月施行", color: "bg-blue-50 text-blue-700 border-blue-200" }
  ],
  "corporate-spousal-allowance-reduction-income-barrier": [
    { text: "配偶者手当廃止推進", color: "bg-amber-50 text-amber-700 border-amber-200" },
    { text: "子ども手当へシフト", color: "bg-teal-50 text-teal-700 border-teal-200" },
    { text: "就業調整・壁打破", color: "bg-emerald-50 text-emerald-700 border-emerald-200" }
  ],
  "joint-custody-civil-code-revision-2026-enforcement": [
    { text: "共同親権2026年施行", color: "bg-indigo-50 text-indigo-700 border-indigo-200" },
    { text: "77年ぶり民法改正", color: "bg-purple-50 text-purple-700 border-purple-200" },
    { text: "DV時は単独親権", color: "bg-rose-50 text-rose-700 border-rose-200" }
  ],
  "four-day-workweek-public-servants-wage-levels": [
    { text: "週休3日制公務員先行", color: "bg-teal-50 text-teal-700 border-teal-200" },
    { text: "フレックス時間維持", color: "bg-blue-50 text-blue-700 border-blue-200" },
    { text: "給与据置か減額か", color: "bg-amber-50 text-amber-700 border-amber-200" }
  ],
  "freelance-protection-new-act-fair-transactions": [
    { text: "フリーランス新法", color: "bg-blue-50 text-blue-700 border-blue-200" },
    { text: "書面交付・60日払込", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    { text: "買いたたき即時是正", color: "bg-rose-50 text-rose-700 border-rose-200" }
  ],
  "working-hours-interval-system-rest-mandate-debate": [
    { text: "勤務間インターバル", color: "bg-indigo-50 text-indigo-700 border-indigo-200" },
    { text: "連続11時間休息", color: "bg-purple-50 text-purple-700 border-purple-200" },
    { text: "睡眠確保・過労死防ぐ", color: "bg-emerald-50 text-emerald-700 border-emerald-200" }
  ],
  "customer-harassment-prevention-legislation-employers-duty": [
    { text: "カスハラ防止法制化", color: "bg-rose-50 text-rose-700 border-rose-200" },
    { text: "接客・対応拒否公認", color: "bg-indigo-50 text-indigo-700 border-indigo-200" },
    { text: "名札フルネーム廃止", color: "bg-teal-50 text-teal-700 border-teal-200" }
  ],
  "otc-analog-drugs-insurance-exclusion-copayment-increase": [
    { text: "OTC類似薬保険見直し", color: "bg-rose-50 text-rose-700 border-rose-200" },
    { text: "湿布・花粉症薬自費化", color: "bg-amber-50 text-amber-700 border-amber-200" },
    { text: "医療費47兆円抑制", color: "bg-blue-50 text-blue-700 border-blue-200" }
  ],
  "dementia-basic-act-inclusive-society-barrier-free-finance": [
    { text: "認知症基本法施行", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    { text: "金融バリアフリー", color: "bg-teal-50 text-teal-700 border-teal-200" },
    { text: "口座凍結の柔軟化", color: "bg-indigo-50 text-indigo-700 border-indigo-200" }
  ],
  "end-of-life-care-living-will-death-with-dignity-legislation": [
    { text: "尊厳死・延命中止議論", color: "bg-purple-50 text-purple-700 border-purple-200" },
    { text: "リビングウィル法制化", color: "bg-blue-50 text-blue-700 border-blue-200" },
    { text: "医師免責と生命倫理", color: "bg-rose-50 text-rose-700 border-rose-200" }
  ],
  "child-adolescent-psychiatry-beds-shortage-school-counselors": [
    { text: "児童精神科半年待ち救え", color: "bg-rose-50 text-rose-700 border-rose-200" },
    { text: "不登校30万人メンタル", color: "bg-purple-50 text-purple-700 border-purple-200" },
    { text: "SC全校配置・増員", color: "bg-teal-50 text-teal-700 border-teal-200" }
  ],
  "welfare-recipient-medical-assistance-myna-card-mandate": [
    { text: "紙の医療券を廃止", color: "bg-blue-50 text-blue-700 border-blue-200" },
    { text: "生保マイナ保険証移行", color: "bg-teal-50 text-teal-700 border-teal-200" },
    { text: "重複処方・転売防止", color: "bg-emerald-50 text-emerald-700 border-emerald-200" }
  ],
  "hospital-financial-reporting-mandate-bankruptcy-restructuring": [
    { text: "病院経営情報開示義務", color: "bg-indigo-50 text-indigo-700 border-indigo-200" },
    { text: "赤字倒産過去最多水準", color: "bg-rose-50 text-rose-700 border-rose-200" },
    { text: "地域医療再編統合", color: "bg-blue-50 text-blue-700 border-blue-200" }
  ],
  "myalgic-encephalomyelitis-cfs-disease-recognition-support": [
    { text: "ME/CFS指定難病化へ", color: "bg-purple-50 text-purple-700 border-purple-200" },
    { text: "寝たきり慢性疲労", color: "bg-rose-50 text-rose-700 border-rose-200" },
    { text: "コロナ後遺症と連動", color: "bg-blue-50 text-blue-700 border-blue-200" }
  ],
  "lonely-death-prevention-housing-support-monitoring": [
    { text: "孤立死年6.8万人対策", color: "bg-rose-50 text-rose-700 border-rose-200" },
    { text: "居住支援法人制度", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    { text: "スマートメーター見守り", color: "bg-teal-50 text-teal-700 border-teal-200" }
  ],
  "aging-condominium-rebuilding-resolution-threshold-easing": [
    { text: "建替え要件4/5緩和", color: "bg-amber-50 text-amber-700 border-amber-200" },
    { text: "老朽マンション対策", color: "bg-blue-50 text-blue-700 border-blue-200" },
    { text: "所在不明者除外新設", color: "bg-teal-50 text-teal-700 border-teal-200" }
  ],
  "mandatory-ev-charging-facilities-new-buildings": [
    { text: "新築EV充電器義務化", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    { text: "マンション2割設置", color: "bg-blue-50 text-blue-700 border-blue-200" },
    { text: "都条例2025年4月施行", color: "bg-teal-50 text-teal-700 border-teal-200" }
  ],
  "expressway-toll-collection-extension-2115-bridge-aging": [
    { text: "高速料金2115年まで", color: "bg-rose-50 text-rose-700 border-rose-200" },
    { text: "最長50年延長法改正", color: "bg-amber-50 text-amber-700 border-amber-200" },
    { text: "老朽橋梁床版更新", color: "bg-blue-50 text-blue-700 border-blue-200" }
  ],
  "maglev-chuo-shinkansen-delay-shizuoka-water-tunnel": [
    { text: "リニア2027年断念", color: "bg-rose-50 text-rose-700 border-rose-200" },
    { text: "静岡工区・大井川水", color: "bg-blue-50 text-blue-700 border-blue-200" },
    { text: "2034年以降へ延期", color: "bg-amber-50 text-amber-700 border-amber-200" }
  ],
  "regional-airports-concession-privatization-security-staff": [
    { text: "空港民営化・コンセ", color: "bg-indigo-50 text-indigo-700 border-indigo-200" },
    { text: "保安検査員不足・行列", color: "bg-rose-50 text-rose-700 border-rose-200" },
    { text: "CTスマートレーン", color: "bg-teal-50 text-teal-700 border-teal-200" }
  ],
  "geothermal-power-national-parks-deregulation-hot-springs": [
    { text: "国立公園地熱掘削緩和", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    { text: "世界3位資源活用", color: "bg-teal-50 text-teal-700 border-teal-200" },
    { text: "温泉街との共生協定", color: "bg-amber-50 text-amber-700 border-amber-200" }
  ],
  "textile-waste-fast-fashion-recycling-regulations": [
    { text: "売れ残り新品廃棄禁止", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    { text: "年50万トン服ゴミ削減", color: "bg-teal-50 text-teal-700 border-teal-200" },
    { text: "拡大生産者責任EPR", color: "bg-indigo-50 text-indigo-700 border-indigo-200" }
  ],
  "security-clearance-act-economic-security-information-protection": [
    { text: "セキュリティクリアランス", color: "bg-purple-50 text-purple-700 border-purple-200" },
    { text: "身辺調査・適性評価", color: "bg-indigo-50 text-indigo-700 border-indigo-200" },
    { text: "漏洩最高5年懲役", color: "bg-rose-50 text-rose-700 border-rose-200" }
  ],

    "next-gen-nuclear-smr-reactors-development": [{ text: "次世代革新炉・SMR", color: "bg-teal-50 text-teal-800" }, { text: "受動的冷却安全性", color: "bg-emerald-50 text-emerald-800" }, { text: "核のゴミ処分地未定", color: "bg-rose-50 text-rose-800" }],
    "saf-sustainable-aviation-fuel-domestic-supply-mandate": [{ text: "EEZ洋上風力解禁", color: "bg-teal-50 text-teal-800" }, { text: "浮体式で沖合活用", color: "bg-blue-50 text-blue-800" }, { text: "漁業調整・送電網コスト", color: "bg-amber-50 text-amber-900" }],
    "grid-scale-battery-storage-power-grid-masterplan": [{ text: "系統用巨大蓄電池", color: "bg-teal-50 text-teal-800" }, { text: "再エネ出力制御防止", color: "bg-emerald-50 text-emerald-800" }, { text: "数兆円海底送電網", color: "bg-amber-50 text-amber-900" }],
    "hydrogen-ammonia-co-firing-ccs-framework": [{ text: "水素アンモニア混焼", color: "bg-teal-50 text-teal-800" }, { text: "CCS地中貯留法制", color: "bg-blue-50 text-blue-800" }, { text: "石炭火力延命批判", color: "bg-rose-50 text-rose-800" }],
    "nuclear-fusion-energy-national-strategy": [{ text: "核融合国家戦略", color: "bg-purple-50 text-purple-800" }, { text: "暴走なし・海水燃料", color: "bg-teal-50 text-teal-800" }, { text: "2030年代実証へ", color: "bg-amber-50 text-amber-900" }],
    "perovskite-solar-cells-domestic-mass-production": [{ text: "ペロブスカイト太陽電池", color: "bg-teal-50 text-teal-800" }, { text: "ビルの壁に貼る発電", color: "bg-emerald-50 text-emerald-800" }, { text: "国産ヨウ素で自給", color: "bg-indigo-50 text-indigo-800" }],
    "solar-panel-recycling-reserve-fund-abandonment": [{ text: "太陽光廃棄積立義務", color: "bg-teal-50 text-teal-800" }, { text: "売電収入から天引き", color: "bg-amber-50 text-amber-900" }, { text: "放置・不法投棄防止", color: "bg-rose-50 text-rose-800" }],
    "nuclear-power-plants-60-year-extension-gx-law": [{ text: "原発60年超運転認可", color: "bg-teal-50 text-teal-800" }, { text: "停止期間カウント除外", color: "bg-amber-50 text-amber-900" }, { text: "10年ごと特別点検", color: "bg-rose-50 text-rose-800" }],
    "official-security-assistance-osa-framework": [{ text: "同志国軍事支援OSA", color: "bg-teal-50 text-teal-800" }, { text: "沿岸レーダー等無償供与", color: "bg-blue-50 text-blue-800" }, { text: "非軍事原則の転換", color: "bg-rose-50 text-rose-800" }],
    "offer-type-oda-strategic-infrastructure-export": [{ text: "オファー型提案ODA", color: "bg-teal-50 text-teal-800" }, { text: "要請主義から先手提案へ", color: "bg-emerald-50 text-emerald-800" }, { text: "インフラ輸出・経済安保", color: "bg-amber-50 text-amber-900" }],
    "northern-territories-grave-visitation-russia-policy": [{ text: "北方領土・平和条約凍結", color: "bg-rose-50 text-rose-800" }, { text: "元島民の高齢化（88歳超）", color: "bg-amber-50 text-amber-900" }, { text: "人道墓参再開を要請", color: "bg-teal-50 text-teal-800" }],
    "abduction-issue-summit-talks-north-korea-sanctions": [{ text: "全拉致被害者の即時奪還", color: "bg-teal-50 text-teal-800" }, { text: "独自制裁（輸出入全面禁止）", color: "bg-rose-50 text-rose-800" }, { text: "無条件首脳会談模索", color: "bg-amber-50 text-amber-900" }],
    "un-security-council-reform-japan-permanent-seat": [{ text: "国連安保理改革・常任理事国", color: "bg-blue-50 text-blue-800" }, { text: "G4（日独印伯）連携", color: "bg-teal-50 text-teal-800" }, { text: "大国拒否権の乱用防止", color: "bg-rose-50 text-rose-800" }],
    "economic-coercion-countermeasures-multilateral-framework": [{ text: "経済的威圧（嫌がらせ）対抗", color: "bg-teal-50 text-teal-800" }, { text: "G7共同支援プラットフォーム", color: "bg-blue-50 text-blue-800" }, { text: "サプライチェーン買い支え", color: "bg-emerald-50 text-emerald-800" }],
    "minamitorishima-rare-earth-deep-sea-mining-trial": [{ text: "南鳥島深海6000m採掘", color: "bg-teal-50 text-teal-800" }, { text: "数百年分の国産レアアース", color: "bg-emerald-50 text-emerald-800" }, { text: "中国依存からの完全脱却", color: "bg-indigo-50 text-indigo-800" }],
    "bbnj-high-seas-biodiversity-treaty-ratification": [{ text: "BBNJ公海生物多様性条約", color: "bg-teal-50 text-teal-800" }, { text: "海の30%保護区化", color: "bg-blue-50 text-blue-800" }, { text: "遠洋漁業への影響懸念", color: "bg-amber-50 text-amber-900" }],
    "overtourism-countermeasures-two-tier-pricing-tax": [{ text: "二重価格（内外価格差）", color: "bg-teal-50 text-teal-800" }, { text: "観光公害・住民生活防衛", color: "bg-rose-50 text-rose-800" }, { text: "富士山入山料・独自宿泊税", color: "bg-amber-50 text-amber-900" }],
    "national-treasures-cultural-properties-repair-admission-fees": [{ text: "国宝・重文の修繕危機", color: "bg-rose-50 text-rose-800" }, { text: "保存から「稼ぐ公開」へ", color: "bg-teal-50 text-teal-800" }, { text: "拝観料適正化・民間MICE", color: "bg-emerald-50 text-emerald-800" }],
    "anime-manga-overseas-expansion-ip-protection": [{ text: "海賊版撲滅・国際共同摘発", color: "bg-rose-50 text-rose-800" }, { text: "世界同時多言語配信DX", color: "bg-teal-50 text-teal-800" }, { text: "アニメーター対価還元", color: "bg-emerald-50 text-emerald-800" }],
    "historic-castles-temples-hotel-stay-deregulation": [{ text: "城泊・寺泊特区", color: "bg-teal-50 text-teal-800" }, { text: "天守1泊100万円貸切", color: "bg-amber-50 text-amber-900" }, { text: "宿泊収益で城郭修繕", color: "bg-emerald-50 text-emerald-800" }],
    "cultural-arts-creator-fair-remuneration-guidelines": [{ text: "クリエイター適正契約指針", color: "bg-teal-50 text-teal-800" }, { text: "買い叩き・著作権強奪禁止", color: "bg-rose-50 text-rose-800" }, { text: "フリーランス新法連携", color: "bg-blue-50 text-blue-800" }],
    "smart-arena-stadium-reform-private-finance": [{ text: "スマート多目的アリーナ", color: "bg-teal-50 text-teal-800" }, { text: "民間PFI・365日黒字化", color: "bg-emerald-50 text-emerald-800" }, { text: "新B1基準・街なか再開発", color: "bg-indigo-50 text-indigo-800" }],
    "tourist-tax-free-shopping-refund-system-resale-prevention": [{ text: "免税リファンド（後払い戻し）", color: "bg-teal-50 text-teal-800" }, { text: "空港で現物確認・脱税阻止", color: "bg-rose-50 text-rose-800" }, { text: "数百億円の不正転売根絶", color: "bg-emerald-50 text-emerald-800" }],
    "traditional-crafts-successors-raw-materials-support": [{ text: "伝統工芸後継者緊急支援", color: "bg-teal-50 text-teal-800" }, { text: "国産漆・和紙原料の保護", color: "bg-emerald-50 text-emerald-800" }, { text: "修行期間の生活保障手当", color: "bg-amber-50 text-amber-900" }],
    "japan-trench-chishima-trench-earthquake-tsunami-tower": [{ text: "日本海溝・千島海溝巨大地震", color: "bg-rose-50 text-rose-800" }, { text: "厳冬期対応型津波避難タワー", color: "bg-teal-50 text-teal-800" }, { text: "国庫補助最大3分の2", color: "bg-amber-50 text-amber-900" }],
    "river-basin-disaster-resilience-rainwater-storage-facilities": [{ text: "流域治水関連法", color: "bg-teal-50 text-teal-800" }, { text: "地下調整池の設置義務化", color: "bg-blue-50 text-blue-800" }, { text: "田んぼダム全国展開", color: "bg-emerald-50 text-emerald-800" }],
    "building-seismic-retrofit-mandatory-earthquake-breaker": [{ text: "旧耐震ビルの診断・改修義務", color: "bg-rose-50 text-rose-800" }, { text: "感震ブレーカー設置全額補助", color: "bg-teal-50 text-teal-800" }, { text: "通電火災・大火の根絶", color: "bg-amber-50 text-amber-900" }],
    "isolated-settlements-satellite-communications-starlink": [{ text: "孤立集落にスターリンク事前配備", color: "bg-teal-50 text-teal-800" }, { text: "蓄電池・ソーラーで自立電源", color: "bg-emerald-50 text-emerald-800" }, { text: "能登の教訓・初動SOS確保", color: "bg-blue-50 text-blue-800" }],
    "sediment-disaster-red-zone-development-restriction": [{ text: "土砂災害レッドゾーン原則建築禁止", color: "bg-rose-50 text-rose-800" }, { text: "高台・市街地への集団移転補助", color: "bg-teal-50 text-teal-800" }, { text: "危険地からの計画的撤退", color: "bg-amber-50 text-amber-900" }],
    "disaster-waste-wide-area-disposal-temporary-storage": [{ text: "震災がれき全国広域処理協定", color: "bg-teal-50 text-teal-800" }, { text: "鉄道・海上コンテナ大量輸送", color: "bg-blue-50 text-blue-800" }, { text: "仮置き場の事前安全指定", color: "bg-emerald-50 text-emerald-800" }],
    "road-cave-in-prevention-ai-underground-radar-pipeline": [{ text: "道路陥没事故防止・AI路面下探査", color: "bg-teal-50 text-teal-800" }, { text: "老朽下水道管の予防保全", color: "bg-amber-50 text-amber-900" }, { text: "掘らずに直す管更生工法", color: "bg-emerald-50 text-emerald-800" }],
    "volcanic-disaster-prevention-helmet-evacuation-shelters": [{ text: "火山調査研究推進本部の創設", color: "bg-teal-50 text-teal-800" }, { text: "山頂噴石シェルター整備", color: "bg-rose-50 text-rose-800" }, { text: "登山届義務・ヘルメット携行", color: "bg-amber-50 text-amber-900" }],
    "internet-voting-overseas-disabled-voters-stepwise": [{ text: "在外邦人ネット投票導入論", color: "bg-teal-50 text-teal-800" }, { text: "マイナ公的認証・スマホ投票", color: "bg-blue-50 text-blue-800" }, { text: "秘密投票・買収防止の壁", color: "bg-rose-50 text-rose-800" }],
    "election-deposit-reduction-youth-political-participation": [{ text: "選挙供託金（300万〜600万円）", color: "bg-rose-50 text-rose-800" }, { text: "若者・女性の参入障壁打破", color: "bg-teal-50 text-teal-800" }, { text: "売名候補乱立防止との両立", color: "bg-amber-50 text-amber-900" }],
    "diet-dissolution-power-restriction-cabinet-limits": [{ text: "首相の衆院解散権制限論", color: "bg-teal-50 text-teal-800" }, { text: "抜き打ち解散・600億円選挙費", color: "bg-rose-50 text-rose-800" }, { text: "国会事前同意・立憲統制", color: "bg-blue-50 text-blue-800" }],
    "convenience-store-certificate-issuance-government-cloud": [{ text: "全国コンビニ即時交付", color: "bg-teal-50 text-teal-800" }, { text: "自治体システム標準化（ガバクラ）", color: "bg-emerald-50 text-emerald-800" }, { text: "役所窓口待ち時間ゼロへ", color: "bg-blue-50 text-blue-800" }],
    "political-party-subsidies-usage-disclosure-one-yen-receipts": [{ text: "政党交付金315億円の透明化", color: "bg-teal-50 text-teal-800" }, { text: "政策活動費の完全廃止", color: "bg-rose-50 text-rose-800" }, { text: "1円単位領収書オンライン公開", color: "bg-emerald-50 text-emerald-800" }],
    "credit-card-fraud-phishing-victim-compensation-guidelines": [{ text: "クレカ不正被害（年500億円超）", color: "bg-rose-50 text-rose-800" }, { text: "フィッシングもカード会社原則補償", color: "bg-teal-50 text-teal-800" }, { text: "EMV-3Dセキュア完全義務化", color: "bg-emerald-50 text-emerald-800" }],
    "stealth-marketing-regulation-influencer-crackdown": [{ text: "ステマ（やらせ広告）全面違法化", color: "bg-rose-50 text-rose-800" }, { text: "違反広告主の社名公表・措置命令", color: "bg-amber-50 text-amber-900" }, { text: "明瞭な#PR表記義務", color: "bg-teal-50 text-teal-800" }],
    "civil-litigation-digitalization-e-court-web-hearings": [{ text: "民事裁判完全IT化（eコート）", color: "bg-teal-50 text-teal-800" }, { text: "自宅・事務所からウェブ口頭弁論", color: "bg-blue-50 text-blue-800" }, { text: "24時間電子記録閲覧・訴状提出", color: "bg-emerald-50 text-emerald-800" }],
    "n-divide-n-multiply-family-tax-system": [{ text: "フランス流世帯課税", color: "bg-teal-50 text-teal-800" }, { text: "多子世帯ほど低税率", color: "bg-amber-50 text-amber-900" }, { text: "数兆円の減税規模", color: "bg-slate-100 text-slate-700" }],
    "crypto-spot-etf-listing-approval": [{ text: "証券口座でビットコイン", color: "bg-teal-50 text-teal-800" }, { text: "20%申告分離課税化", color: "bg-emerald-50 text-emerald-800" }, { text: "NISA投資の可能性", color: "bg-indigo-50 text-indigo-800" }],
    "inherited-land-national-treasury-escheat": [{ text: "不要な山林を国が引取", color: "bg-teal-50 text-teal-800" }, { text: "管理負担金約20万円", color: "bg-amber-50 text-amber-900" }, { text: "負動産の解消", color: "bg-slate-100 text-slate-700" }],
    "solitary-death-abandoned-property-rental-model": [{ text: "単身高齢者の賃貸入居", color: "bg-teal-50 text-teal-800" }, { text: "死後の残置物処理委任", color: "bg-emerald-50 text-emerald-800" }, { text: "孤独死の入居拒否ゼロへ", color: "bg-indigo-50 text-indigo-800" }],
    "confinement-penalty-prison-system-reform": [{ text: "115年ぶりの刑罰改革", color: "bg-teal-50 text-teal-800" }, { text: "懲役・禁錮を一本化", color: "bg-slate-100 text-slate-700" }, { text: "個別の更生教育重視", color: "bg-emerald-50 text-emerald-800" }],
    "death-penalty-abolition-life-without-parole": [{ text: "終身刑創設の議論", color: "bg-teal-50 text-teal-800" }, { text: "冤罪不可逆性の防止", color: "bg-rose-50 text-rose-800" }, { text: "国民世論8割容認", color: "bg-slate-100 text-slate-700" }],
    "illegal-online-casino-crackdown-gambling-addiction": [{ text: "国内接続は明白な賭博罪", color: "bg-rose-50 text-rose-800" }, { text: "決済代行業者の一斉摘発", color: "bg-amber-50 text-amber-900" }, { text: "闇バイト連鎖の遮断", color: "bg-teal-50 text-teal-800" }],
    "myna-card-iphone-apple-wallet-integration": [{ text: "iPhoneウォレット搭載", color: "bg-teal-50 text-teal-800" }, { text: "実物カード持ち歩き不要", color: "bg-emerald-50 text-emerald-800" }, { text: "Face IDで瞬時認証", color: "bg-indigo-50 text-indigo-800" }],
    "donor-conception-right-to-know-origins": [{ text: "子どもの出自を知る権利", color: "bg-teal-50 text-teal-800" }, { text: "ドナー情報の公的保管", color: "bg-amber-50 text-amber-900" }, { text: "第三者生殖医療の行方", color: "bg-slate-100 text-slate-700" }],
    "nipt-prenatal-testing-accreditation-system": [{ text: "採血のみでダウン症判定", color: "bg-teal-50 text-teal-800" }, { text: "公認クリニック拡大", color: "bg-emerald-50 text-emerald-800" }, { text: "命の選別とカウンセリング", color: "bg-rose-50 text-rose-800" }],
    "painless-childbirth-epidural-public-subsidy": [{ text: "無痛分娩の費用助成検討", color: "bg-teal-50 text-teal-800" }, { text: "産後うつ予防・早期回復", color: "bg-emerald-50 text-emerald-800" }, { text: "24時間麻酔体制の確保", color: "bg-amber-50 text-amber-900" }],
    "hpv-vaccine-male-inoculation-subsidy": [{ text: "男子への公費全額助成", color: "bg-teal-50 text-teal-800" }, { text: "中咽頭がん等の予防", color: "bg-emerald-50 text-emerald-800" }, { text: "男女接種で集団免疫", color: "bg-indigo-50 text-indigo-800" }],
    "pfas-drinking-water-quality-regulation": [{ text: "永遠の化学物質PFAS", color: "bg-rose-50 text-rose-800" }, { text: "水道水暫定目標50ng/L", color: "bg-teal-50 text-teal-800" }, { text: "活性炭フィルター浄水", color: "bg-slate-100 text-slate-700" }],
    "recycled-plastic-mandatory-usage-circular-economy": [{ text: "再生プラ使用比率義務化", color: "bg-teal-50 text-teal-800" }, { text: "石油由来バージン削減", color: "bg-emerald-50 text-emerald-800" }, { text: "水平リサイクル社会へ", color: "bg-indigo-50 text-indigo-800" }],
    "invasive-alien-species-muntjac-crayfish-control": [{ text: "特定外来生物キョン8万頭", color: "bg-amber-50 text-amber-900" }, { text: "首都圏防衛ライン", color: "bg-teal-50 text-teal-800" }, { text: "ザリガニ野外放流禁止", color: "bg-rose-50 text-rose-800" }],
    "pet-evacuation-shelter-guidelines-disaster": [{ text: "ペット同行避難の体制化", color: "bg-teal-50 text-teal-800" }, { text: "車中泊死の二次被害防止", color: "bg-emerald-50 text-emerald-800" }, { text: "アレルギー完全分離区画", color: "bg-amber-50 text-amber-900" }],
    "constitutional-amendment-emergency-term-extension": [{ text: "大災害時の議員任期延長", color: "bg-teal-50 text-teal-800" }, { text: "国会機能の空白防止", color: "bg-emerald-50 text-emerald-800" }, { text: "2/3特別多数の歯止め", color: "bg-slate-100 text-slate-700" }],
    "local-assembly-member-shortage-side-job-reform": [{ text: "町村議員の無投票防止", color: "bg-teal-50 text-teal-800" }, { text: "サラリーマン兼業300万緩和", color: "bg-indigo-50 text-indigo-800" }, { text: "夜間・休日議会の開催", color: "bg-slate-100 text-slate-700" }],
    "furusato-tax-proxy-donation-disaster-relief": [{ text: "被災地の寄付事務を代行", color: "bg-teal-50 text-teal-800" }, { text: "返礼品なしの純粋支援", color: "bg-emerald-50 text-emerald-800" }, { text: "能登地震で数十億円調達", color: "bg-indigo-50 text-indigo-800" }],
    "self-defense-forces-personnel-treatment-allowance": [{ text: "自衛官の危険手当増額", color: "bg-teal-50 text-teal-800" }, { text: "採用充足率5割割れ危機", color: "bg-rose-50 text-rose-800" }, { text: "全隊舎の個室・エアコン化", color: "bg-emerald-50 text-emerald-800" }],
    "sports-betting-legalization-debate": [{ text: "プロ野球・Jリーグ賭博案", color: "bg-teal-50 text-teal-800" }, { text: "部活・施設改修の巨額財源", color: "bg-emerald-50 text-emerald-800" }, { text: "八百長・依存症リスク", color: "bg-rose-50 text-rose-800" }],
    "pirate-site-fast-cinema-isp-blocking-debate": [{ text: "海賊版アクセス強制遮断", color: "bg-rose-50 text-rose-800" }, { text: "コンテンツ産業の死活問題", color: "bg-teal-50 text-teal-800" }, { text: "通信の秘密・憲法21条", color: "bg-amber-50 text-amber-900" }],
    "critical-infrastructure-data-center-rural-dispersion": [{ text: "DC・海底ケーブル地方分散", color: "bg-teal-50 text-teal-800" }, { text: "東京一極集中の全滅回避", color: "bg-emerald-50 text-emerald-800" }, { text: "北海道・日本海側新拠点", color: "bg-indigo-50 text-indigo-800" }],
    "missile-evacuation-underground-shelter-guidelines": [{ text: "地下シェルター全国整備", color: "bg-teal-50 text-teal-800" }, { text: "沖縄先島諸島に先行設置", color: "bg-amber-50 text-amber-900" }, { text: "数週間滞在の空気ろ過", color: "bg-emerald-50 text-emerald-800" }],
    "digital-textbook-implementation-paper-coexistence": [{ text: "小中英語から先行無償化", color: "bg-teal-50 text-teal-800" }, { text: "音声読み上げ・文字拡大", color: "bg-emerald-50 text-emerald-800" }, { text: "紙とデジタルの二重負担", color: "bg-slate-100 text-slate-700" }],
    "child-commissioner-independent-advocacy-body": [{ text: "政府・学校から完全独立", color: "bg-teal-50 text-teal-800" }, { text: "いじめ隠蔽の強制立ち入り", color: "bg-emerald-50 text-emerald-800" }, { text: "子どもが直接SOS申立", color: "bg-indigo-50 text-indigo-800" }],
    "school-lunch-allergy-epipen-standard": [{ text: "食物アレルギー誤食ゼロ", color: "bg-teal-50 text-teal-800" }, { text: "おかわり禁止・専用皿", color: "bg-amber-50 text-amber-900" }, { text: "全教員のエピペン訓練", color: "bg-emerald-50 text-emerald-800" }],
    "expressway-midnight-toll-discount-reform": [{ text: "深夜実走行距離の3割引", color: "bg-teal-50 text-teal-800" }, { text: "0時待ち危険待機を根絶", color: "bg-emerald-50 text-emerald-800" }, { text: "対象時間22時〜5時拡大", color: "bg-indigo-50 text-indigo-800" }],
    "jr-hokkaido-shikoku-freight-public-support": [{ text: "赤字3島会社への巨額支援", color: "bg-teal-50 text-teal-800" }, { text: "北海道農産物貨物の死守", color: "bg-emerald-50 text-emerald-800" }, { text: "赤字ローカル線のバス転換", color: "bg-amber-50 text-amber-900" }],
    "parallel-conventional-lines-third-sector-separation": [{ text: "新幹線延伸と並行在来線", color: "bg-teal-50 text-teal-800" }, { text: "地元自治体の赤字三セク化", color: "bg-amber-50 text-amber-900" }, { text: "高校生通学定期の値上げ", color: "bg-slate-100 text-slate-700" }],
    "water-supply-infrastructure-regionalization-ppp": [{ text: "老朽水道管の破裂多発", color: "bg-rose-50 text-rose-800" }, { text: "隣接自治体との水道統合", color: "bg-teal-50 text-teal-800" }, { text: "ウォーターPPP官民連携", color: "bg-indigo-50 text-indigo-800" }],
    "johkasou-decentralized-sewage-transition-subsidy": [{ text: "過疎地下水道の縮小撤退", color: "bg-teal-50 text-teal-800" }, { text: "高性能合併浄化槽へ転換", color: "bg-emerald-50 text-emerald-800" }, { text: "設置費用8〜9割補助", color: "bg-amber-50 text-amber-900" }],
    "local-bus-joint-operation-antimonopoly-exemption": [{ text: "バス会社同士の協定特例", color: "bg-teal-50 text-teal-800" }, { text: "重複路線廃止・等間隔運行", color: "bg-emerald-50 text-emerald-800" }, { text: "共通定期券・過疎路線維持", color: "bg-indigo-50 text-indigo-800" }],
    "drone-emergency-medical-transport-remote-islands": [{ text: "離島への処方薬ドローン空輸", color: "bg-teal-50 text-teal-800" }, { text: "有人地帯レベル4目視外飛行", color: "bg-emerald-50 text-emerald-800" }, { text: "オンライン診療即日受取", color: "bg-indigo-50 text-indigo-800" }],
    "autonomous-delivery-robot-sidewalk-operation": [{ text: "自動配送ロボの歩道走行解禁", color: "bg-teal-50 text-teal-800" }, { text: "最高時速6kmの遠隔監視", color: "bg-emerald-50 text-emerald-800" }, { text: "物流2024年問題の解決", color: "bg-indigo-50 text-indigo-800" }],
    "medically-fragile-children-support-school-nurses": [{ text: "学校への看護師配置責務", color: "bg-teal-50 text-teal-800" }, { text: "親の終日付き添い慣行廃止", color: "bg-emerald-50 text-emerald-800" }, { text: "普通学校で共に学ぶ教育", color: "bg-indigo-50 text-indigo-800" }],
    "female-board-members-30-percent-target": [{ text: "東証プライム2030年30%", color: "bg-teal-50 text-teal-800" }, { text: "男性中心ガバナンス刷新", color: "bg-emerald-50 text-emerald-800" }, { text: "女性幹部パイプライン育成", color: "bg-indigo-50 text-indigo-800" }],
    "selective-four-day-workweek-system-adoption": [{ text: "正社員の週休3日制選択", color: "bg-teal-50 text-teal-800" }, { text: "育児・介護・学び直し両立", color: "bg-emerald-50 text-emerald-800" }, { text: "給与2割減か総時間維持か", color: "bg-amber-50 text-amber-900" }],
    "side-job-dual-employment-working-hours-management": [{ text: "副業・兼業の原則容認", color: "bg-teal-50 text-teal-800" }, { text: "労働時間通算と25%残業代", color: "bg-amber-50 text-amber-900" }, { text: "収入複数化と過労防止", color: "bg-indigo-50 text-indigo-800" }],
    "national-archives-digital-preservation-governance": [{ text: "公文書の100%電子決裁", color: "bg-teal-50 text-teal-800" }, { text: "国立公文書館への自動移管", color: "bg-emerald-50 text-emerald-800" }, { text: "改ざん・隠蔽の完全防止", color: "bg-slate-100 text-slate-700" }],
    "child-allowance-expansion": [
      { text: "18歳まで延長", color: "bg-teal-50 text-teal-800" },
      { text: "所得制限なし", color: "bg-slate-100 text-slate-700" },
      { text: "第3子 月3万円", color: "bg-amber-100 text-amber-900" },
    ],
    "university-tuition-waiver": [
      { text: "私立 年約70万円免除", color: "bg-indigo-50 text-indigo-800" },
      { text: "所得制限なし", color: "bg-slate-100 text-slate-700" },
      { text: "3人扶養で全員対象", color: "bg-amber-100 text-amber-900" },
    ],
    "income-barrier": [
      { text: "103万円（税の壁）", color: "bg-amber-50 text-amber-900" },
      { text: "106万・130万（社保の壁）", color: "bg-rose-50 text-rose-800" },
      { text: "手取りの崖解消へ", color: "bg-teal-50 text-teal-800" },
    ],
    "myna-health-insurance": [
      { text: "紙保険証は失効", color: "bg-rose-50 text-rose-800" },
      { text: "資格確認書は要申請", color: "bg-amber-50 text-amber-900" },
      { text: "限度額認定が全自動", color: "bg-teal-50 text-teal-800" },
    ],
    "new-nisa": [
      { text: "生涯枠1,800万円", color: "bg-teal-50 text-teal-800" },
      { text: "非課税無期限・恒久化", color: "bg-emerald-50 text-emerald-800" },
      { text: "売却枠の翌年再利用", color: "bg-indigo-50 text-indigo-800" },
    ],
    "fixed-tax-cut": [
      { text: "1人あたり4万円減税", color: "bg-teal-50 text-teal-800" },
      { text: "扶養家族・子ども全員", color: "bg-emerald-50 text-emerald-800" },
      { text: "不足分は調整給付金", color: "bg-amber-50 text-amber-900" },
    ],
    "furusato-tax": [
      { text: "自己負担2,000円", color: "bg-teal-50 text-teal-800" },
      { text: "サイト独自ポイント禁止", color: "bg-rose-50 text-rose-800" },
      { text: "経費5割ルールの厳格化", color: "bg-slate-100 text-slate-700" },
    ],
    "invoice-system": [
      { text: "激変緩和の2割特例", color: "bg-teal-50 text-teal-800" },
      { text: "免税80%控除の経過措置", color: "bg-amber-50 text-amber-900" },
      { text: "BtoCは免税維持も", color: "bg-emerald-50 text-emerald-800" },
    ],
    "pension-start-age": [
      { text: "選択幅 60〜75歳", color: "bg-teal-50 text-teal-800" },
      { text: "最大+84%増額（75歳）", color: "bg-emerald-50 text-emerald-800" },
      { text: "損益分岐点 約82歳", color: "bg-amber-50 text-amber-900" },
    ],
    "zaishoku-pension": [
      { text: "支給停止基準 月50万円", color: "bg-teal-50 text-teal-800" },
      { text: "超過分の1/2カット", color: "bg-amber-50 text-amber-900" },
      { text: "基礎年金は全額支給", color: "bg-emerald-50 text-emerald-800" },
    ],
    "elderly-healthcare-cost": [
      { text: "一定所得以上は2割負担", color: "bg-teal-50 text-teal-800" },
      { text: "一般層約8割は1割維持", color: "bg-emerald-50 text-emerald-800" },
      { text: "緩和措置終了・本格運用", color: "bg-slate-100 text-slate-700" },
    ],
    "childcare-leave-benefit": [
      { text: "実質手取り10割", color: "bg-teal-50 text-teal-800" },
      { text: "給付率80%へ引上げ", color: "bg-emerald-50 text-emerald-800" },
      { text: "最大28日間・両親取得", color: "bg-amber-50 text-amber-900" },
    ],
    "rideshare-deregulation": [
      { text: "タクシー同等運賃", color: "bg-teal-50 text-teal-800" },
      { text: "タクシー会社が安全管理", color: "bg-emerald-50 text-emerald-800" },
      { text: "不足時間帯・エリア限定", color: "bg-amber-50 text-amber-900" },
    ],
    "high-professional-system": [
      { text: "年収1,075万円以上", color: "bg-teal-50 text-teal-800" },
      { text: "時間規制除外・残業代ゼロ", color: "bg-amber-50 text-amber-900" },
      { text: "年間104日休日＋医師面接", color: "bg-emerald-50 text-emerald-800" },
    ],
    "energy-subsidies": [
      { text: "電気最大4円・ガス17.5円引", color: "bg-teal-50 text-teal-800" },
      { text: "申請不要・全自動値引き", color: "bg-emerald-50 text-emerald-800" },
      { text: "再エネ賦課金と相殺", color: "bg-rose-50 text-rose-800" },
    ],
    "defense-tax-hike": [
      { text: "防衛費GDP比2%目標", color: "bg-slate-100 text-slate-800" },
      { text: "所得税付加税は実質相殺", color: "bg-teal-50 text-teal-800" },
      { text: "たばこ税1本3円増税", color: "bg-amber-50 text-amber-900" },
    ],
    "childcare-support-fund": [
      { text: "健保上乗せ月約450円", color: "bg-teal-50 text-teal-800" },
      { text: "総枠3.6兆円全額還元", color: "bg-emerald-50 text-emerald-800" },
      { text: "実質負担ゼロ議論", color: "bg-amber-50 text-amber-900" },
    ],
    "inheritance-registration": [
      { text: "取得から3年以内義務", color: "bg-teal-50 text-teal-800" },
      { text: "正当理由なし過料10万", color: "bg-rose-50 text-rose-800" },
      { text: "申出登記で過料回避", color: "bg-emerald-50 text-emerald-800" },
    ],
    "myna-drivers-license": [
      { text: "更新手数料400円引", color: "bg-teal-50 text-teal-800" },
      { text: "住所変更ワンストップ", color: "bg-emerald-50 text-emerald-800" },
      { text: "スマホ24hオンライン講習", color: "bg-indigo-50 text-indigo-800" },
    ],
    "severance-pay-tax": [
      { text: "20年超70万枠見直し", color: "bg-amber-50 text-amber-900" },
      { text: "一律40万平準化議論", color: "bg-rose-50 text-rose-800" },
      { text: "1/2課税は維持方針", color: "bg-teal-50 text-teal-800" },
    ],
    "gasoline-subsidies-trigger": [
      { text: "店頭10〜15円/L抑制", color: "bg-teal-50 text-teal-800" },
      { text: "国費投入累計6兆円超", color: "bg-amber-50 text-amber-900" },
      { text: "トリガー条項凍結継続", color: "bg-rose-50 text-rose-800" },
    ],
    "nursing-care-copay": [
      { text: "大半9割は1割負担維持", color: "bg-emerald-50 text-emerald-800" },
      { text: "2割負担拡大検討継続", color: "bg-amber-50 text-amber-900" },
      { text: "高額介護費上限ガード", color: "bg-teal-50 text-teal-800" },
    ],
    "electric-kickboard-rules": [
      { text: "16歳以上免許不要", color: "bg-emerald-50 text-emerald-800" },
      { text: "車道20km/歩道6km特例", color: "bg-teal-50 text-teal-800" },
      { text: "ヘルメット努力義務", color: "bg-slate-100 text-slate-700" },
    ],
    "selective-separate-surnames": [
      { text: "同姓・別姓自由選択", color: "bg-teal-50 text-teal-800" },
      { text: "改姓・名義変更コストゼロ", color: "bg-emerald-50 text-emerald-800" },
      { text: "経団連が早期法改正要望", color: "bg-amber-50 text-amber-900" },
    ],
    "school-lunch-free": [
      { text: "公立小中月約5,000円無料", color: "bg-teal-50 text-teal-800" },
      { text: "多子世帯年間10万超軽減", color: "bg-emerald-50 text-emerald-800" },
      { text: "全国一律国費負担議論", color: "bg-indigo-50 text-indigo-800" },
    ],
    "ideco-expansion": [
      { text: "70歳まで加入延長検討", color: "bg-emerald-50 text-emerald-800" },
      { text: "DB併図月2万円へ増枠", color: "bg-teal-50 text-teal-800" },
      { text: "掛金全額所得控除メリット", color: "bg-indigo-50 text-indigo-800" },
    ],
    "kodomo-daretemo-tsuen": [
      { text: "就労要件なし誰でも", color: "bg-teal-50 text-teal-800" },
      { text: "月10時間枠を創設", color: "bg-indigo-50 text-indigo-800" },
      { text: "1時間約300円", color: "bg-emerald-50 text-emerald-800" },
    ],
    "high-school-tuition-free": [
      { text: "都府で私立も全額支援", color: "bg-indigo-50 text-indigo-800" },
      { text: "国基準年収910万制限", color: "bg-slate-100 text-slate-700" },
      { text: "全国一律化の議論", color: "bg-amber-50 text-amber-900" },
    ],
    "pension-contribution-45years": [
      { text: "65歳まで納付5年延長", color: "bg-amber-50 text-amber-900" },
      { text: "第1号約100万追加負担", color: "bg-rose-50 text-rose-800" },
      { text: "満額年92万へ底上げ", color: "bg-emerald-50 text-emerald-800" },
    ],
    "abandoned-house-tax-hike": [
      { text: "管理不全空家を新設", color: "bg-amber-50 text-amber-900" },
      { text: "勧告で住宅特例解除", color: "bg-rose-50 text-rose-800" },
      { text: "固定資産税実質最大6倍", color: "bg-rose-100 text-rose-900" },
    ],
    "accommodation-tax-tourism": [
      { text: "1泊100〜2,000円超", color: "bg-sky-50 text-sky-800" },
      { text: "全国30自治体へ波及", color: "bg-teal-50 text-teal-800" },
      { text: "混雑バス・美化財源", color: "bg-emerald-50 text-emerald-800" },
    ],
    "forest-environment-tax": [
      { text: "年1,000円住民税上乗せ", color: "bg-emerald-50 text-emerald-800" },
      { text: "納税者約6,000万人", color: "bg-teal-50 text-teal-800" },
      { text: "都市部の基金積立問題", color: "bg-amber-50 text-amber-900" },
    ],
    "customer-harassment-prevention": [
      { text: "土下座強要・暴言を明文化", color: "bg-rose-50 text-rose-800" },
      { text: "企業の防止措置義務化へ", color: "bg-slate-100 text-slate-800" },
      { text: "名札名字・イニシャル化", color: "bg-teal-50 text-teal-800" },
    ],
    "reskilling-education-benefit": [
      { text: "最大80%キャッシュバック", color: "bg-violet-50 text-violet-800" },
      { text: "年間上限64万円へ拡充", color: "bg-emerald-50 text-emerald-800" },
      { text: "在職中休業給付新設", color: "bg-indigo-50 text-indigo-800" },
    ],
    "hay-fever-countermeasures": [
      { text: "スギ伐採ペース4割加速", color: "bg-emerald-50 text-emerald-800" },
      { text: "少花粉苗木9割超へ", color: "bg-teal-50 text-teal-800" },
      { text: "舌下免疫療法薬の増産", color: "bg-indigo-50 text-indigo-800" },
    ],
    "income-barrier-career-up": [
      { text: "企業へ1人最大50万円助成", color: "bg-teal-50 text-teal-800" },
      { text: "手当支給で手取り減ゼロ", color: "bg-emerald-50 text-emerald-800" },
      { text: "厚生年金加入で将来増額", color: "bg-indigo-50 text-indigo-800" },
    ],

    "financial-income-tax": [
      { text: "1億円の壁是正", color: "bg-teal-50 text-teal-800" },
      { text: "税率25〜30%案", color: "bg-blue-50 text-blue-800" },
      { text: "新NISAは完全非課税", color: "bg-emerald-50 text-emerald-800" },
    ],
    "ev-distance-tax": [
      { text: "1km数円の走行税", color: "bg-blue-50 text-blue-800" },
      { text: "EV道路維持負担", color: "bg-teal-50 text-teal-800" },
      { text: "地方負担増の批判", color: "bg-amber-50 text-amber-900" },
    ],
    "digital-salary-payment": [
      { text: "PayPay等で給与受取", color: "bg-purple-50 text-purple-800" },
      { text: "労働者の完全同意必須", color: "bg-teal-50 text-teal-800" },
      { text: "上限100万・破綻全額保証", color: "bg-emerald-50 text-emerald-800" },
    ],
    "dismissal-monetary-resolution": [
      { text: "解雇無効時の金銭解決", color: "bg-amber-50 text-amber-900" },
      { text: "補償金3〜18ヶ月相当", color: "bg-blue-50 text-blue-800" },
      { text: "労働者申立型が有力", color: "bg-teal-50 text-teal-800" },
    ],
    "teacher-special-measure-act": [
      { text: "教職調整額4%→10%超", color: "bg-teal-50 text-teal-800" },
      { text: "年収40〜60万円増額", color: "bg-emerald-50 text-emerald-800" },
      { text: "部活地域移行セット", color: "bg-blue-50 text-blue-800" },
    ],
    "high-cost-medical-cap": [
      { text: "中間層上限引き上げ検討", color: "bg-rose-50 text-rose-800" },
      { text: "国民医療費47兆円突破", color: "bg-amber-50 text-amber-900" },
      { text: "多数回該当4.4万円維持", color: "bg-emerald-50 text-emerald-800" },
    ],
    "bicycle-blue-ticket": [
      { text: "ながらスマホ反則金1.2万", color: "bg-rose-50 text-rose-800" },
      { text: "16歳以上（高校生対象）", color: "bg-blue-50 text-blue-800" },
      { text: "期日納付で前科なし", color: "bg-emerald-50 text-emerald-800" },
    ],
    "doctor-overtime-regulation": [
      { text: "年960時間上限義務化", color: "bg-teal-50 text-teal-800" },
      { text: "当直明け休息インターバル", color: "bg-blue-50 text-blue-800" },
      { text: "地域救急維持の課題", color: "bg-rose-50 text-rose-800" },
    ],
    "foreign-training-employment": [
      { text: "技能実習廃止・新制度へ", color: "bg-indigo-50 text-indigo-800" },
      { text: "条件付き転籍（転職）解禁", color: "bg-teal-50 text-teal-800" },
      { text: "3年で特定技能1号へ直結", color: "bg-emerald-50 text-emerald-800" },
    ],
    "paternity-leave-at-birth": [
      { text: "実質手取り10割（100%）", color: "bg-pink-50 text-pink-800" },
      { text: "産後8週に最大4週間", color: "bg-rose-50 text-rose-800" },
      { text: "100人超企業に公表義務", color: "bg-blue-50 text-blue-800" },
    ],
    "solar-panel-mandate": [
      { text: "新築原則85%以上設置", color: "bg-amber-50 text-amber-900" },
      { text: "約6〜8年で初期費用回収", color: "bg-emerald-50 text-emerald-800" },
      { text: "停電時1500W非常給電", color: "bg-teal-50 text-teal-800" },
    ],
    "otc-similar-drug-restriction": [
      { text: "湿布・保湿剤差額自腹化", color: "bg-rose-50 text-rose-800" },
      { text: "年間数千億円の公費是正", color: "bg-teal-50 text-teal-800" },
      { text: "重症アトピー等は3割維持", color: "bg-emerald-50 text-emerald-800" },
    ],
    "stealth-marketing-regulation": [
      { text: "景品表示法で全面禁止", color: "bg-rose-50 text-rose-800" },
      { text: "#PR #広告の明記義務", color: "bg-teal-50 text-teal-800" },
      { text: "違反企業は社名公表処分", color: "bg-slate-100 text-slate-800" },
    ],
    "drone-flying-car-mobility": [
      { text: "有人地帯レベル4自律飛行", color: "bg-sky-50 text-sky-800" },
      { text: "過疎地配送70〜80%短縮", color: "bg-emerald-50 text-emerald-800" },
      { text: "国家操縦資格の新設", color: "bg-blue-50 text-blue-800" },
    ],
    "alien-registration-myna-card": [
      { text: "在留カードとマイナ統合", color: "bg-teal-50 text-teal-800" },
      { text: "市役所訪問が不要に", color: "bg-emerald-50 text-emerald-800" },
      { text: "偽造カード不法就労撲滅", color: "bg-purple-50 text-purple-800" },
    ],
    "same-sex-marriage-equality": [
      { text: "高裁で違憲判決相次ぐ", color: "bg-rose-50 text-rose-800" },
      { text: "相続権・共同親権の平等", color: "bg-pink-50 text-pink-800" },
      { text: "憲法24条改正論争", color: "bg-amber-50 text-amber-900" },
    ],
    "security-clearance-economic-security": [
      { text: "国家秘密適性評価法", color: "bg-slate-100 text-slate-800" },
      { text: "サプライチェーン防衛", color: "bg-blue-50 text-blue-800" },
      { text: "民間社員身辺調査とプライバシー", color: "bg-amber-50 text-amber-900" },
    ],
    "ambulance-fee-minor-illness": [
      { text: "軽症選定療養費7,700円", color: "bg-rose-50 text-rose-800" },
      { text: "救急出動パンク抑止", color: "bg-red-50 text-red-800" },
      { text: "#7119相談窓口推奨", color: "bg-teal-50 text-teal-800" },
    ],
    "school-club-community-transition": [
      { text: "休日の部活を地域移行", color: "bg-emerald-50 text-emerald-800" },
      { text: "教員の過重労働解消", color: "bg-teal-50 text-teal-800" },
      { text: "月謝負担・地域格差課題", color: "bg-amber-50 text-amber-900" },
    ],
    "furusato-tax-point-ban-2025": [
      { text: "仲介サイト還元禁止", color: "bg-rose-50 text-rose-800" },
      { text: "2025年10月施行", color: "bg-slate-100 text-slate-800" },
      { text: "自治体の手数料是正", color: "bg-teal-50 text-teal-800" },
    ],
    "bicycle-helmet-mandate-insurance": [
      { text: "全年齢努力義務化", color: "bg-emerald-50 text-emerald-800" },
      { text: "青切符反則金2026年〜", color: "bg-rose-50 text-rose-800" },
      { text: "個人賠償責任保険義務", color: "bg-blue-50 text-blue-800" },
    ],
    "casino-ir-gambling-addiction": [
      { text: "大阪・夢洲2030年秋開業", color: "bg-purple-50 text-purple-800" },
      { text: "日本人入場料6,000円", color: "bg-amber-50 text-amber-900" },
      { text: "マイナ顔認証・回数制限", color: "bg-teal-50 text-teal-800" },
    ],
    "specified-skilled-worker-2-expansion": [
      { text: "11分野に大幅拡大", color: "bg-indigo-50 text-indigo-800" },
      { text: "在留期限上限なし・永住道", color: "bg-emerald-50 text-emerald-800" },
      { text: "配偶者・子どもの帯同可", color: "bg-teal-50 text-teal-800" },
    ],
    "renewable-energy-surcharge-burden": [
      { text: "賦課金3.49円/kWh改定", color: "bg-amber-50 text-amber-900" },
      { text: "電気代激変緩和補助", color: "bg-teal-50 text-teal-800" },
      { text: "FIP市場連動型へ移行", color: "bg-blue-50 text-blue-800" },
    ],
    "solar-panel-disposal-reserve-fund": [
      { text: "10kW以上外部積立義務", color: "bg-emerald-50 text-emerald-800" },
      { text: "2030年代大量廃棄対策", color: "bg-slate-100 text-slate-800" },
      { text: "パネル放置・投棄を抑止", color: "bg-rose-50 text-rose-800" },
    ],
    "national-land-reversion-system": [
      { text: "不要な相続地を国庫帰属", color: "bg-emerald-50 text-emerald-800" },
      { text: "更地・境界確定が要件", color: "bg-slate-100 text-slate-800" },
      { text: "管理負担金20万円〜前納", color: "bg-amber-50 text-amber-900" },
    ],
    "reverse-mortgage-senior-housing": [
      { text: "自宅担保で老後資金調達", color: "bg-blue-50 text-blue-800" },
      { text: "生前返済は利息のみ", color: "bg-emerald-50 text-emerald-800" },
      { text: "ノンリコース型で相続人保護", color: "bg-teal-50 text-teal-800" },
    ],
    "senior-guarantor-service-regulation": [
      { text: "おひとりさま高齢者支援", color: "bg-pink-50 text-pink-800" },
      { text: "預託金信託保全ルール", color: "bg-teal-50 text-teal-800" },
      { text: "身元保証なし入院拒否是正", color: "bg-emerald-50 text-emerald-800" },
    ],
    "school-smartphone-ban-regulation": [
      { text: "欧米で校内全面禁止拡大", color: "bg-rose-50 text-rose-800" },
      { text: "集中力向上・ネットいじめ抑止", color: "bg-indigo-50 text-indigo-800" },
      { text: "災害連絡・デジタル教育との両立", color: "bg-amber-50 text-amber-900" },
    ],
    "rice-production-adjustment-stockpile": [
      { text: "令和の米騒動検証", color: "bg-amber-50 text-amber-900" },
      { text: "減反政策の抜本見直し", color: "bg-teal-50 text-teal-800" },
      { text: "備蓄米の機動的放出議論", color: "bg-emerald-50 text-emerald-800" },
    ],
    "smart-agriculture-promotion-act": [
      { text: "自動運転・ドローン普及", color: "bg-indigo-50 text-indigo-800" },
      { text: "即時償却・長期低利融資", color: "bg-teal-50 text-teal-800" },
      { text: "2024年10月新法施行", color: "bg-blue-50 text-blue-800" },
    ],
    "corporate-farmland-ownership-deregulation": [
      { text: "一般企業の農地所有解禁", color: "bg-purple-50 text-purple-800" },
      { text: "耕作放棄地40万ha再生", color: "bg-emerald-50 text-emerald-800" },
      { text: "産廃転用・投機への懸念", color: "bg-rose-50 text-rose-800" },
    ],
    "green-food-system-organic-farming": [
      { text: "2050年有機農業25%へ", color: "bg-emerald-50 text-emerald-800" },
      { text: "化学農薬50%・肥料30%減", color: "bg-teal-50 text-teal-800" },
      { text: "みどり認定と設備減税", color: "bg-blue-50 text-blue-800" },
    ],
    "new-farmers-support-succession": [
      { text: "年最大150万円生活支援", color: "bg-teal-50 text-teal-800" },
      { text: "平均年齢68歳の担い手対策", color: "bg-amber-50 text-amber-900" },
      { text: "第三者事業承継マッチング", color: "bg-indigo-50 text-indigo-800" },
    ],
    "dairy-crisis-milk-price-culling": [
      { text: "乳牛1頭15万円淘汰補助", color: "bg-amber-50 text-amber-900" },
      { text: "牛乳廃棄パニック回避", color: "bg-rose-50 text-rose-800" },
      { text: "飲用乳価の引き上げ", color: "bg-teal-50 text-teal-800" },
    ],
    "formula-feed-stabilization-domestic-crops": [
      { text: "濃厚飼料75%輸入依存", color: "bg-slate-50 text-slate-800" },
      { text: "安定基金の枯渇危機", color: "bg-rose-50 text-rose-800" },
      { text: "子実用トウモロコシ国産化", color: "bg-emerald-50 text-emerald-800" },
    ],
    "animal-welfare-livestock-guidelines": [
      { text: "バタリーケージ改善指針", color: "bg-indigo-50 text-indigo-800" },
      { text: "母豚ストールフリー推奨", color: "bg-purple-50 text-purple-800" },
      { text: "卵・肉の価格上昇懸念", color: "bg-amber-50 text-amber-900" },
    ],
    "avian-influenza-livestock-epidemic-control": [
      { text: "1,771万羽殺処分・卵高騰", color: "bg-rose-50 text-rose-800" },
      { text: "分割管理（スプリット）容認", color: "bg-teal-50 text-teal-800" },
      { text: "国の手当金・再建支援", color: "bg-blue-50 text-blue-800" },
    ],
    "livestock-methane-emission-reduction": [
      { text: "牛のゲップメタン2〜3割減", color: "bg-emerald-50 text-emerald-800" },
      { text: "海藻・カシューナッツ油添加", color: "bg-teal-50 text-teal-800" },
      { text: "ふん尿バイオガス発電", color: "bg-indigo-50 text-indigo-800" },
    ],
    "semiconductor-rapidus-tsmc-subsidies": [
      { text: "TSMC熊本へ1.2兆円助成", color: "bg-teal-50 text-teal-800" },
      { text: "Rapidus千歳2ナノ量産", color: "bg-indigo-50 text-indigo-800" },
      { text: "総額5兆円の投資・顧客リスク", color: "bg-amber-50 text-amber-900" },
    ],
    "ev-battery-gigafactory-subsidies": [
      { text: "国内電池工場へ1兆円支援", color: "bg-blue-50 text-blue-800" },
      { text: "全固体電池2020年代実用化", color: "bg-teal-50 text-teal-800" },
      { text: "EV踊り場・HV優位の市場", color: "bg-rose-50 text-rose-800" },
    ],
    "hydrogen-steel-gx-decarbonization": [
      { text: "産業CO2の4割を削減へ", color: "bg-emerald-50 text-emerald-800" },
      { text: "GX20兆円移行債で支援", color: "bg-teal-50 text-teal-800" },
      { text: "水素不足と産業空洞化懸念", color: "bg-amber-50 text-amber-900" },
    ],
    "economic-security-supply-chain-resilience": [
      { text: "12特定重要物資を指定", color: "bg-indigo-50 text-indigo-800" },
      { text: "国内工場新増設に最大2/3補助", color: "bg-teal-50 text-teal-800" },
      { text: "脱中国依存と経済的威圧抑止", color: "bg-purple-50 text-purple-800" },
    ],
    "subcontract-act-price-pass-through": [
      { text: "価格転嫁Gメン全国巡回", color: "bg-amber-50 text-amber-900" },
      { text: "協議拒否大手の実名公表", color: "bg-rose-50 text-rose-800" },
      { text: "約束手形2026年全廃方針", color: "bg-teal-50 text-teal-800" },
    ],
    "defense-industry-manufacturing-nationalization": [
      { text: "製造ライン国有化特例", color: "bg-indigo-50 text-indigo-800" },
      { text: "目標利益率最大15%保障", color: "bg-teal-50 text-teal-800" },
      { text: "防衛撤退100社超の抑止", color: "bg-blue-50 text-blue-800" },
    ],
    "industrial-robot-smart-factory-automation": [
      { text: "2030年熟練工38万人不足", color: "bg-amber-50 text-amber-900" },
      { text: "カタログ型省力化補助金", color: "bg-teal-50 text-teal-800" },
      { text: "安全柵なし協働ロボット解禁", color: "bg-indigo-50 text-indigo-800" },
    ],
    "space-industry-strategic-fund": [
      { text: "JAXAに10年1兆円基金", color: "bg-indigo-50 text-indigo-800" },
      { text: "民間小型ロケット・衛星量産", color: "bg-teal-50 text-teal-800" },
      { text: "2030年代宇宙産業8兆円へ", color: "bg-blue-50 text-blue-800" },
    ],
    "biomanufacturing-synthetic-biology-shift": [
      { text: "石油化学から微生物発酵へ", color: "bg-emerald-50 text-emerald-800" },
      { text: "バイオものづくり3,000億円", color: "bg-teal-50 text-teal-800" },
      { text: "海中生分解プラ・人工クモ糸", color: "bg-purple-50 text-purple-800" },
    ],
    "critical-minerals-deep-sea-urban-mining": [
      { text: "南鳥島水深6,000mレアアース", color: "bg-blue-50 text-blue-800" },
      { text: "中国独占打破へ試掘実験", color: "bg-indigo-50 text-indigo-800" },
      { text: "EV廃電池都市鉱山リサイクル", color: "bg-emerald-50 text-emerald-800" },
    ],
    "caregiver-wage-hike-allowance-unification": [
      { text: "処遇改善3加算を1本化", color: "bg-teal-50 text-teal-800" },
      { text: "基本給ベースアップ義務化", color: "bg-indigo-50 text-indigo-800" },
      { text: "全産業月5〜7万円格差是正", color: "bg-amber-50 text-amber-900" },
    ],
    "home-care-reimbursement-cut-crisis": [
      { text: "訪問介護基本報酬2〜3%減", color: "bg-rose-50 text-rose-800" },
      { text: "ヘルパー求人倍率15倍超", color: "bg-amber-50 text-amber-900" },
      { text: "事業所倒産・休廃業が過去最多", color: "bg-purple-50 text-purple-800" },
    ],
    "mild-care-shift-community-support": [
      { text: "要介護1・2の総合事業移行案", color: "bg-indigo-50 text-indigo-800" },
      { text: "軽度者の保険給付外し議論", color: "bg-rose-50 text-rose-800" },
      { text: "早期重度化・家族負担の懸念", color: "bg-amber-50 text-amber-900" },
    ],
    "care-plan-copay-debate": [
      { text: "ケアマネ作成費の1割負担案", color: "bg-indigo-50 text-indigo-800" },
      { text: "現在自己負担0円（全額給付）", color: "bg-teal-50 text-teal-800" },
      { text: "セルフネグレクト・孤立死懸念", color: "bg-rose-50 text-rose-800" },
    ],
    "nursing-home-multi-bed-room-charge": [
      { text: "特養相部屋に月約8,000円室料", color: "bg-amber-50 text-amber-900" },
      { text: "ユニット個室との公平性", color: "bg-indigo-50 text-indigo-800" },
      { text: "低年金高齢者の退所リスク", color: "bg-rose-50 text-rose-800" },
    ],
    "care-robot-staffing-ratio-deregulation": [
      { text: "センサー導入で3:1配置緩和", color: "bg-purple-50 text-purple-800" },
      { text: "夜間見守り巡回負担を半減", color: "bg-teal-50 text-teal-800" },
      { text: "アラーム疲労・安全性の懸念", color: "bg-amber-50 text-amber-900" },
    ],
    "caregiving-resignation-leave-act-reform": [
      { text: "40歳到達時の面談義務化", color: "bg-teal-50 text-teal-800" },
      { text: "年間10万人の介護離職防止", color: "bg-rose-50 text-rose-800" },
      { text: "テレワーク等柔軟措置の義務化", color: "bg-indigo-50 text-indigo-800" },
    ],
    "young-carer-support-legalization": [
      { text: "ヤングケアラー支援の法制化", color: "bg-teal-50 text-teal-800" },
      { text: "中高生17〜24人に1人の実態", color: "bg-amber-50 text-amber-900" },
      { text: "学校・福祉連携とヘルパー派遣", color: "bg-indigo-50 text-indigo-800" },
    ],
    "dementia-basic-act-inclusive-society": [
      { text: "認知症基本法施行（共生社会）", color: "bg-emerald-50 text-emerald-800" },
      { text: "高齢者5人に1人の時代へ", color: "bg-purple-50 text-purple-800" },
      { text: "徘徊賠償の自治体公費保険", color: "bg-teal-50 text-teal-800" },
    ],
    "foreign-care-worker-nursing-training": [
      { text: "2040年介護職員57万人不足", color: "bg-amber-50 text-amber-900" },
      { text: "育成就労制度で転籍容認へ", color: "bg-teal-50 text-teal-800" },
      { text: "円安下の国際人材獲得競争", color: "bg-rose-50 text-rose-800" },
    ],
    // 第12弾（50政策追加）
    "offshore-wind-power-eez-expansion": [
      { text: "EEZ全域へ拡大", color: "bg-teal-50 text-teal-800" },
      { text: "浮体式洋上風力", color: "bg-indigo-50 text-indigo-800" },
      { text: "2040年4500万kW", color: "bg-amber-100 text-amber-900" },
    ],
    "renewable-output-curtailment-grid-masterplan": [
      { text: "出力制御の多発", color: "bg-rose-50 text-rose-800" },
      { text: "地域間連系線投資", color: "bg-teal-50 text-teal-800" },
      { text: "海底直流送電HVDC", color: "bg-indigo-50 text-indigo-800" },
    ],
    "high-level-nuclear-waste-final-disposal-survey": [
      { text: "核のごみ最終処分", color: "bg-purple-50 text-purple-800" },
      { text: "玄海町が文献調査", color: "bg-amber-100 text-amber-900" },
      { text: "地下300m地層処分", color: "bg-teal-50 text-teal-800" },
    ],
    "electricity-capacity-market-retail-bankruptcy": [
      { text: "容量市場拠出金", color: "bg-rose-50 text-rose-800" },
      { text: "新電力の倒産急増", color: "bg-amber-100 text-amber-900" },
      { text: "レベニューキャップ", color: "bg-teal-50 text-teal-800" },
    ],
    "perovskite-solar-cells-domestic-deployment": [
      { text: "次世代ペロブスカイト", color: "bg-teal-50 text-teal-800" },
      { text: "ビル壁面・曲面設置", color: "bg-indigo-50 text-indigo-800" },
      { text: "ヨウ素の国産サプライ", color: "bg-emerald-50 text-emerald-800" },
    ],
    "fisheries-distribution-traceability-anti-poaching": [
      { text: "水産流通適正化法", color: "bg-teal-50 text-teal-800" },
      { text: "アワビ・ナマコ密漁罰則", color: "bg-rose-50 text-rose-800" },
      { text: "漁獲証明番号義務化", color: "bg-amber-100 text-amber-900" },
    ],
    "tac-fishery-quota-expansion-warming-seas": [
      { text: "TAC漁獲枠8割へ", color: "bg-teal-50 text-teal-800" },
      { text: "個別割当（IQ）方式", color: "bg-indigo-50 text-indigo-800" },
      { text: "魚種交代への対応", color: "bg-amber-100 text-amber-900" },
    ],
    "land-based-aquaculture-ras-deregulation": [
      { text: "循環式陸上養殖RAS", color: "bg-teal-50 text-teal-800" },
      { text: "サーモン・エビ内陸生産", color: "bg-emerald-50 text-emerald-800" },
      { text: "海面養殖区画の緩和", color: "bg-indigo-50 text-indigo-800" },
    ],
    "commercial-whaling-kanei-maru-fin-whale": [
      { text: "商業捕鯨・関鯨丸就航", color: "bg-indigo-50 text-indigo-800" },
      { text: "ナガスクジラ追加", color: "bg-teal-50 text-teal-800" },
      { text: "水産食文化の継承", color: "bg-amber-100 text-amber-900" },
    ],
    "marine-plastic-ghost-gear-fisheries": [
      { text: "ゴーストギア流失漁具", color: "bg-rose-50 text-rose-800" },
      { text: "海洋生分解性プラスチック", color: "bg-teal-50 text-teal-800" },
      { text: "漁港での無償引き取り", color: "bg-emerald-50 text-emerald-800" },
    ],
    "inbound-two-tier-pricing-system": [
      { text: "外国人向け二重価格", color: "bg-amber-100 text-amber-900" },
      { text: "内外価格差と地域還元", color: "bg-teal-50 text-teal-800" },
      { text: "便乗値上げの監視", color: "bg-rose-50 text-rose-800" },
    ],
    "mt-fuji-entry-fee-overtourism-regulation": [
      { text: "富士山通行料2,000円", color: "bg-teal-50 text-teal-800" },
      { text: "1日4,000人弾力規制", color: "bg-indigo-50 text-indigo-800" },
      { text: "弾丸登山・遭難防止", color: "bg-rose-50 text-rose-800" },
    ],
    "minpaku-180-day-limit-deregulation": [
      { text: "民泊180日制限見直し", color: "bg-amber-100 text-amber-900" },
      { text: "住宅宿泊事業法改正", color: "bg-teal-50 text-teal-800" },
      { text: "ヤミ民泊・騒音取締", color: "bg-rose-50 text-rose-800" },
    ],
    "unprofitable-local-rail-bus-conversion": [
      { text: "赤字ローカル線再構築", color: "bg-rose-50 text-rose-800" },
      { text: "BRT・上下分離方式", color: "bg-teal-50 text-teal-800" },
      { text: "国主導の再構築協議会", color: "bg-indigo-50 text-indigo-800" },
    ],
    "regional-airport-concession-inbound": [
      { text: "地方空港コンセッション", color: "bg-teal-50 text-teal-800" },
      { text: "国際線LCC直行便誘致", color: "bg-emerald-50 text-emerald-800" },
      { text: "滑走路・ターミナル一体運営", color: "bg-indigo-50 text-indigo-800" },
    ],
    "retrial-law-reform-evidence-disclosure": [
      { text: "袴田事件無罪確定", color: "bg-emerald-50 text-emerald-800" },
      { text: "未提出証拠の開示義務化", color: "bg-teal-50 text-teal-800" },
      { text: "検察の抗告禁止を要求", color: "bg-amber-100 text-amber-900" },
    ],
    "non-consensual-sexual-offenses-penal-code": [
      { text: "不同意性交等罪の施行", color: "bg-teal-50 text-teal-800" },
      { text: "性的同意年齢16歳へ", color: "bg-indigo-50 text-indigo-800" },
      { text: "盗撮処罰法（撮影罪）新設", color: "bg-purple-50 text-purple-800" },
    ],
    "gender-identity-act-surgery-requirement-reform": [
      { text: "生殖不能手術要件の違憲", color: "bg-teal-50 text-teal-800" },
      { text: "最高裁大法廷決定", color: "bg-indigo-50 text-indigo-800" },
      { text: "公衆浴場は身体特徴基準", color: "bg-amber-100 text-amber-900" },
    ],
    "juvenile-act-specified-juveniles-strictness": [
      { text: "特定少年（18・19歳）", color: "bg-amber-100 text-amber-900" },
      { text: "起訴後の実名報道解禁", color: "bg-rose-50 text-rose-800" },
      { text: "原則逆送対象の大幅拡大", color: "bg-teal-50 text-teal-800" },
    ],
    "tokuryu-yami-baito-crackdown-legislation": [
      { text: "トクリュウ・闇バイト対策", color: "bg-rose-50 text-rose-800" },
      { text: "AIによる募集検知・DM警告", color: "bg-teal-50 text-teal-800" },
      { text: "口座・SIMの即時凍結", color: "bg-indigo-50 text-indigo-800" },
    ],
    "ai-safety-basic-act-regulation": [
      { text: "AI安全法制・基本法", color: "bg-indigo-50 text-indigo-800" },
      { text: "AIセーフティ機構AISI", color: "bg-teal-50 text-teal-800" },
      { text: "フロンティアAIモデル規制", color: "bg-purple-50 text-purple-800" },
    ],
    "deepfake-watermark-originator-profile": [
      { text: "OP発信者出自証明技術", color: "bg-teal-50 text-teal-800" },
      { text: "ディープフェイク偽動画対策", color: "bg-rose-50 text-rose-800" },
      { text: "AI生成物への電子透かし", color: "bg-indigo-50 text-indigo-800" },
    ],
    "telecom-emergency-roaming-mandate": [
      { text: "携帯4社の緊急ローミング", color: "bg-teal-50 text-teal-800" },
      { text: "119番緊急通報を優先確保", color: "bg-rose-50 text-rose-800" },
      { text: "大規模障害・災害時の相互接続", color: "bg-indigo-50 text-indigo-800" },
    ],
    "nhk-internet-receiving-fee-mandate": [
      { text: "NHKネット配信の必須業務化", color: "bg-indigo-50 text-indigo-800" },
      { text: "登録者にネット受信料新設", color: "bg-amber-100 text-amber-900" },
      { text: "テレビ保有世帯は追加負担なし", color: "bg-teal-50 text-teal-800" },
    ],
    "youth-smartphone-gaming-time-restriction": [
      { text: "未成年スマホ・SNS利用指針", color: "bg-amber-100 text-amber-900" },
      { text: "海外16歳未満禁止法の波及", color: "bg-purple-50 text-purple-800" },
      { text: "年齢確認技術の実装義務化", color: "bg-teal-50 text-teal-800" },
    ],
    "dense-wooden-residential-fire-prevention": [
      { text: "木造密集地域（木密）解消", color: "bg-rose-50 text-rose-800" },
      { text: "特定防災道路の拡幅整備", color: "bg-teal-50 text-teal-800" },
      { text: "解体費全額助成・固定資産税免除", color: "bg-indigo-50 text-indigo-800" },
    ],
    "tower-mansion-inheritance-tax-valuation": [
      { text: "タワマン節税の見直し", color: "bg-amber-100 text-amber-900" },
      { text: "実勢価格の最低6割へ補正", color: "bg-teal-50 text-teal-800" },
      { text: "高層階ほど評価額引き上げ", color: "bg-indigo-50 text-indigo-800" },
    ],
    "embankment-regulation-act-landslide-prevention": [
      { text: "盛土規制法の全国運用", color: "bg-teal-50 text-teal-800" },
      { text: "熱海土石流の教訓・総点検", color: "bg-rose-50 text-rose-800" },
      { text: "違反法人に最高3億円重罰", color: "bg-purple-50 text-purple-800" },
    ],
    "river-basin-disaster-resilience-flood-control": [
      { text: "流域治水・特定都市河川", color: "bg-teal-50 text-teal-800" },
      { text: "田んぼダム・地下調整池", color: "bg-emerald-50 text-emerald-800" },
      { text: "水害危険地域からの高台移転", color: "bg-indigo-50 text-indigo-800" },
    ],
    "tokyo-over-concentration-migration-subsidy": [
      { text: "地方移住支援金最大300万円", color: "bg-teal-50 text-teal-800" },
      { text: "子ども1人加算100万円", color: "bg-amber-100 text-amber-900" },
      { text: "転職なきテレワーク移住", color: "bg-indigo-50 text-indigo-800" },
    ],
    "national-university-tuition-hike-debate": [
      { text: "東大授業料年64万円へ改定", color: "bg-rose-50 text-rose-800" },
      { text: "運営費交付金削減のツケ", color: "bg-amber-100 text-amber-900" },
      { text: "年収900万円まで免除拡充", color: "bg-teal-50 text-teal-800" },
    ],
    "world-class-research-university-fund": [
      { text: "10兆円大学ファンド", color: "bg-indigo-50 text-indigo-800" },
      { text: "東北大学を第1号認定", color: "bg-teal-50 text-teal-800" },
      { text: "年数百億円の長期助成", color: "bg-emerald-50 text-emerald-800" },
    ],
    "elementary-class-size-35-teacher-shortage": [
      { text: "小学校全学年で35人学級完成", color: "bg-teal-50 text-teal-800" },
      { text: "全国的教員不足の深刻化", color: "bg-rose-50 text-rose-800" },
      { text: "担任未配置・採用倍率低下", color: "bg-amber-100 text-amber-900" },
    ],
    "scholarship-loan-forgiveness-regional-employment": [
      { text: "奨学金返還免除・代理返還", color: "bg-teal-50 text-teal-800" },
      { text: "地方就業で最大数百万円免除", color: "bg-emerald-50 text-emerald-800" },
      { text: "介護・保育・製造業の採用支援", color: "bg-indigo-50 text-indigo-800" },
    ],
    "truancy-free-school-public-funding-cocolo": [
      { text: "不登校過去最多34万人突破", color: "bg-rose-50 text-rose-800" },
      { text: "COCOLOプラン・多様な学び", color: "bg-teal-50 text-teal-800" },
      { text: "フリースクール利用料助成", color: "bg-indigo-50 text-indigo-800" },
    ],
    "active-cyber-defense-legislation": [
      { text: "能動的サイバー防御ACD", color: "bg-indigo-50 text-indigo-800" },
      { text: "通信の秘密と先制中和", color: "bg-rose-50 text-rose-800" },
      { text: "重要インフラ防衛司令部新設", color: "bg-teal-50 text-teal-800" },
    ],
    "counterstrike-capability-long-range-missiles": [
      { text: "反撃能力（敵基地攻撃能力）", color: "bg-rose-50 text-rose-800" },
      { text: "トマホーク400発前倒し調達", color: "bg-indigo-50 text-indigo-800" },
      { text: "国産12式改長射程ミサイル", color: "bg-teal-50 text-teal-800" },
    ],
    "defense-equipment-transfer-gcap-export": [
      { text: "次期戦闘機GCAP第三国輸出", color: "bg-indigo-50 text-indigo-800" },
      { text: "防衛装備移転三原則改定", color: "bg-teal-50 text-teal-800" },
      { text: "平和主義と量産コスト低減", color: "bg-amber-100 text-amber-900" },
    ],
    "critical-land-use-regulation-act-bases-islands": [
      { text: "重要土地等利用規制法の運用", color: "bg-teal-50 text-teal-800" },
      { text: "基地周辺1km・国境離島指定", color: "bg-indigo-50 text-indigo-800" },
      { text: "外資買収調査・事前届出義務", color: "bg-amber-100 text-amber-900" },
    ],
    "coast-guard-sdf-control-protocol-defense": [
      { text: "海保の防衛相統制要領", color: "bg-teal-50 text-teal-800" },
      { text: "自衛隊法80条の手続き初策定", color: "bg-indigo-50 text-indigo-800" },
      { text: "住民避難・海難救助に特化", color: "bg-emerald-50 text-emerald-800" },
    ],
    "minimum-wage-1500-yen-target": [
      { text: "全国平均1,500円目標前倒し", color: "bg-teal-50 text-teal-800" },
      { text: "2024年1,055円へ大幅改定", color: "bg-emerald-50 text-emerald-800" },
      { text: "中小企業業務改善助成金9割", color: "bg-amber-100 text-amber-900" },
    ],
    "disability-employment-quota-hike-agency-curb": [
      { text: "法定雇用率2.7%へ段階引き上げ", color: "bg-teal-50 text-teal-800" },
      { text: "週10時間超短時間雇用の解禁", color: "bg-indigo-50 text-indigo-800" },
      { text: "貸し農園代行ビジネスの規制", color: "bg-amber-100 text-amber-900" },
    ],
    "spot-work-gig-worker-labor-protection": [
      { text: "スキマバイト登録2,000万人", color: "bg-teal-50 text-teal-800" },
      { text: "面接なし・即日給与払い定着", color: "bg-indigo-50 text-indigo-800" },
      { text: "労災・雇用保険セーフティネット", color: "bg-rose-50 text-rose-800" },
    ],
    "wage-increase-corporate-tax-credit": [
      { text: "賃上げ促進税制最大45%減税", color: "bg-teal-50 text-teal-800" },
      { text: "赤字中小向け5年繰越控除新設", color: "bg-emerald-50 text-emerald-800" },
      { text: "春闘5%賃上げの原動力", color: "bg-indigo-50 text-indigo-800" },
    ],
    "job-based-hiring-new-graduates-transition": [
      { text: "インターン採用直結の解禁", color: "bg-teal-50 text-teal-800" },
      { text: "新卒ジョブ型・配属ガチャ解消", color: "bg-indigo-50 text-indigo-800" },
      { text: "就活超早期化と学業への懸念", color: "bg-amber-100 text-amber-900" },
    ],
    "infectious-disease-agency-jihs-japan-cdc": [
      { text: "内閣感染症危機管理統括庁", color: "bg-teal-50 text-teal-800" },
      { text: "日本版CDC（JIHS）発足", color: "bg-indigo-50 text-indigo-800" },
      { text: "病床確保の指示・命令権創設", color: "bg-purple-50 text-purple-800" },
    ],
    "emergency-contraception-otc-pharmacy-sale": [
      { text: "緊急避妊薬の処方箋なし薬局販売", color: "bg-teal-50 text-teal-800" },
      { text: "72時間以内の早期アクセス", color: "bg-indigo-50 text-indigo-800" },
      { text: "全国145薬局での試験運用", color: "bg-emerald-50 text-emerald-800" },
    ],
    "primary-care-physician-function-report-system": [
      { text: "かかりつけ医機能報告制度", color: "bg-teal-50 text-teal-800" },
      { text: "休日夜間・在宅看取り機能の公表", color: "bg-indigo-50 text-indigo-800" },
      { text: "大病院受診の選定療養費引き上げ", color: "bg-amber-100 text-amber-900" },
    ],
    "physician-geographic-maldistribution-rural-mandate": [
      { text: "医師偏在対策・地方勤務要件", color: "bg-rose-50 text-rose-800" },
      { text: "医学部地域枠離脱のペナルティ", color: "bg-amber-100 text-amber-900" },
      { text: "大都市開業規制と地方手当加算", color: "bg-teal-50 text-teal-800" },
    ],
    "electronic-prescription-medical-dx-platform": [
      { text: "電子処方箋・電子カルテ全国共有", color: "bg-teal-50 text-teal-800" },
      { text: "重複投薬・併用禁忌の自動警告", color: "bg-indigo-50 text-indigo-800" },
      { text: "災害時・救急搬送の即時カルテ参照", color: "bg-emerald-50 text-emerald-800" },
    ],  // 第17弾（注目政策40テーマ追加・全380政策）
  "integrated-elementary-junior-high-school-reform": [
    { text: "小中一貫9年教育", color: "bg-teal-50 text-teal-700 border-teal-200" },
    { text: "中1ギャップ解消", color: "bg-blue-50 text-blue-700 border-blue-200" },
    { text: "4・3・2制等の弾力化", color: "bg-indigo-50 text-indigo-700 border-indigo-200" }
  ],
  "public-school-tuition-aid-expansion-high-school": [
    { text: "高校実質無償化", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    { text: "所得制限撤廃へ", color: "bg-teal-50 text-teal-700 border-teal-200" },
    { text: "私立高支援上限拡充", color: "bg-indigo-50 text-indigo-700 border-indigo-200" }
  ],
  "university-science-humanities-conversion-subsidy": [
    { text: "理系学部3000億円基金", color: "bg-purple-50 text-purple-700 border-purple-200" },
    { text: "理系割合5割目標", color: "bg-blue-50 text-blue-700 border-blue-200" },
    { text: "デジタル・脱炭素人材", color: "bg-teal-50 text-teal-700 border-teal-200" }
  ],
  "integrated-school-afterschool-childcare-reform": [
    { text: "小1の壁打破", color: "bg-rose-50 text-rose-700 border-rose-200" },
    { text: "学校施設一体運営", color: "bg-teal-50 text-teal-700 border-teal-200" },
    { text: "待機児童ゼロ目標", color: "bg-emerald-50 text-emerald-700 border-emerald-200" }
  ],
  "school-smartphone-ban-guidelines-digital-detox": [
    { text: "スマホ原則持込禁止", color: "bg-amber-50 text-amber-700 border-amber-200" },
    { text: "授業中シャットアウト", color: "bg-blue-50 text-blue-700 border-blue-200" },
    { text: "端末依存・いじめ防止", color: "bg-rose-50 text-rose-700 border-rose-200" }
  ],
  "student-internship-direct-recruiting-guidelines": [
    { text: "インターン採用直結", color: "bg-indigo-50 text-indigo-700 border-indigo-200" },
    { text: "5日以上・実務体験", color: "bg-teal-50 text-teal-700 border-teal-200" },
    { text: "就活超早期化の懸念", color: "bg-amber-50 text-amber-700 border-amber-200" }
  ],
  "in-hospital-classrooms-chronically-ill-children": [
    { text: "院内オンライン授業", color: "bg-teal-50 text-teal-700 border-teal-200" },
    { text: "元の学校と出席認定", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    { text: "アバター・遠隔通学", color: "bg-blue-50 text-blue-700 border-blue-200" }
  ],
  "school-lunch-local-procurement-organic-ratio": [
    { text: "給食の地産地消", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    { text: "有機食材利用拡大", color: "bg-teal-50 text-teal-700 border-teal-200" },
    { text: "食育・地元農家支援", color: "bg-blue-50 text-blue-700 border-blue-200" }
  ],

  "regional-railway-restructuring-bus-conversion": [
    { text: "地域鉄道再構築法", color: "bg-amber-50 text-amber-700 border-amber-200" },
    { text: "輸送密度1000未満協議", color: "bg-rose-50 text-rose-700 border-rose-200" },
    { text: "バス転換・上下分離", color: "bg-blue-50 text-blue-700 border-blue-200" }
  ],
  "demand-responsive-transport-ai-on-demand-bus": [
    { text: "AIオンデマンド交通", color: "bg-teal-50 text-teal-700 border-teal-200" },
    { text: "予約即時最適配車", color: "bg-blue-50 text-blue-700 border-blue-200" },
    { text: "空白地域の足確保", color: "bg-emerald-50 text-emerald-700 border-emerald-200" }
  ],
  "inter-prefectural-expressway-toll-free-social-experiment": [
    { text: "ETC深夜割引見直し", color: "bg-blue-50 text-blue-700 border-blue-200" },
    { text: "走行分のみ割引", color: "bg-teal-50 text-teal-700 border-teal-200" },
    { text: "IC前滞留トラック解消", color: "bg-emerald-50 text-emerald-700 border-emerald-200" }
  ],
  "senior-citizen-license-surrender-benefit-expansion": [
    { text: "免許返納・サポカー限定", color: "bg-indigo-50 text-indigo-700 border-indigo-200" },
    { text: "運転経歴証明書交付", color: "bg-teal-50 text-teal-700 border-teal-200" },
    { text: "高齢者事故防止と移動権", color: "bg-rose-50 text-rose-700 border-rose-200" }
  ],
  "rural-gas-station-maintenance-ss-depopulation": [
    { text: "過疎地SS維持支援", color: "bg-amber-50 text-amber-700 border-amber-200" },
    { text: "灯油配達・給油所確保", color: "bg-rose-50 text-rose-700 border-rose-200" },
    { text: "給油難民ゼロ対策", color: "bg-teal-50 text-teal-700 border-teal-200" }
  ],
  "water-utility-regional-consolidation-aging-pipes": [
    { text: "水道広域化・老朽管更新", color: "bg-blue-50 text-blue-700 border-blue-200" },
    { text: "官民連携コンセッション", color: "bg-teal-50 text-teal-700 border-teal-200" },
    { text: "将来水道料金値上げ抑制", color: "bg-emerald-50 text-emerald-700 border-emerald-200" }
  ],
  "coastal-shipping-crew-shortage-modal-shift": [
    { text: "内航海運モーダルシフト", color: "bg-teal-50 text-teal-700 border-teal-200" },
    { text: "トラック2024年問題補完", color: "bg-blue-50 text-blue-700 border-blue-200" },
    { text: "自動運航船・労務改善", color: "bg-emerald-50 text-emerald-700 border-emerald-200" }
  ],
  "municipal-waste-disposal-pay-as-you-throw-bags": [
    { text: "ごみ袋指定・有料化", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    { text: "家庭ごみ10〜20%減量", color: "bg-teal-50 text-teal-700 border-teal-200" },
    { text: "焼却炉維持費削減", color: "bg-blue-50 text-blue-700 border-blue-200" }
  ],

  "subscription-contract-cancellation-dark-patterns": [
    { text: "サブスク解約妨害規制", color: "bg-rose-50 text-rose-700 border-rose-200" },
    { text: "ダークパターン禁止", color: "bg-amber-50 text-amber-700 border-amber-200" },
    { text: "ワンクリック解約義務化", color: "bg-blue-50 text-blue-700 border-blue-200" }
  ],
  "anti-ticket-resale-law-reform-dynamic-pricing": [
    { text: "チケット転売法強化", color: "bg-indigo-50 text-indigo-700 border-indigo-200" },
    { text: "公式リセール義務化へ", color: "bg-teal-50 text-teal-700 border-teal-200" },
    { text: "価格変動制（変動料金）", color: "bg-blue-50 text-blue-700 border-blue-200" }
  ],
  "door-to-door-gold-purchase-cooling-off-expansion": [
    { text: "押し買い・訪問購入規制", color: "bg-rose-50 text-rose-700 border-rose-200" },
    { text: "8日間クーリングオフ", color: "bg-teal-50 text-teal-700 border-teal-200" },
    { text: "引き渡し拒絶権の徹底", color: "bg-blue-50 text-blue-700 border-blue-200" }
  ],
  "installment-sales-act-bnpl-credit-assessment": [
    { text: "後払い決済BNPL規制", color: "bg-blue-50 text-blue-700 border-blue-200" },
    { text: "若者の過重債務防止", color: "bg-amber-50 text-amber-700 border-amber-200" },
    { text: "割賦販売法・信用調査", color: "bg-emerald-50 text-emerald-700 border-emerald-200" }
  ],
  "online-dating-safety-id-verification-mandate": [
    { text: "マッチングアプリ公的身元確認", color: "bg-purple-50 text-purple-700 border-purple-200" },
    { text: "SNS投資詐欺排除", color: "bg-rose-50 text-rose-700 border-rose-200" },
    { text: "マイナカードeKYC導入", color: "bg-teal-50 text-teal-700 border-teal-200" }
  ],
  "stealth-marketing-regulation-act-enforcement": [
    { text: "ステマ告示規制・厳罰化", color: "bg-rose-50 text-rose-700 border-rose-200" },
    { text: "「PR」「広告」表記必須", color: "bg-amber-50 text-amber-700 border-amber-200" },
    { text: "措置命令・事業者名公表", color: "bg-teal-50 text-teal-700 border-teal-200" }
  ],
  "digital-inheritance-cloud-account-access-rules": [
    { text: "デジタル遺産法制化", color: "bg-indigo-50 text-indigo-700 border-indigo-200" },
    { text: "ネット銀行・暗号資産承継", color: "bg-blue-50 text-blue-700 border-blue-200" },
    { text: "秘密保持と遺族開示の両立", color: "bg-teal-50 text-teal-700 border-teal-200" }
  ],
  "personal-information-protection-anonymization-optout": [
    { text: "個人情報保護法3年見直し", color: "bg-blue-50 text-blue-700 border-blue-200" },
    { text: "Cookie/ターゲティング同意", color: "bg-teal-50 text-teal-700 border-teal-200" },
    { text: "仮名加工情報の産業活用", color: "bg-purple-50 text-purple-700 border-purple-200" }
  ],

  "smart-agriculture-promotion-law-robot-tractors": [
    { text: "スマート農業促進法", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    { text: "自動運転トラクター", color: "bg-teal-50 text-teal-700 border-teal-200" },
    { text: "ドローン農薬散布・省人化", color: "bg-blue-50 text-blue-700 border-blue-200" }
  ],
  "food-waste-reduction-retail-discard-penalty": [
    { text: "食品ロス半減目標", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    { text: "小売店廃棄ペナルティ", color: "bg-amber-50 text-amber-700 border-amber-200" },
    { text: "フードバンク寄附税制", color: "bg-teal-50 text-teal-700 border-teal-200" }
  ],
  "fisheries-resource-management-tac-system-reform": [
    { text: "TAC漁獲枠管理拡大", color: "bg-blue-50 text-blue-700 border-blue-200" },
    { text: "IQ個別割当方式導入", color: "bg-teal-50 text-teal-700 border-teal-200" },
    { text: "水産資源の枯渇防止", color: "bg-emerald-50 text-emerald-700 border-emerald-200" }
  ],
  "organic-farming-midori-strategy-25-percent": [
    { text: "みどりの食料戦略", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    { text: "有機農業面積25%目標", color: "bg-teal-50 text-teal-700 border-teal-200" },
    { text: "化学農薬・肥料大幅削減", color: "bg-blue-50 text-blue-700 border-blue-200" }
  ],
  "abandoned-farmland-consolidation-farmland-bank": [
    { text: "農地バンク集積率8割", color: "bg-teal-50 text-teal-700 border-teal-200" },
    { text: "荒廃農地・放棄地解消", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    { text: "担い手への大区画化", color: "bg-blue-50 text-blue-700 border-blue-200" }
  ],
  "dairy-farming-feed-price-stabilization-fund": [
    { text: "配合飼料価格安定基金", color: "bg-blue-50 text-blue-700 border-blue-200" },
    { text: "酪農経営安定・離農抑止", color: "bg-amber-50 text-amber-700 border-amber-200" },
    { text: "国産飼料（子実コーン）推進", color: "bg-emerald-50 text-emerald-700 border-emerald-200" }
  ],
  "timber-usage-promotion-public-buildings-wooden": [
    { text: "公共建築物木造化", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    { text: "都市に第2の森林創出", color: "bg-teal-50 text-teal-700 border-teal-200" },
    { text: "国産材・CLT活用推進", color: "bg-blue-50 text-blue-700 border-blue-200" }
  ],
  "wildlife-damage-prevention-gibier-utilization": [
    { text: "鳥獣被害特措法", color: "bg-amber-50 text-amber-700 border-amber-200" },
    { text: "ジビエ消費拡大・解体施設", color: "bg-teal-50 text-teal-700 border-teal-200" },
    { text: "ハンター高齢化対策・ICT罠", color: "bg-rose-50 text-rose-700 border-rose-200" }
  ],

  "anonymous-fluid-criminal-groups-tokuryu-countermeasures": [
    { text: "トクリュウ・闇バイト根絶", color: "bg-rose-50 text-rose-700 border-rose-200" },
    { text: "指示役の特定と重罰化", color: "bg-blue-50 text-blue-700 border-blue-200" },
    { text: "通信傍受・口座凍結強化", color: "bg-purple-50 text-purple-700 border-purple-200" }
  ],
  "evacuation-shelter-t-k-b-toilet-kitchen-bed-standards": [
    { text: "避難所TKB基準法制化", color: "bg-teal-50 text-teal-700 border-teal-200" },
    { text: "段ボールベッド・温食", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    { text: "災害関連死ゼロ目標", color: "bg-rose-50 text-rose-700 border-rose-200" }
  ],
  "disaster-prevention-weather-information-linear-rainband": [
    { text: "線状降水帯半日前予測", color: "bg-blue-50 text-blue-700 border-blue-200" },
    { text: "キキクル危険度マップ", color: "bg-rose-50 text-rose-700 border-rose-200" },
    { text: "警戒レベル4避難指示前倒し", color: "bg-amber-50 text-amber-700 border-amber-200" }
  ],
  "underground-utility-tunnels-pole-free-urban-resilience": [
    { text: "無電柱化推進法", color: "bg-teal-50 text-teal-700 border-teal-200" },
    { text: "緊急輸送道路の新設禁止", color: "bg-rose-50 text-rose-700 border-rose-200" },
    { text: "倒壊ゼロ・景観向上", color: "bg-emerald-50 text-emerald-700 border-emerald-200" }
  ],
  "isolated-communities-disaster-helicopter-communication": [
    { text: "孤立集落対策・能登の教訓", color: "bg-rose-50 text-rose-700 border-rose-200" },
    { text: "Starlink衛星通信配備", color: "bg-blue-50 text-blue-700 border-blue-200" },
    { text: "ヘリ離着陸場・備蓄強化", color: "bg-teal-50 text-teal-700 border-teal-200" }
  ],
  "abandoned-boats-removal-ports-coastal-cleanup": [
    { text: "放置艇・プレジャーボート対策", color: "bg-blue-50 text-blue-700 border-blue-200" },
    { text: "放置禁止区域・代執行撤去", color: "bg-rose-50 text-rose-700 border-rose-200" },
    { text: "係留施設整備・マリーナ化", color: "bg-teal-50 text-teal-700 border-teal-200" }
  ],
  "civil-protection-shelters-underground-stations": [
    { text: "地下指定避難施設", color: "bg-purple-50 text-purple-700 border-purple-200" },
    { text: "地下鉄駅・地下街の活用", color: "bg-blue-50 text-blue-700 border-blue-200" },
    { text: "ミサイル攻撃・爆風防護", color: "bg-rose-50 text-rose-700 border-rose-200" }
  ],
  "flood-risk-real-estate-transaction-disclosure": [
    { text: "水害リスク重説義務化", color: "bg-blue-50 text-blue-700 border-blue-200" },
    { text: "洪水・内水・高潮マップ提示", color: "bg-teal-50 text-teal-700 border-teal-200" },
    { text: "購入・賃貸前のリスク把握", color: "bg-emerald-50 text-emerald-700 border-emerald-200" }
  ],

  // 第18弾（注目政策50テーマ追加・全430政策）
  "abandoned-graves-demolition-tree-burial-cremation-rules": [
    { text: "無縁墓の撤去公告期間を短縮", color: "bg-teal-50 text-teal-700 border-teal-200" },
    { text: "樹木葬・合葬墓の基準を法制化", color: "bg-blue-50 text-blue-700 border-blue-200" },
    { text: "離檀トラブル防止ガイドライン", color: "bg-emerald-50 text-emerald-700 border-emerald-200" }
  ],
  "autonomous-driving-level-4-public-road-liability": [
    { text: "車内完全無人の公道走行を解禁", color: "bg-indigo-50 text-indigo-700 border-indigo-200" },
    { text: "遠隔監視者の配置を義務化", color: "bg-purple-50 text-purple-700 border-purple-200" },
    { text: "システム欠陥と運行責任を法的に整理", color: "bg-amber-50 text-amber-700 border-amber-200" }
  ],
  "biometric-authentication-payments-privacy-guidelines": [
    { text: "完全な手ぶら決済が実現", color: "bg-rose-50 text-rose-700 border-rose-200" },
    { text: "顔画像の保存禁止・特徴量暗号化", color: "bg-teal-50 text-teal-700 border-teal-200" },
    { text: "事前オプトイン同意の義務化", color: "bg-blue-50 text-blue-700 border-blue-200" }
  ],
  "child-poverty-prevention-cafeteria-permanent-subsidies": [
    { text: "現在と将来の幸福を明記", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    { text: "子ども食堂への安定公費助成", color: "bg-indigo-50 text-indigo-700 border-indigo-200" },
    { text: "夏休み等の食料無料配布を拡充", color: "bg-purple-50 text-purple-700 border-purple-200" }
  ],
  "childcare-leave-net-take-home-pay-100-percent-benefit": [
    { text: "手取り実質100%を支給", color: "bg-amber-50 text-amber-700 border-amber-200" },
    { text: "両親ともに14日以上取得が原則", color: "bg-rose-50 text-rose-700 border-rose-200" },
    { text: "生後直後の最大28日間が対象", color: "bg-teal-50 text-teal-700 border-teal-200" }
  ],
  "compact-city-location-optimization-plan-consolidation": [
    { text: "中心部へ生活機能を集約", color: "bg-blue-50 text-blue-700 border-blue-200" },
    { text: "安全な中心部への移住補助", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    { text: "危険区域への居住誘導を禁止", color: "bg-indigo-50 text-indigo-700 border-indigo-200" }
  ],
  "dam-redevelopment-pre-discharge-flood-control-hydropower": [
    { text: "利水・発電ダムを含む全国統合放流", color: "bg-purple-50 text-purple-700 border-purple-200" },
    { text: "AI降雨予測による精密な事前放流", color: "bg-amber-50 text-amber-700 border-amber-200" },
    { text: "治水とクリーン電力増発の両立", color: "bg-rose-50 text-rose-700 border-rose-200" }
  ],
  "defense-supply-chain-cyber-security-standard-sp800": [
    { text: "NIST SP800-171相当の国際基準へ", color: "bg-teal-50 text-teal-700 border-teal-200" },
    { text: "下請け中小サプライヤーまで義務化", color: "bg-blue-50 text-blue-700 border-blue-200" },
    { text: "防衛省による実地検査を導入", color: "bg-emerald-50 text-emerald-700 border-emerald-200" }
  ],
  "digital-will-smartphone-blockchain-legalization": [
    { text: "スマホ・PCでの遺言作成を容認", color: "bg-indigo-50 text-indigo-700 border-indigo-200" },
    { text: "動画による意思確認を補助証拠化", color: "bg-purple-50 text-purple-700 border-purple-200" },
    { text: "法務局クラウド保管で検認不要", color: "bg-amber-50 text-amber-700 border-amber-200" }
  ],
  "domestic-sovereign-ai-llm-supercomputer-fund": [
    { text: "計算資源（GPU）を国が集中支援", color: "bg-rose-50 text-rose-700 border-rose-200" },
    { text: "日本の制度・文化に特化した学習", color: "bg-teal-50 text-teal-700 border-teal-200" },
    { text: "国内DC完結でデータ主権を死守", color: "bg-blue-50 text-blue-700 border-blue-200" }
  ],
  "drone-highway-flight-corridors-radio-law-reform": [
    { text: "送電線・河川上空を空の道に指定", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    { text: "上空での5G利用規制を緩和", color: "bg-indigo-50 text-indigo-700 border-indigo-200" },
    { text: "UTMクラウドで空中衝突を自動防止", color: "bg-purple-50 text-purple-700 border-purple-200" }
  ],
  "drug-lag-drug-loss-fast-track-approval": [
    { text: "国内独自治験の原則撤廃", color: "bg-amber-50 text-amber-700 border-amber-200" },
    { text: "審査期間を最短6か月に", color: "bg-rose-50 text-rose-700 border-rose-200" },
    { text: "迅速導入への薬価優遇", color: "bg-teal-50 text-teal-700 border-teal-200" }
  ],
  "emergency-call-7119-telephone-triage-nationwide": [
    { text: "24時間体制の#7119ダイヤル", color: "bg-blue-50 text-blue-700 border-blue-200" },
    { text: "重症患者への到着時間を短縮", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    { text: "全国人口カバー率ほぼ100%へ", color: "bg-indigo-50 text-indigo-700 border-indigo-200" }
  ],
  "floating-offshore-wind-eez-ocean-renewable-energy-act": [
    { text: "EEZ沖合まで設置エリアを拡大", color: "bg-purple-50 text-purple-700 border-purple-200" },
    { text: "仮許可・本許可の2段階審査", color: "bg-amber-50 text-amber-700 border-amber-200" },
    { text: "浮体式技術による深海展開", color: "bg-rose-50 text-rose-700 border-rose-200" }
  ],
  "foreign-ikusei-shuro-training-employment-system-reform": [
    { text: "人材確保と育成を明確な目的に", color: "bg-teal-50 text-teal-700 border-teal-200" },
    { text: "1〜2年で本人の希望転職を容認", color: "bg-blue-50 text-blue-700 border-blue-200" },
    { text: "特定技能へ直結、長期定着可能に", color: "bg-emerald-50 text-emerald-700 border-emerald-200" }
  ],
  "forest-environment-transfer-tax-allocation-formula-reform": [
    { text: "森林面積重視へ配分比率を是正", color: "bg-indigo-50 text-indigo-700 border-indigo-200" },
    { text: "2024年度より年1,000円課税開始", color: "bg-purple-50 text-purple-700 border-purple-200" },
    { text: "荒廃林の間伐と花粉症対策の重点化", color: "bg-amber-50 text-amber-700 border-amber-200" }
  ],
  "generic-drug-substitution-incentive-long-listed-copay": [
    { text: "先発薬の差額1/4が自己負担に", color: "bg-rose-50 text-rose-700 border-rose-200" },
    { text: "成分名処方への評価引き上げ", color: "bg-teal-50 text-teal-700 border-teal-200" },
    { text: "医療上の必要性がある時は免除", color: "bg-blue-50 text-blue-700 border-blue-200" }
  ],
  "heatstroke-special-alert-cooling-shelter-designation": [
    { text: "最上位の「特別警戒アラート」新設", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    { text: "クーリングシェルターの法的位置付け・義務化", color: "bg-indigo-50 text-indigo-700 border-indigo-200" },
    { text: "大手スーパー等の民間店舗の避難所指定", color: "bg-purple-50 text-purple-700 border-purple-200" }
  ],
  "infertility-treatment-advanced-medicine-cost-subsidy": [
    { text: "3割負担＋高額療養費が適用", color: "bg-amber-50 text-amber-700 border-amber-200" },
    { text: "先進医療の自己負担を最大全額助成", color: "bg-rose-50 text-rose-700 border-rose-200" },
    { text: "子ごとに回数リセット可能", color: "bg-teal-50 text-teal-700 border-teal-200" }
  ],
  "jpki-public-personal-authentication-private-api-opening": [
    { text: "ICチップ読み取りで即時完了", color: "bg-blue-50 text-blue-700 border-blue-200" },
    { text: "本人確認コストを最大9割削減", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    { text: "偽造身分証詐欺を完全遮断", color: "bg-indigo-50 text-indigo-700 border-indigo-200" }
  ],
  "local-vitalizing-cooperator-entrepreneurship-support": [
    { text: "隊員数1万人体制へ拡大", color: "bg-purple-50 text-purple-700 border-purple-200" },
    { text: "起業支援金最大100万円", color: "bg-amber-50 text-amber-700 border-amber-200" },
    { text: "事業承継型の隊員募集を強化", color: "bg-rose-50 text-rose-700 border-rose-200" }
  ],
  "minimum-wage-nationwide-uniform-regional-gap-reduction": [
    { text: "全国平均1500円目標へ前倒し", color: "bg-teal-50 text-teal-700 border-teal-200" },
    { text: "ランク集約で地方へ高額配分", color: "bg-blue-50 text-blue-700 border-blue-200" },
    { text: "地域間格差の縮小を優先", color: "bg-emerald-50 text-emerald-700 border-emerald-200" }
  ],
  "nankai-trough-earthquake-extra-advisory-pre-evacuation-guidelines": [
    { text: "警戒と注意の行動基準を明確化", color: "bg-indigo-50 text-indigo-700 border-indigo-200" },
    { text: "過剰な計画運休・休業の防止指針", color: "bg-purple-50 text-purple-700 border-purple-200" },
    { text: "流通業界との連携と冷静な購買誘導", color: "bg-amber-50 text-amber-700 border-amber-200" }
  ],
  "national-health-insurance-contribution-cap-increase": [
    { text: "最高限度額が年106万円超へ", color: "bg-rose-50 text-rose-700 border-rose-200" },
    { text: "中間層の急激な保険料増を緩和", color: "bg-teal-50 text-teal-700 border-teal-200" },
    { text: "低所得軽減の判定基準見直し", color: "bg-blue-50 text-blue-700 border-blue-200" }
  ],
  "neglected-vacant-houses-property-tax-relief-revocation": [
    { text: "管理不全の段階で早期指定", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    { text: "住宅特例解除で税額最大6倍", color: "bg-indigo-50 text-indigo-700 border-indigo-200" },
    { text: "自治体の所有者調査権限を拡大", color: "bg-purple-50 text-purple-700 border-purple-200" }
  ],
  "neighborhood-association-jichikai-digitalization-reform": [
    { text: "オンライン総会・電磁決議を解禁", color: "bg-amber-50 text-amber-700 border-amber-200" },
    { text: "紙の回覧板からアプリ配信へ", color: "bg-rose-50 text-rose-700 border-rose-200" },
    { text: "会費集金のキャッシュレス化", color: "bg-teal-50 text-teal-700 border-teal-200" }
  ],
  "newlywed-marriage-housing-relocation-support-subsidy": [
    { text: "20代新婚世帯に最大60万円", color: "bg-blue-50 text-blue-700 border-blue-200" },
    { text: "世帯所得500万円未満へ緩和", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    { text: "購入・リフォーム・引越し代も対象", color: "bg-indigo-50 text-indigo-700 border-indigo-200" }
  ],
  "nuclear-power-plant-lifespan-extension-over-60-years": [
    { text: "60年超の運転を可能に", color: "bg-purple-50 text-purple-700 border-purple-200" },
    { text: "安全審査等の停止期間を除外", color: "bg-amber-50 text-amber-700 border-amber-200" },
    { text: "30年以降は10年ごとに厳格審査", color: "bg-rose-50 text-rose-700 border-rose-200" }
  ],
  "online-medication-guidance-same-day-delivery": [
    { text: "スマホで服薬指導を完了", color: "bg-teal-50 text-teal-700 border-teal-200" },
    { text: "最短即日自宅へ配送", color: "bg-blue-50 text-blue-700 border-blue-200" },
    { text: "ドローンによる医薬品空輸", color: "bg-emerald-50 text-emerald-700 border-emerald-200" }
  ],
  "part-time-worker-social-insurance-full-coverage-elimination": [
    { text: "企業規模要件の完全撤廃へ", color: "bg-indigo-50 text-indigo-700 border-indigo-200" },
    { text: "厚生年金が上乗せされ将来安心", color: "bg-purple-50 text-purple-700 border-purple-200" },
    { text: "会社が保険料の半分を折半負担", color: "bg-amber-50 text-amber-700 border-amber-200" }
  ],
  "post-quantum-cryptography-government-migration-plan": [
    { text: "耐量子暗号（PQC）へ切り替え", color: "bg-rose-50 text-rose-700 border-rose-200" },
    { text: "2030年代半ばまでに完全移行", color: "bg-teal-50 text-teal-700 border-teal-200" },
    { text: "盗聴不可能な量子通信網の構築", color: "bg-blue-50 text-blue-700 border-blue-200" }
  ],
  "postpartum-depression-mental-health-care-expansion": [
    { text: "産後健診2回分を公費補助", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    { text: "宿泊型ケアが1泊数千円に", color: "bg-indigo-50 text-indigo-700 border-indigo-200" },
    { text: "全産婦が利用しやすい制度へ", color: "bg-purple-50 text-purple-700 border-purple-200" }
  ],
  "presumption-of-paternity-civil-code-reform-unregistered": [
    { text: "再婚後の出生は現夫の子に", color: "bg-amber-50 text-amber-700 border-amber-200" },
    { text: "女性の再婚禁止期間を全廃", color: "bg-rose-50 text-rose-700 border-rose-200" },
    { text: "母と子本人にも否認権を付与", color: "bg-teal-50 text-teal-700 border-teal-200" }
  ],
  "public-night-junior-high-school-prefecture-mandate": [
    { text: "全都道府県への設置を推進", color: "bg-blue-50 text-blue-700 border-blue-200" },
    { text: "不登校の若者や外国籍へ拡大", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    { text: "授業料無料・教科書無償", color: "bg-indigo-50 text-indigo-700 border-indigo-200" }
  ],
  "refill-prescription-utilization-target-expansion": [
    { text: "最大3回まで通院不要", color: "bg-purple-50 text-purple-700 border-purple-200" },
    { text: "国の普及数値目標を設定", color: "bg-amber-50 text-amber-700 border-amber-200" },
    { text: "薬剤師による健康チェック義務", color: "bg-rose-50 text-rose-700 border-rose-200" }
  ],
  "regenerative-medicine-ips-cell-insurance-pricing": [
    { text: "1回数千万円〜数億円水準", color: "bg-teal-50 text-teal-700 border-teal-200" },
    { text: "費用対効果による薬価引下げ", color: "bg-blue-50 text-blue-700 border-blue-200" },
    { text: "効果が出た時だけ支払う検討", color: "bg-emerald-50 text-emerald-700 border-emerald-200" }
  ],
  "regional-medical-coordination-hospital-downsizing": [
    { text: "病院連合で一体運営が可能に", color: "bg-indigo-50 text-indigo-700 border-indigo-200" },
    { text: "急性期を集約、回復期へ転換", color: "bg-purple-50 text-purple-700 border-purple-200" },
    { text: "病床削減支援金を交付", color: "bg-amber-50 text-amber-700 border-amber-200" }
  ],
  "resignation-agent-acceptance-employee-free-exit-rights": [
    { text: "意思表示から2週間で法律上成立", color: "bg-rose-50 text-rose-700 border-rose-200" },
    { text: "就業規則の代行禁止条項を無効化", color: "bg-teal-50 text-teal-700 border-teal-200" },
    { text: "違法な無資格業者の排除", color: "bg-blue-50 text-blue-700 border-blue-200" }
  ],
  "sediment-disaster-red-zone-housing-relocation-subsidies": [
    { text: "新規住宅開発・要配慮者施設の新設禁止", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    { text: "解体・新居取得に最大800万円超の補助", color: "bg-indigo-50 text-indigo-700 border-indigo-200" },
    { text: "跡地買い取りと税制支援", color: "bg-purple-50 text-purple-700 border-purple-200" }
  ],
  "senior-employment-age-70-mandate-age-75-extension": [
    { text: "70歳までの就業確保を義務化へ", color: "bg-amber-50 text-amber-700 border-amber-200" },
    { text: "業務委託・社会貢献支援も容認", color: "bg-rose-50 text-rose-700 border-rose-200" },
    { text: "役割に応じた適正賃金への是正", color: "bg-teal-50 text-teal-700 border-teal-200" }
  ],
  "sewage-pipeline-ai-robot-inspection-sinkhole-prevention": [
    { text: "AI自律ロボットによる自動診断", color: "bg-blue-50 text-blue-700 border-blue-200" },
    { text: "事前リスク予測による予防保全", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    { text: "道路を掘らない管更生工法の主流化", color: "bg-indigo-50 text-indigo-700 border-indigo-200" }
  ],
  "specialized-practical-education-training-benefit-80-percent": [
    { text: "受講費用の最大80%を給付", color: "bg-purple-50 text-purple-700 border-purple-200" },
    { text: "賃金5%増で追加10%上乗せ", color: "bg-amber-50 text-amber-700 border-amber-200" },
    { text: "AI・データサイエンス・MBAへ拡充", color: "bg-rose-50 text-rose-700 border-rose-200" }
  ],
  "spot-work-sukima-baito-labor-protection-workers-comp": [
    { text: "直接雇用として労基法を完全適用", color: "bg-teal-50 text-teal-700 border-teal-200" },
    { text: "数時間勤務でも即時労災適用", color: "bg-blue-50 text-blue-700 border-blue-200" },
    { text: "手数料なしでの即日全額振込", color: "bg-emerald-50 text-emerald-700 border-emerald-200" }
  ],
  "submarine-cable-landing-stations-decentralization": [
    { text: "北海道・九州・日本海側へ分散", color: "bg-indigo-50 text-indigo-700 border-indigo-200" },
    { text: "日本周回ルートで陸上寸断を回避", color: "bg-purple-50 text-purple-700 border-purple-200" },
    { text: "再エネ豊富な地方DCと直結", color: "bg-amber-50 text-amber-700 border-amber-200" }
  ],
  "tokyo-inland-earthquake-skyscraper-elevator-entrapment-mitigation": [
    { text: "P波感知型による最寄り階即時開放", color: "bg-rose-50 text-rose-700 border-rose-200" },
    { text: "避難所過密を防ぐ「在宅避難」原則", color: "bg-teal-50 text-teal-700 border-teal-200" },
    { text: "72時間稼働の給水・生活用非常電源", color: "bg-blue-50 text-blue-700 border-blue-200" }
  ],
  "truck-driver-waiting-time-demurrage-fee-mandatory-charge": [
    { text: "拘束時間年3300時間へ短縮", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    { text: "荷待ち時間料の別建て請求義務化", color: "bg-indigo-50 text-indigo-700 border-indigo-200" },
    { text: "悪質荷主の社名公表処分", color: "bg-purple-50 text-purple-700 border-purple-200" }
  ],
  "universal-dental-checkup-mandate-periodontal-disease": [
    { text: "毎年の歯科健診を推進", color: "bg-amber-50 text-amber-700 border-amber-200" },
    { text: "低廉な自己負担で受診可能に", color: "bg-rose-50 text-rose-700 border-rose-200" },
    { text: "健診結果をデジタル管理", color: "bg-teal-50 text-teal-700 border-teal-200" }
  ],
  "voice-cloning-deepfake-fraud-penal-code-crackdown": [
    { text: "AI悪用詐欺の法定刑引き上げ検討", color: "bg-blue-50 text-blue-700 border-blue-200" },
    { text: "合成音声を自動検知して警告", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    { text: "音声合成ツールへの本人確認義務化", color: "bg-indigo-50 text-indigo-700 border-indigo-200" }
  ],
  "wage-hike-corporate-tax-credit-deficit-relief-subsidies": [
    { text: "給与増加額の最大45%を減税", color: "bg-purple-50 text-purple-700 border-purple-200" },
    { text: "赤字企業も使える5年繰越控除", color: "bg-amber-50 text-amber-700 border-amber-200" },
    { text: "子育て・女性支援でさらに5%上乗せ", color: "bg-rose-50 text-rose-700 border-rose-200" }
  ],
  "welfare-evacuation-shelters-vulnerable-direct-admission": [
    { text: "一般避難所を経由しない直接避難", color: "bg-teal-50 text-teal-700 border-teal-200" },
    { text: "個別避難計画と施設事前マッチング", color: "bg-blue-50 text-blue-700 border-blue-200" },
    { text: "受入費用の全額公費負担・職員派遣", color: "bg-emerald-50 text-emerald-700 border-emerald-200" }
  ],

  // 第19弾（注目政策50テーマ追加・全480政策）
  "academic-degree-fraud-paper-mill-research-integrity": [
    { text: "2025年度からの即時無料公開（OA）完全義務化", color: "bg-teal-50 text-teal-700 border-teal-200" },
    { text: "悪質ハゲタカ雑誌への公費支出完全禁止", color: "bg-blue-50 text-blue-700 border-blue-200" },
    { text: "AI画像・テキスト不正検知ツールの共通導入", color: "bg-emerald-50 text-emerald-700 border-emerald-200" }
  ],
  "anti-money-laundering-crypto-travel-rule-enforcement": [
    { text: "送金者・受取人氏名の通知完全義務化", color: "bg-indigo-50 text-indigo-700 border-indigo-200" },
    { text: "個人ウォレット所有者申告の義務化", color: "bg-purple-50 text-purple-700 border-purple-200" },
    { text: "国際制裁リストとのリアルタイム照合", color: "bg-amber-50 text-amber-700 border-amber-200" }
  ],
  "anti-solicitation-cult-donation-relief-law": [
    { text: "借金・自宅売却による献金要求を禁止", color: "bg-rose-50 text-rose-700 border-rose-200" },
    { text: "子ども・配偶者による代位取消権創設", color: "bg-teal-50 text-teal-700 border-teal-200" },
    { text: "取消権を最長10年に大幅延長", color: "bg-blue-50 text-blue-700 border-blue-200" }
  ],
  "anti-stalker-act-gps-attachment-regulation": [
    { text: "GPS・位置情報の無断取得を明確禁止", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    { text: "SNSのDM等の連続送信も規制対象", color: "bg-indigo-50 text-indigo-700 border-indigo-200" },
    { text: "危険時の即時緊急禁止命令制度", color: "bg-purple-50 text-purple-700 border-purple-200" }
  ],
  "autonomous-train-goa3-driverless-regional-rail": [
    { text: "運転士免許不要のGoA2.5/GoA3を認可", color: "bg-amber-50 text-amber-700 border-amber-200" },
    { text: "ミリ波レーダー・AIによる障害物自動停止", color: "bg-rose-50 text-rose-700 border-rose-200" },
    { text: "短期講習の係員乗務への資格要件緩和", color: "bg-teal-50 text-teal-700 border-teal-200" }
  ],
  "bicycle-helmet-wearing-effort-obligation-penalization": [
    { text: "全年齢でのヘルメット着用努力義務化", color: "bg-blue-50 text-blue-700 border-blue-200" },
    { text: "自転車への青切符（反則金制度）新設", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    { text: "ながらスマホ・酒気帯びの即時厳罰化", color: "bg-indigo-50 text-indigo-700 border-indigo-200" }
  ],
  "carbon-border-adjustment-mechanism-cbam-dialogue": [
    { text: "製品単位の排出量開示・報告の義務化", color: "bg-purple-50 text-purple-700 border-purple-200" },
    { text: "日欧間での炭素価格相互承認・控除合意の追求", color: "bg-amber-50 text-amber-700 border-amber-200" },
    { text: "水素還元製鉄開発への巨額公費助成", color: "bg-rose-50 text-rose-700 border-rose-200" }
  ],
  "child-mental-health-school-counselor-full-deployment": [
    { text: "非常勤から常勤・正規公務員職への転換推進", color: "bg-teal-50 text-teal-700 border-teal-200" },
    { text: "予約不要の即時面談・常駐アクセス", color: "bg-blue-50 text-blue-700 border-blue-200" },
    { text: "SSW主導の福祉機関連携・即時介入", color: "bg-emerald-50 text-emerald-700 border-emerald-200" }
  ],
  "children-and-families-agency-support-fund-system": [
    { text: "医療保険料への支援金上乗せ徴収の新設", color: "bg-indigo-50 text-indigo-700 border-indigo-200" },
    { text: "2028年度までに年総額1兆円の確保", color: "bg-purple-50 text-purple-700 border-purple-200" },
    { text: "児童手当の所得制限撤廃・高校生延長・第3子倍増", color: "bg-amber-50 text-amber-700 border-amber-200" }
  ],
  "cruise-ship-port-facility-customs-quarantine-dx": [
    { text: "顔認証ゲートによるウォークスルー審査", color: "bg-rose-50 text-rose-700 border-rose-200" },
    { text: "スマホQRコードと顔認証による税関自動化", color: "bg-teal-50 text-teal-700 border-teal-200" },
    { text: "船上事前審査による着岸即下船の実現", color: "bg-blue-50 text-blue-700 border-blue-200" }
  ],
  "cultural-property-heritage-nft-tourism-utilization": [
    { text: "城泊・体験型高級観光の公式解禁", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    { text: "NFT・CFによるグローバル修繕資金調達", color: "bg-indigo-50 text-indigo-700 border-indigo-200" },
    { text: "観光利益の修繕積立金への強制還元", color: "bg-purple-50 text-purple-700 border-purple-200" }
  ],
  "custody-dispute-joint-custody-civil-code-revision": [
    { text: "共同親権・単独親権の選択制導入", color: "bg-amber-50 text-amber-700 border-amber-200" },
    { text: "DV・虐待時は単独親権を義務付け", color: "bg-rose-50 text-rose-700 border-rose-200" },
    { text: "日常決定は単独可・重要事項は共同", color: "bg-teal-50 text-teal-700 border-teal-200" }
  ],
  "dark-part-time-job-bank-account-freezing-framework": [
    { text: "数分〜数時間の即時口座凍結ネットワーク", color: "bg-blue-50 text-blue-700 border-blue-200" },
    { text: "全銀行での新規口座開設・利用の全面拒否", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    { text: "高齢者口座のATM振込制限・不正防止", color: "bg-indigo-50 text-indigo-700 border-indigo-200" }
  ],
  "depopulated-area-drone-medical-delivery-airspace": [
    { text: "有人地帯での目視外飛行（レベル4）解禁", color: "bg-purple-50 text-purple-700 border-purple-200" },
    { text: "オンライン診療とドローン配送の一体化", color: "bg-amber-50 text-amber-700 border-amber-200" },
    { text: "厳格な定温保冷・振動管理ガイドライン", color: "bg-rose-50 text-rose-700 border-rose-200" }
  ],
  "developmental-disability-early-detection-support-act": [
    { text: "5歳児健康診査の全国公費助成化", color: "bg-teal-50 text-teal-700 border-teal-200" },
    { text: "受給者証のマイナポータル即時発行・DX化", color: "bg-blue-50 text-blue-700 border-blue-200" },
    { text: "専門職による個別療育重視への報酬改定", color: "bg-emerald-50 text-emerald-700 border-emerald-200" }
  ],
  "digital-textbook-national-curriculum-full-rollout": [
    { text: "英語・算数等の主要教科で国費無償化", color: "bg-indigo-50 text-indigo-700 border-indigo-200" },
    { text: "ワンタッチ拡大・読み上げの標準装備", color: "bg-purple-50 text-purple-700 border-purple-200" },
    { text: "紙とデジタルのハイブリッド運用", color: "bg-amber-50 text-amber-700 border-amber-200" }
  ],
  "disability-pension-income-earning-rules-simplification": [
    { text: "就労のみを理由とする等級引き下げの防止徹底", color: "bg-rose-50 text-rose-700 border-rose-200" },
    { text: "就労意欲を削がない緩やかな所得制限への移行", color: "bg-teal-50 text-teal-700 border-teal-200" },
    { text: "全国統一審査による不当な地域格差の完全是正", color: "bg-blue-50 text-blue-700 border-blue-200" }
  ],
  "domestic-fertilizer-manure-compost-utilization": [
    { text: "輸入肥料原料の2割低減目標の設定", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    { text: "下水処理場リン回収設備整備への国費重点投資", color: "bg-indigo-50 text-indigo-700 border-indigo-200" },
    { text: "国内堆肥・ペレット利用への直接交付金支援", color: "bg-purple-50 text-purple-700 border-purple-200" }
  ],
  "economic-security-promotion-act-supply-chain-subsidies": [
    { text: "特定重要物資12物資への最大半額設備助成", color: "bg-amber-50 text-amber-700 border-amber-200" },
    { text: "14分野の基幹インフラ設備事前審査の義務化", color: "bg-rose-50 text-rose-700 border-rose-200" },
    { text: "安全保障上機微な特許の出願非公開制度導入", color: "bg-teal-50 text-teal-700 border-teal-200" }
  ],
  "elderly-financial-exploitation-prevention-trust": [
    { text: "成年後見の途中終了・交代を可能に", color: "bg-blue-50 text-blue-700 border-blue-200" },
    { text: "介護・医療費の親族代理引き出し指針策定", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    { text: "本人の希望を尊重する意思決定支援", color: "bg-indigo-50 text-indigo-700 border-indigo-200" }
  ],
  "electric-vehicle-ultra-fast-charger-highway-mandate": [
    { text: "150kW級超急速充電器を標準化", color: "bg-purple-50 text-purple-700 border-purple-200" },
    { text: "最低6口以上の複数口設置義務化", color: "bg-amber-50 text-amber-700 border-amber-200" },
    { text: "2030年目標を30万口へ倍増", color: "bg-rose-50 text-rose-700 border-rose-200" }
  ],
  "extracurricular-club-activities-regional-transition": [
    { text: "教員の休日部活指導の義務免除", color: "bg-teal-50 text-teal-700 border-teal-200" },
    { text: "月謝制導入と困窮世帯への補助クーポン", color: "bg-blue-50 text-blue-700 border-blue-200" },
    { text: "学校の枠を超えた合同クラブ化", color: "bg-emerald-50 text-emerald-700 border-emerald-200" }
  ],
  "fair-trade-commission-freelance-act-enforcement": [
    { text: "口頭発注の完全禁止・電磁的明示義務化", color: "bg-indigo-50 text-indigo-700 border-indigo-200" },
    { text: "納品後60日以内の支払期日義務化", color: "bg-purple-50 text-purple-700 border-purple-200" },
    { text: "継続取引における育児・介護両立配慮の義務化", color: "bg-amber-50 text-amber-700 border-amber-200" }
  ],
  "flying-car-evtol-commercial-operation-air-safety": [
    { text: "eVTOL専用の型式証明基準を新設", color: "bg-rose-50 text-rose-700 border-rose-200" },
    { text: "新操縦ライセンスと自動運航移行枠組み", color: "bg-teal-50 text-teal-700 border-teal-200" },
    { text: "都市ビル屋上バーティポート基準策定", color: "bg-blue-50 text-blue-700 border-blue-200" }
  ],
  "halal-kosher-food-export-promotion-agricultural": [
    { text: "認証取得・更新費用の最大半額補助", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    { text: "ハラール対応専用屠畜場・加工ラインの整備", color: "bg-indigo-50 text-indigo-700 border-indigo-200" },
    { text: "相手国公的機関との認証相互承認の推進", color: "bg-purple-50 text-purple-700 border-purple-200" }
  ],
  "japan-us-eu-critical-minerals-agreement": [
    { text: "日米重要鉱物協定の締結と輸出規制相互禁止", color: "bg-amber-50 text-amber-700 border-amber-200" },
    { text: "日米欧による重要鉱物多国間共同備蓄メカニズム", color: "bg-rose-50 text-rose-700 border-rose-200" },
    { text: "南鳥島沖深海レアアース泥の自国採掘実証", color: "bg-teal-50 text-teal-700 border-teal-200" }
  ],
  "medical-debt-guarantor-free-hospital-admission-mandate": [
    { text: "保証人不在を理由とする入院拒絶の完全違法化", color: "bg-blue-50 text-blue-700 border-blue-200" },
    { text: "自治体連携による未払い医療費の公的保全", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    { text: "家族不在時の医師団合議による治療決定ルール確立", color: "bg-indigo-50 text-indigo-700 border-indigo-200" }
  ],
  "nursing-care-staff-wage-increase-subsidy-expansion": [
    { text: "3加算の一本化と申請手続きの大幅簡素化", color: "bg-purple-50 text-purple-700 border-purple-200" },
    { text: "加算額の8割以上を月額基本給アップへ配分義務化", color: "bg-amber-50 text-amber-700 border-amber-200" },
    { text: "ケアマネ・看護師・他職種への柔軟な配分容認", color: "bg-rose-50 text-rose-700 border-rose-200" }
  ],
  "orphan-youth-caregiver-emancipation-support-fund": [
    { text: "ヤングケアラーの国法初明記と支援責務化", color: "bg-teal-50 text-teal-700 border-teal-200" },
    { text: "家庭への家事・介護ヘルパー公費派遣事業", color: "bg-blue-50 text-blue-700 border-blue-200" },
    { text: "学校スクリーニングと専門支援ネットワーク直結", color: "bg-emerald-50 text-emerald-700 border-emerald-200" }
  ],
  "overtourism-tourist-tax-congestion-surcharge-act": [
    { text: "富士山等での入域料徴収と人数制限", color: "bg-indigo-50 text-indigo-700 border-indigo-200" },
    { text: "全国観光自治体での宿泊税・訪問税拡大", color: "bg-purple-50 text-purple-700 border-purple-200" },
    { text: "観光客向け二重価格・急行運賃を公認", color: "bg-amber-50 text-amber-700 border-amber-200" }
  ],
  "patent-box-intellectual-property-tax-incentive": [
    { text: "対象特許・AI所得の30%特別控除導入", color: "bg-rose-50 text-rose-700 border-rose-200" },
    { text: "特許権およびAI著作権の対象指定", color: "bg-teal-50 text-teal-700 border-teal-200" },
    { text: "OECD準拠の実体研究開発要件（ネクサス基準）", color: "bg-blue-50 text-blue-700 border-blue-200" }
  ],
  "pediatric-cancer-fertility-preservation-subsidies": [
    { text: "卵子・卵巣組織等の凍結保存費用を公費助成", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    { text: "寛解後の生殖補助医療（体外受精）への助成拡大", color: "bg-indigo-50 text-indigo-700 border-indigo-200" },
    { text: "がん治療開始前の緊急妊孕性カウンセリング体制", color: "bg-purple-50 text-purple-700 border-purple-200" }
  ],
  "post-stroke-rehabilitation-insurance-duration-reform": [
    { text: "改善見込み患者に対する180日制限の例外適用拡充", color: "bg-amber-50 text-amber-700 border-amber-200" },
    { text: "退院時のリハビリ空白期間ゼロ化スキーム", color: "bg-rose-50 text-rose-700 border-rose-200" },
    { text: "装着型歩行支援ロボットの回復期加算新設", color: "bg-teal-50 text-teal-700 border-teal-200" }
  ],
  "pyramid-scheme-multilevel-marketing-cooling-off-expansion": [
    { text: "情報商材・投資サロンもマルチ規制対象", color: "bg-blue-50 text-blue-700 border-blue-200" },
    { text: "目的を隠したカフェ等への呼出禁止", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    { text: "書面不備時の無期限クーリングオフ", color: "bg-indigo-50 text-indigo-700 border-indigo-200" }
  ],
  "railway-station-platform-door-barrier-free-mandate": [
    { text: "1乗車あたり約10円のバリアフリー料金新設", color: "bg-purple-50 text-purple-700 border-purple-200" },
    { text: "10万人以上の駅への整備義務付け", color: "bg-amber-50 text-amber-700 border-amber-200" },
    { text: "昇降ロープ式等の柔軟な新技術導入", color: "bg-rose-50 text-rose-700 border-rose-200" }
  ],
  "rice-production-adjustment-gentan-policy-diversification": [
    { text: "不作リスクに対応した主食用米の安定供給方針", color: "bg-teal-50 text-teal-700 border-teal-200" },
    { text: "5年水張り要件の柔軟化と交付金ルールの再検討", color: "bg-blue-50 text-blue-700 border-blue-200" },
    { text: "エサ米から高付加価値な輸出用米への補助シフト", color: "bg-emerald-50 text-emerald-700 border-emerald-200" }
  ],
  "school-bullying-serious-incident-investigation-rules": [
    { text: "首長直轄の独立調査組織を法制化", color: "bg-indigo-50 text-indigo-700 border-indigo-200" },
    { text: "犯罪該当事案の即時警察連携義務化", color: "bg-purple-50 text-purple-700 border-purple-200" },
    { text: "調査記録の原則全面開示と進捗説明", color: "bg-amber-50 text-amber-700 border-amber-200" }
  ],
  "shinkansen-freight-express-cargo-modal-shift": [
    { text: "新幹線の専用荷物車両・座席荷物輸送", color: "bg-rose-50 text-rose-700 border-rose-200" },
    { text: "地方から大都市へ最短3〜4時間即日配送", color: "bg-teal-50 text-teal-700 border-teal-200" },
    { text: "CO2排出量を約90%削減", color: "bg-blue-50 text-blue-700 border-blue-200" }
  ],
  "single-parent-child-rearing-allowance-income-cap-easing": [
    { text: "全部支給所得上限を年収約190万円へ引き上げ", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    { text: "第3子以降加算額を月1万750円へ倍増", color: "bg-indigo-50 text-indigo-700 border-indigo-200" },
    { text: "一部支給上限枠の引き上げと就労意欲の保護", color: "bg-purple-50 text-purple-700 border-purple-200" }
  ],
  "small-business-succession-m-and-a-guidelines": [
    { text: "悪質買収者の厳格審査と排除情報網の整備", color: "bg-amber-50 text-amber-700 border-amber-200" },
    { text: "手数料算定根拠の事前明示と登録制の義務化", color: "bg-rose-50 text-rose-700 border-rose-200" },
    { text: "事業譲渡時の経営者保証解除の原則化", color: "bg-teal-50 text-teal-700 border-teal-200" }
  ],
  "special-adoption-system-deregulation-child-rights": [
    { text: "対象年齢を原則6歳未満から15歳未満へ拡大", color: "bg-blue-50 text-blue-700 border-blue-200" },
    { text: "二段階審判導入による実親の同意撤回トラブル防止", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    { text: "民間あっせん事業者の完全許可制と監督強化", color: "bg-indigo-50 text-indigo-700 border-indigo-200" }
  ],
  "sports-betting-legalization-sports-promotion-fund": [
    { text: "民間オッズ・リアルタイム賭けの解禁構想", color: "bg-purple-50 text-purple-700 border-purple-200" },
    { text: "売上の一定比率を競技連盟へ直接還流", color: "bg-amber-50 text-amber-700 border-amber-200" },
    { text: "AI監視による独立第三者機関の設置", color: "bg-rose-50 text-rose-700 border-rose-200" }
  ],
  "stem-female-researcher-quota-university-support": [
    { text: "理工系・情報系での女子特別推薦枠の公認", color: "bg-teal-50 text-teal-700 border-teal-200" },
    { text: "女性活躍推進大学への助成金傾斜配分", color: "bg-blue-50 text-blue-700 border-blue-200" },
    { text: "研究支援員の配置補助とポスト確保", color: "bg-emerald-50 text-emerald-700 border-emerald-200" }
  ],
  "subcontract-act-price-pass-through-haul-investigation": [
    { text: "発注側からの定期的な労務費転嫁協議申し入れ義務化", color: "bg-indigo-50 text-indigo-700 border-indigo-200" },
    { text: "IT・運送・サービス業への下請法適用拡大", color: "bg-purple-50 text-purple-700 border-purple-200" },
    { text: "下請法・独禁法に基づく悪質発注企業の社名公表", color: "bg-amber-50 text-amber-700 border-amber-200" }
  ],
  "taxi-app-fare-dynamic-pricing-deregulation": [
    { text: "乗車前の事前確定運賃制度の完全解禁", color: "bg-rose-50 text-rose-700 border-rose-200" },
    { text: "混雑に応じた変動迎車料金（ダイナミック）", color: "bg-teal-50 text-teal-700 border-teal-200" },
    { text: "アプリ事前マッチングによる相乗り割引", color: "bg-blue-50 text-blue-700 border-blue-200" }
  ],
  "teacher-workload-reduction-school-task-outsourcing": [
    { text: "教職調整額を4%から10%以上へ拡充", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    { text: "サポートスタッフの全校配備", color: "bg-indigo-50 text-indigo-700 border-indigo-200" },
    { text: "自治体直収による集金負担ゼロ化", color: "bg-purple-50 text-purple-700 border-purple-200" }
  ],
  "traffic-accident-victim-mandatory-insurance-recovery": [
    { text: "1台あたり年最大150円の賦課金新設", color: "bg-amber-50 text-amber-700 border-amber-200" },
    { text: "国の特別会計への計画的返還義務化", color: "bg-rose-50 text-rose-700 border-rose-200" },
    { text: "専門病床の維持と在宅介護支援金保障", color: "bg-teal-50 text-teal-700 border-teal-200" }
  ],
  "university-endowment-fund-10-trillion-yen-selection": [
    { text: "年数百億円・最長25年間の超長期助成", color: "bg-blue-50 text-blue-700 border-blue-200" },
    { text: "学外有識者が過半数の合議体を設置", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    { text: "生活費支援と安定ポスト創出", color: "bg-indigo-50 text-indigo-700 border-indigo-200" }
  ],
  "victims-support-fund-and-lawyer-representation-system": [
    { text: "給付金最低額を大幅増額・迅速支給", color: "bg-purple-50 text-purple-700 border-purple-200" },
    { text: "被害者専任弁護士を国費で派遣", color: "bg-amber-50 text-amber-700 border-amber-200" },
    { text: "転居費用補助と公営住宅優先入居", color: "bg-rose-50 text-rose-700 border-rose-200" }
  ],
  "whistleblower-protection-act-mandatory-compliance": [
    { text: "301人以上企業に通報窓口設置義務化", color: "bg-teal-50 text-teal-700 border-teal-200" },
    { text: "情報漏洩への刑事罰（罰金刑）新設", color: "bg-blue-50 text-blue-700 border-blue-200" },
    { text: "報復人事への刑事罰導入議論", color: "bg-emerald-50 text-emerald-700 border-emerald-200" }
  ],

  // 記念碑的マイルストーン（注目政策20テーマ追加・全500政策達成）
  "agricultural-corporation-foreign-ownership-farmland-act-rules": [
    { text: "法人出資比率の柔軟化", color: "bg-teal-50 text-teal-700 border-teal-200" },
    { text: "実質的株主の事前審査", color: "bg-blue-50 text-blue-700 border-blue-200" },
    { text: "耕作放棄時の取消要件厳格化", color: "bg-emerald-50 text-emerald-700 border-emerald-200" }
  ],
  "critical-software-bill-of-materials-sbom-mandate": [
    { text: "重要システム・医療機器へのSBOM添付義務化", color: "bg-indigo-50 text-indigo-700 border-indigo-200" },
    { text: "数分以内の脆弱性箇所自動特定", color: "bg-purple-50 text-purple-700 border-purple-200" },
    { text: "医療機器プログラム薬事承認におけるSBOM必須化", color: "bg-amber-50 text-amber-700 border-amber-200" }
  ],
  "deep-sea-rare-earth-mining-environmental-framework": [
    { text: "深海底専用の採掘権設定・公募制度の法制化", color: "bg-rose-50 text-rose-700 border-rose-200" },
    { text: "深海生態系アセスメント基準の厳格義務化", color: "bg-teal-50 text-teal-700 border-teal-200" },
    { text: "深海連続採掘ロボット実用化への集中投資", color: "bg-blue-50 text-blue-700 border-blue-200" }
  ],
  "disaster-waste-wide-area-treatment-plan-mandate": [
    { text: "平時からの広域処理受入協定の義務化", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    { text: "ドローン3Dスキャンと熱検知AIカメラ配備", color: "bg-indigo-50 text-indigo-700 border-indigo-200" },
    { text: "危険家屋の公費解体ファストトラック化", color: "bg-purple-50 text-purple-700 border-purple-200" }
  ],
  "emergency-blood-drone-transport-cold-chain-guidelines": [
    { text: "配送時間を数時間から数十分に激減", color: "bg-amber-50 text-amber-700 border-amber-200" },
    { text: "2〜6℃常時監視のIoTスマート保冷コンテナ義務化", color: "bg-rose-50 text-rose-700 border-rose-200" },
    { text: "緊急用務ドローンとしての優先運航権の確立", color: "bg-teal-50 text-teal-700 border-teal-200" }
  ],
  "ev-battery-reuse-recycle-circular-ecosystem": [
    { text: "電池パスポートの義務化", color: "bg-blue-50 text-blue-700 border-blue-200" },
    { text: "メーカーの回収・再資源化義務", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    { text: "定置用リユース安全基準", color: "bg-indigo-50 text-indigo-700 border-indigo-200" }
  ],
  "funeral-cremation-capacity-shortage-corpse-hotel-rules": [
    { text: "火葬場の稼働枠拡大", color: "bg-purple-50 text-purple-700 border-purple-200" },
    { text: "民間保管施設の衛生安全基準", color: "bg-amber-50 text-amber-700 border-amber-200" },
    { text: "近隣説明と立地調和ルール", color: "bg-rose-50 text-rose-700 border-rose-200" }
  ],
  "government-executive-security-clearance-cia-fbi-collaboration": [
    { text: "攻撃元サーバーへの侵入・無力化権限の付与", color: "bg-teal-50 text-teal-700 border-teal-200" },
    { text: "脅威メタデータ監視の適法化と厳格な限定", color: "bg-blue-50 text-blue-700 border-blue-200" },
    { text: "裁判所の令状審査と独立第三者監査の導入", color: "bg-emerald-50 text-emerald-700 border-emerald-200" }
  ],
  "heat-illness-special-alert-cooling-shelter-designation": [
    { text: "特別警戒アラートの新設", color: "bg-indigo-50 text-indigo-700 border-indigo-200" },
    { text: "避難施設（シェルター）指定", color: "bg-purple-50 text-purple-700 border-purple-200" },
    { text: "開放義務と情報公開", color: "bg-amber-50 text-amber-700 border-amber-200" }
  ],
  "local-government-core-system-standardization-2025": [
    { text: "基幹20業務の全国統一仕様準拠システム化", color: "bg-rose-50 text-rose-700 border-rose-200" },
    { text: "ガバメントクラウドへの全庁データ移行", color: "bg-teal-50 text-teal-700 border-teal-200" },
    { text: "ベンダーロックインの完全打破と競争調達", color: "bg-blue-50 text-blue-700 border-blue-200" }
  ],
  "loneliness-and-isolation-countermeasures-promotion-act": [
    { text: "政策の基本理念を法制化", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    { text: "地方協議会の設置促進", color: "bg-indigo-50 text-indigo-700 border-indigo-200" },
    { text: "24時間相談ダイヤル整備", color: "bg-purple-50 text-purple-700 border-purple-200" }
  ],
  "night-economy-noise-transportation-deregulation": [
    { text: "夜間イベント営業届出の簡素化", color: "bg-amber-50 text-amber-700 border-amber-200" },
    { text: "深夜交通アクセスの拡充", color: "bg-rose-50 text-rose-700 border-rose-200" },
    { text: "騒音・治安共生パトロール", color: "bg-teal-50 text-teal-700 border-teal-200" }
  ],
  "pharmacy-dx-electronic-prescription-full-rollout": [
    { text: "処方箋のデジタル一元化", color: "bg-blue-50 text-blue-700 border-blue-200" },
    { text: "重複投薬の自動チェック", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    { text: "オンライン診療・服薬完結", color: "bg-indigo-50 text-indigo-700 border-indigo-200" }
  ],
  "public-bath-sento-cultural-heritage-preservation-subsidies": [
    { text: "公的役割の再定義", color: "bg-purple-50 text-purple-700 border-purple-200" },
    { text: "燃料費・設備更新の緊急支援", color: "bg-amber-50 text-amber-700 border-amber-200" },
    { text: "歴史的建築・文化財保全", color: "bg-rose-50 text-rose-700 border-rose-200" }
  ],
  "satellite-direct-to-cellular-emergency-broadband": [
    { text: "既存の通常スマホでそのまま衛星通信可能に", color: "bg-teal-50 text-teal-700 border-teal-200" },
    { text: "地上携帯周波数の宇宙利用（周波数共用）解禁", color: "bg-blue-50 text-blue-700 border-blue-200" },
    { text: "被災孤立集落での通信ブラックアウト解消", color: "bg-emerald-50 text-emerald-700 border-emerald-200" }
  ],
  "short-time-worker-social-insurance-complete-elimination-50-cap": [
    { text: "企業規模要件の完全撤廃", color: "bg-indigo-50 text-indigo-700 border-indigo-200" },
    { text: "年金・医療の保障拡充", color: "bg-purple-50 text-purple-700 border-purple-200" },
    { text: "中小企業向け助成拡充", color: "bg-amber-50 text-amber-700 border-amber-200" }
  ],
  "smart-meter-next-generation-dynamic-demand-response": [
    { text: "5分単位の高精度電力データ計測の実現", color: "bg-rose-50 text-rose-700 border-rose-200" },
    { text: "市場連動ダイナミックプライシングの本格解禁", color: "bg-teal-50 text-teal-700 border-teal-200" },
    { text: "AIによるEV・エコキュートの最適自動充電", color: "bg-blue-50 text-blue-700 border-blue-200" }
  ],
  "submarine-cable-redundancy-landing-station-decentralization": [
    { text: "日本海側・地方への陸揚げ拠点分散", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    { text: "日本周回海底光ファイバー網の完成", color: "bg-indigo-50 text-indigo-700 border-indigo-200" },
    { text: "陸揚げ局直結・再エネ型データセンターの誘致", color: "bg-purple-50 text-purple-700 border-purple-200" }
  ],
  "unoccupied-land-inheritance-state-attribution-reform": [
    { text: "引き取り要件の弾力化", color: "bg-amber-50 text-amber-700 border-amber-200" },
    { text: "審査期間の大幅短縮", color: "bg-rose-50 text-rose-700 border-rose-200" },
    { text: "管理負担金の算定見直し", color: "bg-teal-50 text-teal-700 border-teal-200" }
  ],
  "wildlife-damage-countermeasures-hunting-license-easing": [
    { text: "クマの指定管理鳥獣追加と国の全額交付金支援", color: "bg-blue-50 text-blue-700 border-blue-200" },
    { text: "警察連携による市街地緊急発砲の適法化", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    { text: "危険出動手当の増額と公費賠償保険の整備", color: "bg-indigo-50 text-indigo-700 border-indigo-200" }
  ],

  };

  // キーワード・ステータス・カテゴリによる複合フィルタリング
  const filteredPolicies = policies.filter((policy) => {
    // カテゴリフィルター
    if (selectedCategory !== "all" && policy.category !== selectedCategory) {
      return false;
    }
    // ステータスフィルター
    if (selectedStatus !== "all" && policy.status !== selectedStatus) {
      return false;
    }
    // 検索クエリ
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase().trim();
      const titleMatch = policy.title?.toLowerCase().includes(q);
      const catchMatch = policy.catchphrase?.toLowerCase().includes(q);
      const catLabelMatch = policy.categoryLabel?.toLowerCase().includes(q);
      const statusLabelMatch = policy.statusLabel?.toLowerCase().includes(q);
      const summaryMatch =
        policy.summary?.standard?.some((s) => s.toLowerCase().includes(q)) ||
        policy.summary?.simple?.some((s) => s.toLowerCase().includes(q));
      const badges = badgeMap[policy.id] || [];
      const badgeMatch = badges.some((b) => b.text.toLowerCase().includes(q));
      const changesMatch = policy.changes?.some(
        (c) =>
          c.topic.toLowerCase().includes(q) ||
          (c.highlight && c.highlight.toLowerCase().includes(q))
      );

      if (
        !titleMatch &&
        !catchMatch &&
        !catLabelMatch &&
        !statusLabelMatch &&
        !summaryMatch &&
        !badgeMatch &&
        !changesMatch
      ) {
        return false;
      }
    }
    return true;
  });

  // ソート処理
  const sortedPolicies = useMemo(() => {
    return [...filteredPolicies].sort((a, b) => {
      if (sortOption === "latest") {
        return (b.lastUpdated || "").localeCompare(a.lastUpdated || "");
      }
      if (sortOption === "oldest") {
        return (a.lastUpdated || "").localeCompare(b.lastUpdated || "");
      }
      if (sortOption === "effective") {
        if (!a.effectiveDate && !b.effectiveDate) return 0;
        if (!a.effectiveDate) return 1;
        if (!b.effectiveDate) return -1;
        return a.effectiveDate.localeCompare(b.effectiveDate);
      }
      if (sortOption === "simulators") {
        const aSim = SIMULATOR_POLICY_IDS.has(a.id) ? 1 : 0;
        const bSim = SIMULATOR_POLICY_IDS.has(b.id) ? 1 : 0;
        if (bSim !== aSim) return bSim - aSim;
        return (b.lastUpdated || "").localeCompare(a.lastUpdated || "");
      }
      if (sortOption === "title") {
        return a.title.localeCompare(b.title, "ja");
      }
      return 0;
    });
  }, [filteredPolicies, sortOption]);

  // 表示件数分をスライス（もっと見る機能）
  const visiblePolicies = sortedPolicies.slice(0, displayCount);

  // ステータス別の件数カウント
  const countAll = policies.length;
  const countEnacted = policies.filter((p) => p.status === "enacted").length;
  const countDiscussing = policies.filter((p) => p.status === "discussing").length;

  const isFilterActive =
    selectedCategory !== "all" ||
    selectedStatus !== "all" ||
    searchQuery.trim() !== "" ||
    sortOption !== "latest";

  const handleResetFilters = () => {
    setSelectedCategory("all");
    setSelectedStatus("all");
    setSearchQuery("");
    setSortOption("latest");
    setDisplayCount(24);
  };

  return (
    <div className="min-h-screen bg-slate-50/70 text-slate-800 flex flex-col font-sans selection:bg-teal-100 selection:text-teal-900">
      {/* ヘッダー */}
      <Header
        isSimpleMode={isSimpleMode}
        onToggleSimpleMode={handleToggleSimpleMode}
      />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8 flex-1 w-full">
        {/* ヒーローバナー */}
        <div className="bg-gradient-to-br from-teal-800 via-teal-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-md relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-semibold mb-3 text-teal-100">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              シビックテック（Civic Tech）オープンプロジェクト
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
              くらしに関わる「国のルール」、<br />
              <span className="text-teal-300">データと図解</span>でシンプルに。
            </h1>
            <p className="mt-3 text-xs sm:text-sm text-teal-100/90 leading-relaxed">
              SNSの過激な対立意見や民間の二次報道は排除。官公庁の白書・国会議事録などの公的データ（一次情報）だけを元に、生活への影響と両論（メリットと課題）をフラットに可視化します。
            </p>
          </div>
          <div className="absolute -right-12 -bottom-12 w-56 h-56 rounded-full bg-teal-500/20 blur-3xl pointer-events-none" />
        </div>

        {/* サイトの3大方針バッジ */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 flex items-center gap-3 shadow-2xs">
            <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-800">一次情報のみ使用</div>
              <div className="text-[11px] text-slate-500">官公庁発表・国会審議に限定</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 flex items-center gap-3 shadow-2xs">
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-800">中立・両論併記</div>
              <div className="text-[11px] text-slate-500">期待効果と懸念点を平等に</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 flex items-center gap-3 shadow-2xs">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-800">初心者・生活者目線</div>
              <div className="text-[11px] text-slate-500">直感理解の要点カード＆試算</div>
            </div>
          </div>
        </div>

        {/* 検索 & コントロールパネル */}
        <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/80 shadow-2xs space-y-4">
          {/* リアルタイムキーワード検索バー */}
          <div className="relative flex items-center">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setDisplayCount(24);
              }}
              placeholder="政策名、キーワード、対象者で検索（例: 年収の壁、マイナ、年金、減税、スマホ...）"
              className="w-full pl-11 pr-10 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setDisplayCount(24);
                }}
                className="absolute right-3 p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
                title="クリア"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* ステータスタブ & ソート & 表示モード切替 */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 pt-1 border-t border-slate-100">
            {/* ステータスタブ */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-100/90 rounded-xl self-start overflow-x-auto max-w-full">
              <button
                type="button"
                onClick={() => {
                  setSelectedStatus("all");
                  setDisplayCount(24);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  selectedStatus === "all"
                    ? "bg-white text-slate-900 shadow-2xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                すべて <span className="text-[11px] font-normal text-slate-400">({countAll})</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedStatus("enacted");
                  setDisplayCount(24);
                }}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  selectedStatus === "enacted"
                    ? "bg-white text-emerald-800 shadow-2xs"
                    : "text-slate-600 hover:text-emerald-700"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                成立・施行済み <span className="text-[11px] font-normal text-slate-400">({countEnacted})</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedStatus("discussing");
                  setDisplayCount(24);
                }}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  selectedStatus === "discussing"
                    ? "bg-white text-amber-800 shadow-2xs"
                    : "text-slate-600 hover:text-amber-700"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                国会等で議論中 <span className="text-[11px] font-normal text-slate-400">({countDiscussing})</span>
              </button>
            </div>

            {/* 右側：並び順ソート & 表示モード切替 */}
            <div className="flex items-center justify-between sm:justify-end gap-2 self-stretch md:self-auto flex-wrap">
              {/* ソートセレクター */}
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-100/90 rounded-xl text-xs text-slate-700">
                <ArrowUpDown className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span className="text-[11px] text-slate-500 font-medium hidden sm:inline">並び順:</span>
                <select
                  value={sortOption}
                  onChange={(e) => {
                    setSortOption(e.target.value as SortOption);
                    setDisplayCount(24);
                  }}
                  className="bg-transparent font-bold text-slate-800 text-xs focus:outline-none cursor-pointer pr-1"
                >
                  <option value="latest">更新日（新しい順）</option>
                  <option value="oldest">更新日（古い順）</option>
                  <option value="effective">施行日（近い順）</option>
                  <option value="simulators">シミュレーター・判定あり優先</option>
                  <option value="title">五十音順</option>
                </select>
              </div>

              {/* 表示モード切替トグル */}
              <div className="flex items-center gap-1 p-1 bg-slate-100/90 rounded-xl">
                <button
                  type="button"
                  onClick={() => setViewMode("grid")}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    viewMode === "grid"
                      ? "bg-white text-teal-800 shadow-2xs"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                  title="カード表示"
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  <span>カード</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("compact")}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    viewMode === "compact"
                      ? "bg-white text-teal-800 shadow-2xs"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                  title="コンパクト一覧表示"
                >
                  <List className="w-3.5 h-3.5" />
                  <span>リスト</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 政策一覧セクション */}
        <section className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              {isSimpleMode ? "知りたいテーマをえらぶ" : `主要政策テーマ（全${policies.length}テーマ公開中）`}
            </h2>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-full">
                {sortedPolicies.length} 件
              </span>
              {isFilterActive && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="inline-flex items-center gap-1 text-xs text-teal-700 hover:text-teal-900 hover:underline transition-colors font-medium cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  条件クリア
                </button>
              )}
            </div>
          </div>

          {/* 分野・カテゴリ ヘッダー（モバイル展開トグル付き） */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="font-bold text-slate-700">分野・テーマ別絞り込み</span>
              <button
                type="button"
                onClick={() => setIsCatExpandedMobile((prev) => !prev)}
                className="sm:hidden text-xs text-teal-700 hover:text-teal-900 font-bold inline-flex items-center gap-1 cursor-pointer"
              >
                <span>{isCatExpandedMobile ? "主要分野のみ" : `全${categories.length - 1}分野を見る`}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isCatExpandedMobile ? "rotate-180" : ""}`} />
              </button>
            </div>

            {/* カテゴリ・ピルフィルター */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat, idx) => {
                const Icon = cat.icon;
                const isActive = selectedCategory === cat.id;
                // モバイルでは、折りたたみ時に上位8件または選択中のみ表示
                const isHiddenOnMobile = !isCatExpandedMobile && idx >= 8 && !isActive;

                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      setDisplayCount(24);
                    }}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                      isHiddenOnMobile ? "hidden sm:inline-flex" : "inline-flex"
                    } ${
                      isActive
                        ? "bg-slate-900 text-white shadow-xs ring-2 ring-slate-900 ring-offset-1"
                        : "bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? "text-teal-300" : "text-slate-400"}`} />
                    <span>{cat.label}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                        isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {cat.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 検索・フィルター結果が0件の場合 */}
          {sortedPolicies.length === 0 && (
            <div className="bg-white rounded-3xl p-10 text-center border border-dashed border-slate-300 space-y-3 mt-4">
              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-800">
                該当する政策が見つかりませんでした
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                別のキーワードや短い単語で検索するか、カテゴリ・ステータスの絞り込みを解除してお試しください。
              </p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-800 text-white text-xs font-bold hover:bg-teal-900 transition-all shadow-xs cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                絞り込み条件をリセット
              </button>
            </div>
          )}

          {/* カード表示モード（グリッド） */}
          {viewMode === "grid" && sortedPolicies.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {visiblePolicies.map((policy) => {
                const badges = badgeMap[policy.id] || [
                  { text: policy.categoryLabel, color: "bg-teal-50 text-teal-800" },
                  { text: policy.statusLabel, color: "bg-slate-100 text-slate-700" },
                ];

                return (
                  <Link
                    key={policy.id}
                    href={`/policies/${policy.id}`}
                    className="group bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs hover:border-teal-400 hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      {/* バッジ */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-teal-50 text-teal-800 border border-teal-100">
                          {policy.categoryLabel}
                        </span>
                        <span
                          className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-md ${
                            policy.status === "enacted"
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-amber-50 text-amber-800"
                          }`}
                        >
                          {policy.status === "enacted" ? (
                            <CheckCircle2 className="w-3 h-3" />
                          ) : (
                            <Clock className="w-3 h-3" />
                          )}
                          {policy.statusLabel}
                        </span>
                      </div>

                      {/* タイトル */}
                      <h3 className="text-lg font-black text-slate-900 group-hover:text-teal-700 transition-colors">
                        {policy.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1.5 leading-relaxed line-clamp-2">
                        {policy.catchphrase}
                      </p>

                      {/* 特大数字ハイライトバッジ */}
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {badges.map((b, idx) => (
                          <span
                            key={idx}
                            className={`text-[11px] font-bold px-2.5 py-1 rounded-lg ${b.color}`}
                          >
                            {b.text}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* カードフッター */}
                    <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-teal-700">
                      <span>
                        {SIMULATOR_POLICY_IDS.has(policy.id)
                          ? "シミュレーター＆要点を見る"
                          : "要点・新旧の変化を見る"}
                      </span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                );
              })}
            </div>
          )}

          {/* コンパクト一覧表示モード（リスト） */}
          {viewMode === "compact" && sortedPolicies.length > 0 && (
            <div className="space-y-2 pt-2">
              {visiblePolicies.map((policy) => {
                const badges = badgeMap[policy.id] || [
                  { text: policy.categoryLabel, color: "bg-teal-50 text-teal-800" },
                  { text: policy.statusLabel, color: "bg-slate-100 text-slate-700" },
                ];
                const primaryBadge = badges[0];

                return (
                  <Link
                    key={policy.id}
                    href={`/policies/${policy.id}`}
                    className="group bg-white rounded-xl border border-slate-200/80 p-3.5 sm:p-4 shadow-2xs hover:border-teal-400 hover:shadow-xs transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-teal-50 text-teal-800 border border-teal-100 shrink-0">
                          {policy.categoryLabel}
                        </span>
                        <span
                          className={`inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-md shrink-0 ${
                            policy.status === "enacted"
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-amber-50 text-amber-800"
                          }`}
                        >
                          {policy.status === "enacted" ? (
                            <CheckCircle2 className="w-2.5 h-2.5" />
                          ) : (
                            <Clock className="w-2.5 h-2.5" />
                          )}
                          {policy.statusLabel}
                        </span>
                        {primaryBadge && (
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${primaryBadge.color} shrink-0 hidden md:inline-block`}
                          >
                            {primaryBadge.text}
                          </span>
                        )}
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-teal-700 transition-colors truncate">
                        {policy.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5 truncate">
                        {policy.catchphrase}
                      </p>
                    </div>

                    <div className="flex items-center justify-end gap-2 shrink-0 self-end sm:self-center">
                      <span className="text-xs font-bold text-teal-700 group-hover:underline">
                        詳細
                      </span>
                      <ArrowRight className="w-4 h-4 text-teal-700 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                );
              })}
            </div>
          )}

          {/* 「もっと見る」ボタン & ページネーション */}
          {sortedPolicies.length > visiblePolicies.length && (
            <div className="pt-6 pb-2 flex flex-col items-center gap-3">
              <button
                type="button"
                onClick={() => setDisplayCount((prev) => prev + 24)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-teal-800 text-white font-bold text-sm shadow-md hover:bg-teal-900 hover:shadow-lg transition-all active:scale-98 cursor-pointer"
              >
                <span>もっと見る（残り {sortedPolicies.length - visiblePolicies.length} 件）</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setDisplayCount(sortedPolicies.length)}
                className="text-xs font-semibold text-slate-500 hover:text-slate-800 hover:underline transition-colors cursor-pointer"
              >
                全 {sortedPolicies.length} 件を一括表示する
              </button>
            </div>
          )}

          {/* 全件表示完了時の案内 */}
          {sortedPolicies.length > 0 && sortedPolicies.length <= visiblePolicies.length && (
            <div className="pt-6 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 text-slate-500 text-xs font-medium">
                <span>全 {sortedPolicies.length} 件を表示中</span>
              </div>
            </div>
          )}
        </section>
      </main>

      {/* フッター */}
      <Footer />
    </div>
  );
}
