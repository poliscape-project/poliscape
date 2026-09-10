"use client";

import React from "react";
import { PolicySource } from "@/types/policy";
import { ExternalLink, Landmark, ShieldCheck } from "lucide-react";

interface PolicySourcesProps {
  sources: PolicySource[];
}

export const PolicySources: React.FC<PolicySourcesProps> = ({ sources }) => {
  return (
    <section className="bg-slate-50/70 rounded-2xl border border-slate-200/80 p-5 sm:p-7">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-200/70">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
            <Landmark className="w-4 h-4 text-slate-600" />
            <span>参照した公的一次情報（透明性の担保）</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            本サイトの情報は、民間の主観記事ではなく国の公式機関が公開した公的文書・議事録のみに基づいています
          </p>
        </div>
        <span className="inline-flex items-center gap-1 text-[11px] font-medium bg-white text-emerald-700 px-2.5 py-1 rounded-full border border-slate-200 shadow-2xs self-start sm:self-auto">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          二次報道の排除
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {sources.map((source, idx) => (
          <a
            key={idx}
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block p-3 rounded-xl bg-white border border-slate-200/80 hover:border-teal-400 hover:shadow-xs transition-all"
          >
            <div className="flex items-center justify-between gap-1 mb-1">
              <span className="text-[10px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded">
                {source.organization}
              </span>
              <span className="text-[10px] text-slate-400">
                {source.typeLabel}
              </span>
            </div>
            <h4 className="text-xs font-semibold text-slate-800 group-hover:text-teal-700 line-clamp-2 transition-colors">
              {source.title}
            </h4>
            <div className="mt-2 flex items-center gap-1 text-[11px] text-slate-400 group-hover:text-teal-600">
              <span>一次情報を確認</span>
              <ExternalLink className="w-3 h-3" />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};
