"use client";

import React from "react";
import { PolicyTimelineStep } from "@/types/policy";
import { Check, Clock } from "lucide-react";

interface PolicyTimelineProps {
  timeline: PolicyTimelineStep[];
  isSimpleMode: boolean;
}

export const PolicyTimeline: React.FC<PolicyTimelineProps> = ({
  timeline,
  isSimpleMode,
}) => {
  // 日付文字列から未来かどうかを判定
  const isFutureDate = (dateStr: string): boolean => {
    const now = new Date();
    // "2026年10月" "2025年4月1日" "2024年度" etc.
    const yearMatch = dateStr.match(/(\d{4})/);
    if (!yearMatch) return false;
    const year = parseInt(yearMatch[1], 10);
    const monthMatch = dateStr.match(/(\d{1,2})月/);
    const month = monthMatch ? parseInt(monthMatch[1], 10) : 12;
    const dayMatch = dateStr.match(/(\d{1,2})日/);
    const day = dayMatch ? parseInt(dayMatch[1], 10) : 1;
    const stepDate = new Date(year, month - 1, day);
    return stepDate > now;
  };

  return (
    <section className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 sm:p-7">
      <div className="mb-6">
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
          <span>{isSimpleMode ? "決まるまでの流れ（タイムライン）" : "決定・施行までの経緯"}</span>
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          政策が政府で議論され、国会で成立して実際に始まるまでのステップです
        </p>
      </div>

      <ol className="relative border-l-2 border-teal-200 ml-4 pl-6 space-y-6 list-none">
        {timeline.map((step, idx) => {
          const isFuture = isFutureDate(step.date);
          return (
            <li key={idx} className="relative group">
              {/* ステップアイコン（タイムライン上の丸印） */}
              <div className={`absolute -left-[35px] top-0 w-6 h-6 rounded-full text-white flex items-center justify-center text-xs shadow-xs ${
                isFuture ? "bg-amber-500" : "bg-teal-600"
              }`}>
                {isFuture ? (
                  <Clock className="w-3.5 h-3.5 stroke-[3]" />
                ) : (
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                )}
              </div>

              <div>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded border inline-block mb-1 ${
                  isFuture
                    ? "text-amber-700 bg-amber-50 border-amber-200/60"
                    : "text-teal-700 bg-teal-50 border-teal-200/60"
                }`}>
                  {step.date}{isFuture ? "（予定）" : ""}
                </span>
                <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                  {step.label}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
};
