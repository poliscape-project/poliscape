"use client";

import React, { useState, useId } from "react";
import { Fuel, Sparkles } from "lucide-react";

export const GasolineSubsidiesChecker: React.FC<{ isSimpleMode: boolean }> = ({ isSimpleMode }) => {
  const fuelSliderId = useId();
  const [fuelLiters, setFuelLiters] = useState<number>(60); // 月60L
  const [fuelType, setFuelType] = useState<"regular" | "highoctane" | "diesel">("regular");

  // 現在の政府元売り補助金（約15円/L想定）
  const subsidyPerLiter = 15;
  const monthlySubsidyDiscount = fuelLiters * subsidyPerLiter;

  // トリガー条項発動（25.1円/L減税）
  const triggerDiscountPerLiter = 25.1;
  const monthlyTriggerDiscount = Math.round(fuelLiters * triggerDiscountPerLiter);

  // 店頭価格（補助金後）約175円想定
  const currentPrice = fuelType === "regular" ? 175 : fuelType === "highoctane" ? 186 : 155;
  const withoutSubsidyPrice = currentPrice + subsidyPerLiter;
  const withTriggerPrice = currentPrice - (triggerDiscountPerLiter - subsidyPerLiter);

  return (
    <section className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 sm:p-7">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-teal-50 text-teal-700">
              <Fuel className="w-5 h-5" />
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">
              {isSimpleMode ? "ガソリン代の国からの補助と減税シミュレーター" : "ガソリン補助金 vs トリガー条項（25.1円/L減税）試算"}
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-500">
            {isSimpleMode
              ? "毎月の給油量から、いま国がいくら安くしてくれているか、減税ならいくら下がるかを比較！"
              : "燃料油価格激変緩和補助金の家計支援額と、トリガー条項凍結解除時の価格差額"}
          </p>
        </div>
        <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold self-start sm:self-center">
          <span>店頭目標 175円前後</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-6 space-y-5 bg-slate-50/70 p-4 sm:p-5 rounded-2xl border border-slate-200/60">
          <div>
            <div className="flex justify-between items-center mb-2">
              <label htmlFor={fuelSliderId} className="text-xs sm:text-sm font-bold text-slate-700">1ヶ月の給油量（使用量）</label>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-black text-teal-700">{fuelLiters}</span>
                <span className="text-xs font-bold text-slate-600">L / 月</span>
              </div>
            </div>
            <input
              id={fuelSliderId}
              type="range"
              min={20}
              max={160}
              step={10}
              value={fuelLiters}
              onChange={(e) => setFuelLiters(Number(e.target.value))}
              className="w-full accent-teal-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>20L(軽自動車)</span>
              <span>60L(普通車・標準)</span>
              <span>100L(通勤利用)</span>
              <span>160L(多頻度)</span>
            </div>
          </div>

          <div>
            <label className="text-xs sm:text-sm font-bold text-slate-700 block mb-2">燃料の種類</label>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setFuelType("regular")}
                className={`p-2.5 rounded-xl border font-bold transition-all text-center ${fuelType === "regular" ? "bg-teal-600 text-white border-teal-600 shadow-xs" : "bg-white text-slate-700 border-slate-200"}`}
              >
                レギュラー
              </button>
              <button
                type="button"
                onClick={() => setFuelType("highoctane")}
                className={`p-2.5 rounded-xl border font-bold transition-all text-center ${fuelType === "highoctane" ? "bg-teal-600 text-white border-teal-600 shadow-xs" : "bg-white text-slate-700 border-slate-200"}`}
              >
                ハイオク
              </button>
              <button
                type="button"
                onClick={() => setFuelType("diesel")}
                className={`p-2.5 rounded-xl border font-bold transition-all text-center ${fuelType === "diesel" ? "bg-teal-600 text-white border-teal-600 shadow-xs" : "bg-white text-slate-700 border-slate-200"}`}
              >
                軽油（ディーゼル）
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 space-y-4">
          <div className="bg-gradient-to-br from-teal-600 to-emerald-700 text-white rounded-2xl p-5 sm:p-6 shadow-md">
            <div className="flex items-center justify-between text-xs font-bold text-teal-100 mb-1">
              <span>現在の政府補助金による毎月の値引き効果</span>
              <span className="bg-white/20 px-2 py-0.5 rounded-full text-[10px]">約15円/L補助</span>
            </div>
            <div className="flex items-baseline gap-1 my-2">
              <span className="text-3xl sm:text-4xl font-black tracking-tight">{monthlySubsidyDiscount.toLocaleString()}</span>
              <span className="text-base sm:text-lg font-bold">円 / 月の抑制</span>
            </div>
            <p className="text-xs text-teal-100 leading-relaxed">
              補助金がない場合、店頭価格は約 <strong>{withoutSubsidyPrice}円/L</strong> に達する計算です。
            </p>
          </div>

          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-2 text-xs">
            <div className="font-bold text-slate-800">もし「トリガー条項」が発動（直接減税）されたら？</div>
            <div className="flex justify-between items-center bg-white p-3 rounded-xl border border-slate-200">
              <span className="text-slate-600">店頭価格の想定:</span>
              <span className="font-black text-teal-700 text-base">約 {Math.round(withTriggerPrice)} 円/L</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              25.1円/Lの旧暫定税率が停止されると、現在の店頭価格からさらに約10円/L安くなり、月約{monthlyTriggerDiscount.toLocaleString()}円の負担軽減となります。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};