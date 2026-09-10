"use client";

import React, { useState } from "react";
import { Plane, Navigation, Clock, Truck, ShieldCheck } from "lucide-react";

export const DroneLogisticsCalculator: React.FC<{ isSimpleMode: boolean }> = ({ isSimpleMode }) => {
  const [routeType, setRouteType] = useState<"isolated_island" | "mountain" | "urban">("isolated_island");
  const [packageWeight, setPackageWeight] = useState<number>(3); // kg

  const routes = {
    isolated_island: {
      name: "離島・海上輸送ルート（船＋陸送対比）",
      truckMinutes: 180, // 3時間（定期船待ち含む）
      droneMinutes: 35, // 35分
      costRatio: "既存船賃とほぼ同等（即日配達可能）"
    },
    mountain: {
      name: "中山間地・孤立集落ルート（山道迂回対比）",
      truckMinutes: 90, // 迂回山道で1.5時間
      droneMinutes: 20, // 直線飛行で20分
      costRatio: "ガソリン代・ドライバー人件費を約40%削減"
    },
    urban: {
      name: "都市間・渋滞回避ルート（レベル4飛行）",
      truckMinutes: 60,
      droneMinutes: 15,
      costRatio: "緊急医薬品・血液製剤輸送で絶大な救命効果"
    }
  };

  const current = routes[routeType];
  const savedMinutes = current.truckMinutes - current.droneMinutes;
  const timeReductionPercent = Math.round((savedMinutes / current.truckMinutes) * 100);

  return (
    <div className="bg-gradient-to-br from-sky-50/80 via-white to-blue-50/60 rounded-3xl p-5 sm:p-7 border border-sky-200/80 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-sky-100 pb-4">
        <div className="flex items-center gap-2.5">
          <span className="p-2 rounded-xl bg-sky-600 text-white shadow-xs">
            <Plane className="w-5 h-5" />
          </span>
          <div>
            <h3 className="text-lg sm:text-xl font-black text-slate-900">
              {isSimpleMode ? "ドローン配達 どれくらい早くなる？計算機" : "空飛ぶクルマ・ドローン物流 時間短縮効果シミュレーター"}
            </h3>
            <p className="text-xs text-slate-500">
              過疎地・離島・都市間ルートでのレベル4自律飛行による所要時間短縮率を比較
            </p>
          </div>
        </div>
        <span className="self-start sm:self-auto text-[11px] font-bold px-3 py-1 rounded-full bg-sky-100 text-sky-800">
          改正航空法レベル4準拠
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-6 space-y-5 bg-slate-50/70 p-4 sm:p-5 rounded-2xl border border-slate-200/60">
          <div data-widget="button-group" className="bg-white/80 p-3.5 rounded-xl border border-slate-200/70 transition-all hover:border-sky-300">
            <label className="text-xs sm:text-sm font-bold text-slate-700 block mb-2">
              想定する配送ルート
            </label>
            <div role="radiogroup" className="space-y-2 text-xs">
              {Object.entries(routes).map(([key, r]) => (
                <button
                  key={key}
                  type="button"
                  role="radio"
                  aria-checked={routeType === key}
                  onClick={() => setRouteType(key as any)}
                  className={`w-full p-2.5 rounded-xl border font-bold text-left transition-all flex items-center justify-between ${
                    routeType === key
                      ? "bg-sky-600 text-white border-sky-600 shadow-xs ring-1 ring-sky-600"
                      : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  <span>{r.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div data-widget="slider" className="bg-white/80 p-3.5 rounded-xl border border-slate-200/70 transition-all hover:border-sky-300">
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs sm:text-sm font-bold text-slate-700 cursor-pointer">
                荷物の重量（小型生活物資・処方薬）
              </label>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-sky-700">{packageWeight}</span>
                <span className="text-xs font-bold text-slate-600">kg</span>
              </div>
            </div>
            <input
              type="range"
              min={1}
              max={15}
              step={1}
              value={packageWeight}
              onChange={(e) => setPackageWeight(Number(e.target.value))}
              className="w-full accent-sky-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
              aria-label="荷物重量"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1 select-none">
              <span>1kg(書類・薬)</span>
              <span>3kg(食料品)</span>
              <span>5kg</span>
              <span>15kg(大型ドローン)</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 space-y-4">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-5 sm:p-6 shadow-md">
            <div className="flex items-center justify-between text-xs font-bold text-slate-300 mb-1">
              <span>配送所要時間</span>
              <span className="bg-emerald-500 text-white px-2 py-0.5 rounded-full text-[10px] font-bold">
                {timeReductionPercent}% 時間短縮
              </span>
            </div>
            <div className="flex items-baseline gap-1 my-2">
              <span className="text-3xl sm:text-4xl font-black tracking-tight">{current.droneMinutes}</span>
              <span className="text-base sm:text-lg font-bold">分 で到着</span>
            </div>
            <div className="flex items-center justify-between text-xs text-slate-300 pt-2 border-t border-slate-700/80">
              <span>従来の車・船による配送時間:</span>
              <span className="font-bold text-white">約 {current.truckMinutes} 分（{savedMinutes}分短縮）</span>
            </div>
          </div>

          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-2 text-xs">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-sky-600" />
              <span>有人地帯（街中）の自律飛行安全ルール</span>
            </div>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              レベル4飛行では、国家資格（一等無人航空機操縦士）を持つ専門オペレーターが遠隔監視し、万一の故障時にはパラシュートが開いて安全に着空する多重バックアップ構造が義務付けられています。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
