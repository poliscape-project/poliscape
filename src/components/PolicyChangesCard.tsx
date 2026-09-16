"use client";

import React from "react";
import { PolicyChangeItem, PolicyStatus } from "@/types/policy";
import { ArrowRight, Sparkles, Calendar, ShieldCheck, Users, Clock, AlertCircle } from "lucide-react";

interface PolicyChangesCardProps {
  changes: PolicyChangeItem[];
  isSimpleMode: boolean;
  status?: PolicyStatus;
  temporaryPeriod?: string;
  temporaryLabel?: string;
}

const renderIcon = (name?: string) => {
  switch (name) {
    case "Calendar":
      return <Calendar className="w-4 h-4 text-teal-600" />;
    case "ShieldCheck":
      return <ShieldCheck className="w-4 h-4 text-teal-600" />;
    case "Users":
      return <Users className="w-4 h-4 text-teal-600" />;
    case "Clock":
      return <Clock className="w-4 h-4 text-teal-600" />;
    default:
      return <Sparkles className="w-4 h-4 text-teal-600" />;
  }
};

export const PolicyChangesCard: React.FC<PolicyChangesCardProps> = ({
  changes,
  isSimpleMode,
  status = "enacted",
  temporaryPeriod,
  temporaryLabel,
}) => {
  if (!changes || changes.length === 0) return null;

  const isUnderDiscussion = status === "discussing" || status === "proposed";
  const isTemporary = !!temporaryPeriod;

  // 年度が限定されている場合（例: 2024年、2024〜2026年度）は直感的な年度表示を優先
  const tempBadgeText = (() => {
    if (temporaryLabel) return temporaryLabel;
    if (!temporaryPeriod) return "期間中の特例";
    const rangeMatch = temporaryPeriod.match(/(\d{4})(?:年度)?(?:〜|~|-)(\d{4})(?:年度)?/);
    if (rangeMatch) {
      return `${rangeMatch[1]}〜${rangeMatch[2]}年度`;
    }
    const fiscalMatch = temporaryPeriod.match(/(\d{4}年度)/);
    if (fiscalMatch) {
      return `${fiscalMatch[1]}限定`;
    }
    const yearMatch = temporaryPeriod.match(/(\d{4}年)/);
    if (yearMatch) {
      return `${yearMatch[1]}限定`;
    }
    return "期間中の特例";
  })();

  return (
    <section className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 sm:p-7">
      <div className="flex items-center justify-between mb-4 gap-2 flex-wrap">
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
            <span>
              {isUnderDiscussion
                ? isSimpleMode
                  ? "どこを変えようと話し合っているの？"
                  : "主な論点（現行ルール vs 見直し案）"
                : isTemporary
                ? isSimpleMode
                  ? "いつものルールと、期間限定の特例はどう違うの？"
                  : "期間限定の特例措置（通常ルールとのちがい）"
                : isSimpleMode
                ? "どこが変わったの？"
                : "主な変更点（新旧対照）"}
            </span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            {isUnderDiscussion
              ? isSimpleMode
                ? "いまの法律・制度と、議論されている見直し案のちがいを比べました"
                : "現在の制度と、国会や政府審議会で検討されている見直し案（想定）の対照"
              : isTemporary
              ? isSimpleMode
                ? "ふだんのルールと、決められた期間だけ行われる特別な措置を比べました"
                : "平時の通常制度と、期間限定で適用される特例措置・緊急対策の対照"
              : "これまでの制度と新しい制度のちがいを比べました"}
          </p>
        </div>
        {isUnderDiscussion && (
          <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
            <AlertCircle className="w-3.5 h-3.5 text-amber-700" />
            国会・政府審議中（未確定）
          </span>
        )}
        {isTemporary && !isUnderDiscussion && (
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold px-3 py-1 rounded-full bg-blue-50 text-blue-800 border border-blue-200 shadow-2xs">
            <Clock className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span>適用期間: {temporaryPeriod}</span>
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {changes.map((item) => (
          <div
            key={item.id}
            className={`rounded-xl border p-4 transition-colors flex flex-col justify-between ${
              isUnderDiscussion
                ? "border-amber-200/80 bg-amber-50/20 hover:border-amber-300"
                : isTemporary
                ? "border-blue-200/80 bg-blue-50/20 hover:border-blue-300"
                : "border-slate-200/90 bg-slate-50/50 hover:border-teal-300"
            }`}
          >
            <div>
              {/* トピックヘッダー */}
              <div className="flex items-center justify-between gap-2 mb-3 pb-2 border-b border-slate-200/60">
                <div className="flex items-center gap-1.5 font-bold text-slate-800 text-sm">
                  {renderIcon(item.icon)}
                  <span>{item.topic}</span>
                </div>
                {item.highlight && (
                  <span
                    className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                      isUnderDiscussion
                        ? "bg-amber-100 text-amber-900 border border-amber-200/60"
                        : isTemporary
                        ? "bg-blue-100 text-blue-900 border border-blue-200/60"
                        : "bg-emerald-100 text-emerald-800"
                    }`}
                  >
                    {item.highlight}
                  </span>
                )}
              </div>

              {/* ビフォーアフター比較 */}
              <div className="space-y-2.5">
                {/* 変更前（議論中または時限措置は現行・平時ルールのため取り消し線なし） */}
                <div className="flex items-start gap-2 text-xs sm:text-sm">
                  <span
                    className={`shrink-0 px-1.5 py-0.5 rounded text-[10px] font-bold ${
                      isUnderDiscussion || isTemporary
                        ? "bg-slate-200 text-slate-800"
                        : "bg-slate-200 text-slate-600"
                    }`}
                  >
                    {isUnderDiscussion ? "現行ルール" : isTemporary ? "通常時" : "これまで"}
                  </span>
                  {isUnderDiscussion || isTemporary ? (
                    <span className="text-slate-700 font-medium">
                      {item.before}
                    </span>
                  ) : (
                    <del className="text-slate-500 decoration-slate-400 no-underline line-through">
                      {item.before}
                    </del>
                  )}
                </div>

                {/* 変化の矢印 */}
                <div
                  className={`flex items-center gap-1 pl-1 ${
                    isUnderDiscussion
                      ? "text-amber-700"
                      : isTemporary
                      ? "text-blue-600"
                      : "text-teal-600"
                  }`}
                >
                  <ArrowRight className="w-3.5 h-3.5 rotate-90" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">
                    {isUnderDiscussion ? "見直し案（議論中）" : isTemporary ? "特例措置" : "新制度"}
                  </span>
                </div>

                {/* 変更後（議論中は「見直し案（想定）」、時限措置は「期間中の特例」） */}
                <div
                  className={`flex items-start gap-2 text-xs sm:text-sm bg-white p-2.5 rounded-lg shadow-2xs border ${
                    isUnderDiscussion
                      ? "border-amber-200/90 ring-1 ring-amber-100"
                      : isTemporary
                      ? "border-blue-200/90 ring-1 ring-blue-50"
                      : "border-teal-100/80"
                  }`}
                >
                  <span
                    className={`shrink-0 px-1.5 py-0.5 rounded text-[10px] font-bold text-white ${
                      isUnderDiscussion
                        ? "bg-amber-600"
                        : isTemporary
                        ? "bg-blue-600"
                        : "bg-teal-600"
                    }`}
                  >
                    {isUnderDiscussion ? "見直し案（想定）" : isTemporary ? tempBadgeText : "これから"}
                  </span>
                  <span className="font-bold text-slate-900">
                    {item.after}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
