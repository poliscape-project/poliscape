"use client";

import React, { useState } from "react";
import { FoundationLaw } from "@/types/law";
import { Landmark, ChevronDown, ChevronUp, ExternalLink, HelpCircle, AlertTriangle, BookOpen } from "lucide-react";

interface PolicyFoundationLawCardProps {
  laws: FoundationLaw[];
  isSimpleMode: boolean;
  initiallyOpen?: boolean;
}

export const PolicyFoundationLawCard: React.FC<PolicyFoundationLawCardProps> = ({
  laws,
  isSimpleMode,
  initiallyOpen = true,
}) => {
  const [isOpen, setIsOpen] = useState(initiallyOpen);

  if (!laws || laws.length === 0) {
    return null;
  }

  return (
    <section className="bg-white rounded-2xl border border-indigo-100/80 shadow-2xs overflow-hidden transition-all">
      {/* クリック可能なアコーディオンヘッダー */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        className="w-full p-4 sm:p-5 flex items-center justify-between text-left gap-3 hover:bg-indigo-50/40 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center shrink-0 border border-indigo-100">
            <Landmark className="w-4.5 h-4.5" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs sm:text-sm font-bold text-slate-900">
                {isSimpleMode
                  ? "この政策のもとになっている法律（ルール）"
                  : "この政策の土台（根拠法・基本制度）"}
              </span>
              <div className="flex items-center gap-1.5 flex-wrap">
                {laws.map((law) => (
                  <span
                    key={law.id}
                    className="text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-md bg-indigo-100/70 text-indigo-800 border border-indigo-200/50"
                  >
                    {law.name}
                  </span>
                ))}
              </div>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 truncate">
              {isSimpleMode
                ? "もともとどんな法律があって、なぜ今見直されているのかを解説"
                : "現行制度の制定背景と、令和の社会課題に合わせた見直しの必要性を確認できます"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0 text-indigo-700 font-bold text-xs bg-indigo-50/80 hover:bg-indigo-100 px-3 py-1.5 rounded-lg border border-indigo-200/60 transition-colors">
          <span className="hidden sm:inline">{isOpen ? "閉じる" : "タップして開く"}</span>
          {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </div>
      </button>

      {/* 展開される法律詳細コンテンツ */}
      {isOpen && (
        <div className="border-t border-indigo-100/70 p-4 sm:p-6 bg-slate-50/50 space-y-6 animate-in fade-in duration-200">
          {laws.map((law, idx) => (
            <div
              key={law.id}
              className={`space-y-4 ${
                idx > 0 ? "pt-6 border-t border-slate-200/80" : ""
              }`}
            >
              {/* 法律ヘッダー */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="text-base sm:text-lg font-black text-slate-900">
                      『{law.name}』
                    </span>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-slate-200/70 text-slate-700">
                      {law.enactedYear}
                    </span>
                    <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600">
                      所管: {law.ministry}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-indigo-900">
                    {law.catchphrase}
                  </p>
                </div>

                {law.officialUrl && (
                  <a
                    href={law.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-600 hover:text-indigo-800 self-start sm:self-auto bg-white px-2.5 py-1 rounded-md border border-indigo-200 hover:border-indigo-300 transition-colors shadow-2xs"
                  >
                    <span>e-Gov法令検索で条文を見る</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>

              {/* 2カラム解説：そもそもどんな法律？ vs なぜ今見直しているのか？ */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {/* そもそもどんな法律？ */}
                <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-2xs space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                    <HelpCircle className="w-4 h-4 text-teal-600 shrink-0" />
                    <span>
                      {isSimpleMode ? "💡 そもそもどんな法律？" : "💡 法律の概要とそもそもの目的"}
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {isSimpleMode ? law.summary.simple : law.summary.standard}
                  </p>
                  <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500 leading-relaxed">
                    <strong className="text-slate-700 font-bold">制定の背景: </strong>
                    {isSimpleMode ? law.purpose.simple : law.purpose.standard}
                  </div>
                </div>

                {/* なぜ今見直しているのか？ */}
                <div className="bg-amber-50/50 rounded-xl p-4 border border-amber-200/70 shadow-2xs space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>
                      {isSimpleMode
                        ? "⚠️ なぜ今、このルールを見直すの？"
                        : "⚠️ 現代における課題と法改正の必要性"}
                    </span>
                  </div>
                  <p className="text-xs text-slate-800 leading-relaxed">
                    {isSimpleMode ? law.currentChallenge.simple : law.currentChallenge.standard}
                  </p>
                  <p className="pt-2 border-t border-amber-200/50 text-[11px] text-amber-800 font-medium">
                    {isSimpleMode
                      ? "👉 だからこそ、この政策で今の時代に合ったルールへ変えようとしています。"
                      : "👉 昭和・平成の旧来ルールと令和の生活実態の乖離を埋めるため、本政策で制度改正が審議されています。"}
                  </p>
                </div>
              </div>

              {/* 知っておきたい法律の基本ルール（3点） */}
              {law.keyProvisions && law.keyProvisions.length > 0 && (
                <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-2xs space-y-2.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                    <BookOpen className="w-4 h-4 text-indigo-600 shrink-0" />
                    <span>
                      {isSimpleMode
                        ? "📋 知っておきたい法律の基本ルール（3つの要点）"
                        : "📋 生活に直結する法律の主要規定・基本ルール"}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                    {law.keyProvisions.map((provision, pIdx) => (
                      <div
                        key={pIdx}
                        className="bg-slate-50 rounded-lg p-3 border border-slate-200/60 flex flex-col justify-between"
                      >
                        <div className="text-[11px] font-bold text-slate-900 mb-1 flex items-center gap-1">
                          <span className="w-4 h-4 rounded-full bg-indigo-100 text-indigo-800 text-[10px] flex items-center justify-center font-black shrink-0">
                            {pIdx + 1}
                          </span>
                          <span className="truncate">{provision.title}</span>
                        </div>
                        <p className="text-[11px] text-slate-600 leading-relaxed">
                          {isSimpleMode
                            ? provision.simpleDescription || provision.description
                            : provision.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
