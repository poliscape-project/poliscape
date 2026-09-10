"use client";

import React, { useState } from "react";
import { CreditCard, CheckCircle2, Building, ShieldAlert, Sparkles } from "lucide-react";

export const ResidentCardMynaNavigator: React.FC<{ isSimpleMode: boolean }> = ({ isSimpleMode }) => {
  const [visaType, setVisaType] = useState<"engineer" | "student" | "specified">("engineer");
  const [updateFrequency, setUpdateFrequency] = useState<number>(1); // 年ごと

  // 1年あたりの窓口待ち時間・移動時間節約試算
  // 従来：入管（半日〜1日約5時間）＋市役所（半日約3時間）＝約8時間
  // 一体化後：入管1回のみで連動＝約3時間で終了（約5時間節約）
  const savedHoursPerUpdate = 5;
  const savedHoursTotal = savedHoursPerUpdate * (3 / updateFrequency);

  return (
    <div className="bg-gradient-to-br from-teal-50/80 via-white to-indigo-50/60 rounded-3xl p-5 sm:p-7 border border-teal-200/80 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-teal-100 pb-4">
        <div className="flex items-center gap-2.5">
          <span className="p-2 rounded-xl bg-teal-600 text-white shadow-xs">
            <CreditCard className="w-5 h-5" />
          </span>
          <div>
            <h3 className="text-lg sm:text-xl font-black text-slate-900">
              {isSimpleMode ? "外国人のカード1本化 手続きどれだけ楽になる？診断" : "在留カード＆マイナカード一体化（特定在留カード）ナビ"}
            </h3>
            <p className="text-xs text-slate-500">
              入国管理局と市区町村役場の二重手続き解消による時間節約と不正防止効果を診断
            </p>
          </div>
        </div>
        <span className="self-start sm:self-auto text-[11px] font-bold px-3 py-1 rounded-full bg-teal-100 text-teal-800">
          2025年度交付開始
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-6 space-y-5 bg-slate-50/70 p-4 sm:p-5 rounded-2xl border border-slate-200/60">
          <div data-widget="button-group" className="bg-white/80 p-3.5 rounded-xl border border-slate-200/70 transition-all hover:border-teal-300">
            <label className="text-xs sm:text-sm font-bold text-slate-700 block mb-2">
              在留資格の種類
            </label>
            <div role="radiogroup" className="grid grid-cols-3 gap-2 text-xs">
              <button
                type="button"
                role="radio"
                aria-checked={visaType === "engineer"}
                onClick={() => setVisaType("engineer")}
                className={`p-2.5 rounded-xl border font-bold transition-all ${
                  visaType === "engineer"
                    ? "bg-teal-600 text-white border-teal-600 shadow-xs ring-1 ring-teal-600"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                }`}
              >
                技人国（就労）
              </button>
              <button
                type="button"
                role="radio"
                aria-checked={visaType === "student"}
                onClick={() => setVisaType("student")}
                className={`p-2.5 rounded-xl border font-bold transition-all ${
                  visaType === "student"
                    ? "bg-teal-600 text-white border-teal-600 shadow-xs ring-1 ring-teal-600"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                }`}
              >
                留学
              </button>
              <button
                type="button"
                role="radio"
                aria-checked={visaType === "specified"}
                onClick={() => setVisaType("specified")}
                className={`p-2.5 rounded-xl border font-bold transition-all ${
                  visaType === "specified"
                    ? "bg-teal-600 text-white border-teal-600 shadow-xs ring-1 ring-teal-600"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                }`}
              >
                特定技能
              </button>
            </div>
          </div>

          <div data-widget="slider" className="bg-white/80 p-3.5 rounded-xl border border-slate-200/70 transition-all hover:border-teal-300">
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs sm:text-sm font-bold text-slate-700 cursor-pointer">
                在留期間の更新頻度
              </label>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-teal-700">{updateFrequency}</span>
                <span className="text-xs font-bold text-slate-600">年ごと</span>
              </div>
            </div>
            <input
              type="range"
              min={1}
              max={5}
              step={1}
              value={updateFrequency}
              onChange={(e) => setUpdateFrequency(Number(e.target.value))}
              className="w-full accent-teal-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
              aria-label="更新頻度"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1 select-none">
              <span>1年ごと(頻繁)</span>
              <span>3年ごと</span>
              <span>5年ごと(最長)</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 space-y-4">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-5 sm:p-6 shadow-md">
            <div className="flex items-center justify-between text-xs font-bold text-slate-300 mb-1">
              <span>窓口手続き時間の削減効果</span>
              <span className="bg-teal-500 text-white px-2 py-0.5 rounded-full text-[10px] font-bold">
                市役所の再訪問が不要
              </span>
            </div>
            <div className="flex items-baseline gap-1 my-2">
              <span className="text-3xl sm:text-4xl font-black tracking-tight">約 {savedHoursPerUpdate}</span>
              <span className="text-base sm:text-lg font-bold">時間の短縮 / 1回</span>
            </div>
            <p className="text-xs text-slate-300">
              入管で更新すればマイナンバーの有効期限も自動連動。有給休暇を潰して市役所に並ぶ必要がなくなります。
            </p>
          </div>

          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-2 text-xs">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-teal-600" />
              <span>偽造在留カードでの不正就労を防止</span>
            </div>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              目視では区別がつかない偽造在留カードが社会問題化していましたが、マイナンバーの暗号ICチップ読み取り（JPKI）と照合することで、採用企業側も1秒で正規の在留資格を確認できるようになります。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
