/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { Trees, Wallet, MapPin, Sparkles, AlertTriangle, CheckCircle2 } from "lucide-react";

export const ForestEnvironmentTaxChecker: React.FC<{ isSimpleMode?: boolean }> = ({ isSimpleMode = false }) => {
  const [taxpayers, setTaxpayers] = useState<number>(2); // 世帯内の納税人数
  const [municipalityType, setMunicipalityType] = useState<string>("city"); // "urban" (大都市), "city" (地方都市), "mountain" (山間部)

  const annualTax = taxpayers * 1000;
  // 復興特別住民税（年1000円）終了との差し引き
  const netIncreaseFromPast = 0;

  return (
    <div className="bg-gradient-to-br from-emerald-50/80 via-white to-teal-50/60 rounded-3xl p-5 sm:p-7 border border-emerald-200/80 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-emerald-100 pb-4">
        <div className="flex items-center gap-2.5">
          <span className="p-2 rounded-xl bg-emerald-600 text-white shadow-xs">
            <Trees className="w-5 h-5" />
          </span>
          <div>
            <h3 className="text-lg sm:text-xl font-black text-slate-900">
              {isSimpleMode ? "森林環境税 世帯負担＆使い道チェッカー" : "森林環境税（年1,000円）世帯負担・使途診断ナビ"}
            </h3>
            <p className="text-xs text-slate-500">
              2024年度から住民税均等割に上乗せ。世帯の納税額とお住まいの自治体での使途を可視化
            </p>
          </div>
        </div>
        <span className="self-start sm:self-auto text-[11px] font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800">
          2024年度〜課税開始済
        </span>
      </div>

      {/* 入力パネル */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 space-y-2">
          <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <Wallet className="w-3.5 h-3.5 text-emerald-600" />
            <span>世帯内で住民税を納めている人数</span>
          </label>
          <div className="grid grid-cols-4 gap-1.5">
            {[1, 2, 3, 4].map((cnt) => (
              <button
                key={cnt}
                type="button"
                onClick={() => setTaxpayers(cnt)}
                className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                  taxpayers === cnt
                    ? "bg-emerald-600 text-white border-emerald-600 shadow-xs"
                    : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                }`}
              >
                {cnt}人
              </button>
            ))}
          </div>
          <p className="text-[10px] text-slate-400">※共働き夫婦の場合は世帯で計2人（年2,000円）</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 space-y-2">
          <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-emerald-600" />
            <span>お住まいの市区町村の森林タイプ</span>
          </label>
          <select
            value={municipalityType}
            onChange={(e) => setMunicipalityType(e.target.value)}
            className="w-full p-2 text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-emerald-500"
          >
            <option value="urban">東京23区・政令市（森林ほぼなし・人口大）</option>
            <option value="city">一般の地方都市（近郊に里山・一部山林あり）</option>
            <option value="mountain">山間部・林業地域（広大な人工林・過疎地）</option>
          </select>
          <p className="text-[10px] text-slate-400">※人口3割・森林面積5割等で配分されます</p>
        </div>
      </div>

      {/* 計算結果カード */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        <div className="bg-white rounded-2xl p-4 border border-emerald-100 shadow-xs flex flex-col justify-between">
          <div className="text-xs font-bold text-slate-500 mb-1">世帯の年間負担額</div>
          <div className="flex items-baseline gap-1 my-1">
            <span className="text-3xl font-black text-emerald-700">
              {annualTax.toLocaleString()}
            </span>
            <span className="text-xs font-bold text-slate-600">円/年</span>
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            1人年1,000円 × {taxpayers}人（住民税均等割）
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-teal-100 shadow-xs flex flex-col justify-between">
          <div className="text-xs font-bold text-slate-500 mb-1">実質手取りへの影響</div>
          <div className="flex items-baseline gap-1 my-1">
            <span className="text-3xl font-black text-teal-700">実質 ±0</span>
            <span className="text-xs font-bold text-slate-600">円</span>
          </div>
          <div className="text-[11px] text-teal-800 font-bold mt-1">
            復興特別税（年1000円）終了と入れ替わり
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-amber-100 shadow-xs flex flex-col justify-between">
          <div className="text-xs font-bold text-slate-500 mb-1">お住まいの自治体での主な使い道</div>
          <div className="text-sm font-bold text-slate-800 my-1 leading-snug">
            {municipalityType === "urban" && "公共施設・学校の木質化・木育（一部基金積立）"}
            {municipalityType === "city" && "身近な里山保全・危険木伐採・木材利用普及"}
            {municipalityType === "mountain" && "スギ・ヒノキの間伐・路網整備・境界明確化"}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            全国一律国税 → 市区町村へ配分
          </div>
        </div>
      </div>

      {/* 基金問題の解説 */}
      <div className="bg-emerald-950 text-white rounded-2xl p-4 text-xs space-y-1.5">
        <div className="font-bold flex items-center gap-1.5 text-emerald-300">
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>森林環境税の注目ポイント：都市部の基金眠り問題</span>
        </div>
        <p className="text-[11px] text-emerald-100 leading-relaxed">
          配分基準の3割が人口割となっているため、森林の少ない大都市に多額の税金が配分され、使い道が見つからず基金として積み立てられたままになっている問題が国会で指摘されています。これを受け、真に山林整備が必要な過疎・山間部自治体への配分比率を高める見直しが進められています。
        </p>
      </div>
    </div>
  );
};