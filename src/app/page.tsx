"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { getAllPolicies } from "@/lib/policies";
import { badgeMap, PolicyBadge } from "@/lib/badges";
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

// カテゴリごとの表示名称とアイコンのマッピング設定（全11カテゴリ）
const CATEGORY_CONFIG: Record<
  string,
  { label: string; icon: React.ElementType; order: number }
> = {
  economy: { label: "経済・産業", icon: Scale, order: 1 },
  tax: { label: "税金・お金", icon: Wallet, order: 2 },
  childcare: { label: "子育て・家族", icon: Baby, order: 3 },
  healthcare: { label: "医療・健康・福祉", icon: HeartPulse, order: 4 },
  pension: { label: "年金・社会保障", icon: Wallet, order: 5 },
  education: { label: "教育・研究・文化", icon: GraduationCap, order: 6 },
  labor: { label: "働き方・雇用", icon: Briefcase, order: 7 },
  digital: { label: "デジタル・IT・AI", icon: Smartphone, order: 8 },
  transport: { label: "交通・モビリティ・物流", icon: Car, order: 9 },
  environment: { label: "環境・エネルギー・防災", icon: Leaf, order: 10 },
  society: { label: "社会・安全保障・司法", icon: Shield, order: 11 },
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
