"use client";

import React, { useState } from "react";
import { Scale, Briefcase, AlertCircle, Coins } from "lucide-react";

export const DismissalSettlementSimulator: React.FC<{ isSimpleMode: boolean }> = ({ isSimpleMode }) => {
  const [monthlySalary, setMonthlySalary] = useState<number>(40); // 万円
  const [yearsOfService, setYearsOfService] = useState<number>(10); // 年
  const [settlementScale, setSettlementScale] = useState<"standard" | "high" | "low">("standard");

  // 補償月数の相場（裁判例・議論ベース：勤続年数に応じて3〜12ヶ月＋α）
  const baseMonths = Math.min(18, Math.max(3, Math.round(yearsOfService * 0.8 + 2)));
  const factor = settlementScale === "high" ? 1.5 : settlementScale === "low" ? 0.7 : 1.0;
  const totalMonths = Math.round(baseMonths * factor * 10) / 10;
  const settlementAmount = Math.round(monthlySalary * totalMonths);

  return (
    <div className="bg-gradient-to-br from-amber-50/80 via-white to-orange-50/60 rounded-3xl p-5 sm:p-7 border border-amber-200/80 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-amber-100 pb-4">
        <div className="flex items-center gap-2.5">
          <span className="p-2 rounded-xl bg-amber-600 text-white shadow-xs">
            <Scale className="w-5 h-5" />
          </span>
          <div>
            <h3 className="text-lg sm:text-xl font-black text-slate-900">
              {isSimpleMode ? "クビになったときの解決金 いくらもらえる？試算機" : "解雇の金銭解決制度（解決金・補償金）相場シミュレーター"}
            </h3>
            <p className="text-xs text-slate-500">
              不当解雇無効判決時に金銭を支払って合意退職する場合の標準補償水準を試算
            </p>
          </div>
        </div>
        <span className="self-start sm:self-auto text-[11px] font-bold px-3 py-1 rounded-full bg-amber-100 text-amber-800">
          労働者救済 vs 解雇自由化の激論
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-6 space-y-5 bg-slate-50/70 p-4 sm:p-5 rounded-2xl border border-slate-200/60">
          <div data-widget="slider" className="bg-white/80 p-3.5 rounded-xl border border-slate-200/70 transition-all hover:border-amber-300">
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs sm:text-sm font-bold text-slate-700 cursor-pointer">
                月額給与（基本給＋定例手当）
              </label>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-amber-700">{monthlySalary}</span>
                <span className="text-xs font-bold text-slate-600">万円 / 月</span>
              </div>
            </div>
            <input
              type="range"
              min={20}
              max={150}
              step={5}
              value={monthlySalary}
              onChange={(e) => setMonthlySalary(Number(e.target.value))}
              className="w-full accent-amber-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
              aria-label="月額給与"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1 select-none">
              <span>20万</span>
              <span>40万(平均)</span>
              <span>80万</span>
              <span>150万</span>
            </div>
            <div className="flex items-center justify-end gap-1 mt-2 pt-1 border-t border-slate-100 text-[10px] text-slate-400">
              <span className="bg-slate-100 px-1.5 py-0.5 rounded text-[9px] font-mono text-slate-500">← →</span>
              <span>月給調整</span>
              <span className="text-slate-300">|</span>
              <span className="bg-slate-100 px-1.5 py-0.5 rounded text-[9px] font-mono text-slate-500">↓</span>
              <span>勤続年数へ</span>
            </div>
          </div>

          <div data-widget="slider" className="bg-white/80 p-3.5 rounded-xl border border-slate-200/70 transition-all hover:border-amber-300">
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs sm:text-sm font-bold text-slate-700 cursor-pointer">
                勤続年数
              </label>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-amber-700">{yearsOfService}</span>
                <span className="text-xs font-bold text-slate-600">年</span>
              </div>
            </div>
            <input
              type="range"
              min={1}
              max={35}
              step={1}
              value={yearsOfService}
              onChange={(e) => setYearsOfService(Number(e.target.value))}
              className="w-full accent-amber-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
              aria-label="勤続年数"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1 select-none">
              <span>1年</span>
              <span>5年</span>
              <span>10年</span>
              <span>20年</span>
              <span>35年</span>
            </div>
            <div className="flex items-center justify-end gap-1 mt-2 pt-1 border-t border-slate-100 text-[10px] text-slate-400">
              <span className="bg-slate-100 px-1.5 py-0.5 rounded text-[9px] font-mono text-slate-500">← →</span>
              <span>勤続年数調整</span>
              <span className="text-slate-300">|</span>
              <span className="bg-slate-100 px-1.5 py-0.5 rounded text-[9px] font-mono text-slate-500">↑</span>
              <span>月給へ戻る</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 space-y-4">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-5 sm:p-6 shadow-md">
            <div className="flex items-center justify-between text-xs font-bold text-slate-300 mb-1">
              <span>想定される解決金（補償金）目安</span>
              <span className="bg-white/20 px-2 py-0.5 rounded-full text-[10px]">
                約 {totalMonths} ヶ月分相当
              </span>
            </div>
            <div className="flex items-baseline gap-1 my-2">
              <span className="text-3xl sm:text-4xl font-black tracking-tight">{settlementAmount.toLocaleString()}</span>
              <span className="text-base sm:text-lg font-bold">万円</span>
            </div>
            <p className="text-xs text-slate-300">
              ※通常の退職金とは別に、会社側から支払われる不当解雇解決金としての水準です。
            </p>
          </div>

          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-2 text-xs">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-amber-600" />
              <span>「労働者申立型」と「使用者申立型」の違い</span>
            </div>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              労働者側から『元の職場に戻れないのでお金で解決したい』と請求できる「労働者申立型」は救済として合意が進む一方、会社側から『金を払うから辞めろ』と要求できる「使用者申立型」には『首切り自由化につながる』と強い反発があります。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
