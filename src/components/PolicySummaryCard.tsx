"use client";

import React from "react";
import { PolicyTopic } from "@/types/policy";
import { Info, Sparkles } from "lucide-react";

interface PolicySummaryCardProps {
  policy: PolicyTopic;
  isSimpleMode: boolean;
}

export const PolicySummaryCard: React.FC<PolicySummaryCardProps> = ({
  policy,
  isSimpleMode,
}) => {
  const summaryPoints = isSimpleMode ? policy.summary.simple : policy.summary.standard;
  const backgroundText = isSimpleMode ? policy.background.simple : policy.background.standard;

  // 「見出し：本文」または「【見出し】本文」形式の文字列を綺麗にハイライト表示するヘルパー
  const renderPoint = (text: string) => {
    // 【見出し】本文 のパターン
    const bracketMatch = text.match(/^【(.*?)】(.*)$/);
    if (bracketMatch) {
      return (
        <span>
          <strong className="text-slate-900 font-bold bg-teal-100/50 px-1.5 py-0.5 rounded mr-1.5">
            {bracketMatch[1]}
          </strong>
          <span className="text-slate-700">{bracketMatch[2]}</span>
        </span>
      );
    }
    // 見出し：本文 のパターン
    const colonMatch = text.match(/^(.*?)[：:](.*)$/);
    if (colonMatch) {
      return (
        <span>
          <strong className="text-slate-900 font-bold mr-1">
            {colonMatch[1]}
          </strong>
          <span className="text-slate-700">➔ {colonMatch[2]}</span>
        </span>
      );
    }
    return <span className="text-slate-800">{text}</span>;
  };

  return (
    <section className="space-y-0">
      {/* 3つのポイント要約カード */}
      <div className="rounded-2xl bg-gradient-to-br from-emerald-50/70 via-teal-50/40 to-slate-50 border border-teal-200/60 p-4 sm:p-5 shadow-xs">
        <div className="flex items-center justify-between mb-3.5">
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-teal-600 text-white text-xs font-bold shadow-sm">
              3
            </span>
            <h2 className="font-black text-slate-900 text-base sm:text-lg tracking-tight">
              {isSimpleMode ? "ざっくりわかる！3つのキホン" : "これだけ押さえる！3つのポイント"}
            </h2>
          </div>
          {isSimpleMode && (
            <span className="text-[11px] font-semibold text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
              やさしい日本語
            </span>
          )}
        </div>

        <ul className="space-y-3">
          {summaryPoints.map((point, idx) => (
            <li key={idx} className="flex items-start gap-2.5 text-sm sm:text-base leading-snug">
              <span className="w-5 h-5 rounded-full bg-white border border-teal-200 flex items-center justify-center text-teal-700 text-xs font-bold shrink-0 mt-0.5 shadow-2xs">
                {idx + 1}
              </span>
              <div className="flex-1">
                {renderPoint(point)}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* なぜこの政策ができたのか？（背景） */}
      <div className="mt-3 bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-xs">
        <div className="flex items-start gap-2 text-slate-700">
          <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
              {isSimpleMode ? "なぜこのルールができたの？" : "政策の背景とねらい"}
            </span>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {backgroundText}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
