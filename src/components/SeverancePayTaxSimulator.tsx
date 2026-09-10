"use client";

import React, { useState, useId } from "react";
import { Briefcase, TrendingDown, Scale } from "lucide-react";

export const SeverancePayTaxSimulator: React.FC<{ isSimpleMode: boolean }> = ({ isSimpleMode }) => {
  const yearsSliderId = useId();
  const amountSliderId = useId();

  const [workYears, setWorkYears] = useState<number>(30); // 勤続30年
  const [severanceAmount, setSeveranceAmount] = useState<number>(2000); // 2,000万円

  // 現行制度の退職所得控除
  // 20年以下: 40万 * 年数
  // 20年超: 800万 + 70万 * (年数 - 20)
  let currentDeduction = 0;
  if (workYears <= 20) {
    currentDeduction = workYears * 40;
  } else {
    currentDeduction = 800 + (workYears - 20) * 70;
  }

  // 見直し案（勤続年数に関わらず一律40万円/年）
  const proposedDeduction = workYears * 40;

  // 課税対象額（(退職金 - 控除) * 1/2）
  const currentTaxable = Math.max(0, (severanceAmount - currentDeduction) * 0.5);
  const proposedTaxable = Math.max(0, (severanceAmount - proposedDeduction) * 0.5);

  // 概算税額（所得税＋住民税 約20%換算）
  const currentTax = Math.round(currentTaxable * 0.20 * 10000);
  const proposedTax = Math.round(proposedTaxable * 0.20 * 10000);
  const taxIncrease = proposedTax - currentTax;

  return (
    <section className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 sm:p-7">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-teal-50 text-teal-700">
              <Briefcase className="w-5 h-5" />
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">
              {isSimpleMode ? "退職金の税金はどう変わる？試算機" : "退職金課税（勤続20年超優遇見直し）シミュレーター"}
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-500">
            {isSimpleMode
              ? "勤続年数と退職金の額を入れて、いまの税金と見直し案での増税額を比較！"
              : "現行の退職所得控除（20年超年70万）vs 一律40万平準化案での手取り変化試算"}
          </p>
        </div>
        <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold self-start sm:self-center border border-amber-200">
          <span>税制改正議論中</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-6 space-y-5 bg-slate-50/70 p-4 sm:p-5 rounded-2xl border border-slate-200/60">
          <div>
            <div className="flex justify-between items-center mb-2">
              <label htmlFor={yearsSliderId} className="text-xs sm:text-sm font-bold text-slate-700">同じ会社での勤続年数</label>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-black text-teal-700">{workYears}</span>
                <span className="text-xs font-bold text-slate-600">年間</span>
              </div>
            </div>
            <input
              id={yearsSliderId}
              type="range"
              min={10}
              max={40}
              step={1}
              value={workYears}
              onChange={(e) => setWorkYears(Number(e.target.value))}
              className="w-full accent-teal-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>10年</span>
              <span className="font-bold text-amber-700">20年（優遇の壁）</span>
              <span>30年</span>
              <span>40年</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label htmlFor={amountSliderId} className="text-xs sm:text-sm font-bold text-slate-700">退職金の総額（額面）</label>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-black text-teal-700">{severanceAmount}</span>
                <span className="text-xs font-bold text-slate-600">万円</span>
              </div>
            </div>
            <input
              id={amountSliderId}
              type="range"
              min={500}
              max={3500}
              step={100}
              value={severanceAmount}
              onChange={(e) => setSeveranceAmount(Number(e.target.value))}
              className="w-full accent-teal-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>500万</span>
              <span>1,500万</span>
              <span>2,000万(大企業平均)</span>
              <span>3,500万</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 space-y-4">
          <div className="bg-gradient-to-br from-teal-600 to-emerald-700 text-white rounded-2xl p-5 sm:p-6 shadow-md">
            <div className="flex items-center justify-between text-xs font-bold text-teal-100 mb-1">
              <span>現行制度での退職所得控除額</span>
              <span className="bg-white/20 px-2 py-0.5 rounded-full text-[10px]">{workYears > 20 ? "手厚い長期優遇" : "標準控除"}</span>
            </div>
            <div className="flex items-baseline gap-1 my-2">
              <span className="text-3xl sm:text-4xl font-black tracking-tight">{currentDeduction}</span>
              <span className="text-base sm:text-lg font-bold">万円まで非課税</span>
            </div>
            <p className="text-xs text-teal-100 leading-relaxed">
              現行では退職金{severanceAmount}万円のうち、税金がかかるのは差額をさらに半分にした<strong>{currentTaxable}万円分</strong>のみです。
            </p>
          </div>

          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-2 text-xs">
            <div className="font-bold text-slate-800">見直し案（一律40万円案）との差額</div>
            {workYears > 20 ? (
              <div className="space-y-1.5 text-[11px] text-slate-600">
                <div className="flex justify-between text-rose-700 font-bold">
                  <span>控除枠の縮小:</span>
                  <span>-{currentDeduction - proposedDeduction} 万円</span>
                </div>
                <div className="flex justify-between text-slate-800 font-bold">
                  <span>税負担の増加（試算）:</span>
                  <span>約 +{taxIncrease.toLocaleString()} 円</span>
                </div>
                <p className="text-slate-500 pt-1">
                  ※定年間近の世代には激変緩和措置（経過措置）を設ける方針で国会審議が進められています。
                </p>
              </div>
            ) : (
              <p className="text-slate-600 text-[11px]">
                勤続20年以内の場合は、見直し案でも控除額は変わらないため税負担の影響はありません。
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};