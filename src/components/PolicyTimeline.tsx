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

      <div className="relative border-l-2 border-teal-200 ml-4 pl-6 space-y-6">
        {timeline.map((step, idx) => (
          <div key={idx} className="relative group">
            {/* ステップアイコン（タイムライン上の丸印） */}
            <div className="absolute -left-[35px] top-0 w-6 h-6 rounded-full bg-teal-600 text-white flex items-center justify-center text-xs shadow-xs">
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            </div>

            <div>
              <span className="text-xs font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200/60 inline-block mb-1">
                {step.date}
              </span>
              <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                {step.label}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
