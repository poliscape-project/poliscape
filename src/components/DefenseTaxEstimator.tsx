"use client";

import React, { useState, useId } from "react";
import { Shield } from "lucide-react";

export const DefenseTaxEstimator: React.FC<{ isSimpleMode: boolean }> = ({ isSimpleMode }) => {
  const salarySliderId = useId();
  const [annualSalary, setAnnualSalary] = useState<number>(500);
  const [isSmoker, setIsSmoker] = useState<boolean>(false);

  const estimatedIncomeTax = Math.round(annualSalary * 10000 * 0.03);
  const defenseIncomeTax = Math.round(estimatedIncomeTax * 0.01);
  const tobaccoTaxYearly = isSmoker ? 21900 : 0;
  const totalPersonalImpact = defenseIncomeTax + tobaccoTaxYearly;

  return (
    <section className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 sm:p-7">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-teal-50 text-teal-700">
              <Shield className="w-5 h-5" />
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">
              {isSimpleMode ? "防衛費アップで税金はいくら増える？試算機" : "防衛費GDP比2%＆「防衛増税」家計影響シミュレーター"}
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-500">
            {isSimpleMode
              ? "年収と生活習慣から、防衛増税（所得税・たばこ税など）で自分のお財布にどんな影響があるかチェック！"
              : "防衛力強化に係る財源確保法に基づく所得税付加税（1%）・たばこ税・法人税等の影響試算"}
          </p>
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 text-slate-800 text-xs font-bold self-start sm:self-center">
          <span>GDP比2%（約43兆円枠）</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-6 space-y-5 bg-slate-50/70 p-4 sm:p-5 rounded-2xl border border-slate-200/60">
          <div
            data-widget="slider"
            className="bg-white/70 p-3 rounded-xl border border-slate-200/70 transition-all hover:border-teal-300"
          >
            <div className="flex justify-between items-center mb-2">
              <label
                htmlFor={salarySliderId}
                className="text-xs sm:text-sm font-bold text-slate-700 cursor-pointer flex items-center gap-1.5"
              >
                <span>給与年収（額面）</span>
              </label>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-black text-teal-700">{annualSalary}</span>
                <span className="text-xs font-bold text-slate-600">万円</span>
              </div>
            </div>
            <input
              id={salarySliderId}
              type="range"
              min={300}
              max={1500}
              step={50}
              value={annualSalary}
              onChange={(e) => setAnnualSalary(Number(e.target.value))}
              className="w-full accent-teal-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
              aria-label="給与年収（額面）"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1 select-none">
              <span>300万</span>
              <span>500万</span>
              <span>1,000万</span>
              <span>1,500万</span>
            </div>
            <div className="flex items-center justify-end gap-1 mt-1 text-[10px] text-slate-400">
              <span className="bg-slate-100 px-1.5 py-0.5 rounded text-[9px] font-mono text-slate-500">← →</span>
              <span>キーで微調整可能</span>
            </div>
          </div>

          <div
            data-widget="button-group"
            className="bg-white/70 p-3 rounded-xl border border-slate-200/70 transition-all hover:border-teal-300"
          >
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs sm:text-sm font-bold text-slate-700 block">
                喫煙習慣（たばこ税の段階的増税）
              </label>
              <div className="flex items-center gap-1 text-[10px] text-slate-400">
                <span className="bg-slate-100 px-1.5 py-0.5 rounded text-[9px] font-mono text-slate-500">← →</span>
                <span>キーで選択切替</span>
              </div>
            </div>
            <div
              role="radiogroup"
              aria-label="喫煙習慣（たばこ税の段階的増税）"
              className="grid grid-cols-2 gap-2 text-xs"
            >
              <button
                type="button"
                role="radio"
                aria-checked={!isSmoker}
                onClick={() => setIsSmoker(false)}
                className={`p-2.5 rounded-xl border font-bold transition-all ${
                  !isSmoker
                    ? "bg-teal-600 text-white border-teal-600 shadow-xs ring-1 ring-teal-600"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                }`}
              >
                吸わない（増税なし）
              </button>
              <button
                type="button"
                role="radio"
                aria-checked={isSmoker}
                onClick={() => setIsSmoker(true)}
                className={`p-2.5 rounded-xl border font-bold transition-all ${
                  isSmoker
                    ? "bg-amber-600 text-white border-amber-600 shadow-xs ring-1 ring-amber-600"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                }`}
              >
                1日1箱程度吸う（1本3円増税）
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 space-y-4">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 text-white rounded-2xl p-5 sm:p-6 shadow-md">
            <div className="flex items-center justify-between text-xs font-bold text-slate-300 mb-1">
              <span>個人の年間負担増の目安</span>
              <span className="bg-white/20 px-2 py-0.5 rounded-full text-[10px]">制度設計基準</span>
            </div>
            <div className="flex items-baseline gap-1 my-2">
              <span className="text-3xl sm:text-4xl font-black tracking-tight">{totalPersonalImpact.toLocaleString()}</span>
              <span className="text-base sm:text-lg font-bold">円 / 年</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              所得税の付加税1%分（約{defenseIncomeTax.toLocaleString()}円）＋ たばこ税増税分（{tobaccoTaxYearly.toLocaleString()}円）
            </p>
          </div>

          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-2 text-xs">
            <div className="font-bold text-slate-800">所得税付加税の「相殺」ルール</div>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              所得税に1%の付加税が課される一方で、東日本大震災の復興特別所得税（2.1%）が1%引き下げられて課税期間が延長されるため、<strong>個人の毎月の所得税額そのものは増えない仕組み</strong>になっています。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};