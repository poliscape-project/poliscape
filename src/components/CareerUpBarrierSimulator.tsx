/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { TrendingUp, Wallet, ShieldCheck, Sparkles, Building2, CheckCircle2 } from "lucide-react";

export const CareerUpBarrierSimulator: React.FC<{ isSimpleMode?: boolean }> = ({ isSimpleMode = false }) => {
  const [salary, setSalary] = useState<number>(120); // 年収（万円）
  const [hasSubsidyBonus, setHasSubsidyBonus] = useState<boolean>(true); // 企業の手当て補填

  // 社会保険料（健康保険＋厚生年金で約15%＝年間約18万円）
  const socialInsurance = Math.round((salary * 10000) * 0.15);
  // 企業への国の助成金（1人あたり最大50万円・年間最大20万円程度を手当に充当）
  const subsidyAllowance = hasSubsidyBonus ? socialInsurance : 0;

  // 手取り概算
  const standardTakeHome = (salary * 10000) - socialInsurance;
  const subsidizedTakeHome = standardTakeHome + subsidyAllowance;

  // 厚生年金加入による将来の年金増額（年額＋約1.5万〜3万円/年）
  const futurePensionBoost = Math.round((salary / 100) * 16000);

  return (
    <div className="bg-gradient-to-br from-teal-50/80 via-white to-blue-50/60 rounded-3xl p-5 sm:p-7 border border-teal-200/80 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-teal-100 pb-4">
        <div className="flex items-center gap-2.5">
          <span className="p-2 rounded-xl bg-teal-600 text-white shadow-xs">
            <TrendingUp className="w-5 h-5" />
          </span>
          <div>
            <h3 className="text-lg sm:text-xl font-black text-slate-900">
              {isSimpleMode ? "年収106万の壁 助成金・手取り計算機" : "キャリアアップ助成金（年収の壁突破コース）シミュレーター"}
            </h3>
            <p className="text-xs text-slate-500">
              社保加入時の手取り減（約15%）を企業手当と国の助成金で全額補填する効果を試算
            </p>
          </div>
        </div>
        <span className="self-start sm:self-auto text-[11px] font-bold px-3 py-1 rounded-full bg-teal-100 text-teal-800">
          1人最大50万円助成中
        </span>
      </div>

      {/* コントロール */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 space-y-2">
          <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Wallet className="w-3.5 h-3.5 text-teal-600" />
              <span>現在のパート・アルバイト年収</span>
            </span>
            <span className="text-teal-700 font-black">{salary}万円</span>
          </label>
          <input
            type="range"
            min={100}
            max={150}
            step={5}
            value={salary}
            onChange={(e) => setSalary(Number(e.target.value))}
            className="w-full accent-teal-600 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-400 font-bold">
            <span>100万円</span>
            <span>106万（社保加入ライン）</span>
            <span>150万円</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 space-y-2 flex flex-col justify-between">
          <div>
            <div className="text-xs font-bold text-slate-700 mb-1">企業の手取り補填手当の有無</div>
            <div className="grid grid-cols-2 gap-1.5 pt-1">
              <button
                type="button"
                onClick={() => setHasSubsidyBonus(true)}
                className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                  hasSubsidyBonus
                    ? "bg-teal-600 text-white border-teal-600 shadow-xs"
                    : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                }`}
              >
                手当あり（国の助成活用）
              </button>
              <button
                type="button"
                onClick={() => setHasSubsidyBonus(false)}
                className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                  !hasSubsidyBonus
                    ? "bg-teal-600 text-white border-teal-600 shadow-xs"
                    : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                }`}
              >
                手当なし（自腹社保）
              </button>
            </div>
          </div>
          <p className="text-[10px] text-slate-400">※企業に最大50万円の助成金が出る国の制度</p>
        </div>
      </div>

      {/* 計算結果カード */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        <div className="bg-white rounded-2xl p-4 border border-teal-100 shadow-xs flex flex-col justify-between">
          <div className="text-xs font-bold text-slate-500 mb-1">年間手取り額（補填後）</div>
          <div className="flex items-baseline gap-1 my-1">
            <span className="text-3xl font-black text-teal-700">
              約{(subsidizedTakeHome / 10000).toFixed(1)}
            </span>
            <span className="text-xs font-bold text-slate-600">万円/年</span>
          </div>
          <div className="text-[11px] font-bold text-emerald-700 mt-1">
            {hasSubsidyBonus ? "手当で社保天引き分が相殺！" : "社会保険料天引きで手取り急減"}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-blue-100 shadow-xs flex flex-col justify-between">
          <div className="text-xs font-bold text-slate-500 mb-1">会社がもらえる国の助成金</div>
          <div className="flex items-baseline gap-1 my-1">
            <span className="text-3xl font-black text-blue-700">
              最大 50
            </span>
            <span className="text-xs font-bold text-slate-600">万円/人</span>
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            手当支給や賃上げで最長2年間支援
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-indigo-100 shadow-xs flex flex-col justify-between">
          <div className="text-xs font-bold text-slate-500 mb-1">将来の厚生年金プラス分</div>
          <div className="flex items-baseline gap-1 my-1">
            <span className="text-3xl font-black text-indigo-700">
              ＋約{(futurePensionBoost / 1000).toFixed(0)}千
            </span>
            <span className="text-xs font-bold text-slate-600">円/年</span>
          </div>
          <div className="text-[11px] text-indigo-700 font-bold mt-1">
            手取り減なしで将来年金も増額
          </div>
        </div>
      </div>
    </div>
  );
};