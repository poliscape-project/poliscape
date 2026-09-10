"use client";

import React, { useState } from "react";
import { AlertTriangle, ShieldCheck, CheckCircle2, AlertCircle } from "lucide-react";

export const BicycleTrafficPenaltyChecker: React.FC<{ isSimpleMode: boolean }> = ({ isSimpleMode }) => {
  const [selectedViolation, setSelectedViolation] = useState<string>("smartphone");

  const violations: Record<string, { label: string; penalty: number; isRedTicket: boolean; description: string; penaltyText: string }> = {
    smartphone: {
      label: "スマホ操作・通話（ながら運転）",
      penalty: 12000,
      isRedTicket: false,
      description: "自転車走行中に画面を注視したり通話する行為。事故の危険を生じさせた場合は即「赤切符（1年以下の懲役または30万円以下の罰金）」",
      penaltyText: "青切符：反則金 約12,000円（危険時は刑事罰）"
    },
    red_light: {
      label: "信号無視（赤信号進行）",
      penalty: 6000,
      isRedTicket: false,
      description: "交差点等で赤信号を無視して突っ切る行為。歩行者との衝突リスクが最も高い重大違反",
      penaltyText: "青切符：反則金 約6,000円"
    },
    wrong_way: {
      label: "右側通行（逆走）",
      penalty: 6000,
      isRedTicket: false,
      description: "車道の右側を走る行為。自転車は軽車両のため、車道の左側端を通行する義務があります",
      penaltyText: "青切符：反則金 約6,000円"
    },
    stop_sign: {
      label: "一時停止無視（止まれ）",
      penalty: 5000,
      isRedTicket: false,
      description: "一時停止標識のある交差点で停止線を越えて進入する行為。出会い頭衝突事故の主因",
      penaltyText: "青切符：反則金 約5,000円"
    },
    drunk_driving: {
      label: "酒気帯び運転・飲酒運転",
      penalty: 0,
      isRedTicket: true,
      description: "お酒を飲んで自転車に乗る行為。青切符の対象外であり、必ず即座に「赤切符（3年以下の懲役または50万円以下の罰金）」が適用",
      penaltyText: "赤切符（刑事事件）：5年以下の懲役または100万円以下の罰金"
    }
  };

  const current = violations[selectedViolation];

  return (
    <div className="bg-gradient-to-br from-amber-50/80 via-white to-yellow-50/60 rounded-3xl p-5 sm:p-7 border border-amber-200/80 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-amber-100 pb-4">
        <div className="flex items-center gap-2.5">
          <span className="p-2 rounded-xl bg-amber-600 text-white shadow-xs">
            <AlertTriangle className="w-5 h-5" />
          </span>
          <div>
            <h3 className="text-lg sm:text-xl font-black text-slate-900">
              {isSimpleMode ? "自転車の違反 いくら取られる？判定機" : "自転車の交通違反「青切符（反則金）」判定チェッカー"}
            </h3>
            <p className="text-xs text-slate-500">
              16歳以上が対象。違反行為を選択すると、反則金額と赤切符（刑事罰）の境界線を瞬時に判定
            </p>
          </div>
        </div>
        <span className="self-start sm:self-auto text-[11px] font-bold px-3 py-1 rounded-full bg-amber-100 text-amber-800">
          2026年本格施行
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-6 space-y-3 bg-slate-50/70 p-4 sm:p-5 rounded-2xl border border-slate-200/60">
          <label className="text-xs sm:text-sm font-bold text-slate-700 block mb-1">
            診断したい自転車の違反行為
          </label>
          <div data-widget="button-group" role="radiogroup" className="space-y-2">
            {Object.entries(violations).map(([key, v]) => (
              <button
                key={key}
                type="button"
                role="radio"
                aria-checked={selectedViolation === key}
                onClick={() => setSelectedViolation(key)}
                className={`w-full p-3 rounded-xl border text-left font-bold text-xs transition-all flex items-center justify-between ${
                  selectedViolation === key
                    ? v.isRedTicket
                      ? "bg-rose-600 text-white border-rose-600 shadow-xs ring-1 ring-rose-600"
                      : "bg-amber-600 text-white border-amber-600 shadow-xs ring-1 ring-amber-600"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                }`}
              >
                <span>{v.label}</span>
                <span className="text-[10px] opacity-80">
                  {v.isRedTicket ? "赤切符" : `約${v.penalty.toLocaleString()}円`}
                </span>
              </button>
            ))}
          </div>
          <div className="flex items-center justify-end gap-1 text-[10px] text-slate-400 pt-1">
            <span className="bg-slate-100 px-1.5 py-0.5 rounded text-[9px] font-mono text-slate-500">← →</span>
            <span>違反切替</span>
          </div>
        </div>

        <div className="lg:col-span-6 space-y-4">
          <div className={`rounded-2xl p-5 sm:p-6 shadow-md text-white ${
            current.isRedTicket ? "bg-gradient-to-br from-rose-900 to-red-800" : "bg-gradient-to-br from-slate-900 to-slate-800"
          }`}>
            <div className="flex items-center justify-between text-xs font-bold text-slate-300 mb-1">
              <span>取締り区分とペナルティ</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                current.isRedTicket ? "bg-rose-500 text-white" : "bg-blue-500 text-white"
              }`}>
                {current.isRedTicket ? "刑事罰（赤切符）" : "行政処分（青切符）"}
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-black tracking-tight my-2">
              {current.isRedTicket ? "前科・罰金刑" : `反則金 約 ${current.penalty.toLocaleString()} 円`}
            </div>
            <p className="text-xs text-slate-300 leading-relaxed pt-2 border-t border-white/10">
              {current.description}
            </p>
          </div>

          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-2 text-xs">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-amber-600" />
              <span>青切符と赤切符の違い</span>
            </div>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              青切符は期日内に反則金を納付すれば刑事裁判にならず、前科もつきません。しかし反則金を無視し続けると通常の刑事手続き（起訴・前科）へ移行します。酒気帯びなどの悪質な違反は最初から赤切符です。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
