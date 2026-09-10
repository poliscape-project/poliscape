/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { Baby, Clock, Wallet, Sparkles, CheckCircle2, HeartHandshake } from "lucide-react";

export const KodomoTsuenCalculator: React.FC<{ isSimpleMode?: boolean }> = ({ isSimpleMode = false }) => {
  const [ageGroup, setAgeGroup] = useState<string>("1-2"); // "0-1", "1-2", "2-3"
  const [monthlyHours, setMonthlyHours] = useState<number>(10);
  const [incomeType, setIncomeType] = useState<string>("standard"); // "exempt", "standard", "high"

  // 1時間あたりの単価
  const hourlyRate = incomeType === "exempt" ? 0 : 300;
  const monthlyCost = monthlyHours * hourlyRate;
  const yearlyCost = monthlyCost * 12;
  const standardNurseryRate = 1200; // 民間一時預かりの相場
  const marketCost = monthlyHours * standardNurseryRate * 12;
  const yearlySavings = marketCost - yearlyCost;

  return (
    <div className="bg-gradient-to-br from-teal-50/80 via-white to-emerald-50/60 rounded-3xl p-5 sm:p-7 border border-teal-200/80 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-teal-100 pb-4">
        <div className="flex items-center gap-2.5">
          <span className="p-2 rounded-xl bg-teal-600 text-white shadow-xs">
            <Baby className="w-5 h-5" />
          </span>
          <div>
            <h3 className="text-lg sm:text-xl font-black text-slate-900">
              {isSimpleMode ? "だれでも通園 料金・時間チェッカー" : "こども誰でも通園制度 利用負担シミュレーター"}
            </h3>
            <p className="text-xs text-slate-500">
              親の就労要件なし！0〜2歳児の月間利用料とレスパイト効果を試算
            </p>
          </div>
        </div>
        <span className="self-start sm:self-auto text-[11px] font-bold px-3 py-1 rounded-full bg-teal-100 text-teal-800">
          2026年4月本格施行
        </span>
      </div>

      {/* コントロールパネル */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 space-y-2">
          <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <Baby className="w-3.5 h-3.5 text-teal-600" />
            <span>お子様の年齢区分</span>
          </label>
          <div className="grid grid-cols-3 gap-1">
            {[
              { id: "0-1", label: "0歳児" },
              { id: "1-2", label: "1歳児" },
              { id: "2-3", label: "2歳児" },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setAgeGroup(item.id)}
                className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                  ageGroup === item.id
                    ? "bg-teal-600 text-white border-teal-600 shadow-xs"
                    : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <p className="text-[10px] text-slate-400">※生後6ヶ月〜満3歳未満が対象</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 space-y-2">
          <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-teal-600" />
              <span>希望の利用時間（月）</span>
            </span>
            <span className="text-teal-700 font-black">{monthlyHours}時間</span>
          </label>
          <input
            type="range"
            min={2}
            max={10}
            step={2}
            value={monthlyHours}
            onChange={(e) => setMonthlyHours(Number(e.target.value))}
            className="w-full accent-teal-600 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-400 font-bold">
            <span>月2時間</span>
            <span>月6時間</span>
            <span>月10時間（国上限）</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 space-y-2">
          <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <Wallet className="w-3.5 h-3.5 text-teal-600" />
            <span>世帯の所得区分</span>
          </label>
          <select
            value={incomeType}
            onChange={(e) => setIncomeType(e.target.value)}
            className="w-full p-2 text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-teal-500"
          >
            <option value="standard">一般世帯（1時間 約300円）</option>
            <option value="exempt">住民税非課税世帯等（無料〜減免）</option>
            <option value="high">高所得世帯（1時間 約300円同等）</option>
          </select>
          <p className="text-[10px] text-slate-400">※所得に関わらず誰でも利用可能</p>
        </div>
      </div>

      {/* 計算結果カード */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        <div className="bg-white rounded-2xl p-4 border border-teal-100 shadow-xs flex flex-col justify-between">
          <div className="text-xs font-bold text-slate-500 mb-1">毎月の自己負担額</div>
          <div className="flex items-baseline gap-1 my-1">
            <span className="text-3xl font-black text-teal-700">
              {incomeType === "exempt" ? "0" : monthlyCost.toLocaleString()}
            </span>
            <span className="text-xs font-bold text-slate-600">円/月</span>
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            {monthlyHours}時間 × 1時間{hourlyRate}円
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-emerald-100 shadow-xs flex flex-col justify-between">
          <div className="text-xs font-bold text-slate-500 mb-1">民間一時預かりとの差（年額）</div>
          <div className="flex items-baseline gap-1 my-1">
            <span className="text-3xl font-black text-emerald-600">
              約{Math.round(yearlySavings / 1000).toLocaleString()}千
            </span>
            <span className="text-xs font-bold text-slate-600">円 お得</span>
          </div>
          <div className="text-[11px] text-emerald-700 font-bold mt-1">
            公的価格で安価に利用可能
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-amber-100 shadow-xs flex flex-col justify-between">
          <div className="text-xs font-bold text-slate-500 mb-1">保護者のリフレッシュ時間</div>
          <div className="flex items-baseline gap-1 my-1">
            <span className="text-3xl font-black text-amber-700">
              年間 {monthlyHours * 12}
            </span>
            <span className="text-xs font-bold text-slate-600">時間</span>
          </div>
          <div className="text-[11px] text-amber-800 font-bold mt-1">
            通院・休養・自分時間に活用
          </div>
        </div>
      </div>

      {/* 制度のポイント */}
      <div className="bg-teal-900 text-white rounded-2xl p-4 text-xs space-y-2">
        <div className="font-bold flex items-center gap-1.5 text-teal-200">
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>ここが変わった！こども誰でも通園の利用メリット</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] text-teal-100">
          <div className="flex items-start gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-teal-300 shrink-0 mt-0.5" />
            <span>就労証明書は不要！理由を問わず誰でも預けられる</span>
          </div>
          <div className="flex items-start gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-teal-300 shrink-0 mt-0.5" />
            <span>スマホアプリや自治体予約サイトで空き枠を事前予約</span>
          </div>
          <div className="flex items-start gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-teal-300 shrink-0 mt-0.5" />
            <span>定期的な利用で保育士に育児の悩みを直接相談できる</span>
          </div>
        </div>
      </div>
    </div>
  );
};