"use client";

import React, { useState } from "react";
import { Smartphone, CreditCard, ShieldAlert, CheckCircle2 } from "lucide-react";

export const DigitalSalaryBenefitChecker: React.FC<{ isSimpleMode: boolean }> = ({ isSimpleMode }) => {
  const [digitalAmount, setDigitalAmount] = useState<number>(5); // 万円
  const [cashlessRatio, setCashlessRatio] = useState<number>(70); // %

  const pointRate = 0.005; // 0.5%還元
  const yearlyPointBenefit = Math.round(digitalAmount * 10000 * 12 * pointRate);

  return (
    <div className="bg-gradient-to-br from-purple-50/80 via-white to-indigo-50/60 rounded-3xl p-5 sm:p-7 border border-purple-200/80 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-purple-100 pb-4">
        <div className="flex items-center gap-2.5">
          <span className="p-2 rounded-xl bg-purple-600 text-white shadow-xs">
            <Smartphone className="w-5 h-5" />
          </span>
          <div>
            <h3 className="text-lg sm:text-xl font-black text-slate-900">
              {isSimpleMode ? "給料をPayPayで受け取るとどうなる？診断機" : "給与デジタル払い メリット＆リスク診断ナビ"}
            </h3>
            <p className="text-xs text-slate-500">
              希望額をスマホ決済残高に直接振り込んでもらう際の利便性・還元額・安全性をチェック
            </p>
          </div>
        </div>
        <span className="self-start sm:self-auto text-[11px] font-bold px-3 py-1 rounded-full bg-purple-100 text-purple-800">
          労働者の完全同意が条件
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-6 space-y-5 bg-slate-50/70 p-4 sm:p-5 rounded-2xl border border-slate-200/60">
          <div data-widget="slider" className="bg-white/80 p-3.5 rounded-xl border border-slate-200/70 transition-all hover:border-purple-300">
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs sm:text-sm font-bold text-slate-700 cursor-pointer">
                毎月アプリで受け取りたい給料額
              </label>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-purple-700">{digitalAmount}</span>
                <span className="text-xs font-bold text-slate-600">万円 / 月</span>
              </div>
            </div>
            <input
              type="range"
              min={1}
              max={20}
              step={1}
              value={digitalAmount}
              onChange={(e) => setDigitalAmount(Number(e.target.value))}
              className="w-full accent-purple-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
              aria-label="毎月アプリで受け取りたい給料額"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1 select-none">
              <span>1万円</span>
              <span>5万円(生活費)</span>
              <span>10万円(上限推奨)</span>
              <span>20万円</span>
            </div>
            <div className="flex items-center justify-end gap-1 mt-2 pt-1 border-t border-slate-100 text-[10px] text-slate-400">
              <span className="bg-slate-100 px-1.5 py-0.5 rounded text-[9px] font-mono text-slate-500">← →</span>
              <span>受取希望額調整</span>
            </div>
          </div>

          <div className="bg-white/80 p-3.5 rounded-xl border border-slate-200/70 space-y-2 text-xs">
            <div className="font-bold text-slate-800 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-purple-600" />
              <span>国のルールによるセーフティネット</span>
            </div>
            <ul className="space-y-1.5 text-slate-600 text-[11px] list-disc list-inside">
              <li>残高上限は最大100万円（超過分は銀行口座へ自動送金）</li>
              <li>アプリ会社の破託時は保証機関から数日以内に全額補償</li>
              <li>月1回以上のATM出金手数料が法律で無料化</li>
            </ul>
          </div>
        </div>

        <div className="lg:col-span-6 space-y-4">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-5 sm:p-6 shadow-md">
            <div className="flex items-center justify-between text-xs font-bold text-slate-300 mb-1">
              <span>年間チャージ不要・ポイント恩恵目安</span>
              <span className="bg-white/20 px-2 py-0.5 rounded-full text-[10px]">0.5%想定</span>
            </div>
            <div className="flex items-baseline gap-1 my-2">
              <span className="text-3xl sm:text-4xl font-black tracking-tight">{yearlyPointBenefit.toLocaleString()}</span>
              <span className="text-base sm:text-lg font-bold">円 相当 / 年</span>
            </div>
            <p className="text-xs text-slate-300">
              銀行ATMへ出向く往復時間（年間約10〜15時間）をゼロに節約できます。
            </p>
          </div>

          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-2 text-xs">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-amber-600" />
              <span>注意：全額受取りを避けるべき理由</span>
            </div>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              家賃の引き落とし、住宅ローン、クレジットカード決済、公共料金は依然として銀行口座引き落としが主流です。全額をアプリにしてしまうと支払い不能になる恐れがあるため、「生活費の数万円のみ」の分割受取が推奨されます。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
