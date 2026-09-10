"use client";

import React, { useState } from "react";
import { Gauge, Zap, Fuel, Car } from "lucide-react";

export const EvDistanceTaxSimulator: React.FC<{ isSimpleMode: boolean }> = ({ isSimpleMode }) => {
  const [annualDistance, setAnnualDistance] = useState<number>(10000); // km
  const [vehicleType, setVehicleType] = useState<"ev" | "gasoline" | "hybrid">("ev");
  const [taxPerKm, setTaxPerKm] = useState<number>(3); // 円/km

  // 試算
  const distanceTaxYearly = annualDistance * taxPerKm;
  
  // ガソリン車の場合のガソリン税想定（燃費15km/L、ガソリン税約53.8円/L）
  const gasolineLiter = annualDistance / (vehicleType === "hybrid" ? 25 : 15);
  const gasolineTaxYearly = Math.round(gasolineLiter * 53.8);

  return (
    <div className="bg-gradient-to-br from-blue-50/80 via-white to-sky-50/60 rounded-3xl p-5 sm:p-7 border border-blue-200/80 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-blue-100 pb-4">
        <div className="flex items-center gap-2.5">
          <span className="p-2 rounded-xl bg-blue-600 text-white shadow-xs">
            <Gauge className="w-5 h-5" />
          </span>
          <div>
            <h3 className="text-lg sm:text-xl font-black text-slate-900">
              {isSimpleMode ? "車の走行税 いくら取られる？計算機" : "EV走行距離課税（走行税）vs ガソリン税 試算機"}
            </h3>
            <p className="text-xs text-slate-500">
              年間走行距離と車種から、走った分だけ課税される新税制の負担額をシミュレーション
            </p>
          </div>
        </div>
        <span className="self-start sm:self-auto text-[11px] font-bold px-3 py-1 rounded-full bg-blue-100 text-blue-800">
          地方車社会で議論沸騰
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-6 space-y-5 bg-slate-50/70 p-4 sm:p-5 rounded-2xl border border-slate-200/60">
          <div data-widget="slider" className="bg-white/80 p-3.5 rounded-xl border border-slate-200/70 transition-all hover:border-blue-300">
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs sm:text-sm font-bold text-slate-700 cursor-pointer">
                年間走行距離（マイカー利用目安）
              </label>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-blue-700">{annualDistance.toLocaleString()}</span>
                <span className="text-xs font-bold text-slate-600">km / 年</span>
              </div>
            </div>
            <input
              type="range"
              min={1000}
              max={30000}
              step={1000}
              value={annualDistance}
              onChange={(e) => setAnnualDistance(Number(e.target.value))}
              className="w-full accent-blue-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
              aria-label="年間走行距離"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1 select-none">
              <span>3,000km(街乗り)</span>
              <span>1万km(通勤平均)</span>
              <span>2万km(地方長距離)</span>
              <span>3万km</span>
            </div>
            <div className="flex items-center justify-end gap-1 mt-2 pt-1 border-t border-slate-100 text-[10px] text-slate-400">
              <span className="bg-slate-100 px-1.5 py-0.5 rounded text-[9px] font-mono text-slate-500">← →</span>
              <span>走行距離調整</span>
            </div>
          </div>

          <div data-widget="button-group" className="bg-white/80 p-3.5 rounded-xl border border-slate-200/70 transition-all hover:border-blue-300">
            <label className="text-xs sm:text-sm font-bold text-slate-700 block mb-2">
              お乗りの車種タイプ
            </label>
            <div role="radiogroup" className="grid grid-cols-3 gap-2 text-xs">
              <button
                type="button"
                role="radio"
                aria-checked={vehicleType === "ev"}
                onClick={() => setVehicleType("ev")}
                className={`p-2.5 rounded-xl border font-bold transition-all ${
                  vehicleType === "ev"
                    ? "bg-blue-600 text-white border-blue-600 shadow-xs ring-1 ring-blue-600"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                }`}
              >
                電気自動車 (EV)
              </button>
              <button
                type="button"
                role="radio"
                aria-checked={vehicleType === "hybrid"}
                onClick={() => setVehicleType("hybrid")}
                className={`p-2.5 rounded-xl border font-bold transition-all ${
                  vehicleType === "hybrid"
                    ? "bg-blue-600 text-white border-blue-600 shadow-xs ring-1 ring-blue-600"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                }`}
              >
                ハイブリッド (HV)
              </button>
              <button
                type="button"
                role="radio"
                aria-checked={vehicleType === "gasoline"}
                onClick={() => setVehicleType("gasoline")}
                className={`p-2.5 rounded-xl border font-bold transition-all ${
                  vehicleType === "gasoline"
                    ? "bg-blue-600 text-white border-blue-600 shadow-xs ring-1 ring-blue-600"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                }`}
              >
                ガソリン車
              </button>
            </div>
            <div className="flex items-center justify-end gap-1 mt-2 text-[10px] text-slate-400">
              <span className="bg-slate-100 px-1.5 py-0.5 rounded text-[9px] font-mono text-slate-500">← →</span>
              <span>車種切替</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 space-y-4">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-5 sm:p-6 shadow-md">
            <div className="flex items-center justify-between text-xs font-bold text-slate-300 mb-1">
              <span>走行距離課税（1kmあたり3円想定）</span>
              <span className="bg-white/20 px-2 py-0.5 rounded-full text-[10px]">
                {vehicleType === "ev" ? "EV想定負担" : "新税負担額"}
              </span>
            </div>
            <div className="flex items-baseline gap-1 my-2">
              <span className="text-3xl sm:text-4xl font-black tracking-tight">{distanceTaxYearly.toLocaleString()}</span>
              <span className="text-base sm:text-lg font-bold">円 / 年</span>
            </div>
            <div className="flex items-center justify-between text-xs text-slate-300 pt-2 border-t border-slate-700/80">
              <span>ガソリン車時代の給油税負担目安:</span>
              <span className="font-bold text-white">約 {gasolineTaxYearly.toLocaleString()} 円 / 年</span>
            </div>
          </div>

          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-2 text-xs">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <Car className="w-4 h-4 text-blue-600" />
              <span>地方と都市部の不公平問題</span>
            </div>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              地方では通勤・通院・買い物で年間1.5万〜2万km以上の走行が珍しくありません。一律に距離課税されると年間6万円以上の新たな税負担となり、公共交通機関が充実した大都市住民との格差が拡大するとして地方自治体が強く反対しています。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
