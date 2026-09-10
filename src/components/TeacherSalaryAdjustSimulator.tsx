"use client";

import React, { useState } from "react";
import { GraduationCap, Clock, TrendingUp, HeartHandshake } from "lucide-react";

export const TeacherSalaryAdjustSimulator: React.FC<{ isSimpleMode: boolean }> = ({ isSimpleMode }) => {
  const [baseMonthly, setBaseMonthly] = useState<number>(35); // 万円
  const [ratePlan, setRatePlan] = useState<number>(10); // 10% or 13%
  const [isClassTeacher, setIsClassTeacher] = useState<boolean>(true); // 担任手当

  // 現行4%
  const currentAllowance = baseMonthly * 0.04;
  
  // 改定後
  const newRateAllowance = baseMonthly * (ratePlan / 100);
  const teacherBonus = isClassTeacher ? 1.0 : 0; // 担任手当月1万円想定
  const monthlyIncrease = Math.round((newRateAllowance + teacherBonus - currentAllowance) * 10) / 10;
  const yearlyIncrease = Math.round((monthlyIncrease * 16) * 10) / 10; // 期末勤勉手当込み年約16ヶ月分

  return (
    <div className="bg-gradient-to-br from-teal-50/80 via-white to-emerald-50/60 rounded-3xl p-5 sm:p-7 border border-teal-200/80 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-teal-100 pb-4">
        <div className="flex items-center gap-2.5">
          <span className="p-2 rounded-xl bg-teal-600 text-white shadow-xs">
            <GraduationCap className="w-5 h-5" />
          </span>
          <div>
            <h3 className="text-lg sm:text-xl font-black text-slate-900">
              {isSimpleMode ? "学校の先生のお給料 いくら上がる？計算機" : "教員給特法見直し・教職調整額引き上げシミュレーター"}
            </h3>
            <p className="text-xs text-slate-500">
              給特法の教職調整額（4%→10%以上）や担任手当改定に伴う先生の年間手取り増を試算
            </p>
          </div>
        </div>
        <span className="self-start sm:self-auto text-[11px] font-bold px-3 py-1 rounded-full bg-teal-100 text-teal-800">
          53年ぶりの抜本改定
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-6 space-y-5 bg-slate-50/70 p-4 sm:p-5 rounded-2xl border border-slate-200/60">
          <div data-widget="slider" className="bg-white/80 p-3.5 rounded-xl border border-slate-200/70 transition-all hover:border-teal-300">
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs sm:text-sm font-bold text-slate-700 cursor-pointer">
                教員の基本月給（本給）
              </label>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-teal-700">{baseMonthly}</span>
                <span className="text-xs font-bold text-slate-600">万円 / 月</span>
              </div>
            </div>
            <input
              type="range"
              min={22}
              max={55}
              step={1}
              value={baseMonthly}
              onChange={(e) => setBaseMonthly(Number(e.target.value))}
              className="w-full accent-teal-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
              aria-label="教員の基本月給"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1 select-none">
              <span>22万(初任給)</span>
              <span>35万(30代中堅)</span>
              <span>45万(ベテラン)</span>
              <span>55万</span>
            </div>
            <div className="flex items-center justify-end gap-1 mt-2 pt-1 border-t border-slate-100 text-[10px] text-slate-400">
              <span className="bg-slate-100 px-1.5 py-0.5 rounded text-[9px] font-mono text-slate-500">← →</span>
              <span>本給調整</span>
            </div>
          </div>

          <div data-widget="button-group" className="bg-white/80 p-3.5 rounded-xl border border-slate-200/70 transition-all hover:border-teal-300">
            <label className="text-xs sm:text-sm font-bold text-slate-700 block mb-2">
              引き上げ後の教職調整額案
            </label>
            <div role="radiogroup" className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                role="radio"
                aria-checked={ratePlan === 10}
                onClick={() => setRatePlan(10)}
                className={`p-2.5 rounded-xl border font-bold transition-all ${
                  ratePlan === 10
                    ? "bg-teal-600 text-white border-teal-600 shadow-xs ring-1 ring-teal-600"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                }`}
              >
                10%案（文科省答申基準）
              </button>
              <button
                type="button"
                role="radio"
                aria-checked={ratePlan === 13}
                onClick={() => setRatePlan(13)}
                className={`p-2.5 rounded-xl border font-bold transition-all ${
                  ratePlan === 13
                    ? "bg-teal-600 text-white border-teal-600 shadow-xs ring-1 ring-teal-600"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                }`}
              >
                13%案（与党推進派提言）
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 space-y-4">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-5 sm:p-6 shadow-md">
            <div className="flex items-center justify-between text-xs font-bold text-slate-300 mb-1">
              <span>先生の年間給与（手取り）増加目安</span>
              <span className="bg-white/20 px-2 py-0.5 rounded-full text-[10px]">
                ボーナス反映込み
              </span>
            </div>
            <div className="flex items-baseline gap-1 my-2">
              <span className="text-3xl sm:text-4xl font-black tracking-tight">+{yearlyIncrease.toLocaleString()}</span>
              <span className="text-base sm:text-lg font-bold">万円 / 年</span>
            </div>
            <div className="flex items-center justify-between text-xs text-slate-300 pt-2 border-t border-slate-700/80">
              <span>毎月の給与増額分:</span>
              <span className="font-bold text-teal-400">月額 約 +{Math.round(monthlyIncrease * 10000).toLocaleString()} 円</span>
            </div>
          </div>

          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-2 text-xs">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-teal-600" />
              <span>給料アップだけでなく「時間」を取り戻せるか</span>
            </div>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              お金が増えても、土日の部活動や過度な行事準備で月80時間超の残業が減らなければ教員志望者は戻りません。文科省は部活動の休日地域クラブ移行や、授業コマ数の上限設定など業務削減をセットで進める方針です。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
