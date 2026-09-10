"use client";

import React, { useState, useId } from "react";
import { ShieldAlert, Users, TrendingUp, Sparkles } from "lucide-react";

export const ChildcareSupportFundCalculator: React.FC<{ isSimpleMode: boolean }> = ({ isSimpleMode }) => {
  const incomeSliderId = useId();
  const [annualIncome, setAnnualIncome] = useState<number>(500);
  const [insuranceType, setInsuranceType] = useState<"kenpo" | "union" | "kyosai" | "kokuho">("kenpo");

  // こども家庭庁試算に基づく年収別・保険別の月額支援金額（満額拠出時目安）
  let monthlyFund = 0;
  if (insuranceType === "kokuho") {
    // 国民健康保険（1世帯あたり）
    monthlyFund = Math.round((annualIncome * 10000 * 0.0016) / 12);
  } else {
    // 被用者保険（本人負担分: 労使折半後）
    // 年収400万で約650円、600万で約1000円目安（所得の約0.2%程度）
    monthlyFund = Math.round((annualIncome * 10000 * 0.002) / 12);
  }
  if (monthlyFund < 250) monthlyFund = 250;
  if (monthlyFund > 1800) monthlyFund = 1800;

  const yearlyFund = monthlyFund * 12;
  const employerShare = insuranceType === "kokuho" ? 0 : yearlyFund;
  const totalContributed = yearlyFund + employerShare;

  return (
    <section className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 sm:p-7">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-teal-50 text-teal-700">
              <Users className="w-5 h-5" />
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">
              {isSimpleMode ? "支援金で保険料はいくら増える？計算機" : "子ども・子育て支援金（社会保険料上乗せ）試算"}
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-500">
            {isSimpleMode
              ? "あなたの年収から、健康保険料に上乗せされて毎月いくら引かれるかをチェック！"
              : "こども家庭庁の公表試算に基づく医療保険上乗せ拠出額の年収別シミュレーション"}
          </p>
        </div>
        <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold self-start sm:self-center">
          <span>2026年度〜本格徴収</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-6 space-y-5 bg-slate-50/70 p-4 sm:p-5 rounded-2xl border border-slate-200/60">
          <div>
            <div className="flex justify-between items-center mb-2">
              <label htmlFor={incomeSliderId} className="text-xs sm:text-sm font-bold text-slate-700">額面年収（給与・所得）</label>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-black text-teal-700">{annualIncome}</span>
                <span className="text-xs font-bold text-slate-600">万円</span>
              </div>
            </div>
            <input
              id={incomeSliderId}
              type="range"
              min={200}
              max={1200}
              step={50}
              value={annualIncome}
              onChange={(e) => setAnnualIncome(Number(e.target.value))}
              className="w-full accent-teal-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>200万</span>
              <span>400万</span>
              <span>600万</span>
              <span>1,200万</span>
            </div>
          </div>

          <div>
            <label className="text-xs sm:text-sm font-bold text-slate-700 block mb-2">加入している健康保険</label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setInsuranceType("kenpo")}
                className={`p-2.5 rounded-xl border font-bold transition-all ${insuranceType === "kenpo" ? "bg-teal-600 text-white border-teal-600 shadow-xs" : "bg-white text-slate-700 border-slate-200"}`}
              >
                協会けんぽ（中小企業）
              </button>
              <button
                type="button"
                onClick={() => setInsuranceType("union")}
                className={`p-2.5 rounded-xl border font-bold transition-all ${insuranceType === "union" ? "bg-teal-600 text-white border-teal-600 shadow-xs" : "bg-white text-slate-700 border-slate-200"}`}
              >
                組合健保（大企業）
              </button>
              <button
                type="button"
                onClick={() => setInsuranceType("kyosai")}
                className={`p-2.5 rounded-xl border font-bold transition-all ${insuranceType === "kyosai" ? "bg-teal-600 text-white border-teal-600 shadow-xs" : "bg-white text-slate-700 border-slate-200"}`}
              >
                共済組合（公務員等）
              </button>
              <button
                type="button"
                onClick={() => setInsuranceType("kokuho")}
                className={`p-2.5 rounded-xl border font-bold transition-all ${insuranceType === "kokuho" ? "bg-teal-600 text-white border-teal-600 shadow-xs" : "bg-white text-slate-700 border-slate-200"}`}
              >
                国民健康保険（自営業等）
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 space-y-4">
          <div className="bg-gradient-to-br from-teal-600 to-emerald-700 text-white rounded-2xl p-5 sm:p-6 shadow-md">
            <div className="flex items-center justify-between text-xs font-bold text-teal-100 mb-1">
              <span>あなたの支援金負担額（毎月の天引き）</span>
              <span className="bg-white/20 px-2 py-0.5 rounded-full text-[10px]">満額導入時目安</span>
            </div>
            <div className="flex items-baseline gap-1 my-2">
              <span className="text-3xl sm:text-4xl font-black tracking-tight">{monthlyFund.toLocaleString()}</span>
              <span className="text-base sm:text-lg font-bold">円 / 月</span>
            </div>
            <p className="text-xs text-teal-100 leading-relaxed">
              年間負担額は約 <strong>{yearlyFund.toLocaleString()}円</strong> となります（給与明細の健康保険料に含まれて天引き）。
            </p>
          </div>

          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-2 text-xs">
            <div className="font-bold text-slate-800">会社負担と社会全体での支援</div>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              会社員の場合、本人と同額（年約{employerShare.toLocaleString()}円）を勤務先企業が折半負担しています。合計で年間約{totalContributed.toLocaleString()}円が児童手当や育休給付拡充の財源に充てられます。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};