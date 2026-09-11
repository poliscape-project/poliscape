"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FoundationLaw } from "@/types/law";
import {
  Landmark,
  Search,
  X,
  ChevronRight,
  ArrowRight,
  Layers,
  ArrowUpDown,
  RotateCcw
} from "lucide-react";

export interface LawWithCount extends FoundationLaw {
  policyCount: number;
}

interface LawsIndexViewProps {
  initialLaws: LawWithCount[];
}

export const LawsIndexView: React.FC<LawsIndexViewProps> = ({ initialLaws }) => {
  const [isSimpleMode, setIsSimpleMode] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedMinistry, setSelectedMinistry] = useState<string>("all");
  const [sortOption, setSortOption] = useState<"policyCount" | "newest" | "oldest" | "name">("policyCount");

  // 主要省庁のリスト（動的集計）
  const ministryList = useMemo(() => {
    const counts = new Map<string, number>();
    initialLaws.forEach((l) => {
      const min = l.ministry || "その他";
      const main = min.split("（")[0].split("・")[0].trim();
      counts.set(main, (counts.get(main) || 0) + 1);
    });
    const sorted = Array.from(counts.entries()).sort((a, b) => b[1] - a[1]);
    return [
      { id: "all", label: "すべての所管", count: initialLaws.length },
      ...sorted.map(([name, count]) => ({ id: name, label: name, count })),
    ];
  }, [initialLaws]);

  // フィルタリング
  const filteredLaws = useMemo(() => {
    return initialLaws.filter((law) => {
      if (selectedMinistry !== "all") {
        if (!law.ministry?.includes(selectedMinistry)) return false;
      }
      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase().trim();
        const nameMatch = law.name?.toLowerCase().includes(q) ?? false;
        const commonMatch = law.commonName?.toLowerCase().includes(q) ?? false;
        const catchMatch = law.catchphrase?.toLowerCase().includes(q) ?? false;
        const minMatch = law.ministry?.toLowerCase().includes(q) ?? false;
        const summaryMatch =
          (law.summary?.standard?.toLowerCase().includes(q) ?? false) ||
          (law.summary?.simple?.toLowerCase().includes(q) ?? false);
        const challengeMatch =
          (law.currentChallenge?.standard?.toLowerCase().includes(q) ?? false) ||
          (law.currentChallenge?.simple?.toLowerCase().includes(q) ?? false);

        if (!nameMatch && !commonMatch && !catchMatch && !minMatch && !summaryMatch && !challengeMatch) {
          return false;
        }
      }
      return true;
    });
  }, [initialLaws, selectedMinistry, searchQuery]);

  // ソート
  const sortedLaws = useMemo(() => {
    return [...filteredLaws].sort((a, b) => {
      if (sortOption === "policyCount") {
        if (b.policyCount !== a.policyCount) return b.policyCount - a.policyCount;
        return a.name.localeCompare(b.name, "ja");
      }
      if (sortOption === "name") {
        return a.name.localeCompare(b.name, "ja");
      }
      if (sortOption === "newest") {
        return b.enactedYear.localeCompare(a.enactedYear);
      }
      if (sortOption === "oldest") {
        return a.enactedYear.localeCompare(b.enactedYear);
      }
      return 0;
    });
  }, [filteredLaws, sortOption]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedMinistry("all");
    setSortOption("policyCount");
  };

  const isFilterActive = searchQuery.trim() !== "" || selectedMinistry !== "all" || sortOption !== "policyCount";

  return (
    <div className="min-h-screen bg-slate-50/70 text-slate-800 flex flex-col font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <Header
        isSimpleMode={isSimpleMode}
        onToggleSimpleMode={() => setIsSimpleMode((prev) => !prev)}
      />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8 flex-1 w-full">
        {/* パンくずリスト */}
        <nav className="flex items-center gap-1.5 text-xs text-slate-500">
          <Link href="/" className="hover:text-teal-700 transition-colors">
            トップ
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-bold text-slate-800">根拠法アーカイブ</span>
        </nav>

        {/* ヒーローバナー */}
        <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden border border-indigo-500/30">
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 backdrop-blur-md text-xs font-bold text-indigo-200 border border-indigo-400/30 mb-3">
              <Landmark className="w-3.5 h-3.5 text-indigo-300" />
              政策の土台（根拠法）アーカイブ
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
              くらしを支える「国の基本ルール」、<br />
              <span className="text-indigo-300">法律の視点</span>から読み解く。
            </h1>
            <p className="mt-3 text-xs sm:text-sm text-indigo-100/90 leading-relaxed">
              日々ニュースになる様々な政策や制度改革には、必ず根拠となる法律が存在します。各法律が「なぜ作られたのか」「いま何が課題で見直されているのか」を分かりやすく解説し、関連する政策を逆引きできます。
            </p>
          </div>
          <div className="absolute -right-16 -bottom-16 w-64 h-64 rounded-full bg-indigo-500/15 blur-3xl pointer-events-none" />
        </div>

        {/* 検索 & フィルターコントロール */}
        <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/80 shadow-2xs space-y-4">
          {/* 検索バー */}
          <div className="relative flex items-center">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="法律名、通称、キーワード、課題で検索（例: 労働基準法、労基法、年金、税、マイナンバー...）"
              className="w-full pl-11 pr-10 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
                title="クリア"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* コントロール行：ソート & 状態 */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1 border-t border-slate-100">
            {/* 結果件数表示 */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-full">
                {sortedLaws.length} 件の法律
              </span>
              {isFilterActive && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="inline-flex items-center gap-1 text-xs text-indigo-700 hover:text-indigo-900 hover:underline font-medium cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  条件クリア
                </button>
              )}
            </div>

            {/* 並び替えセレクター */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100/90 rounded-xl text-xs text-slate-700 self-end sm:self-auto">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              <span className="text-[11px] text-slate-500 font-medium">並び順:</span>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as any)}
                className="bg-transparent font-bold text-slate-800 text-xs focus:outline-none cursor-pointer pr-1"
              >
                <option value="policyCount">関連政策が多い順</option>
                <option value="name">五十音順</option>
                <option value="newest">制定が新しい順</option>
                <option value="oldest">制定が古い順</option>
              </select>
            </div>
          </div>

          {/* 省庁ピルフィルター */}
          <div className="space-y-1.5 pt-1">
            <div className="text-[11px] font-bold text-slate-500">所管官庁で絞り込み:</div>
            <div className="flex flex-wrap gap-1.5">
              {ministryList.map((m) => {
                const isActive = selectedMinistry === m.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setSelectedMinistry(m.id)}
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                      isActive
                        ? "bg-indigo-900 text-white shadow-xs"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                    }`}
                  >
                    <span>{m.label}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                        isActive ? "bg-white/20 text-white" : "bg-white text-slate-500"
                      }`}
                    >
                      {m.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* 法律一覧カードグリッド */}
        <section className="space-y-4">
          {sortedLaws.length === 0 ? (
            <div className="bg-white rounded-3xl p-10 text-center border border-dashed border-slate-300 space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-800">
                該当する法律が見つかりませんでした
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                別のキーワードや短い単語で検索するか、所管省庁の絞り込みを解除してお試しください。
              </p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-800 text-white text-xs font-bold hover:bg-indigo-900 transition-all shadow-xs cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                絞り込み条件をリセット
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sortedLaws.map((law) => (
                <Link
                  key={law.id}
                  href={`/laws/${law.id}`}
                  className="group bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs hover:border-indigo-400 hover:shadow-md transition-all flex flex-col justify-between cursor-pointer"
                >
                  <div>
                    {/* メタ情報バッジ */}
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-indigo-50 text-indigo-800 border border-indigo-100">
                        {law.ministry}
                      </span>
                      <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                        {law.enactedYear}
                      </span>
                    </div>

                    {/* タイトル */}
                    <h3 className="text-lg font-black text-slate-900 group-hover:text-indigo-700 transition-colors">
                      {law.name}
                      {law.commonName && law.commonName !== law.name && (
                        <span className="text-xs font-normal text-slate-500 ml-1.5">
                          （{law.commonName}）
                        </span>
                      )}
                    </h3>

                    <p className="text-xs font-semibold text-indigo-900/80 mt-1">
                      {law.catchphrase}
                    </p>

                    <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                      {isSimpleMode ? law.summary.simple : law.summary.standard}
                    </p>

                    {/* 課題プレビュー */}
                    <div className="mt-3 bg-amber-50/60 rounded-xl p-2.5 border border-amber-200/50 text-[11px] text-amber-900">
                      <span className="font-bold">現代の課題: </span>
                      <span className="line-clamp-1">
                        {isSimpleMode ? law.currentChallenge.simple : law.currentChallenge.standard}
                      </span>
                    </div>
                  </div>

                  {/* フッター */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-indigo-700 group-hover:text-indigo-900">
                    <span className="inline-flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-indigo-600" />
                      <span>関連政策 {law.policyCount} 件</span>
                    </span>
                    <span className="inline-flex items-center gap-1 group-hover:underline">
                      <span>解説を見る</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};
