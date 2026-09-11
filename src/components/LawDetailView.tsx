"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FoundationLaw } from "@/types/law";
import { PolicyTopic } from "@/types/policy";
import { badgeMap } from "@/lib/badges";
import {
  Landmark,
  ExternalLink,
  ChevronRight,
  BookOpen,
  AlertTriangle,
  FileText,
  CheckCircle2,
  Clock,
  ArrowRight,
  Layers,
  ArrowLeft
} from "lucide-react";

interface LawDetailViewProps {
  law: FoundationLaw;
  relatedPolicies: PolicyTopic[];
}

export const LawDetailView: React.FC<LawDetailViewProps> = ({
  law,
  relatedPolicies,
}) => {
  const [isSimpleMode, setIsSimpleMode] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-slate-50/70 text-slate-800 flex flex-col font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <Header
        isSimpleMode={isSimpleMode}
        onToggleSimpleMode={() => setIsSimpleMode((prev) => !prev)}
      />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8 flex-1 w-full">
        {/* パンくずリスト */}
        <nav className="flex items-center gap-1.5 text-xs text-slate-500 flex-wrap">
          <Link href="/" className="hover:text-teal-700 transition-colors">
            トップ
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link href="/laws" className="hover:text-indigo-700 transition-colors">
            根拠法アーカイブ
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-bold text-slate-800 truncate max-w-[200px] sm:max-w-none">
            {law.name}
          </span>
        </nav>

        {/* 法律ヘッダーヒーロー */}
        <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden border border-indigo-500/30">
          <div className="relative z-10 max-w-3xl space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 backdrop-blur-md text-xs font-bold text-indigo-200 border border-indigo-400/30">
                <Landmark className="w-3.5 h-3.5 text-indigo-300" />
                国の基本ルール・根拠法
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-slate-200 text-xs font-semibold">
                {law.enactedYear}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-slate-200 text-xs font-semibold">
                所管: {law.ministry}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white flex items-baseline gap-2.5 flex-wrap">
              <span>{law.name}</span>
              {law.commonName && law.commonName !== law.name && (
                <span className="text-base sm:text-lg font-medium text-indigo-300">
                  （通称: {law.commonName}）
                </span>
              )}
            </h1>

            <p className="text-sm sm:text-base font-medium text-indigo-100/90 leading-relaxed">
              {law.catchphrase}
            </p>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-1">
              {isSimpleMode ? law.summary.simple : law.summary.standard}
            </p>

            {law.officialUrl && (
              <div className="pt-2">
                <a
                  href={law.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-300 hover:text-white bg-white/10 hover:bg-white/20 px-3.5 py-1.5 rounded-xl border border-white/15 transition-all cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>e-Gov法令検索で条文を読む（デジタル庁公式）</span>
                </a>
              </div>
            )}
          </div>
          <div className="absolute -right-16 -bottom-16 w-64 h-64 rounded-full bg-indigo-500/15 blur-3xl pointer-events-none" />
        </div>

        {/* 2カラム解説カード：制定の目的 ＆ 現代の課題 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* 制定の目的 */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-indigo-900 font-bold text-sm">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center shrink-0">
                  <BookOpen className="w-4 h-4" />
                </div>
                <h3>{isSimpleMode ? "なぜこの法律が作られたのか？" : "法律制定の目的・背景"}</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {isSimpleMode ? law.purpose.simple : law.purpose.standard}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-400 font-medium">
              歴史的背景：{law.enactedYear}制定当時の社会要請
            </div>
          </div>

          {/* 現代の課題・なぜ今見直されているのか */}
          <div className="bg-white rounded-2xl border border-amber-200/80 p-5 sm:p-6 shadow-xs flex flex-col justify-between bg-amber-50/20">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <h3>{isSimpleMode ? "なぜ今、見直しが必要なの？" : "令和の現代的課題・法改正の必要性"}</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {isSimpleMode ? law.currentChallenge.simple : law.currentChallenge.standard}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-amber-200/60 text-[11px] text-amber-800/80 font-medium">
              見直しの焦点：社会・生活環境の変化に伴う制度の再設計
            </div>
          </div>
        </div>

        {/* 知っておきたい基本ルール（重要条文3点） */}
        {law.keyProvisions && law.keyProvisions.length > 0 && (
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-7 shadow-xs space-y-5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  {isSimpleMode ? "知っておきたい3つの基本ルール" : "くらしに関わる基本ルール（重要条文の骨子）"}
                </h3>
                <p className="text-xs text-slate-500">
                  生活やビジネスに関わる法律の主要な柱です
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {law.keyProvisions.map((provision, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50/80 rounded-2xl p-4 border border-slate-200/70 space-y-2 relative flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-indigo-600 text-white font-bold text-[11px] flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                        {provision.title}
                      </h4>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {isSimpleMode && provision.simpleDescription
                        ? provision.simpleDescription
                        : provision.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* この法律に関連する政策一覧（逆引きセクション） */}
        <section className="space-y-4 pt-2">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center shrink-0">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  この法律に関連する政策テーマ（全{relatedPolicies.length}件）
                </h3>
                <p className="text-xs text-slate-500">
                  『{law.name}』を根拠法として見直しや新制度が検討されているテーマです
                </p>
              </div>
            </div>
          </div>

          {relatedPolicies.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center border border-slate-200 text-xs text-slate-500">
              現在、当サイトで個別に解説している政策テーマに直接紐付くものは登録中・準備中です。
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {relatedPolicies.map((policy) => {
                const badges = badgeMap[policy.id] || [
                  { text: policy.categoryLabel, color: "bg-teal-50 text-teal-800" },
                  { text: policy.statusLabel, color: "bg-slate-100 text-slate-700" },
                ];

                return (
                  <Link
                    key={policy.id}
                    href={`/policies/${policy.id}`}
                    className="group bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs hover:border-indigo-400 hover:shadow-md transition-all flex flex-col justify-between cursor-pointer"
                  >
                    <div>
                      {/* バッジ */}
                      <div className="flex items-center justify-between gap-2 mb-2.5">
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
                      <h4 className="text-base font-bold text-slate-900 group-hover:text-indigo-700 transition-colors">
                        {policy.title}
                      </h4>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                        {policy.catchphrase}
                      </p>

                      {/* バッジ一覧 */}
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {badges.slice(0, 3).map((b, bIdx) => (
                          <span
                            key={bIdx}
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${b.color}`}
                          >
                            {b.text}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-indigo-700 group-hover:text-indigo-900">
                      <span>政策の詳細・要点を見る</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </section>

        {/* ページ下部ナビゲーション */}
        <div className="pt-4 flex items-center justify-between flex-wrap gap-3 border-t border-slate-200">
          <Link
            href="/laws"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-700 hover:text-indigo-900 hover:underline transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>他の根拠法を見る（法律アーカイブ一覧）</span>
          </Link>
          <Link
            href="/"
            className="text-xs font-semibold text-slate-500 hover:text-slate-800 hover:underline transition-colors"
          >
            トップページ（全政策一覧）へ
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
};
