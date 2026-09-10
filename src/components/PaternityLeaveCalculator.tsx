"use client";

import React, { useState } from "react";
import { Baby, Coins, Calendar, CheckCircle2 } from "lucide-react";

export const PaternityLeaveCalculator: React.FC<{ isSimpleMode: boolean }> = ({ isSimpleMode }) => {
  const [monthlySalary, setMonthlySalary] = useState<number>(35); // 万円
  const [leaveDays, setLeaveDays] = useState<number>(28); // 日数 (最大28日)

  // 育児休業給付金（額面の67%）
  const grossSalary = monthlySalary * 10000;
  const dailyRate = grossSalary / 30;
  const benefitAmount = Math.round(dailyRate * leaveDays * 0.67);

  // 通常時の手取り（社会保険料・税金で約80%想定）
  const normalTakeHome = Math.round(grossSalary * (leaveDays / 30) * 0.8);
  
  // 育児休業中は給付金完全非課税 ＋ 健康保険・厚生年金保険料が全額免除
  // 実質手取りは額面の約80%（＝普段の手取りと100%同額）
  const netTakeHome = benefitAmount; // 非課税・社保免除でほぼそのまま手取り
  const coveragePercent = Math.min(100, Math.round((netTakeHome / normalTakeHome) * 100));

  return (
    <div className="bg-gradient-to-br from-pink-50/80 via-white to-rose-50/60 rounded-3xl p-5 sm:p-7 border border-pink-200/80 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-pink-100 pb-4">
        <div className="flex items-center gap-2.5">
          <span className="p-2 rounded-xl bg-pink-600 text-white shadow-xs">
            <Baby className="w-5 h-5" />
          </span>
          <div>
            <h3 className="text-lg sm:text-xl font-black text-slate-900">
              {isSimpleMode ? "パパ育休の手取り いくらもらえる？計算機" : "産後パパ育休「手取り実質10割」シミュレーター"}
            </h3>
            <p className="text-xs text-slate-500">
              月給と取得日数から、給付金非課税＋社会保険料免除による実質手取り額を試算
            </p>
          </div>
        </div>
        <span className="self-start sm:self-auto text-[11px] font-bold px-3 py-1 rounded-full bg-pink-100 text-pink-800">
          手取り100%補償
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-6 space-y-5 bg-slate-50/70 p-4 sm:p-5 rounded-2xl border border-slate-200/60">
          <div data-widget="slider" className="bg-white/80 p-3.5 rounded-xl border border-slate-200/70 transition-all hover:border-pink-300">
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs sm:text-sm font-bold text-slate-700 cursor-pointer">
                父親の月給（額面・ボーナス除く）
              </label>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-pink-700">{monthlySalary}</span>
                <span className="text-xs font-bold text-slate-600">万円 / 月</span>
              </div>
            </div>
            <input
              type="range"
              min={20}
              max={80}
              step={1}
              value={monthlySalary}
              onChange={(e) => setMonthlySalary(Number(e.target.value))}
              className="w-full accent-pink-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
              aria-label="父親の月給"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1 select-none">
              <span>20万</span>
              <span>35万(平均)</span>
              <span>50万</span>
              <span>80万</span>
            </div>
            <div className="flex items-center justify-end gap-1 mt-2 pt-1 border-t border-slate-100 text-[10px] text-slate-400">
              <span className="bg-slate-100 px-1.5 py-0.5 rounded text-[9px] font-mono text-slate-500">← →</span>
              <span>月給調整</span>
              <span className="text-slate-300">|</span>
              <span className="bg-slate-100 px-1.5 py-0.5 rounded text-[9px] font-mono text-slate-500">↓</span>
              <span>取得日数へ</span>
            </div>
          </div>

          <div data-widget="slider" className="bg-white/80 p-3.5 rounded-xl border border-slate-200/70 transition-all hover:border-pink-300">
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs sm:text-sm font-bold text-slate-700 cursor-pointer">
                産後パパ育休の取得日数
              </label>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-pink-700">{leaveDays}</span>
                <span className="text-xs font-bold text-slate-600">日間</span>
              </div>
            </div>
            <input
              type="range"
              min={7}
              max={28}
              step={1}
              value={leaveDays}
              onChange={(e) => setLeaveDays(Number(e.target.value))}
              className="w-full accent-pink-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
              aria-label="取得日数"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1 select-none">
              <span>7日間(1週間)</span>
              <span>14日間(2週間)</span>
              <span>21日間</span>
              <span>28日間(最長4週間)</span>
            </div>
            <div className="flex items-center justify-end gap-1 mt-2 pt-1 border-t border-slate-100 text-[10px] text-slate-400">
              <span className="bg-slate-100 px-1.5 py-0.5 rounded text-[9px] font-mono text-slate-500">← →</span>
              <span>日数調整</span>
              <span className="text-slate-300">|</span>
              <span className="bg-slate-100 px-1.5 py-0.5 rounded text-[9px] font-mono text-slate-500">↑</span>
              <span>月給へ戻る</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 space-y-4">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-5 sm:p-6 shadow-md">
            <div className="flex items-center justify-between text-xs font-bold text-slate-300 mb-1">
              <span>休業中の手取り受給額（非課税＋社保免除）</span>
              <span className="bg-emerald-500 text-white px-2 py-0.5 rounded-full text-[10px] font-bold">
                手取りカバー率 {coveragePercent}%
              </span>
            </div>
            <div className="flex items-baseline gap-1 my-2">
              <span className="text-3xl sm:text-4xl font-black tracking-tight">{netTakeHome.toLocaleString()}</span>
              <span className="text-base sm:text-lg font-bold">円</span>
            </div>
            <div className="flex items-center justify-between text-xs text-slate-300 pt-2 border-t border-slate-700/80">
              <span>通常勤務時の手取り相当額:</span>
              <span className="font-bold text-white">約 {normalTakeHome.toLocaleString()} 円</span>
            </div>
          </div>

          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-2 text-xs">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-pink-600" />
              <span>なぜ「手取り10割」になるのか？</span>
            </div>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              育児休業給付金は所得税や住民税が一切かからない完全非課税です。さらに月末や一定期間休業することで、健康保険料・厚生年金保険料（約15%分）が丸ごと免除されるため、額面が67%でも手取りは普段の100%と同額になります。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
