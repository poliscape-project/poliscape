"use client";

import React, { useState } from "react";
import { Calculator, AlertCircle, CheckCircle, Wallet } from "lucide-react";

export const FixedTaxCutChecker: React.FC<{ isSimpleMode: boolean }> = ({ isSimpleMode }) => {
  const [hasSpouse, setHasSpouse] = useState<boolean>(true);
  const [dependentsCount, setDependentsCount] = useState<number>(1);
  const [incomeType, setIncomeType] = useState<"standard" | "low" | "none">("standard");

  const totalPersons = 1 + (hasSpouse ? 1 : 0) + dependentsCount;
  const incomeTaxCut = totalPersons * 30000;
  const residentTaxCut = totalPersons * 10000;
  const totalTaxCut = incomeTaxCut + residentTaxCut;

  return (
    <section className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 sm:p-7">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-teal-50 text-teal-700">
              <Calculator className="w-5 h-5" />
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">
              {isSimpleMode ? "定額減税でいくら戻る？給付金チェッカー" : "定額減税（4万円/人）＆調整給付金チェッカー"}
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-500">
            {isSimpleMode
              ? "家族の人数を選んで、いくら税金が引かれて手取りが増えるかチェック！"
              : "本人・配偶者・扶養親族1人につき4万円（所得税3万＋住民税1万）の減税額試算"}
          </p>
        </div>
        <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold self-start sm:self-center">
          <span>2024年6月施行済み制度</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-6 space-y-5 bg-slate-50/70 p-4 sm:p-5 rounded-2xl border border-slate-200/60">
          <div>
            <label className="text-xs sm:text-sm font-bold text-slate-700 block mb-2">同一生計配偶者（所得48万円以下）</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setHasSpouse(true)}
                className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all ${hasSpouse ? "bg-teal-600 text-white border-teal-600 shadow-xs" : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"}`}
              >
                あり（扶養配偶者）
              </button>
              <button
                type="button"
                onClick={() => setHasSpouse(false)}
                className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all ${!hasSpouse ? "bg-teal-600 text-white border-teal-600 shadow-xs" : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"}`}
              >
                なし（単身・共働き等）
              </button>
            </div>
          </div>

          <div>
            <label className="text-xs sm:text-sm font-bold text-slate-700 block mb-2">扶養親族の人数（16歳未満の子ども含む）</label>
            <div className="flex items-center gap-3">
              {[0, 1, 2, 3, 4].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setDependentsCount(num)}
                  className={`flex-1 py-2 rounded-xl border text-xs font-bold transition-all ${dependentsCount === num ? "bg-teal-600 text-white border-teal-600 shadow-xs" : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"}`}
                >
                  {num}人
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs sm:text-sm font-bold text-slate-700 block mb-2">世帯の所得状況</label>
            <div className="space-y-2 text-xs">
              <label className={`flex items-start gap-2.5 p-3 rounded-xl border cursor-pointer transition-all ${incomeType === "standard" ? "bg-teal-50/60 border-teal-500 text-slate-900" : "bg-white border-slate-200 text-slate-600"}`}>
                <input type="radio" name="incomeType" checked={incomeType === "standard"} onChange={() => setIncomeType("standard")} className="mt-0.5 accent-teal-600" />
                <div>
                  <div className="font-bold">通常の給与・所得がある（満額を税金から減税）</div>
                  <div className="text-[11px] text-slate-500">毎月の給料やボーナスから引かれる税金が自動的に安くなる</div>
                </div>
              </label>
              <label className={`flex items-start gap-2.5 p-3 rounded-xl border cursor-pointer transition-all ${incomeType === "low" ? "bg-teal-50/60 border-teal-500 text-slate-900" : "bg-white border-slate-200 text-slate-600"}`}>
                <input type="radio" name="incomeType" checked={incomeType === "low"} onChange={() => setIncomeType("low")} className="mt-0.5 accent-teal-600" />
                <div>
                  <div className="font-bold">税金の額が少なく、減税枠が余る（調整給付の対象）</div>
                  <div className="text-[11px] text-slate-500">減税しきれない差額が自治体から現金で支給される</div>
                </div>
              </label>
              <label className={`flex items-start gap-2.5 p-3 rounded-xl border cursor-pointer transition-all ${incomeType === "none" ? "bg-amber-50/60 border-amber-500 text-slate-900" : "bg-white border-slate-200 text-slate-600"}`}>
                <input type="radio" name="incomeType" checked={incomeType === "none"} onChange={() => setIncomeType("none")} className="mt-0.5 accent-amber-600" />
                <div>
                  <div className="font-bold">住民税非課税世帯等（定額減税ではなく給付金）</div>
                  <div className="text-[11px] text-slate-500">税金を払っていないため、別途1世帯あたり7〜10万円の支援給付対象</div>
                </div>
              </label>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 space-y-4">
          {incomeType === "none" ? (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 space-y-3">
              <div className="flex items-center gap-2 text-amber-900 font-bold text-base">
                <AlertCircle className="w-5 h-5 text-amber-600" />
                住民税非課税世帯等の給付金枠
              </div>
              <p className="text-xs text-amber-800 leading-relaxed">
                定額減税は納める税金を直接差し引く仕組みのため、住民税非課税世帯は対象外となり、別途1世帯あたり7万円または10万円の給付金措置が実施されました。
              </p>
            </div>
          ) : (
            <>
              <div className="bg-gradient-to-br from-teal-600 to-emerald-700 text-white rounded-2xl p-5 sm:p-6 shadow-md">
                <div className="flex items-center justify-between gap-1 text-xs font-bold text-teal-100 mb-1">
                  <span>世帯あたりの減税総額（対象 {totalPersons}名）</span>
                  <span className="bg-white/20 px-2 py-0.5 rounded-full text-[10px]">1人あたり4万円</span>
                </div>
                <div className="flex items-baseline gap-1 my-2">
                  <span className="text-3xl sm:text-4xl font-black tracking-tight">{totalTaxCut.toLocaleString()}</span>
                  <span className="text-base sm:text-lg font-bold">円の負担軽減</span>
                </div>
                <p className="text-xs text-teal-100 leading-relaxed">
                  本人（1人）＋ 対象家族（{totalPersons - 1}人）の合計で、手取りが最大 <strong>{totalTaxCut.toLocaleString()}円</strong> 増加します。
                </p>
              </div>

              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 space-y-3">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">減税の内訳</div>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                    <div className="text-slate-500 font-medium mb-1">所得税の減税（国税）</div>
                    <div className="text-lg font-black text-slate-900">{incomeTaxCut.toLocaleString()} 円</div>
                    <div className="text-[10px] text-slate-400 mt-1">3万円 × {totalPersons}人</div>
                  </div>
                  <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                    <div className="text-slate-500 font-medium mb-1">住民税の減税（地方税）</div>
                    <div className="text-lg font-black text-slate-900">{residentTaxCut.toLocaleString()} 円</div>
                    <div className="text-[10px] text-slate-400 mt-1">1万円 × {totalPersons}人</div>
                  </div>
                </div>
                {incomeType === "low" && (
                  <div className="mt-3 p-3 bg-teal-50 border border-teal-200 rounded-xl text-xs space-y-1">
                    <div className="font-bold text-teal-900 flex items-center gap-1.5">
                      <Wallet className="w-4 h-4 text-teal-600" />
                      減税しきれない分は「調整給付金」として振込
                    </div>
                    <p className="text-slate-600 text-[11px] leading-relaxed">
                      税金から引ききれなかった端数は1万円単位で切り上げて自治体から給付金として振込支給されます。
                    </p>
                  </div>
                )}
              </div>
            </>
          )}

          <div className="p-3.5 rounded-xl bg-slate-100/90 border border-slate-200 text-slate-700 text-xs flex items-start gap-2.5">
            <CheckCircle className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <strong>給与明細での確認：</strong> 給与明細の「定額減税額（所得税）」欄に減税額が記載されます。
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};