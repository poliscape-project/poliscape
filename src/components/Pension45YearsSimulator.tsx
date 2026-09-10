/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { Clock, Wallet, TrendingUp, AlertTriangle, CheckCircle2, ShieldCheck } from "lucide-react";

export const Pension45YearsSimulator: React.FC<{ isSimpleMode?: boolean }> = ({ isSimpleMode = false }) => {
  const [jobType, setJobType] = useState<string>("self"); // "self" (第1号), "employee" (第2号), "spouse" (第3号)
  const [lifeExpectancy, setLifeExpectancy] = useState<number>(85); // 寿命想定

  // 月の国民年金保険料（2024〜2026年目安 約17,000円）
  const monthlyPremium = 17000;
  // 5年間の追加納付額（60〜65歳・60ヶ月）
  const extraPayment = jobType === "self" ? monthlyPremium * 60 : 0;

  // 満額年金（年額）: 現行40年約81.6万円 vs 45年約91.8万円（+10.2万円/年）
  const currentAnnualPension = 816000;
  const extraAnnualPension = 102000;
  const newAnnualPension = currentAnnualPension + extraAnnualPension;

  // 65歳から受給開始
  const receiveYears = Math.max(0, lifeExpectancy - 65);
  const lifetimeGain = (extraAnnualPension * receiveYears) - extraPayment;
  // 損益分岐点（年数）
  const breakevenYears = extraPayment > 0 ? (extraPayment / extraAnnualPension).toFixed(1) : 0;
  const breakevenAge = (65 + Number(breakevenYears)).toFixed(1);

  return (
    <div className="bg-gradient-to-br from-amber-50/80 via-white to-orange-50/60 rounded-3xl p-5 sm:p-7 border border-amber-200/80 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-amber-100 pb-4">
        <div className="flex items-center gap-2.5">
          <span className="p-2 rounded-xl bg-amber-600 text-white shadow-xs">
            <Clock className="w-5 h-5" />
          </span>
          <div>
            <h3 className="text-lg sm:text-xl font-black text-slate-900">
              {isSimpleMode ? "年金65才まで延長 損得シミュレーター" : "基礎年金「65歳まで（45年化）」収支シミュレーター"}
            </h3>
            <p className="text-xs text-slate-500">
              自営業・会社員別の追加保険料と、将来の年金増額・損益分岐点を比較
            </p>
          </div>
        </div>
        <span className="self-start sm:self-auto text-[11px] font-bold px-3 py-1 rounded-full bg-amber-100 text-amber-900">
          年金改革の最重要論点
        </span>
      </div>

      {/* コントロール */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 space-y-2">
          <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <Wallet className="w-3.5 h-3.5 text-amber-600" />
            <span>あなたの職業区分</span>
          </label>
          <div className="grid grid-cols-3 gap-1.5">
            {[
              { id: "self", label: "自営業・自由業", sub: "第1号被保険者" },
              { id: "employee", label: "会社員・公務員", sub: "第2号被保険者" },
              { id: "spouse", label: "専業主婦・夫", sub: "第3号被保険者" },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setJobType(item.id)}
                className={`p-2 text-center rounded-xl border transition-all ${
                  jobType === item.id
                    ? "bg-amber-600 text-white border-amber-600 shadow-xs"
                    : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                }`}
              >
                <div className="text-xs font-bold">{item.label}</div>
                <div className={`text-[10px] ${jobType === item.id ? "text-amber-100" : "text-slate-400"}`}>{item.sub}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 space-y-2">
          <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-amber-600" />
              <span>想定する寿命</span>
            </span>
            <span className="text-amber-700 font-black">{lifeExpectancy}歳まで</span>
          </label>
          <input
            type="range"
            min={70}
            max={95}
            step={1}
            value={lifeExpectancy}
            onChange={(e) => setLifeExpectancy(Number(e.target.value))}
            className="w-full accent-amber-600 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-400 font-bold">
            <span>70歳</span>
            <span>80歳（平均）</span>
            <span>95歳</span>
          </div>
        </div>
      </div>

      {/* 試算結果カード */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        <div className="bg-white rounded-2xl p-4 border border-rose-100 shadow-xs flex flex-col justify-between">
          <div className="text-xs font-bold text-slate-500 mb-1">60〜65歳の追加保険料負担</div>
          <div className="flex items-baseline gap-1 my-1">
            <span className="text-3xl font-black text-rose-700">
              {extraPayment === 0 ? "追加負担 0" : `約${(extraPayment / 10000).toFixed(0)}万`}
            </span>
            <span className="text-xs font-bold text-slate-600">{extraPayment === 0 ? "" : "円"}</span>
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            {jobType === "self"
              ? "月約1.7万円 × 5年間（全額自腹）"
              : "会社員は厚生年金加入のため追加なし"}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-emerald-100 shadow-xs flex flex-col justify-between">
          <div className="text-xs font-bold text-slate-500 mb-1">将来の基礎年金（年額）</div>
          <div className="flex items-baseline gap-1 my-1">
            <span className="text-3xl font-black text-emerald-600">
              約{(newAnnualPension / 10000).toFixed(1)}
            </span>
            <span className="text-xs font-bold text-slate-600">万円/年</span>
          </div>
          <div className="text-[11px] font-bold text-emerald-700 mt-1">
            現行より 年額＋約10.2万円増額（月＋8,500円）
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-amber-100 shadow-xs flex flex-col justify-between">
          <div className="text-xs font-bold text-slate-500 mb-1">{lifeExpectancy}歳までの生涯損益</div>
          <div className="flex items-baseline gap-1 my-1">
            <span className={`text-3xl font-black ${lifetimeGain >= 0 ? "text-emerald-600" : "text-rose-600"}`}>
              {lifetimeGain >= 0 ? `＋${(lifetimeGain / 10000).toFixed(0)}万` : `${(lifetimeGain / 10000).toFixed(0)}万`}
            </span>
            <span className="text-xs font-bold text-slate-600">円</span>
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            損益分岐点: 約{breakevenAge}歳で元が取れる！
          </div>
        </div>
      </div>

      {/* 解説フッター */}
      <div className="bg-amber-950 text-white rounded-2xl p-4 text-xs space-y-1.5">
        <div className="font-bold flex items-center gap-1.5 text-amber-300">
          <AlertTriangle className="w-4 h-4 text-amber-400" />
          <span>45年化の損得ポイント：長生きするほど確実に得をする</span>
        </div>
        <p className="text-[11px] text-amber-100 leading-relaxed">
          自営業の方は一時的に約100万円の出費となりますが、受給開始後約10年（75歳前後）で支払った分を取り戻せます。日本の平均寿命（男性81歳、女性87歳）まで生きれば、支払った額より100万〜150万円以上多く年金を受け取れる計算です。一方、病気等で早く亡くなった場合の掛け捨てリスクが懸念されています。
        </p>
      </div>
    </div>
  );
};