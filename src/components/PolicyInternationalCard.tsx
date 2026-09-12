"use client";

import React from "react";
import { PolicyInternationalComparison } from "@/types/policy";
import { Globe, ExternalLink, ShieldCheck, Scale, Coins, Calendar, Info } from "lucide-react";

interface PolicyInternationalCardProps {
  comparison: PolicyInternationalComparison;
  isSimpleMode: boolean;
}

export const PolicyInternationalCard: React.FC<PolicyInternationalCardProps> = ({
  comparison,
  isSimpleMode,
}) => {
  if (!comparison || !comparison.countries || comparison.countries.length === 0) {
    return null;
  }

  return (
    <section className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 sm:p-7 overflow-hidden">
      {/* ヘッダー */}
      <div className="mb-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-indigo-50 text-indigo-700">
              <Globe className="w-4 h-4" />
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">
              {isSimpleMode ? "世界の国ではどうなってるの？（海外のルール）" : comparison.title}
            </h3>
          </div>
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-800 border border-indigo-100 self-start sm:self-auto">
            <ShieldCheck className="w-3 h-3 text-indigo-600" />
            <span>公的オープンデータ準拠</span>
          </span>
        </div>

        {/* 比較サマリー */}
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50/80 border border-slate-100 p-3.5 rounded-xl">
          {comparison.comparisonSummary}
        </p>
      </div>

      {/* 国別カード一覧 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        {comparison.countries.map((item, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl border border-slate-200/90 p-4 sm:p-5 flex flex-col justify-between hover:border-indigo-300 hover:shadow-xs transition-all"
          >
            <div>
              {/* 国名ヘッダー */}
              <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="text-2xl" role="img" aria-label={item.country}>
                    {item.flag}
                  </span>
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
                      {item.country}
                    </h4>
                    <span className="text-[11px] text-slate-400 font-mono">
                      {item.systemName}
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                  {item.countryCode}
                </span>
              </div>

              {/* 3大指標 */}
              <div className="space-y-2 mb-3.5 text-xs">
                {/* 金額・水準 */}
                <div className="flex items-start gap-2 bg-slate-50/60 p-2 rounded-lg">
                  <Coins className="w-3.5 h-3.5 text-slate-500 mt-0.5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <span className="text-[11px] font-medium text-slate-500 block">
                      {isSimpleMode ? "もらえるお金・ルール" : "給付額・水準"}
                    </span>
                    <span className="font-bold text-slate-900 leading-snug block">
                      {item.amount}
                    </span>
                  </div>
                </div>

                {/* 年齢・要件 */}
                {item.ageLimit && (
                  <div className="flex items-start gap-2 bg-slate-50/60 p-2 rounded-lg">
                    <Calendar className="w-3.5 h-3.5 text-slate-500 mt-0.5 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <span className="text-[11px] font-medium text-slate-500 block">
                        {isSimpleMode ? "対象となる年齢・期間" : "対象年齢・要件"}
                      </span>
                      <span className="font-bold text-slate-800 leading-snug block">
                        {item.ageLimit}
                      </span>
                    </div>
                  </div>
                )}

                {/* 所得制限・条件 */}
                <div className="flex items-start gap-2 bg-slate-50/60 p-2 rounded-lg">
                  <Scale className="w-3.5 h-3.5 text-slate-500 mt-0.5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <span className="text-[11px] font-medium text-slate-500 block">
                      {isSimpleMode ? "親の給料の制限など" : "所得制限・参入条件"}
                    </span>
                    <span className="font-bold text-slate-800 leading-snug block">
                      {item.incomeLimit}
                    </span>
                  </div>
                </div>
              </div>

              {/* 日本との違い・設計思想の解説 */}
              <div className="bg-indigo-50/40 border border-indigo-100/70 p-3 rounded-xl mb-3 text-xs">
                <div className="flex items-center gap-1 text-indigo-900 font-bold text-[11px] mb-1">
                  <Info className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                  <span>{isSimpleMode ? "日本とのちがい・特徴" : "制度の背景・日本との違い"}</span>
                </div>
                <p className="text-slate-700 leading-relaxed font-normal">
                  {item.keyFeature}
                </p>
              </div>
            </div>

            {/* 一次情報公的ソースリンク */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
              <span className="text-slate-400 truncate max-w-[180px]">
                出典: {item.source.organization}
              </span>
              <a
                href={item.source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-bold text-indigo-700 hover:text-indigo-900 hover:underline shrink-0"
              >
                <span>公式一次資料</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
