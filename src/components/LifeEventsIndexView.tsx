"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  Baby, GraduationCap, Briefcase, Heart, Home, HeartPulse,
  HandHelping, PiggyBank, Calculator, ShieldAlert, Car, Rocket,
  Search, X, ArrowRight, CheckCircle2, Clock, RotateCcw, ArrowUpDown,
  ChevronDown,
} from "lucide-react";
import { LIFE_EVENTS, LIFE_EVENT_POLICY_MAP, type LifeEvent } from "@/lib/life-events";
import { getAllPolicies } from "@/lib/policies";

// シミュレーター実装済み政策ID（トップページと同じ）
const SIMULATOR_POLICY_IDS = new Set([
  "child-allowance-expansion", "university-tuition-waiver", "income-barrier",
  "myna-health-insurance", "new-nisa", "furusato-tax", "invoice-system",
  "pension-start-age", "zaishoku-pension", "elderly-healthcare-cost",
  "childcare-leave-benefit", "energy-subsidies", "childcare-support-fund",
  "inheritance-registration", "myna-drivers-license", "severance-pay-tax",
  "gasoline-subsidies-trigger", "nursing-care-copay", "electric-kickboard-rules",
  "school-lunch-free", "ideco-expansion", "kodomo-daretemo-tsuen",
  "high-school-tuition-free", "pension-contribution-45years",
  "abandoned-house-tax-hike", "accommodation-tax-tourism",
  "forest-environment-tax", "customer-harassment-prevention",
  "reskilling-education-benefit", "income-barrier-career-up",
  "financial-income-tax", "high-cost-medical-cap", "bicycle-blue-ticket",
  "paternity-leave-at-birth", "solar-panel-mandate",
  "otc-similar-drug-restriction", "stealth-marketing-regulation",
]);

const ICON_MAP: Record<string, React.ElementType> = {
  Baby, GraduationCap, Briefcase, Heart, Home, HeartPulse,
  HandHelping, PiggyBank, Calculator, ShieldAlert, Car, Rocket,
};

const COLOR_MAP: Record<string, {
  bg: string; icon: string; border: string; hoverBorder: string;
  pillBg: string; pillText: string; pillActiveBg: string; pillActiveText: string;
}> = {
  pink:    { bg: "bg-pink-50", icon: "text-pink-600", border: "border-pink-200", hoverBorder: "hover:border-pink-400", pillBg: "bg-pink-50", pillText: "text-pink-800", pillActiveBg: "bg-pink-600", pillActiveText: "text-white" },
  blue:    { bg: "bg-blue-50", icon: "text-blue-600", border: "border-blue-200", hoverBorder: "hover:border-blue-400", pillBg: "bg-blue-50", pillText: "text-blue-800", pillActiveBg: "bg-blue-600", pillActiveText: "text-white" },
  indigo:  { bg: "bg-indigo-50", icon: "text-indigo-600", border: "border-indigo-200", hoverBorder: "hover:border-indigo-400", pillBg: "bg-indigo-50", pillText: "text-indigo-800", pillActiveBg: "bg-indigo-600", pillActiveText: "text-white" },
  rose:    { bg: "bg-rose-50", icon: "text-rose-600", border: "border-rose-200", hoverBorder: "hover:border-rose-400", pillBg: "bg-rose-50", pillText: "text-rose-800", pillActiveBg: "bg-rose-600", pillActiveText: "text-white" },
  emerald: { bg: "bg-emerald-50", icon: "text-emerald-600", border: "border-emerald-200", hoverBorder: "hover:border-emerald-400", pillBg: "bg-emerald-50", pillText: "text-emerald-800", pillActiveBg: "bg-emerald-600", pillActiveText: "text-white" },
  red:     { bg: "bg-red-50", icon: "text-red-600", border: "border-red-200", hoverBorder: "hover:border-red-400", pillBg: "bg-red-50", pillText: "text-red-800", pillActiveBg: "bg-red-600", pillActiveText: "text-white" },
  amber:   { bg: "bg-amber-50", icon: "text-amber-600", border: "border-amber-200", hoverBorder: "hover:border-amber-400", pillBg: "bg-amber-50", pillText: "text-amber-800", pillActiveBg: "bg-amber-600", pillActiveText: "text-white" },
  violet:  { bg: "bg-violet-50", icon: "text-violet-600", border: "border-violet-200", hoverBorder: "hover:border-violet-400", pillBg: "bg-violet-50", pillText: "text-violet-800", pillActiveBg: "bg-violet-600", pillActiveText: "text-white" },
  teal:    { bg: "bg-teal-50", icon: "text-teal-600", border: "border-teal-200", hoverBorder: "hover:border-teal-400", pillBg: "bg-teal-50", pillText: "text-teal-800", pillActiveBg: "bg-teal-600", pillActiveText: "text-white" },
  orange:  { bg: "bg-orange-50", icon: "text-orange-600", border: "border-orange-200", hoverBorder: "hover:border-orange-400", pillBg: "bg-orange-50", pillText: "text-orange-800", pillActiveBg: "bg-orange-600", pillActiveText: "text-white" },
  sky:     { bg: "bg-sky-50", icon: "text-sky-600", border: "border-sky-200", hoverBorder: "hover:border-sky-400", pillBg: "bg-sky-50", pillText: "text-sky-800", pillActiveBg: "bg-sky-600", pillActiveText: "text-white" },
  purple:  { bg: "bg-purple-50", icon: "text-purple-600", border: "border-purple-200", hoverBorder: "hover:border-purple-400", pillBg: "bg-purple-50", pillText: "text-purple-800", pillActiveBg: "bg-purple-600", pillActiveText: "text-white" },
};

