"use client";

import React, { useState, useId } from "react";
import { Zap, Sparkles } from "lucide-react";

export const EnergyBillChecker: React.FC<{ isSimpleMode: boolean }> = ({ isSimpleMode }) => {
  const elecSliderId = useId();
  const gasSliderId = useId();

  const [elecUsage, setElecUsage] = useState<number>(350);
  const [gasUsage, setGasUsage] = useState<number>(30);
  const [hasSubsidy, setHasSubsidy] = useState<boolean>(true);

  const elecSubsidyDiscount = hasSubsidy ? Math.round(elecUsage * 4.0) : 0;
  const gasSubsidyDiscount = hasSubsidy ? Math.round(gasUsage * 17.5) : 0;
  const totalSubsidy = elecSubsidyDiscount + gasSubsidyDiscount;
  const renewableSurcharge = Math.round(elecUsage * 3.49);

  return (
    <section className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 sm:p-7">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-teal-50 text-teal-700">
              <Zap className="w-5 h-5" />
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">
              {isSimpleMode ? "電気・ガス代の国からの値引き額チェッカー" : "電気・ガス価格激変緩和補助金＆再エネ賦課金試算"}
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-500">
            {isSimpleMode
              ? "おうちの電気やガスの使用量から、国がいくら値引きしてくれたかと再エネ負担額をチェック！"
              : "電気・都市ガス価格激変緩和対策事業による値引き額と再エネ賦課金（3.49円/kWh）の家計影響"}
          </p>
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-50 text-teal-800 text-xs font-bold self-start sm:self-center border border-teal-200/60">
          <Sparkles className="w-3.5 h-3.5" />
          <span>請求書で自動値引き</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-6 space-y-5 bg-slate-50/70 p-4 sm:p-5 rounded-2xl border border-slate-200/60">
          <div>
            <div className="flex justify-between items-center mb-2">
              <label htmlFor={elecSliderId} className="text-xs sm:text-sm font-bold text-slate-700">1ヶ月の電気使用量</label>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-black text-teal-700">{elecUsage}</span>
                <span className="text-xs font-bold text-slate-600">kWh</span>
              </div>
            </div>
            <input
              id={elecSliderId}
              type="range"
              min={100}
              max={800}
              step={20}
              value={elecUsage}
              onChange={(e) => setElecUsage(Number(e.target.value))}
              className="w-full accent-teal-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>150kWh(単身)</span>
              <span>350kWh(標準世帯)</span>
              <span>550kWh(多人数・夏冬)</span>
              <span>800kWh</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label htmlFor={gasSliderId} className="text-xs sm:text-sm font-bold text-slate-700">1ヶ月の都市ガス使用量</label>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-black text-teal-700">{gasUsage}</span>
                <span className="text-xs font-bold text-slate-600">m³</span>
              </div>
            </div>
            <input
              id={gasSliderId}
              type="range"
              min={10}
              max={80}
              step={5}
              value={gasUsage}
              onChange={(e) => setGasUsage(Number(e.target.value))}
              className="w-full accent-teal-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>10m³</span>
              <span>30m³(標準世帯)</span>
              <span>50m³</span>
              <span>80m³</span>
            </div>
          </div>

          <div>
            <label className="text-xs sm:text-sm font-bold text-slate-700 block mb-2">政府補助金の実施期間</label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setHasSubsidy(true)}
                className={`p-2.5 rounded-xl border font-bold transition-all ${hasSubsidy ? "bg-teal-600 text-white border-teal-600 shadow-xs" : "bg-white text-slate-700 border-slate-200"}`}
              >
                補助金あり（酷暑支援等）
              </button>
              <button
                type="button"
                onClick={() => setHasSubsidy(false)}
                className={`p-2.5 rounded-xl border font-bold transition-all ${!hasSubsidy ? "bg-amber-600 text-white border-amber-600 shadow-xs" : "bg-white text-slate-700 border-slate-200"}`}
              >
                補助金なし（終了時）
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 space-y-4">
          <div className="bg-gradient-to-br from-teal-600 to-emerald-700 text-white rounded-2xl p-5 sm:p-6 shadow-md">
            <div className="flex items-center justify-between text-xs font-bold text-teal-100 mb-1">
              <span>国による1ヶ月の値引き合計額</span>
              <span className="bg-white/20 px-2 py-0.5 rounded-full text-[10px] font-bold">申請不要・自動値引</span>
            </div>
            <div className="flex items-baseline gap-1 my-2">
              <span className="text-3xl sm:text-4xl font-black tracking-tight">{totalSubsidy.toLocaleString()}</span>
              <span className="text-base sm:text-lg font-bold">円 / 月の値引き</span>
            </div>
            <p className="text-xs text-teal-100 leading-relaxed">
              電気代から約{elecSubsidyDiscount.toLocaleString()}円、ガス代から約{gasSubsidyDiscount.toLocaleString()}円が毎月の検針票・請求書で直接差し引かれます。
            </p>
          </div>

          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-2.5 text-xs">
            <div className="font-bold text-slate-800">請求書に上乗せされている「再エネ賦課金」</div>
            <div className="flex justify-between items-center bg-white p-3 rounded-xl border border-slate-200">
              <span className="text-slate-600">毎月の再エネ賦課金負担（約3.49円/kWh）:</span>
              <span className="font-black text-slate-900 text-sm">{renewableSurcharge.toLocaleString()} 円/月</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              再生可能エネルギー買い取り費用として、全国民の電気料金に自動加算されています。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};