"use client";

import React, { useState, useId } from "react";
import { Briefcase, AlertCircle, CheckCircle } from "lucide-react";

export const ZaishokuPensionCalculator: React.FC<{ isSimpleMode: boolean }> = ({ isSimpleMode }) => {
  const salarySliderId = useId();
  const pensionSliderId = useId();

  const [salaryMonthly, setSalaryMonthly] = useState<number>(35);
  const [pensionMonthly, setPensionMonthly] = useState<number>(15);

  const totalMonthly = salaryMonthly + pensionMonthly;
  const LIMIT = 50;

  let cutAmount = 0;
  if (totalMonthly > LIMIT) {
    cutAmount = Math.round((totalMonthly - LIMIT) / 2);
    if (cutAmount > pensionMonthly) cutAmount = pensionMonthly;
  }

  const actualPension = pensionMonthly - cutAmount;
  const totalIncome = salaryMonthly + actualPension;

  return (
    <section className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 sm:p-7">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-teal-50 text-teal-700">
              <Briefcase className="w-5 h-5" />
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">
              {isSimpleMode ? "働くと年金が減る？在職老齢年金シミュレーター" : "在職老齢年金（65歳以上）支給停止額試算"}
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-500">
            {isSimpleMode
              ? "シニアになっても働くときの「給料＋厚生年金」で、年金がカットされるかチェック！"
              : "賃金と厚生年金の合計が月50万円（支給停止基準額）を超えた場合の減額試算"}
          </p>
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold self-start sm:self-center">
          <span>基準額 50万円/月</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-6 space-y-5 bg-slate-50/70 p-4 sm:p-5 rounded-2xl border border-slate-200/60">
          <div>
            <div className="flex justify-between items-center mb-2">
              <label htmlFor={salarySliderId} className="text-xs sm:text-sm font-bold text-slate-700">65歳以降の月収（賞与含む総報酬目安）</label>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-black text-teal-700">{salaryMonthly}</span>
                <span className="text-xs font-bold text-slate-600">万円/月</span>
              </div>
            </div>
            <input
              id={salarySliderId}
              type="range"
              min={10}
              max={70}
              step={5}
              value={salaryMonthly}
              onChange={(e) => setSalaryMonthly(Number(e.target.value))}
              className="w-full accent-teal-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>10万(パート)</span>
              <span>35万(フルタイム)</span>
              <span>70万(役員・高収入)</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label htmlFor={pensionSliderId} className="text-xs sm:text-sm font-bold text-slate-700">本来もらえる厚生年金（月額）</label>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-black text-slate-800">{pensionMonthly}</span>
                <span className="text-xs font-bold text-slate-600">万円/月</span>
              </div>
            </div>
            <input
              id={pensionSliderId}
              type="range"
              min={5}
              max={25}
              step={1}
              value={pensionMonthly}
              onChange={(e) => setPensionMonthly(Number(e.target.value))}
              className="w-full accent-slate-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>5万</span>
              <span>15万(平均的会社員)</span>
              <span>25万</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-2">
              ※基礎年金（国民年金）部分はカットされず全額支給されます。
            </p>
          </div>
        </div>

        <div className="lg:col-span-6 space-y-4">
          <div className="bg-gradient-to-br from-teal-600 to-emerald-700 text-white rounded-2xl p-5 sm:p-6 shadow-md">
            <div className="flex items-center justify-between text-xs font-bold text-teal-100 mb-1">
              <span>給与＋年金の手取り合計</span>
              <span className="bg-white/20 px-2 py-0.5 rounded-full text-[10px]">{cutAmount > 0 ? "一部停止中" : "満額受給"}</span>
            </div>
            <div className="flex items-baseline gap-1 my-2">
              <span className="text-3xl sm:text-4xl font-black tracking-tight">{totalIncome}</span>
              <span className="text-base sm:text-lg font-bold">万円 / 月</span>
            </div>
            <p className="text-xs text-teal-100 leading-relaxed">
              給料（{salaryMonthly}万円）＋ 実際に受け取れる厚生年金（{actualPension}万円）
            </p>
          </div>

          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 space-y-3 text-xs">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">50万円ルールの判定結果</div>
            <div className="flex justify-between items-center bg-white p-3 rounded-xl border border-slate-200">
              <span className="font-semibold text-slate-700">給与＋本来年金の合計額</span>
              <span className="font-black text-slate-900 text-base">{totalMonthly} 万円</span>
            </div>
            {cutAmount > 0 ? (
              <div className="bg-rose-50 border border-rose-200 p-3 rounded-xl space-y-1">
                <div className="font-bold text-rose-800 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4 text-rose-600" /> 年金カット（支給停止額）：毎月 {cutAmount} 万円
                </div>
                <p className="text-rose-700 text-[11px] leading-relaxed">
                  基準額（50万円）を{totalMonthly - LIMIT}万円超過しているため、その半額（{cutAmount}万円）が年金から減額されます。
                </p>
              </div>
            ) : (
              <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl flex items-center gap-2 text-emerald-900 font-bold">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                合計50万円以下のため、年金のカットはゼロ（全額支給）です！
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};