"use client";

import React, { useState } from "react";
import { Pill, ShieldAlert, Heart, Coins } from "lucide-react";

export const OtcDrugCopaySimulator: React.FC<{ isSimpleMode: boolean }> = ({ isSimpleMode }) => {
  const [drugType, setDrugType] = useState<"compress" | "moisturizer" | "allergy">("compress");
  const [monthlyUsage, setMonthlyUsage] = useState<number>(3); // 湿布袋数、保湿剤本数など

  const drugInfo = {
    compress: {
      name: "湿布薬（モーラステープ等・7枚入）",
      prescriptionPrice: 300, // 3割負担
      otcPrice: 1200, // 市販薬価格
      unit: "袋 / 月"
    },
    moisturizer: {
      name: "保湿剤（ヒルドイドソフト・50g）",
      prescriptionPrice: 200,
      otcPrice: 1500,
      unit: "本 / 月"
    },
    allergy: {
      name: "花粉症・アレルギー薬（1ヶ月分）",
      prescriptionPrice: 600,
      otcPrice: 2500,
      unit: "箱 / 月"
    }
  };

  const current = drugInfo[drugType];
  const yearlyPrescriptionCost = current.prescriptionPrice * monthlyUsage * 12;
  const yearlyOtcCost = current.otcPrice * monthlyUsage * 12;
  const costDiff = yearlyOtcCost - yearlyPrescriptionCost;

  return (
    <div className="bg-gradient-to-br from-teal-50/80 via-white to-cyan-50/60 rounded-3xl p-5 sm:p-7 border border-teal-200/80 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-teal-100 pb-4">
        <div className="flex items-center gap-2.5">
          <span className="p-2 rounded-xl bg-teal-600 text-white shadow-xs">
            <Pill className="w-5 h-5" />
          </span>
          <div>
            <h3 className="text-lg sm:text-xl font-black text-slate-900">
              {isSimpleMode ? "湿布や保湿剤の病院代 どう変わる？比較機" : "OTC類似薬（湿布・ヒルドイド等）保険給付見直し比較機"}
            </h3>
            <p className="text-xs text-slate-500">
              処方薬（現行3割負担）と市販薬（全額自己負担・選定療養）の年間費用差額を試算
            </p>
          </div>
        </div>
        <span className="self-start sm:self-auto text-[11px] font-bold px-3 py-1 rounded-full bg-teal-100 text-teal-800">
          医療費削減の焦点
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-6 space-y-5 bg-slate-50/70 p-4 sm:p-5 rounded-2xl border border-slate-200/60">
          <div data-widget="button-group" className="bg-white/80 p-3.5 rounded-xl border border-slate-200/70 transition-all hover:border-teal-300">
            <label className="text-xs sm:text-sm font-bold text-slate-700 block mb-2">
              試算する処方医薬品の種類
            </label>
            <div role="radiogroup" className="grid grid-cols-3 gap-2 text-xs">
              <button
                type="button"
                role="radio"
                aria-checked={drugType === "compress"}
                onClick={() => setDrugType("compress")}
                className={`p-2.5 rounded-xl border font-bold transition-all ${
                  drugType === "compress"
                    ? "bg-teal-600 text-white border-teal-600 shadow-xs ring-1 ring-teal-600"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                }`}
              >
                湿布薬
              </button>
              <button
                type="button"
                role="radio"
                aria-checked={drugType === "moisturizer"}
                onClick={() => setDrugType("moisturizer")}
                className={`p-2.5 rounded-xl border font-bold transition-all ${
                  drugType === "moisturizer"
                    ? "bg-teal-600 text-white border-teal-600 shadow-xs ring-1 ring-teal-600"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                }`}
              >
                保湿剤
              </button>
              <button
                type="button"
                role="radio"
                aria-checked={drugType === "allergy"}
                onClick={() => setDrugType("allergy")}
                className={`p-2.5 rounded-xl border font-bold transition-all ${
                  drugType === "allergy"
                    ? "bg-teal-600 text-white border-teal-600 shadow-xs ring-1 ring-teal-600"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                }`}
              >
                花粉症薬
              </button>
            </div>
          </div>

          <div data-widget="slider" className="bg-white/80 p-3.5 rounded-xl border border-slate-200/70 transition-all hover:border-teal-300">
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs sm:text-sm font-bold text-slate-700 cursor-pointer">
                毎月の使用量・処方量
              </label>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-teal-700">{monthlyUsage}</span>
                <span className="text-xs font-bold text-slate-600">{current.unit}</span>
              </div>
            </div>
            <input
              type="range"
              min={1}
              max={10}
              step={1}
              value={monthlyUsage}
              onChange={(e) => setMonthlyUsage(Number(e.target.value))}
              className="w-full accent-teal-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
              aria-label="使用量"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1 select-none">
              <span>1</span>
              <span>3(平均)</span>
              <span>5</span>
              <span>10(大量処方)</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 space-y-4">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-5 sm:p-6 shadow-md">
            <div className="flex items-center justify-between text-xs font-bold text-slate-300 mb-1">
              <span>現行（病院3割負担）の年間費用</span>
              <span className="bg-white/20 px-2 py-0.5 rounded-full text-[10px]">
                市販薬自腹時: {yearlyOtcCost.toLocaleString()}円
              </span>
            </div>
            <div className="flex items-baseline gap-1 my-2">
              <span className="text-3xl sm:text-4xl font-black tracking-tight">{yearlyPrescriptionCost.toLocaleString()}</span>
              <span className="text-base sm:text-lg font-bold">円 / 年</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-amber-300 pt-2 border-t border-slate-700/80">
              <Coins className="w-4 h-4 shrink-0" />
              <span>市販薬へ完全除外時の自己負担差額: +{costDiff.toLocaleString()} 円 / 年</span>
            </div>
          </div>

          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-2 text-xs">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <Heart className="w-4 h-4 text-teal-600" />
              <span>アトピー性皮膚炎など重症患者への例外</span>
            </div>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              単なる乾燥肌や美容目的の受診には差額自己負担を求める一方、医師の診断で重度のアトピー性皮膚炎や皮膚疾患と診断された場合は、引き続き公的保険の3割負担を認める例外規定が検討されています。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