export const LifeEventsIndexView: React.FC = () => {
  const [isSimpleMode, setIsSimpleMode] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [displayCount, setDisplayCount] = useState(24);
  const [sortOption, setSortOption] = useState<"latest" | "title">("latest");

  const allPolicies = useMemo(() => getAllPolicies(), []);

  // URL クエリパラメータから初期状態を復元
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const event = params.get("event");
    if (event && LIFE_EVENTS.some(e => e.id === event)) {
      setSelectedEvent(event);
    }
  }, []);

  // URL 同期
  useEffect(() => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    if (selectedEvent) {
      url.searchParams.set("event", selectedEvent);
    } else {
      url.searchParams.delete("event");
    }
    if (searchQuery.trim()) {
      url.searchParams.set("q", searchQuery.trim());
    } else {
      url.searchParams.delete("q");
    }
    window.history.replaceState({}, "", url.pathname + url.search);
  }, [selectedEvent, searchQuery]);

  // 選択イベントに紐づく政策を取得
  const eventPolicies = useMemo(() => {
    if (!selectedEvent) return [];
    const policyIds = LIFE_EVENT_POLICY_MAP[selectedEvent] || [];
    const idSet = new Set(policyIds);
    return allPolicies.filter(p => idSet.has(p.id));
  }, [selectedEvent, allPolicies]);

  // 検索フィルタリング
  const filteredPolicies = useMemo(() => {
    let list = eventPolicies;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(p => {
        const titleMatch = p.title?.toLowerCase().includes(q);
        const catchMatch = p.catchphrase?.toLowerCase().includes(q);
        const summaryMatch = p.summary?.standard?.some(s => s.toLowerCase().includes(q));
        return titleMatch || catchMatch || summaryMatch;
      });
    }
    return list;
  }, [eventPolicies, searchQuery]);

  // ソート
  const sortedPolicies = useMemo(() => {
    const sorted = [...filteredPolicies];
    if (sortOption === "title") {
      sorted.sort((a, b) => a.title.localeCompare(b.title, "ja"));
    } else {
      sorted.sort((a, b) => (b.lastUpdated || "").localeCompare(a.lastUpdated || ""));
    }
    return sorted;
  }, [filteredPolicies, sortOption]);

  const visiblePolicies = sortedPolicies.slice(0, displayCount);
  const selectedEventData = LIFE_EVENTS.find(e => e.id === selectedEvent);

  const handleToggleSimpleMode = () => setIsSimpleMode(prev => !prev);

  return (
    <div className="min-h-screen bg-slate-50/70 text-slate-800 flex flex-col font-sans selection:bg-teal-100 selection:text-teal-900">
      <Header isSimpleMode={isSimpleMode} onToggleSimpleMode={handleToggleSimpleMode} />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 flex-1 w-full">
        {/* ヒーローバナー */}
        <div className="bg-gradient-to-br from-pink-700 via-rose-800 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-md relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-semibold mb-3 text-pink-100">
              <Heart className="w-3.5 h-3.5 text-pink-300" />
              {isSimpleMode ? "くらしの ぎゃくびき ガイド" : "くらしの逆引きガイド"}
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
              {isSimpleMode
                ? <>こまったとき・しりたいとき、<br /><span className="text-pink-300">じぶんに あう せいど</span>を さがそう</>
                : <>人生のできごとから、<br /><span className="text-pink-300">あなたに関係する制度</span>を探す</>}
            </h1>
            <p className="mt-3 text-xs sm:text-sm text-pink-100/90 leading-relaxed">
              {isSimpleMode
                ? "あかちゃん、しごと、いえ、びょうき、ねんきん など、じぶんの できごと から くにの せいど を さがせます。"
                : "出産、就職、住宅購入、病気、年金――暮らしの場面ごとに、関連する国の制度・政策を一覧できます。"}
            </p>
          </div>
          <div className="absolute -right-12 -bottom-12 w-56 h-56 rounded-full bg-pink-400/20 blur-3xl pointer-events-none" />
        </div>

        {/* ライフイベント選択ピル */}
        <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/80 shadow-2xs space-y-4">
          <h2 className="text-sm font-bold text-slate-700">
            {isSimpleMode ? "どんなとき？" : "どんなできごと？"}
          </h2>
          <div className="flex flex-wrap gap-2">
            {LIFE_EVENTS.map(event => {
              const IconComp = ICON_MAP[event.icon] || Rocket;
              const colors = COLOR_MAP[event.color] || COLOR_MAP.teal;
              const isActive = selectedEvent === event.id;

              return (
                <button
                  key={event.id}
                  type="button"
                  onClick={() => {
                    setSelectedEvent(isActive ? null : event.id);
                    setSearchQuery("");
                    setDisplayCount(24);
                  }}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                    isActive
                      ? `${colors.pillActiveBg} ${colors.pillActiveText} border-transparent shadow-md`
                      : `${colors.pillBg} ${colors.pillText} ${colors.border} hover:shadow-sm`
                  }`}
                >
                  <IconComp className="w-3.5 h-3.5" />
                  {isSimpleMode ? event.simpleLabel : event.label}
                  <span className={`text-[10px] font-medium ml-0.5 ${isActive ? "opacity-80" : "opacity-50"}`}>
                    {event.policyCount}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 選択中のイベントの政策一覧 */}
        {selectedEvent && selectedEventData && (
          <div className="space-y-4">
            {/* イベント概要ヘッダー */}
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-3">
                {(() => {
                  const IconComp = ICON_MAP[selectedEventData.icon] || Rocket;
                  const colors = COLOR_MAP[selectedEventData.color] || COLOR_MAP.teal;
                  return (
                    <div className={`w-10 h-10 rounded-2xl ${colors.bg} ${colors.icon} flex items-center justify-center`}>
                      <IconComp className="w-5 h-5" />
                    </div>
                  );
                })()}
                <div>
                  <h2 className="text-lg font-black text-slate-900">
                    {isSimpleMode ? selectedEventData.simpleLabel : selectedEventData.label}
                  </h2>
                  <p className="text-xs text-slate-500">
                    {isSimpleMode ? selectedEventData.simpleDescription : selectedEventData.description}
                    {" "}— {sortedPolicies.length}件
                  </p>
                </div>
              </div>

              {/* ソート＆検索 */}
              <div className="flex items-center gap-2 flex-wrap">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-100/90 rounded-xl text-xs text-slate-700">
                  <ArrowUpDown className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value as "latest" | "title")}
                    className="bg-transparent font-bold text-slate-800 text-xs focus:outline-none cursor-pointer"
                  >
                    <option value="latest">更新日順</option>
                    <option value="title">五十音順</option>
                  </select>
                </div>
              </div>
            </div>

            {/* 検索バー */}
            <div className="relative flex items-center">
              <Search className="w-4.5 h-4.5 text-slate-400 absolute left-3.5 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setDisplayCount(24); }}
                placeholder={`「${isSimpleMode ? selectedEventData.simpleLabel : selectedEventData.label}」の中を検索...`}
                aria-label="ライフイベント内の政策を検索"
                className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* 政策カード一覧 */}
            {sortedPolicies.length === 0 ? (
              <div className="text-center py-16">
                <Search className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                <h3 className="text-sm font-bold text-slate-500 mb-1">該当する政策が見つかりませんでした</h3>
                <p className="text-xs text-slate-400">キーワードを変えてお試しください</p>
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="mt-3 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-800 text-white text-xs font-bold hover:bg-teal-900 transition-all shadow-xs cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  検索をクリア
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {visiblePolicies.map((policy) => (
                  <Link
                    key={policy.id}
                    href={`/policies/${policy.id}`}
                    className="group bg-white rounded-2xl border border-slate-200/80 p-4 shadow-2xs hover:border-teal-400 hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-teal-50 text-teal-800 border border-teal-100">
                          {policy.categoryLabel}
                        </span>
                        <span className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-md ${
                          policy.status === "enacted"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-amber-50 text-amber-800"
                        }`}>
                          {policy.status === "enacted"
                            ? <CheckCircle2 className="w-3 h-3" />
                            : <Clock className="w-3 h-3" />}
                          {policy.statusLabel}
                        </span>
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-teal-700 transition-colors leading-snug">
                        {policy.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed line-clamp-2">
                        {isSimpleMode && policy.summary?.simple?.[0]
                          ? policy.summary.simple[0]
                          : policy.catchphrase}
                      </p>
                    </div>
                    <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-teal-700">
                      <span>
                        {SIMULATOR_POLICY_IDS.has(policy.id) ? "シミュレーター＆要点を見る" : "要点・新旧の変化を見る"}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* もっと見る */}
            {sortedPolicies.length > visiblePolicies.length && (
              <div className="pt-4 pb-2 flex flex-col items-center gap-2">
                <button
                  type="button"
                  onClick={() => setDisplayCount(prev => prev + 24)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-teal-800 text-white font-bold text-sm shadow-md hover:bg-teal-900 hover:shadow-lg transition-all active:scale-98 cursor-pointer"
                >
                  <ChevronDown className="w-4 h-4" />
                  もっと見る（残り {sortedPolicies.length - visiblePolicies.length} 件）
                </button>
              </div>
            )}
          </div>
        )}

        {/* イベント未選択時のガイド */}
        {!selectedEvent && (
          <div className="text-center py-12">
            <Heart className="w-12 h-12 text-pink-300 mx-auto mb-4" />
            <h3 className="text-base font-bold text-slate-600 mb-2">
              {isSimpleMode ? "うえの ボタンを おしてね" : "上のボタンからできごとを選んでください"}
            </h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              {isSimpleMode
                ? "じぶんに あう せいど が みつかります"
                : "あなたの状況に関連する制度・政策が一覧で表示されます"}
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};
