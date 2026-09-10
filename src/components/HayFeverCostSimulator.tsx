/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { HeartPulse, Trees, Wallet, Sparkles, CheckCircle2, TrendingDown } from "lucide-react";

export const HayFeverCostSimulator: React.FC<{ isSimpleMode?: boolean }> = ({ isSimpleMode = false }) => {
  const [seasonCost, setSeasonCost] = useState<number>(25000); // 毎シーズンの薬・通院費
  const [slitTreated, setSlitTreated] = useState<boolean>(true); // 舌下免疫療法を受けるか

  // 30年間の生涯対症療法コスト
  const lifetimeSeasonCost = seasonCost * 30;
  // 舌下免疫療法の費用（3年間・保険3割負担で月約2,500円＝年間約3万円×3年＝約9万円）
  const slitCost = 90000;
  // 治療成功後の生涯節約額（8割症状寛解と仮定）
  const lifetimeSavings = slitTreated ? lifetimeSeasonCost * 0.8 - slitCost : 0;

  return (
    <div className="bg-gradient-to-br from-emerald-50/80 via-white to-lime-50/60 rounded-3xl p-5 sm:p-7 border border-emerald-200/80 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-emerald-100 pb-4">
        <div className="flex items-center gap-2.5">
          <span className="p-2 rounded-xl bg-emerald-600 text-white shadow-xs">
            <HeartPulse className="w-5 h-5" />
          </span>
          <div>
            <h3 className="text-lg sm:text-xl font-black text-slate-900">
              {isSimpleMode ? "花粉症のお薬代＆根本治療 計算機" : "花粉症対策＆舌下免疫療法 生涯コストシミュレーター"}
            </h3>
            <p className="text-xs text-slate-500">
              毎年の対症療法コストと舌下免疫療法（根本治療）による生涯医療費の節約効果を比較
            </p>
          </div>
        </div>
        <span className="self-start sm:self-auto text-[11px] font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800">
          政府10年プロジェクト推進中
        </span>
      </div>

      {/* 入力フォーム */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 space-y-2">
          <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Wallet className="w-3.5 h-3.5 text-emerald-600" />
              <span>春の花粉症対策費（薬・目薬・耳鼻科通院）</span>
            </span>
            <span className="text-emerald-700 font-black">{seasonCost.toLocaleString()}円/年</span>
          </label>
          <input
            type="range"
            min={5000}
            max={60000}
            step={2500}
            value={seasonCost}
            onChange={(e) => setSeasonCost(Number(e.target.value))}
            className="w-full accent-emerald-600 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-400 font-bold">
            <span>5千円（軽度）</span>
            <span>2.5万円（平均）</span>
            <span>6万円（重症）</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 space-y-2 flex flex-col justify-between">
          <div>
            <div className="text-xs font-bold text-slate-700 mb-1">舌下免疫療法（根本治療）の利用</div>
            <div className="grid grid-cols-2 gap-1.5 pt-1">
              <button
                type="button"
                onClick={() => setSlitTreated(true)}
                className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                  slitTreated
                    ? "bg-emerald-600 text-white border-emerald-600 shadow-xs"
                    : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                }`}
              >
                治療する（3年間服薬）
              </button>
              <button
                type="button"
                onClick={() => setSlitTreated(false)}
                className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                  !slitTreated
                    ? "bg-emerald-600 text-white border-emerald-600 shadow-xs"
                    : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                }`}
              >
                治療しない（対症療法）
              </button>
            </div>
          </div>
          <p className="text-[10px] text-slate-400">※保険適用3割負担で月約2,500円（年間約3万円）</p>
        </div>
      </div>

      {/* 計算結果カード */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="text-xs font-bold text-slate-500 mb-1">30年間の対症療法コスト</div>
          <div className="flex items-baseline gap-1 my-1">
            <span className="text-3xl font-black text-slate-800">
              約{(lifetimeSeasonCost / 10000).toFixed(0)}万
            </span>
            <span className="text-xs font-bold text-slate-600">円</span>
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            毎年{seasonCost.toLocaleString()}円を払い続けた場合
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-emerald-100 shadow-xs flex flex-col justify-between">
          <div className="text-xs font-bold text-slate-500 mb-1">舌下免疫療法の総費用（3年間）</div>
          <div className="flex items-baseline gap-1 my-1">
            <span className="text-3xl font-black text-emerald-600">
              約9万
            </span>
            <span className="text-xs font-bold text-slate-600">円</span>
          </div>
          <div className="text-[11px] text-emerald-700 font-bold mt-1">
            約8割の患者で症状が消失・大幅軽減
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-teal-100 shadow-xs flex flex-col justify-between">
          <div className="text-xs font-bold text-slate-500 mb-1">生涯の医療費節約額</div>
          <div className="flex items-baseline gap-1 my-1">
            <span className="text-3xl font-black text-teal-700">
              約{(lifetimeSavings / 10000).toFixed(0)}万
            </span>
            <span className="text-xs font-bold text-slate-600">円 お得</span>
          </div>
          <div className="text-[11px] font-bold text-teal-800 mt-1">
            春の快適な生活＆仕事の集中力回復
          </div>
        </div>
      </div>
    </div>
  );
};