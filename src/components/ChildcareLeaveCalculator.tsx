"use client";

import React, { useState, useId } from "react";
import { Baby, Sparkles, CheckCircle2 } from "lucide-react";

export const ChildcareLeaveCalculator: React.FC<{ isSimpleMode: boolean }> = ({ isSimpleMode }) => {
  const salarySliderId = useId();
  const [monthlySalary, setMonthlySalary] = useState<number>(30);
  const [isNewTenTenths, setIsNewTenTenths] = useState<boolean>(true);

  const normalBenefit = Math.round(monthlySalary * 10000 * 0.67);
  const newBenefit = Math.round(monthlySalary * 10000 * 0.80);
  const normalTakeHome = Math.round(monthlySalary * 10000 * 0.80);
  const actualTakeHome = isNewTenTenths ? newBenefit : normalBenefit;

  return (
    <section className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 sm:p-7">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-teal-50 text-teal-700">
              <Baby className="w-5 h-5" />
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">
              {isSimpleMode ? "育休手当で手取り10割？計算機" : "育児休業給付金「手取り10割化」試算シミュレーター"}
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-500">
            {isSimpleMode
              ? "普段の月給を入れて、育休を取ったときにいくらもらえて手取りが減らないかチェック！"
              : "出生後休業支援給付（最大28日間）による給付率80%引き上げ＋社会保険料免除での実質100%手取り試算"}
          </p>
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-50 text-teal-800 text-xs font-bold self-start sm:self-center border border-teal-200/60">
          <Sparkles className="w-3.5 h-3.5" />
          <span>2025年4月〜「出生後休業支援給付」</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-6 space-y-5 bg-slate-50/70 p-4 sm:p-5 rounded-2xl border border-slate-200/60">
          <div>
            <div className="flex justify-between items-center mb-2">
              <label htmlFor={salarySliderId} className="text-xs sm:text-sm font-bold text-slate-700">休業前の額面月給（基本給＋各種手当）</label>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-black text-teal-700">{monthlySalary}</span>
                <span className="text-xs font-bold text-slate-600">万円/月</span>
              </div>
            </div>
            <input
              id={salarySliderId}
              type="range"
              min={20}
              max={50}
              step={2}
              value={monthlySalary}
              onChange={(e) => setMonthlySalary(Number(e.target.value))}
              className="w-full accent-teal-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>20万</span>
              <span>30万(平均水準)</span>
              <span>40万</span>
              <span>50万(上限目安)</span>
            </div>
          </div>

          <div>
            <label className="text-xs sm:text-sm font-bold text-slate-700 block mb-2">利用する育休制度のタイプ</label>
            <div className="space-y-2 text-xs">
              <label className={`flex items-start gap-2.5 p-3 rounded-xl border cursor-pointer transition-all ${isNewTenTenths ? "bg-teal-50/60 border-teal-500 text-slate-900" : "bg-white border-slate-200 text-slate-600"}`}
              >
                <input type="radio" name="leaveType" checked={isNewTenTenths} onChange={() => setIsNewTenTenths(true)} className="mt-0.5 accent-teal-600" />
                <div>
                  <div className="font-bold flex items-center gap-1 text-teal-900">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" /> 新制度：手取り10割（出生後休業支援給付・最大28日間）
                  </div>
                  <div className="text-[11px] text-slate-500">父母ともに育休取得で、給付率が額面の80%へ引き上げ</div>
                </div>
              </label>
              <label className={`flex items-start gap-2.5 p-3 rounded-xl border cursor-pointer transition-all ${!isNewTenTenths ? "bg-teal-50/60 border-teal-500 text-slate-900" : "bg-white border-slate-200 text-slate-600"}`}
              >
                <input type="radio" name="leaveType" checked={!isNewTenTenths} onChange={() => setIsNewTenTenths(false)} className="mt-0.5 accent-teal-600" />
                <div>
                  <div className="font-bold">従来の育休給付金（給付率67%・手取り約8割）</div>
                  <div className="text-[11px] text-slate-500">28日以降、または片親のみ育休取得の場合の標準給付</div>
                </div>
              </label>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 space-y-4">
          <div className="bg-gradient-to-br from-teal-600 to-emerald-700 text-white rounded-2xl p-5 sm:p-6 shadow-md">
            <div className="flex items-center justify-between text-xs font-bold text-teal-100 mb-1">
              <span>育休中の手取り支給額（非課税）</span>
              <span className="bg-white/20 px-2 py-0.5 rounded-full text-[10px] font-bold">
                {isNewTenTenths ? "実質手取り 100%" : "実質手取り 約80%"}
              </span>
            </div>
            <div className="flex items-baseline gap-1 my-2">
              <span className="text-3xl sm:text-4xl font-black tracking-tight">{actualTakeHome.toLocaleString()}</span>
              <span className="text-base sm:text-lg font-bold">円 / 月</span>
            </div>
            <p className="text-xs text-teal-100 leading-relaxed">
              {isNewTenTenths
                ? `普段の給料手取り（約${normalTakeHome.toLocaleString()}円）とほぼ同額が口座に振り込まれます！`
                : `従来の制度でも社会保険料免除があるため、普段の手取りの約8割が確保されます。`}
            </p>
          </div>

          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 space-y-3 text-xs">
            <div className="font-bold text-slate-800">なぜ給付率80%で「手取り10割」になるの？</div>
            <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-1.5 text-[11px] text-slate-600 leading-relaxed">
              <div className="flex items-center gap-1.5 font-bold text-slate-900">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" /> 社会保険料が全額免除（健康保険・厚生年金）
              </div>
              <div className="flex items-center gap-1.5 font-bold text-slate-900">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" /> 育児休業給付金は「非課税」（所得税・住民税ゼロ）
              </div>
              <p className="pt-1 text-slate-500">
                ※通常の給料からは税金・保険料で約20%引かれますが、育休給付金からは引かれないため、額面の80%給付で「手取り100%」が実現します。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};