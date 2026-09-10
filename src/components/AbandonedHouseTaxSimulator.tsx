/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { AlertTriangle, Home, Wallet, TrendingUp, ShieldAlert, CheckCircle2 } from "lucide-react";

export const AbandonedHouseTaxSimulator: React.FC<{ isSimpleMode?: boolean }> = ({ isSimpleMode = false }) => {
  const [status, setStatus] = useState<string>("warning"); // "good", "warning" (管理不全), "danger" (特定空家)
  const [landValue, setLandValue] = useState<number>(1000); // 評価額（万円）

  // 本則税率: 固定資産税1.4% + 都市計画税0.3% = 1.7%
  const baseTax = (landValue * 10000) * 0.014;

  // 住宅用地特例（小規模住宅用地200㎡以下: 1/6）
  const privilegedTax = Math.round(baseTax / 6);

  // 特例解除時（管理不全空家で勧告を受けると1/6特例が消滅）
  const actualTax = status === "good" ? privilegedTax : Math.round(baseTax);
  const taxIncrease = actualTax - privilegedTax;
  const demolitionCost = 1800000; // 解体費用の相場（約180万円）

  return (
    <div className="bg-gradient-to-br from-rose-50/80 via-white to-amber-50/60 rounded-3xl p-5 sm:p-7 border border-rose-200/80 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-rose-100 pb-4">
        <div className="flex items-center gap-2.5">
          <span className="p-2 rounded-xl bg-rose-600 text-white shadow-xs">
            <Home className="w-5 h-5" />
          </span>
          <div>
            <h3 className="text-lg sm:text-xl font-black text-slate-900">
              {isSimpleMode ? "空き家の税金 6倍増税チェッカー" : "管理不全空き家 固定資産税特例解除シミュレーター"}
            </h3>
            <p className="text-xs text-slate-500">
              窓割れや草木繁茂の実家放置で固定資産税がいくら跳ね上がるかを診断
            </p>
          </div>
        </div>
        <span className="self-start sm:self-auto text-[11px] font-bold px-3 py-1 rounded-full bg-rose-100 text-rose-800">
          法改正で勧告即解除
        </span>
      </div>

      {/* コントロール */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 space-y-2">
          <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
            <span>実家・空き家の管理状態</span>
          </label>
          <div className="space-y-1.5">
            {[
              { id: "good", label: "適切に管理中", desc: "定期換気や除草を実施（1/6減額継続）" },
              { id: "warning", label: "管理不全空家（勧告）", desc: "窓ガラス破損・ゴミ散乱（特例解除・6倍増税）" },
              { id: "danger", label: "特定空家（命令・代執行）", desc: "倒壊の切迫危険（50万円以下過料＋強制解体）" },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setStatus(item.id)}
                className={`w-full p-2.5 text-left rounded-xl border transition-all flex items-center justify-between ${
                  status === item.id
                    ? "bg-rose-50 border-rose-500 text-rose-900 shadow-2xs"
                    : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                }`}
              >
                <div>
                  <div className="text-xs font-bold">{item.label}</div>
                  <div className="text-[10px] text-slate-500">{item.desc}</div>
                </div>
                {status === item.id && <CheckCircle2 className="w-4 h-4 text-rose-600 shrink-0" />}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 space-y-2 flex flex-col justify-between">
          <div>
            <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Wallet className="w-3.5 h-3.5 text-rose-600" />
                <span>土地の固定資産税評価額</span>
              </span>
              <span className="text-rose-700 font-black">{landValue}万円</span>
            </label>
            <input
              type="range"
              min={300}
              max={3000}
              step={100}
              value={landValue}
              onChange={(e) => setLandValue(Number(e.target.value))}
              className="w-full accent-rose-600 cursor-pointer my-3"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-bold">
              <span>300万円（地方・郊外）</span>
              <span>1,000万円</span>
              <span>3,000万円（都市部）</span>
            </div>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-600">
            小規模住宅用地（200㎡まで）の特例が解除されると、土地に対する税額は本則（1.4%）が適用され、課税標準額の減額がなくなり実質的に最大6倍近くに跳ね上がります。
          </div>
        </div>
      </div>

      {/* 試算結果カード */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="text-xs font-bold text-slate-500 mb-1">現行（住宅用地特例適用時）</div>
          <div className="flex items-baseline gap-1 my-1">
            <span className="text-3xl font-black text-slate-800">
              {privilegedTax.toLocaleString()}
            </span>
            <span className="text-xs font-bold text-slate-600">円/年</span>
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            1/6減額特例が適用された金額
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-rose-200 shadow-xs flex flex-col justify-between">
          <div className="text-xs font-bold text-rose-700 mb-1">勧告後（特例解除時の税額）</div>
          <div className="flex items-baseline gap-1 my-1">
            <span className="text-3xl font-black text-rose-700">
              {actualTax.toLocaleString()}
            </span>
            <span className="text-xs font-bold text-slate-600">円/年</span>
          </div>
          <div className="text-[11px] font-bold text-rose-700 mt-1">
            {status === "good" ? "特例継続中（増税なし）" : `年額 ＋${taxIncrease.toLocaleString()}円 増税！`}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-amber-100 shadow-xs flex flex-col justify-between">
          <div className="text-xs font-bold text-slate-500 mb-1">解体工事費（相場）との比較</div>
          <div className="flex items-baseline gap-1 my-1">
            <span className="text-3xl font-black text-amber-700">
              約{(demolitionCost / 10000).toFixed(0)}万
            </span>
            <span className="text-xs font-bold text-slate-600">円</span>
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            放置増税 {Math.round(demolitionCost / (taxIncrease || 1))}年分で解体代に匹敵
          </div>
        </div>
      </div>

      {/* 対策アドバイス */}
      <div className="bg-slate-900 text-white rounded-2xl p-4 text-xs space-y-1.5">
        <div className="font-bold flex items-center gap-1.5 text-amber-300">
          <AlertTriangle className="w-4 h-4 text-amber-400" />
          <span>空き家放置を防ぐための3大対策</span>
        </div>
        <ul className="list-disc pl-5 space-y-1 text-[11px] text-slate-300">
          <li>市区町村の「空家解体補助金（最大数十万〜100万円補助）」を活用して更地化する</li>
          <li>「空き家バンク」に登録し、古民家リノベーション希望者へ安価で売却・賃貸する</li>
          <li>利用予定のない負動産は「相続土地国庫帰属制度」を利用して国へ引き渡す</li>
        </ul>
      </div>
    </div>
  );
};