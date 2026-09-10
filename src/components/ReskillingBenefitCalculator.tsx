/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { BookOpen, Wallet, TrendingUp, Sparkles, CheckCircle2 } from "lucide-react";

export const ReskillingBenefitCalculator: React.FC<{ isSimpleMode?: boolean }> = ({ isSimpleMode = false }) => {
  const [courseType, setCourseType] = useState<string>("special"); // "special" (専門実践最大80%), "specific" (特定一般40%), "general" (一般20%)
  const [tuition, setTuition] = useState<number>(60); // 受講費用（万円）
  const [achieveWageUp, setAchieveWageUp] = useState<boolean>(true); // 賃金5%アップ要件

  // 給付率計算
  let rate = 0.2;
  let maxCap = 100000;
  if (courseType === "special") {
    rate = achieveWageUp ? 0.8 : 0.7; // 2024年10月から最大80%
    maxCap = 640000;
  } else if (courseType === "specific") {
    rate = 0.4;
    maxCap = 200000;
  } else {
    rate = 0.2;
    maxCap = 100000;
  }

  const rawBenefit = (tuition * 10000) * rate;
  const actualBenefit = Math.min(maxCap, rawBenefit);
  const outOfPocket = (tuition * 10000) - actualBenefit;

  return (
    <div className="bg-gradient-to-br from-violet-50/80 via-white to-purple-50/60 rounded-3xl p-5 sm:p-7 border border-violet-200/80 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-violet-100 pb-4">
        <div className="flex items-center gap-2.5">
          <span className="p-2 rounded-xl bg-violet-600 text-white shadow-xs">
            <BookOpen className="w-5 h-5" />
          </span>
          <div>
            <h3 className="text-lg sm:text-xl font-black text-slate-900">
              {isSimpleMode ? "資格・IT勉強代 キャッシュバック計算機" : "リスキリング教育訓練給付金（最大80%）試算シミュレーター"}
            </h3>
            <p className="text-xs text-slate-500">
              IT・AI・医療資格講座の受講費用とハローワークからの給付額を算出
            </p>
          </div>
        </div>
        <span className="self-start sm:self-auto text-[11px] font-bold px-3 py-1 rounded-full bg-violet-100 text-violet-800">
          給付率最大80%へ拡充済
        </span>
      </div>

      {/* 入力フォーム */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 space-y-2">
          <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-violet-600" />
            <span>受講する教育訓練講座の区分</span>
          </label>
          <select
            value={courseType}
            onChange={(e) => setCourseType(e.target.value)}
            className="w-full p-2 text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-violet-500"
          >
            <option value="special">専門実践（高度IT・AI・看護等：最大80%）</option>
            <option value="specific">特定一般（プログラミング・宅建等：40%）</option>
            <option value="general">一般（簿記・TOEIC・社労士等：20%）</option>
          </select>
          <p className="text-[10px] text-slate-400">※厚生労働大臣指定の指定講座</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 space-y-2">
          <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Wallet className="w-3.5 h-3.5 text-violet-600" />
              <span>スクール・講座の受講費用</span>
            </span>
            <span className="text-violet-700 font-black">{tuition}万円</span>
          </label>
          <input
            type="range"
            min={10}
            max={100}
            step={5}
            value={tuition}
            onChange={(e) => setTuition(Number(e.target.value))}
            className="w-full accent-violet-600 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-400 font-bold">
            <span>10万円</span>
            <span>50万円</span>
            <span>100万円</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 space-y-2 flex flex-col justify-between">
          <div>
            <div className="text-xs font-bold text-slate-700 mb-1">賃金上昇・資格取得要件</div>
            <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={achieveWageUp}
                onChange={(e) => setAchieveWageUp(e.target.checked)}
                className="rounded text-violet-600 accent-violet-600 w-4 h-4"
              />
              <span className="font-bold">資格取得＋賃金5%以上アップ達成</span>
            </label>
          </div>
          <p className="text-[10px] text-slate-400">※達成で給付率が70%→80%（上限64万円）へ跳ね上がります</p>
        </div>
      </div>

      {/* 計算結果カード */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        <div className="bg-white rounded-2xl p-4 border border-emerald-100 shadow-xs flex flex-col justify-between">
          <div className="text-xs font-bold text-slate-500 mb-1">国（雇用保険）からの給付金</div>
          <div className="flex items-baseline gap-1 my-1">
            <span className="text-3xl font-black text-emerald-600">
              {actualBenefit.toLocaleString()}
            </span>
            <span className="text-xs font-bold text-slate-600">円 支給</span>
          </div>
          <div className="text-[11px] font-bold text-emerald-700 mt-1">
            受講料の {(rate * 100).toFixed(0)}% がキャッシュバック！
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-violet-100 shadow-xs flex flex-col justify-between">
          <div className="text-xs font-bold text-slate-500 mb-1">実質的な自己負担額</div>
          <div className="flex items-baseline gap-1 my-1">
            <span className="text-3xl font-black text-violet-700">
              {outOfPocket.toLocaleString()}
            </span>
            <span className="text-xs font-bold text-slate-600">円</span>
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            通常{(tuition * 10000).toLocaleString()}円の講座が破格に
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-amber-100 shadow-xs flex flex-col justify-between">
          <div className="text-xs font-bold text-slate-500 mb-1">生涯年収アップ効果（期待）</div>
          <div className="flex items-baseline gap-1 my-1">
            <span className="text-3xl font-black text-amber-700">年＋数十万〜</span>
            <span className="text-xs font-bold text-slate-600">円</span>
          </div>
          <div className="text-[11px] text-amber-800 font-bold mt-1">
            成長産業（IT・DX）への転職で賃上げ
          </div>
        </div>
      </div>
    </div>
  );
};