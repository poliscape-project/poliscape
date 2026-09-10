"use client";

import React, { useState, useId } from "react";
import { PiggyBank, Sparkles } from "lucide-react";

export const IdecoTaxSimulator: React.FC<{ isSimpleMode: boolean }> = ({ isSimpleMode }) => {
  const contributionSliderId = useId();
  const incomeSliderId = useId();
  const yearsSliderId = useId();

  const [monthlyContribution, setMonthlyContribution] = useState<number>(20000);
  const [annualIncome, setAnnualIncome] = useState<number>(500);
  const [years, setYears] = useState<number>(20);

  let taxRate = 0.20;
  if (annualIncome >= 700) taxRate = 0.30;
  if (annualIncome >= 1000) taxRate = 0.33;

  const yearlyContribution = monthlyContribution * 12;
  const yearlyTaxSavings = Math.round(yearlyContribution * taxRate);
  const totalTaxSavings = yearlyTaxSavings * years;

  const months = years * 12;
  const r = 0.03 / 12;
  const futureValue = monthlyContribution * ((Math.pow(1 + r, months) - 1) / r);

  return (
    <section className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 sm:p-7">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-teal-50 text-teal-700">
              <PiggyBank className="w-5 h-5" />
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">
              {isSimpleMode ? "iDeCoで税金がいくら安くなる？計算機" : "iDeCo（個人型確定拠出年金）節税＆将来資産試算"}
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-500">
            {isSimpleMode
              ? "毎月の掛金と年収から、毎年の税金がいくら安くなって将来いくら貯まるかを試算！"
              : "掛金全額所得控除による所得税・住民税の節税効果と長期複利運用シミュレーション"}
          </p>
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-50 text-teal-800 text-xs font-bold self-start sm:self-center border border-teal-200/60">
          <Sparkles className="w-3.5 h-3.5" />
          <span>全額が所得控除（非課税）</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-6 space-y-5 bg-slate-50/70 p-4 sm:p-5 rounded-2xl border border-slate-200/60">
          <div>
            <div className="flex justify-between items-center mb-2">
              <label htmlFor={contributionSliderId} className="text-xs sm:text-sm font-bold text-slate-700">毎月の積立額（掛金）</label>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-black text-teal-700">{monthlyContribution.toLocaleString()}</span>
                <span className="text-xs font-bold text-slate-600">円/月</span>
              </div>
            </div>
            <input
              id={contributionSliderId}
              type="range"
              min={5000}
              max={68000}
              step={1000}
              value={monthlyContribution}
              onChange={(e) => setMonthlyContribution(Number(e.target.value))}
              className="w-full accent-teal-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>5千円</span>
              <span>2万円(会社員目安)</span>
              <span>6.8万円(自営業上限)</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label htmlFor={incomeSliderId} className="text-xs sm:text-sm font-bold text-slate-700">給与年収（額面）</label>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-black text-teal-700">{annualIncome}</span>
                <span className="text-xs font-bold text-slate-600">万円</span>
              </div>
            </div>
            <input
              id={incomeSliderId}
              type="range"
              min={300}
              max={1200}
              step={50}
              value={annualIncome}
              onChange={(e) => setAnnualIncome(Number(e.target.value))}
              className="w-full accent-teal-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label htmlFor={yearsSliderId} className="text-xs sm:text-sm font-bold text-slate-700">積立年数（〜70歳まで）</label>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-black text-teal-700">{years}</span>
                <span className="text-xs font-bold text-slate-600">年間</span>
              </div>
            </div>
            <input
              id={yearsSliderId}
              type="range"
              min={5}
              max={35}
              step={1}
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="w-full accent-teal-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
            />
          </div>
        </div>

        <div className="lg:col-span-6 space-y-4">
          <div className="bg-gradient-to-br from-teal-600 to-emerald-700 text-white rounded-2xl p-5 sm:p-6 shadow-md">
            <div className="flex items-center justify-between text-xs font-bold text-teal-100 mb-1">
              <span>毎年の税金が安くなる金額（節税メリット）</span>
              <span className="bg-white/20 px-2 py-0.5 rounded-full text-[10px]">所得控除</span>
            </div>
            <div className="flex items-baseline gap-1 my-2">
              <span className="text-3xl sm:text-4xl font-black tracking-tight">{yearlyTaxSavings.toLocaleString()}</span>
              <span className="text-base sm:text-lg font-bold">円 / 年の節税</span>
            </div>
            <p className="text-xs text-teal-100 leading-relaxed">
              {years}年間の累計節税額は約 <strong>{totalTaxSavings.toLocaleString()}円</strong> に達します！新NISAにはない強力なメリットです。
            </p>
          </div>

          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-2 text-xs">
            <div className="font-bold text-slate-800">{years}年後の資産見込み額（年利3%想定）</div>
            <div className="flex justify-between items-baseline pt-1">
              <span className="text-slate-600">積立元本＋運用益:</span>
              <span className="font-black text-teal-700 text-base">約 {Math.round(futureValue / 10000).toLocaleString()} 万円</span>
            </div>
            <p className="text-slate-500 text-[11px]">
              ※原則60歳まで途中解約・引き出しができない「資金ロック」ルールがある点にご留意ください。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};