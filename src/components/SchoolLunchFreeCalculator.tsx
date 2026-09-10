"use client";

import React, { useState } from "react";
import { Utensils, Sparkles } from "lucide-react";

export const SchoolLunchFreeCalculator: React.FC<{ isSimpleMode: boolean }> = ({ isSimpleMode }) => {
  const [elementaryCount, setElementaryCount] = useState<number>(1);
  const [juniorCount, setJuniorCount] = useState<number>(1);

  const elementaryYearly = elementaryCount * 50000;
  const juniorYearly = juniorCount * 55000;
  const totalYearlySavings = elementaryYearly + juniorYearly;
  const totalMonthlySavings = Math.round(totalYearlySavings / 12);

  return (
    <section className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 sm:p-7">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-teal-50 text-teal-700">
              <Utensils className="w-5 h-5" />
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">
              {isSimpleMode ? "給食が無償化されたらいくら浮く？計算機" : "学校給食費無償化 家計支援額シミュレーター"}
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-500">
            {isSimpleMode
              ? "小学生や中学生のお子さんの人数から、1年間で食費がいくら浮くかをチェック！"
              : "公立小中学校の標準給食費に基づく年間・月間の家計負担軽減効果の試算"}
          </p>
        </div>
        <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-bold self-start sm:self-center border border-teal-200">
          <Sparkles className="w-3.5 h-3.5" />
          <span>年5〜6万円/人浮く</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-6 space-y-5 bg-slate-50/70 p-4 sm:p-5 rounded-2xl border border-slate-200/60">
          <div>
            <label className="text-xs sm:text-sm font-bold text-slate-700 block mb-2">公立小学校に通う子どもの人数</label>
            <div className="flex items-center gap-2">
              {[0, 1, 2, 3].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setElementaryCount(num)}
                  className={`flex-1 py-2 rounded-xl border text-xs font-bold transition-all ${elementaryCount === num ? "bg-teal-600 text-white border-teal-600 shadow-xs" : "bg-white text-slate-700 border-slate-200"}`}
                >
                  {num}人
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs sm:text-sm font-bold text-slate-700 block mb-2">公立中学校に通う子どもの人数</label>
            <div className="flex items-center gap-2">
              {[0, 1, 2, 3].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setJuniorCount(num)}
                  className={`flex-1 py-2 rounded-xl border text-xs font-bold transition-all ${juniorCount === num ? "bg-teal-600 text-white border-teal-600 shadow-xs" : "bg-white text-slate-700 border-slate-200"}`}
                >
                  {num}人
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 space-y-4">
          <div className="bg-gradient-to-br from-teal-600 to-emerald-700 text-white rounded-2xl p-5 sm:p-6 shadow-md">
            <div className="flex items-center justify-between text-xs font-bold text-teal-100 mb-1">
              <span>給食無償化による年間の家計節約額</span>
              <span className="bg-white/20 px-2 py-0.5 rounded-full text-[10px]">直接軽減</span>
            </div>
            <div className="flex items-baseline gap-1 my-2">
              <span className="text-3xl sm:text-4xl font-black tracking-tight">{totalYearlySavings.toLocaleString()}</span>
              <span className="text-base sm:text-lg font-bold">円 / 年</span>
            </div>
            <p className="text-xs text-teal-100 leading-relaxed">
              月々に換算すると毎月約 <strong>{totalMonthlySavings.toLocaleString()}円</strong> の給食費引き落としがゼロになります。
            </p>
          </div>

          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-2 text-xs">
            <div className="font-bold text-slate-800">全国一律無償化への動き</div>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              現在自治体の約3割で独自無償化されていますが、自治体の財政力による不公平を解消するため、国費による全国一律化の法制化が国会で検討されています。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};