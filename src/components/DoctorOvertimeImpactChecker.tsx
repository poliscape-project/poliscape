"use client";

import React, { useState } from "react";
import { Stethoscope, Clock, AlertCircle, ShieldAlert } from "lucide-react";

export const DoctorOvertimeImpactChecker: React.FC<{ isSimpleMode: boolean }> = ({ isSimpleMode }) => {
  const [monthlyOvertime, setMonthlyOvertime] = useState<number>(80); // 時間/月
  const [nightShifts, setNightShifts] = useState<number>(4); // 回/月

  const yearlyOvertime = monthlyOvertime * 12;
  const isExceedingA = yearlyOvertime > 960;
  const isExceedingB = yearlyOvertime > 1860;

  return (
    <div className="bg-gradient-to-br from-cyan-50/80 via-white to-blue-50/60 rounded-3xl p-5 sm:p-7 border border-cyan-200/80 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-cyan-100 pb-4">
        <div className="flex items-center gap-2.5">
          <span className="p-2 rounded-xl bg-cyan-600 text-white shadow-xs">
            <Stethoscope className="w-5 h-5" />
          </span>
          <div>
            <h3 className="text-lg sm:text-xl font-black text-slate-900">
              {isSimpleMode ? "お医者さんの残業規制 守れる？診断機" : "医師の時間外労働上限規制（年960時間）診断ナビ"}
            </h3>
            <p className="text-xs text-slate-500">
              月間時間外労働と当直回数から、法定制限（A水準960h / B水準1860h）への抵触度を判定
            </p>
          </div>
        </div>
        <span className="self-start sm:self-auto text-[11px] font-bold px-3 py-1 rounded-full bg-cyan-100 text-cyan-800">
          2024年4月完全義務化
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-6 space-y-5 bg-slate-50/70 p-4 sm:p-5 rounded-2xl border border-slate-200/60">
          <div data-widget="slider" className="bg-white/80 p-3.5 rounded-xl border border-slate-200/70 transition-all hover:border-cyan-300">
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs sm:text-sm font-bold text-slate-700 cursor-pointer">
                医師の月間残業・時間外労働時間
              </label>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-cyan-700">{monthlyOvertime}</span>
                <span className="text-xs font-bold text-slate-600">時間 / 月</span>
              </div>
            </div>
            <input
              type="range"
              min={20}
              max={160}
              step={5}
              value={monthlyOvertime}
              onChange={(e) => setMonthlyOvertime(Number(e.target.value))}
              className="w-full accent-cyan-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
              aria-label="月間残業・時間外労働時間"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1 select-none">
              <span>40h</span>
              <span>80h(A水準上限目安)</span>
              <span>120h</span>
              <span>160h(過労死危険)</span>
            </div>
            <div className="flex items-center justify-end gap-1 mt-2 pt-1 border-t border-slate-100 text-[10px] text-slate-400">
              <span className="bg-slate-100 px-1.5 py-0.5 rounded text-[9px] font-mono text-slate-500">← →</span>
              <span>残業時間調整</span>
            </div>
          </div>

          <div data-widget="slider" className="bg-white/80 p-3.5 rounded-xl border border-slate-200/70 transition-all hover:border-cyan-300">
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs sm:text-sm font-bold text-slate-700 cursor-pointer">
                月間の宿直・夜間当直回数
              </label>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-cyan-700">{nightShifts}</span>
                <span className="text-xs font-bold text-slate-600">回 / 月</span>
              </div>
            </div>
            <input
              type="range"
              min={0}
              max={8}
              step={1}
              value={nightShifts}
              onChange={(e) => setNightShifts(Number(e.target.value))}
              className="w-full accent-cyan-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
              aria-label="月間の当直回数"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1 select-none">
              <span>0回(日勤のみ)</span>
              <span>2回</span>
              <span>4回(週1回当直)</span>
              <span>8回(過酷当直)</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 space-y-4">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-5 sm:p-6 shadow-md">
            <div className="flex items-center justify-between text-xs font-bold text-slate-300 mb-1">
              <span>年間時間外労働（換算値）</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                isExceedingB ? "bg-rose-500 text-white" : isExceedingA ? "bg-amber-500 text-slate-900" : "bg-emerald-500 text-white"
              }`}>
                {isExceedingB ? "B水準超過（違法）" : isExceedingA ? "特例B水準（指定必要）" : "一般A水準（適合）"}
              </span>
            </div>
            <div className="flex items-baseline gap-1 my-2">
              <span className="text-3xl sm:text-4xl font-black tracking-tight">{yearlyOvertime.toLocaleString()}</span>
              <span className="text-base sm:text-lg font-bold">時間 / 年</span>
            </div>
            <p className="text-xs text-slate-300">
              {isExceedingA
                ? "年960時間を超えるため、都道府県から地域医療確保病院（B水準）の指定を受けない限り違法となります。"
                : "一般基準（年960時間以内）に収まっており、法定基準をクリアしています。"}
            </p>
          </div>

          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-2 text-xs">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-cyan-600" />
              <span>救急医療・当直明けのインターバル義務</span>
            </div>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              法律上、当直明けは9〜11時間のインターバル（休息時間）確保が義務付けられています。医師不足の地方病院では翌日の外来や手術を休診せざるを得ず、地域医療の維持と医師の保護の板挟みが続いています。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
