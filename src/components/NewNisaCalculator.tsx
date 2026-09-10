"use client";

import React, { useState, useId } from "react";
import { PiggyBank, TrendingUp, ShieldAlert, Sparkles } from "lucide-react";

export const NewNisaCalculator: React.FC<{ isSimpleMode: boolean }> = ({ isSimpleMode }) => {
  const monthlyInputId = useId();
  const yearsInputId = useId();
  const rateInputId = useId();

  const [monthlyAmount, setMonthlyAmount] = useState<number>(30000);
  const [years, setYears] = useState<number>(15);
  const [annualRate, setAnnualRate] = useState<number>(5);

  const months = years * 12;
  const monthlyRate = annualRate / 100 / 12;
  const totalInvestment = monthlyAmount * months;
  const futureValue = monthlyRate === 0
    ? totalInvestment
    : monthlyAmount * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
  const gain = Math.max(0, futureValue - totalInvestment);
  const taxBenefit = Math.round(gain * 0.20315);
  const LIFETIME_LIMIT = 18000000;
  const usedRatio = Math.min(100, (totalInvestment / LIFETIME_LIMIT) * 100);

  return (
    <section className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 sm:p-7">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-teal-50 text-teal-700">
              <PiggyBank className="w-5 h-5" />
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">
              {isSimpleMode ? "新NISAで税金がどれだけ浮く？計算機" : "新NISA 資産形成＆非課税メリット試算"}
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-500">
            {isSimpleMode
              ? "毎月の貯金・積立額と利回りを動かして、将来いくらになって税金がどれだけタダになるか見てみよう！"
              : "無期限化された生涯非課税枠（1,800万円）における複利運用シミュレーションと節税効果（20.315%相当）の試算"}
          </p>
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-50 text-teal-800 text-xs font-bold self-start sm:self-center border border-teal-200/60">
          <Sparkles className="w-3.5 h-3.5" />
          <span>生涯投資枠 1,800万円（無期限・簿価管理）</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-6 space-y-5 bg-slate-50/70 p-4 sm:p-5 rounded-2xl border border-slate-200/60">
          <div>
            <div className="flex justify-between items-center mb-2">
              <label htmlFor={monthlyInputId} className="text-xs sm:text-sm font-bold text-slate-700">毎月の積立金額</label>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-black text-teal-700">{monthlyAmount.toLocaleString()}</span>
                <span className="text-xs font-bold text-slate-600">円/月</span>
              </div>
            </div>
            <input
              id={monthlyInputId}
              type="range"
              min={5000}
              max={100000}
              step={5000}
              value={monthlyAmount}
              onChange={(e) => setMonthlyAmount(Number(e.target.value))}
              className="w-full accent-teal-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>5千円</span>
              <span>3万円</span>
              <span>5万円</span>
              <span>10万円（つみたて上限目安）</span>
            </div>
            <div className="flex gap-2 mt-2">
              {[10000, 30000, 50000, 100000].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setMonthlyAmount(amt)}
                  className={`text-[11px] px-2.5 py-1 rounded-lg border font-semibold transition-all ${monthlyAmount === amt ? "bg-teal-600 text-white border-teal-600" : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"}`}
                >
                  {amt / 10000}万円
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label htmlFor={yearsInputId} className="text-xs sm:text-sm font-bold text-slate-700">積立年数</label>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-black text-teal-700">{years}</span>
                <span className="text-xs font-bold text-slate-600">年間</span>
              </div>
            </div>
            <input
              id={yearsInputId}
              type="range"
              min={1}
              max={30}
              step={1}
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="w-full accent-teal-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>1年</span>
              <span>10年</span>
              <span>20年</span>
              <span>30年</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label htmlFor={rateInputId} className="text-xs sm:text-sm font-bold text-slate-700">想定年利回り（年利）</label>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-black text-teal-700">{annualRate}</span>
                <span className="text-xs font-bold text-slate-600">%</span>
              </div>
            </div>
            <input
              id={rateInputId}
              type="range"
              min={1}
              max={10}
              step={0.5}
              value={annualRate}
              onChange={(e) => setAnnualRate(Number(e.target.value))}
              className="w-full accent-teal-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>1% (手堅め)</span>
              <span>3% (バランス)</span>
              <span>5% (世界株式目安)</span>
              <span>10% (積極的)</span>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-200/80">
            <div className="flex justify-between text-xs font-bold mb-1">
              <span className="text-slate-600">生涯非課税枠（1,800万円）の使用状況</span>
              <span className="text-teal-700">
                {(totalInvestment / 10000).toLocaleString()}万円 / 1,800万円 ({usedRatio.toFixed(1)}%)
              </span>
            </div>
            <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${usedRatio >= 100 ? "bg-rose-500" : "bg-teal-600"}`}
                style={{ width: `${usedRatio}%` }}
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 space-y-4">
          <div className="bg-gradient-to-br from-teal-500 to-emerald-600 text-white rounded-2xl p-5 sm:p-6 shadow-md">
            <div className="flex items-center gap-1.5 text-xs font-bold text-teal-100 mb-1">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>{isSimpleMode ? "新NISAで浮く税金（おトク額）" : "新NISAによる非課税メリット額（20.315%）"}</span>
            </div>
            <div className="flex items-baseline gap-1 my-2">
              <span className="text-3xl sm:text-4xl font-black tracking-tight">
                約 {(taxBenefit / 10000).toLocaleString(undefined, { maximumFractionDigits: 1 })}
              </span>
              <span className="text-base sm:text-lg font-bold">万円の節税</span>
            </div>
            <p className="text-xs text-teal-50/90 leading-relaxed">
              通常の投資口座では運用益から約20%引かれますが、新NISAならこの利益分がまるまる手元に残ります！
            </p>
          </div>

          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 space-y-3">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {years}年後の資産見込み額（複利運用）
            </div>
            <div className="flex items-baseline justify-between pb-3 border-b border-slate-200">
              <span className="text-xs sm:text-sm font-bold text-slate-700">将来の評価額合計</span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl sm:text-3xl font-black text-slate-900">
                  {Math.round(futureValue / 10000).toLocaleString()}
                </span>
                <span className="text-xs font-bold text-slate-600">万円</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-white p-3 rounded-xl border border-slate-200/60">
                <div className="text-slate-500 mb-1">積み立てた元本</div>
                <div className="text-base font-bold text-slate-800">
                  {(totalInvestment / 10000).toLocaleString()}
                  <span className="text-xs font-normal ml-0.5">万円</span>
                </div>
              </div>
              <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200/60">
                <div className="text-emerald-700 font-bold mb-1 flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  運用による利益
                </div>
                <div className="text-base font-bold text-emerald-800">
                  +{Math.round(gain / 10000).toLocaleString()}
                  <span className="text-xs font-normal ml-0.5">万円</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200/70 text-amber-900 text-xs flex items-start gap-2.5">
            <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <strong>公平な留意事項：</strong> 試算の運用利回りは保証されたものではなく、元本割れのリスクがあります。また損益通算や繰越控除ができない点にも留意が必要です。
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};