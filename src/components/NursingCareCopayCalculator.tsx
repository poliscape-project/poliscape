"use client";

import React, { useState } from "react";
import { HeartPulse, Users, ShieldAlert } from "lucide-react";

export const NursingCareCopayCalculator: React.FC<{ isSimpleMode: boolean }> = ({ isSimpleMode }) => {
  const [careLevel, setCareLevel] = useState<"support" | "level1_2" | "level3_5">("level1_2");
  const [intensity, setIntensity] = useState<"light" | "medium" | "heavy">("medium");

  let baseMonthlyCost = 150000;
  if (careLevel === "support") baseMonthlyCost = 60000;
  else if (careLevel === "level1_2") baseMonthlyCost = intensity === "light" ? 100000 : intensity === "medium" ? 180000 : 250000;
  else baseMonthlyCost = intensity === "light" ? 180000 : intensity === "medium" ? 280000 : 360000;

  const cost10Percent = Math.round(baseMonthlyCost * 0.1);
  const cost20Percent = Math.round(baseMonthlyCost * 0.2);
  const cappedCost20 = Math.min(cost20Percent, 44400);
  const diff = cappedCost20 - cost10Percent;

  return (
    <section className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 sm:p-7">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-teal-50 text-teal-700">
              <HeartPulse className="w-5 h-5" />
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">
              {isSimpleMode ? "介護保険が2割負担になったら？計算機" : "介護保険自己負担「原則2割」影響シミュレーター"}
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-500">
            {isSimpleMode
              ? "要介護度や利用頻度を選んで、いまの1割負担と2割負担になったときの毎月の差額を比較！"
              : "要介護度別の標準的利用モデルにおける1割 vs 2割の自己負担額（高額介護サービス費上限適用）"}
          </p>
        </div>
        <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold self-start sm:self-center border border-amber-200">
          <span>制度改正審議中</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-6 space-y-5 bg-slate-50/70 p-4 sm:p-5 rounded-2xl border border-slate-200/60">
          <div>
            <label className="text-xs sm:text-sm font-bold text-slate-700 block mb-2">要介護認定の区分</label>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setCareLevel("support")}
                className={`p-2.5 rounded-xl border font-bold transition-all text-center ${careLevel === "support" ? "bg-teal-600 text-white border-teal-600 shadow-xs" : "bg-white text-slate-700 border-slate-200"}`}
              >
                要支援1〜2
              </button>
              <button
                type="button"
                onClick={() => setCareLevel("level1_2")}
                className={`p-2.5 rounded-xl border font-bold transition-all text-center ${careLevel === "level1_2" ? "bg-teal-600 text-white border-teal-600 shadow-xs" : "bg-white text-slate-700 border-slate-200"}`}
              >
                要介護1〜2（中軽度）
              </button>
              <button
                type="button"
                onClick={() => setCareLevel("level3_5")}
                className={`p-2.5 rounded-xl border font-bold transition-all text-center ${careLevel === "level3_5" ? "bg-teal-600 text-white border-teal-600 shadow-xs" : "bg-white text-slate-700 border-slate-200"}`}
              >
                要介護3〜5（重度・施設）
              </button>
            </div>
          </div>

          <div>
            <label className="text-xs sm:text-sm font-bold text-slate-700 block mb-2">サービスの利用頻度・規模</label>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setIntensity("light")}
                className={`p-2.5 rounded-xl border font-bold transition-all text-center ${intensity === "light" ? "bg-teal-600 text-white border-teal-600 shadow-xs" : "bg-white text-slate-700 border-slate-200"}`}
              >
                週1〜2回（少なめ）
              </button>
              <button
                type="button"
                onClick={() => setIntensity("medium")}
                className={`p-2.5 rounded-xl border font-bold transition-all text-center ${intensity === "medium" ? "bg-teal-600 text-white border-teal-600 shadow-xs" : "bg-white text-slate-700 border-slate-200"}`}
              >
                週3〜4回（標準的）
              </button>
              <button
                type="button"
                onClick={() => setIntensity("heavy")}
                className={`p-2.5 rounded-xl border font-bold transition-all text-center ${intensity === "heavy" ? "bg-teal-600 text-white border-teal-600 shadow-xs" : "bg-white text-slate-700 border-slate-200"}`}
              >
                ほぼ毎日・施設入所
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 space-y-4">
          <div className="bg-gradient-to-br from-teal-600 to-emerald-700 text-white rounded-2xl p-5 sm:p-6 shadow-md">
            <div className="flex items-center justify-between text-xs font-bold text-teal-100 mb-1">
              <span>2割負担になった場合の毎月の自己負担額</span>
              <span className="bg-white/20 px-2 py-0.5 rounded-full text-[10px]">月額上限考慮済</span>
            </div>
            <div className="flex items-baseline gap-1 my-2">
              <span className="text-3xl sm:text-4xl font-black tracking-tight">{cappedCost20.toLocaleString()}</span>
              <span className="text-base sm:text-lg font-bold">円 / 月</span>
            </div>
            <p className="text-xs text-teal-100 leading-relaxed">
              現行の1割負担（{cost10Percent.toLocaleString()}円）から、毎月約 <strong>+{diff.toLocaleString()}円</strong> の負担増となります。
            </p>
          </div>

          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-2 text-xs">
            <div className="font-bold text-slate-800">高額介護サービス費による安全装置</div>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              1ヶ月の自己負担額が上限（一般世帯で44,400円、非課税世帯等でさらに低額）を超えた分は申請により払い戻されるため、無制限に費用が跳ね上がることはありません。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};