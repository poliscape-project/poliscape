"use client";

import React, { useState } from "react";
import { TrendingUp, Coins, AlertCircle, ShieldCheck } from "lucide-react";

export const FinancialIncomeTaxCalculator: React.FC<{ isSimpleMode: boolean }> = ({ isSimpleMode }) => {
  const [investmentGain, setInvestmentGain] = useState<number>(3000); // 万円
  const [taxRatePlan, setTaxRatePlan] = useState<"current" | "plan25" | "plan30">("plan25");

  // 現行 20.315%
  const currentTax = Math.round(investmentGain * 0.20315 * 10000);
  
  // 見直し案
  const targetRate = taxRatePlan === "current" ? 0.20315 : taxRatePlan === "plan25" ? 0.25 : 0.30;
  const newTax = Math.round(investmentGain * targetRate * 10000);
  const taxIncrease = Math.max(0, newTax - currentTax);

  return (
    <div className="bg-gradient-to-br from-emerald-50/80 via-white to-teal-50/60 rounded-3xl p-5 sm:p-7 border border-emerald-200/80 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-emerald-100 pb-4">
        <div className="flex items-center gap-2.5">
          <span className="p-2 rounded-xl bg-teal-600 text-white shadow-xs">
            <Coins className="w-5 h-5" />
          </span>
          <div>
            <h3 className="text-lg sm:text-xl font-black text-slate-900">
              {isSimpleMode ? "株のもうけの税金 いくら増える？計算機" : "金融所得課税（1億円の壁）増税シミュレーター"}
            </h3>
            <p className="text-xs text-slate-500">
              株式譲渡益・配当所得の年間利益に対する現行税額と見直し案の増税額を比較
            </p>
          </div>
        </div>
        <span className="self-start sm:self-auto text-[11px] font-bold px-3 py-1 rounded-full bg-teal-100 text-teal-800">
          新NISAは完全非課税を維持
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-6 space-y-5 bg-slate-50/70 p-4 sm:p-5 rounded-2xl border border-slate-200/60">
          <div data-widget="slider" className="bg-white/80 p-3.5 rounded-xl border border-slate-200/70 transition-all hover:border-teal-300">
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs sm:text-sm font-bold text-slate-700 cursor-pointer">
                年間の株式売却益・配当収入
              </label>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-teal-700">{investmentGain.toLocaleString()}</span>
                <span className="text-xs font-bold text-slate-600">万円</span>
              </div>
            </div>
            <input
              type="range"
              min={100}
              max={20000}
              step={100}
              value={investmentGain}
              onChange={(e) => setInvestmentGain(Number(e.target.value))}
              className="w-full accent-teal-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
              aria-label="年間の株式売却益・配当収入"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1 select-none">
              <span>100万</span>
              <span>1,000万</span>
              <span>5,000万</span>
              <span>1億円</span>
              <span>2億円</span>
            </div>
            <div className="flex items-center justify-end gap-1 mt-2 pt-1 border-t border-slate-100 text-[10px] text-slate-400">
              <span className="bg-slate-100 px-1.5 py-0.5 rounded text-[9px] font-mono text-slate-500">← →</span>
              <span>金額微調整</span>
            </div>
          </div>

          <div data-widget="button-group" className="bg-white/80 p-3.5 rounded-xl border border-slate-200/70 transition-all hover:border-teal-300">
            <label className="text-xs sm:text-sm font-bold text-slate-700 block mb-2">
              想定される新税率プラン
            </label>
            <div role="radiogroup" className="grid grid-cols-3 gap-2 text-xs">
              <button
                type="button"
                role="radio"
                aria-checked={taxRatePlan === "current"}
                onClick={() => setTaxRatePlan("current")}
                className={`p-2.5 rounded-xl border font-bold transition-all ${
                  taxRatePlan === "current"
                    ? "bg-teal-600 text-white border-teal-600 shadow-xs ring-1 ring-teal-600"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                }`}
              >
                現行 (20.3%)
              </button>
              <button
                type="button"
                role="radio"
                aria-checked={taxRatePlan === "plan25"}
                onClick={() => setTaxRatePlan("plan25")}
                className={`p-2.5 rounded-xl border font-bold transition-all ${
                  taxRatePlan === "plan25"
                    ? "bg-amber-600 text-white border-amber-600 shadow-xs ring-1 ring-amber-600"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                }`}
              >
                案A (25%)
              </button>
              <button
                type="button"
                role="radio"
                aria-checked={taxRatePlan === "plan30"}
                onClick={() => setTaxRatePlan("plan30")}
                className={`p-2.5 rounded-xl border font-bold transition-all ${
                  taxRatePlan === "plan30"
                    ? "bg-rose-600 text-white border-rose-600 shadow-xs ring-1 ring-rose-600"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                }`}
              >
                案B (30%)
              </button>
            </div>
            <div className="flex items-center justify-end gap-1 mt-2 text-[10px] text-slate-400">
              <span className="bg-slate-100 px-1.5 py-0.5 rounded text-[9px] font-mono text-slate-500">← →</span>
              <span>プラン選択切替</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 space-y-4">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-5 sm:p-6 shadow-md">
            <div className="flex items-center justify-between text-xs font-bold text-slate-300 mb-1">
              <span>年間税額のシミュレーション結果</span>
              <span className="bg-white/20 px-2 py-0.5 rounded-full text-[10px]">
                適用税率 {(targetRate * 100).toFixed(1)}%
              </span>
            </div>
            <div className="flex items-baseline gap-1 my-2">
              <span className="text-3xl sm:text-4xl font-black tracking-tight">{newTax.toLocaleString()}</span>
              <span className="text-base sm:text-lg font-bold">円 / 年</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-amber-300 pt-2 border-t border-slate-700/80">
              <TrendingUp className="w-4 h-4 shrink-0" />
              <span>現行からの増税負担額: +{taxIncrease.toLocaleString()} 円 / 年</span>
            </div>
          </div>

          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-2 text-xs">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-teal-600" />
              <span>新NISAを使っている一般投資家への影響</span>
            </div>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              新NISA枠（年間最大360万円、生涯1,800万円まで）で得た売却益や配当金には、<strong>この増税は一切適用されず完全非課税のまま</strong>です。増税対象は年間数千万円以上の特定口座取引を行う富裕層に絞られる方針です。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
