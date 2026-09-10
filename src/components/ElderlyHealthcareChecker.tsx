"use client";

import React, { useState, useId } from "react";
import { HeartPulse } from "lucide-react";

export const ElderlyHealthcareChecker: React.FC<{ isSimpleMode: boolean }> = ({ isSimpleMode }) => {
  const annualCostSliderId = useId();
  const [householdType, setHouseholdType] = useState<"single" | "couple">("single");
  const [incomeRange, setIncomeRange] = useState<"low" | "medium" | "high">("medium");
  const [annualMedicalCost, setAnnualMedicalCost] = useState<number>(30);

  let copayRate = 0.1;
  let copayLabel = "1割負担（一般・低所得世帯）";

  if (incomeRange === "high") {
    copayRate = 0.3;
    copayLabel = "3割負担（現役並み所得者：単身年収約383万円以上）";
  } else if (incomeRange === "medium") {
    copayRate = 0.2;
    copayLabel = "2割負担（一定以上の所得：単身年収200万円以上）";
  }

  const outOfPocket = Math.round(annualMedicalCost * 10000 * copayRate);
  const standardPocket = Math.round(annualMedicalCost * 10000 * 0.1);
  const burdenDiff = outOfPocket - standardPocket;

  return (
    <section className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 sm:p-7">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-teal-50 text-teal-700">
              <HeartPulse className="w-5 h-5" />
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">
              {isSimpleMode ? "75歳以上の病院代は何割負担？チェッカー" : "後期高齢者医療費（1割・2割・3割負担）判定"}
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-500">
            {isSimpleMode
              ? "75歳以上の方の年金や収入から、病院の窓口で払う割合と年間の医療費をシミュレーション！"
              : "後期高齢者医療制度における所得区分判定（単身200万円基準）と窓口負担の試算"}
          </p>
        </div>
        <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold self-start sm:self-center">
          <span>2022年10月施行（2割負担導入）</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-6 space-y-5 bg-slate-50/70 p-4 sm:p-5 rounded-2xl border border-slate-200/60">
          <div>
            <label className="text-xs sm:text-sm font-bold text-slate-700 block mb-2">世帯構成（75歳以上の人数）</label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setHouseholdType("single")}
                className={`p-3 rounded-xl border font-bold transition-all ${householdType === "single" ? "bg-teal-600 text-white border-teal-600 shadow-xs" : "bg-white text-slate-700 border-slate-200 hover:border-slate-300"}`}
              >
                単身世帯（1人のみ）
              </button>
              <button
                type="button"
                onClick={() => setHouseholdType("couple")}
                className={`p-3 rounded-xl border font-bold transition-all ${householdType === "couple" ? "bg-teal-600 text-white border-teal-600 shadow-xs" : "bg-white text-slate-700 border-slate-200 hover:border-slate-300"}`}
              >
                2人以上世帯（夫婦等）
              </button>
            </div>
          </div>

          <div>
            <label className="text-xs sm:text-sm font-bold text-slate-700 block mb-2">年金収入＋その他の所得</label>
            <div className="space-y-2 text-xs">
              <label className={`flex items-start gap-2.5 p-3 rounded-xl border cursor-pointer transition-all ${incomeRange === "low" ? "bg-teal-50/60 border-teal-500 text-slate-900" : "bg-white border-slate-200 text-slate-600"}`}>
                <input type="radio" name="incomeRange" checked={incomeRange === "low"} onChange={() => setIncomeRange("low")} className="mt-0.5 accent-teal-600" />
                <div>
                  <div className="font-bold">年収200万円未満（複数世帯は320万円未満）</div>
                  <div className="text-[11px] text-slate-500">【1割負担】一般・低所得層</div>
                </div>
              </label>
              <label className={`flex items-start gap-2.5 p-3 rounded-xl border cursor-pointer transition-all ${incomeRange === "medium" ? "bg-teal-50/60 border-teal-500 text-slate-900" : "bg-white border-slate-200 text-slate-600"}`}>
                <input type="radio" name="incomeRange" checked={incomeRange === "medium"} onChange={() => setIncomeRange("medium")} className="mt-0.5 accent-teal-600" />
                <div>
                  <div className="font-bold">年収200万円〜383万円未満（複数世帯320万〜520万未満）</div>
                  <div className="text-[11px] text-slate-500">【2割負担】一定以上の所得がある高齢者</div>
                </div>
              </label>
              <label className={`flex items-start gap-2.5 p-3 rounded-xl border cursor-pointer transition-all ${incomeRange === "high" ? "bg-teal-50/60 border-teal-500 text-slate-900" : "bg-white border-slate-200 text-slate-600"}`}>
                <input type="radio" name="incomeRange" checked={incomeRange === "high"} onChange={() => setIncomeRange("high")} className="mt-0.5 accent-teal-600" />
                <div>
                  <div className="font-bold">年収383万円以上（現役並み所得）</div>
                  <div className="text-[11px] text-slate-500">【3割負担】現役世代と同じ負担割合</div>
                </div>
              </label>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label htmlFor={annualCostSliderId} className="text-xs sm:text-sm font-bold text-slate-700">年間の総医療費（10割換算）</label>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-black text-slate-800">{annualMedicalCost}</span>
                <span className="text-xs font-bold text-slate-600">万円/年</span>
              </div>
            </div>
            <input
              id={annualCostSliderId}
              type="range"
              min={10}
              max={100}
              step={10}
              value={annualMedicalCost}
              onChange={(e) => setAnnualMedicalCost(Number(e.target.value))}
              className="w-full accent-slate-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>10万(軽い通院)</span>
              <span>30万(定期通院・薬)</span>
              <span>100万(検査・短期入院)</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 space-y-4">
          <div className="bg-gradient-to-br from-teal-600 to-emerald-700 text-white rounded-2xl p-5 sm:p-6 shadow-md">
            <div className="flex items-center justify-between text-xs font-bold text-teal-100 mb-1">
              <span>あなたの窓口負担割合</span>
              <span className="bg-white/20 px-2 py-0.5 rounded-full text-[10px] font-bold">{(copayRate * 10).toFixed(0)} 割</span>
            </div>
            <div className="flex items-baseline gap-1 my-2">
              <span className="text-3xl sm:text-4xl font-black tracking-tight">{outOfPocket.toLocaleString()}</span>
              <span className="text-base sm:text-lg font-bold">円 / 年の自己負担</span>
            </div>
            <p className="text-xs text-teal-100">{copayLabel}</p>
          </div>

          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 space-y-3 text-xs">
            <div className="font-bold text-slate-800">1割負担との差額比較</div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white p-3 rounded-xl border border-slate-200">
                <div className="text-slate-500 mb-1">1割負担の場合</div>
                <div className="text-base font-bold text-slate-800">{standardPocket.toLocaleString()} 円</div>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-200">
                <div className="text-slate-500 mb-1">現在の判定負担</div>
                <div className="text-base font-bold text-teal-700">{outOfPocket.toLocaleString()} 円</div>
              </div>
            </div>
            {burdenDiff > 0 && (
              <p className="text-[11px] text-slate-500">
                ※2割負担化により年間約{burdenDiff.toLocaleString()}円の負担増となりますが、月ごとの負担上限（高額療養費制度：外来1.8万円など）により過大な負担は抑えられます。
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};