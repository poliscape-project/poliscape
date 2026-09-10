"use client";

import React, { useState } from "react";
import { HeartPulse, AlertTriangle, ShieldCheck, Coins } from "lucide-react";

export const HighCostMedicalCapSimulator: React.FC<{ isSimpleMode: boolean }> = ({ isSimpleMode }) => {
  const [totalMedicalCost, setTotalMedicalCost] = useState<number>(100); // 万円 (総医療費10割)
  const [incomeBracket, setIncomeBracket] = useState<"middle" | "upper_middle" | "high">("middle");

  // 現行上限（中間層 年収約370〜770万）: 80,100 + (医療費-267,000)*1%
  let currentCap = 80100;
  let proposedCap = 90000;

  if (incomeBracket === "middle") {
    currentCap = Math.round(80100 + Math.max(0, totalMedicalCost * 10000 - 267000) * 0.01);
    proposedCap = Math.round(currentCap * 1.15); // 約15%引き上げ案
  } else if (incomeBracket === "upper_middle") {
    currentCap = Math.round(167400 + Math.max(0, totalMedicalCost * 10000 - 558000) * 0.01);
    proposedCap = Math.round(currentCap * 1.2);
  } else {
    currentCap = Math.round(252600 + Math.max(0, totalMedicalCost * 10000 - 842000) * 0.01);
    proposedCap = Math.round(currentCap * 1.25);
  }

  const costDifference = Math.max(0, proposedCap - currentCap);

  return (
    <div className="bg-gradient-to-br from-rose-50/80 via-white to-pink-50/60 rounded-3xl p-5 sm:p-7 border border-rose-200/80 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-rose-100 pb-4">
        <div className="flex items-center gap-2.5">
          <span className="p-2 rounded-xl bg-rose-600 text-white shadow-xs">
            <HeartPulse className="w-5 h-5" />
          </span>
          <div>
            <h3 className="text-lg sm:text-xl font-black text-slate-900">
              {isSimpleMode ? "重い病気の病院代 いくら増える？試算機" : "高額療養費制度 自己負担上限引き上げシミュレーター"}
            </h3>
            <p className="text-xs text-slate-500">
              入院・手術や抗がん剤治療時の現行自己負担限度額と見直し案の負担増を比較
            </p>
          </div>
        </div>
        <span className="self-start sm:self-auto text-[11px] font-bold px-3 py-1 rounded-full bg-rose-100 text-rose-800">
          患者負担増の議論
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-6 space-y-5 bg-slate-50/70 p-4 sm:p-5 rounded-2xl border border-slate-200/60">
          <div data-widget="slider" className="bg-white/80 p-3.5 rounded-xl border border-slate-200/70 transition-all hover:border-rose-300">
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs sm:text-sm font-bold text-slate-700 cursor-pointer">
                1ヶ月の総医療費（10割額面）
              </label>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-rose-700">{totalMedicalCost}</span>
                <span className="text-xs font-bold text-slate-600">万円</span>
              </div>
            </div>
            <input
              type="range"
              min={30}
              max={300}
              step={10}
              value={totalMedicalCost}
              onChange={(e) => setTotalMedicalCost(Number(e.target.value))}
              className="w-full accent-rose-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
              aria-label="1ヶ月の総医療費"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1 select-none">
              <span>30万(一般入院)</span>
              <span>100万(大手術)</span>
              <span>200万(抗がん剤)</span>
              <span>300万</span>
            </div>
            <div className="flex items-center justify-end gap-1 mt-2 pt-1 border-t border-slate-100 text-[10px] text-slate-400">
              <span className="bg-slate-100 px-1.5 py-0.5 rounded text-[9px] font-mono text-slate-500">← →</span>
              <span>総医療費調整</span>
            </div>
          </div>

          <div data-widget="button-group" className="bg-white/80 p-3.5 rounded-xl border border-slate-200/70 transition-all hover:border-rose-300">
            <label className="text-xs sm:text-sm font-bold text-slate-700 block mb-2">
              世帯年収区分（区分ア・イ・ウ）
            </label>
            <div role="radiogroup" className="grid grid-cols-3 gap-2 text-xs">
              <button
                type="button"
                role="radio"
                aria-checked={incomeBracket === "middle"}
                onClick={() => setIncomeBracket("middle")}
                className={`p-2.5 rounded-xl border font-bold transition-all ${
                  incomeBracket === "middle"
                    ? "bg-rose-600 text-white border-rose-600 shadow-xs ring-1 ring-rose-600"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                }`}
              >
                約370〜770万
              </button>
              <button
                type="button"
                role="radio"
                aria-checked={incomeBracket === "upper_middle"}
                onClick={() => setIncomeBracket("upper_middle")}
                className={`p-2.5 rounded-xl border font-bold transition-all ${
                  incomeBracket === "upper_middle"
                    ? "bg-rose-600 text-white border-rose-600 shadow-xs ring-1 ring-rose-600"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                }`}
              >
                約770〜1,160万
              </button>
              <button
                type="button"
                role="radio"
                aria-checked={incomeBracket === "high"}
                onClick={() => setIncomeBracket("high")}
                className={`p-2.5 rounded-xl border font-bold transition-all ${
                  incomeBracket === "high"
                    ? "bg-rose-600 text-white border-rose-600 shadow-xs ring-1 ring-rose-600"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                }`}
              >
                1,160万円超
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 space-y-4">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-5 sm:p-6 shadow-md">
            <div className="flex items-center justify-between text-xs font-bold text-slate-300 mb-1">
              <span>見直し後の1ヶ月自己負担限度額（想定）</span>
              <span className="bg-white/20 px-2 py-0.5 rounded-full text-[10px]">
                現行: {currentCap.toLocaleString()}円
              </span>
            </div>
            <div className="flex items-baseline gap-1 my-2">
              <span className="text-3xl sm:text-4xl font-black tracking-tight">{proposedCap.toLocaleString()}</span>
              <span className="text-base sm:text-lg font-bold">円 / 月</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-rose-300 pt-2 border-t border-slate-700/80">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>月額負担増: +{costDifference.toLocaleString()} 円 / 月</span>
            </div>
          </div>

          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-2 text-xs">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-teal-600" />
              <span>年4回以上の「多数回該当」ルール</span>
            </div>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              過去12ヶ月以内に3回以上上限に達した場合、4回目以降は月額上限が44,400円（一般区分）に引き下げられる「多数回該当」は維持される方針です。毎月抗がん剤治療等を受ける長期患者の命綱となっています。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
