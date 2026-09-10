"use client";

import React, { useState } from "react";
import { Sun, Zap, Coins, Home, ShieldCheck } from "lucide-react";

export const SolarPanelPaybackCalculator: React.FC<{ isSimpleMode: boolean }> = ({ isSimpleMode }) => {
  const [panelKw, setPanelKw] = useState<number>(4); // kW
  const [hasTokyoSubsidy, setHasTokyoSubsidy] = useState<boolean>(true); // 都の補助金

  // 設置初期費用 約28万円/kW
  const initialCost = panelKw * 280000;
  
  // 補助金（東京の場合 約10〜15万円/kW）
  const subsidyAmount = hasTokyoSubsidy ? panelKw * 120000 : 0;
  const netInitialCost = Math.max(0, initialCost - subsidyAmount);

  // 年間発電量：1kWあたり約1,000kWh
  // 自家消費40%（電気代単価35円/kWh削減）、売電60%（売電単価16円/kWh）
  const annualGeneration = panelKw * 1000;
  const annualSavings = Math.round(annualGeneration * 0.4 * 35);
  const annualSales = Math.round(annualGeneration * 0.6 * 16);
  const totalAnnualBenefit = annualSavings + annualSales;

  const paybackYears = Math.round((netInitialCost / totalAnnualBenefit) * 10) / 10;

  return (
    <div className="bg-gradient-to-br from-amber-50/80 via-white to-yellow-50/60 rounded-3xl p-5 sm:p-7 border border-amber-200/80 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-amber-100 pb-4">
        <div className="flex items-center gap-2.5">
          <span className="p-2 rounded-xl bg-amber-600 text-white shadow-xs">
            <Sun className="w-5 h-5" />
          </span>
          <div>
            <h3 className="text-lg sm:text-xl font-black text-slate-900">
              {isSimpleMode ? "家の屋根の太陽光 何年で元が取れる？計算機" : "新築太陽光パネル設置義務化 費用回収シミュレーター"}
            </h3>
            <p className="text-xs text-slate-500">
              設置容量（kW）と自治体補助金から、初期費用の回収年数と生涯光熱費削減額を試算
            </p>
          </div>
        </div>
        <span className="self-start sm:self-auto text-[11px] font-bold px-3 py-1 rounded-full bg-amber-100 text-amber-800">
          東京都・川崎市等で義務化
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-6 space-y-5 bg-slate-50/70 p-4 sm:p-5 rounded-2xl border border-slate-200/60">
          <div data-widget="slider" className="bg-white/80 p-3.5 rounded-xl border border-slate-200/70 transition-all hover:border-amber-300">
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs sm:text-sm font-bold text-slate-700 cursor-pointer">
                屋根に載せる太陽光パネル容量
              </label>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-amber-700">{panelKw}</span>
                <span className="text-xs font-bold text-slate-600">kW</span>
              </div>
            </div>
            <input
              type="range"
              min={2}
              max={8}
              step={0.5}
              value={panelKw}
              onChange={(e) => setPanelKw(Number(e.target.value))}
              className="w-full accent-amber-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
              aria-label="パネル容量"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1 select-none">
              <span>2kW(狭小住宅)</span>
              <span>4kW(標準戸建て)</span>
              <span>6kW</span>
              <span>8kW(大家族)</span>
            </div>
            <div className="flex items-center justify-end gap-1 mt-2 pt-1 border-t border-slate-100 text-[10px] text-slate-400">
              <span className="bg-slate-100 px-1.5 py-0.5 rounded text-[9px] font-mono text-slate-500">← →</span>
              <span>容量調整</span>
            </div>
          </div>

          <div data-widget="button-group" className="bg-white/80 p-3.5 rounded-xl border border-slate-200/70 transition-all hover:border-amber-300">
            <label className="text-xs sm:text-sm font-bold text-slate-700 block mb-2">
              自治体の補助金適用（東京都助成等）
            </label>
            <div role="radiogroup" className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                role="radio"
                aria-checked={hasTokyoSubsidy}
                onClick={() => setHasTokyoSubsidy(true)}
                className={`p-2.5 rounded-xl border font-bold transition-all ${
                  hasTokyoSubsidy
                    ? "bg-amber-600 text-white border-amber-600 shadow-xs ring-1 ring-amber-600"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                }`}
              >
                あり（東京など約12万/kW助成）
              </button>
              <button
                type="button"
                role="radio"
                aria-checked={!hasTokyoSubsidy}
                onClick={() => setHasTokyoSubsidy(false)}
                className={`p-2.5 rounded-xl border font-bold transition-all ${
                  !hasTokyoSubsidy
                    ? "bg-amber-600 text-white border-amber-600 shadow-xs ring-1 ring-amber-600"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                }`}
              >
                なし（全額自己負担）
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 space-y-4">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-5 sm:p-6 shadow-md">
            <div className="flex items-center justify-between text-xs font-bold text-slate-300 mb-1">
              <span>初期費用の回収目安期間</span>
              <span className="bg-emerald-500 text-white px-2 py-0.5 rounded-full text-[10px] font-bold">
                年間経済効果 約 {totalAnnualBenefit.toLocaleString()} 円
              </span>
            </div>
            <div className="flex items-baseline gap-1 my-2">
              <span className="text-3xl sm:text-4xl font-black tracking-tight">{paybackYears}</span>
              <span className="text-base sm:text-lg font-bold">年で初期費用回収</span>
            </div>
            <div className="flex items-center justify-between text-xs text-slate-300 pt-2 border-t border-slate-700/80">
              <span>実質初期負担額:</span>
              <span className="font-bold text-amber-300">約 {Math.round(netInitialCost / 10000)} 万円（定価 {Math.round(initialCost / 10000)}万）</span>
            </div>
          </div>

          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-2 text-xs">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-600" />
              <span>回収後の20年間で100万円超のプラスに</span>
            </div>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              太陽光パネルの寿命は25〜30年と長く、6〜8年で初期費用を回収した後は、年間約8〜15万円の電気代削減効果が丸ごと家計の黒字になります。停電時にも冷蔵庫やスマホを動かせる防災メリットも大です。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
