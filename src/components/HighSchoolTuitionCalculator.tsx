/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { GraduationCap, Wallet, Sparkles, Building2, ShieldCheck, CheckCircle2 } from "lucide-react";

export const HighSchoolTuitionCalculator: React.FC<{ isSimpleMode?: boolean }> = ({ isSimpleMode = false }) => {
  const [schoolType, setSchoolType] = useState<string>("private"); // "public", "private"
  const [region, setRegion] = useState<string>("tokyo"); // "tokyo", "osaka", "national"
  const [income, setIncome] = useState<number>(950); // 万円
  const [childrenCount, setChildrenCount] = useState<number>(2);

  // 平均学費相場
  const standardTuition = schoolType === "public" ? 118800 : 480000;

  // 国の就学支援金
  let nationalGrant = 0;
  if (schoolType === "public") {
    if (income <= 910) nationalGrant = 118800;
  } else {
    if (income <= 590) nationalGrant = 396000;
    else if (income <= 910) nationalGrant = 118800;
    else nationalGrant = 0;
  }

  // 自治体独自上乗せ（東京・大阪は所得制限撤廃で私立平均全額実質無償）
  let localGrant = 0;
  let isFullyFree = false;
  if (region === "tokyo" || region === "osaka") {
    localGrant = standardTuition - nationalGrant;
    isFullyFree = true;
  } else {
    // 国の標準制度自治体
    if (income <= 910) {
      localGrant = 0;
      isFullyFree = schoolType === "public";
    } else {
      localGrant = 0;
      isFullyFree = false;
    }
  }

  const totalGrant = Math.min(standardTuition, nationalGrant + localGrant);
  const outOfPocket = standardTuition - totalGrant;

  return (
    <div className="bg-gradient-to-br from-indigo-50/80 via-white to-sky-50/60 rounded-3xl p-5 sm:p-7 border border-indigo-200/80 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-indigo-100 pb-4">
        <div className="flex items-center gap-2.5">
          <span className="p-2 rounded-xl bg-indigo-600 text-white shadow-xs">
            <GraduationCap className="w-5 h-5" />
          </span>
          <div>
            <h3 className="text-lg sm:text-xl font-black text-slate-900">
              {isSimpleMode ? "高校の授業料 タダになるか計算機" : "高校授業料無償化・就学支援金シミュレーター"}
            </h3>
            <p className="text-xs text-slate-500">
              公立・私立別、お住まいの地域と年収による授業料の自己負担額を診断
            </p>
          </div>
        </div>
        <span className="self-start sm:self-auto text-[11px] font-bold px-3 py-1 rounded-full bg-indigo-100 text-indigo-800">
          所得制限撤廃の波及中
        </span>
      </div>

      {/* 入力フォーム */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 space-y-2">
          <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-indigo-600" />
            <span>進学先の高校区分</span>
          </label>
          <div className="grid grid-cols-2 gap-1.5">
            <button
              type="button"
              onClick={() => setSchoolType("public")}
              className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                schoolType === "public"
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-xs"
                  : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
              }`}
            >
              公立高校
            </button>
            <button
              type="button"
              onClick={() => setSchoolType("private")}
              className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                schoolType === "private"
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-xs"
                  : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
              }`}
            >
              私立高校
            </button>
          </div>
          <p className="text-[10px] text-slate-400">平均学費: {schoolType === "public" ? "約11.8万円" : "約48万円"}</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 space-y-2">
          <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>お住まいの地域</span>
          </label>
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="w-full p-2 text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-indigo-500"
          >
            <option value="tokyo">東京都（所得制限なし・私立も全額）</option>
            <option value="osaka">大阪府（所得制限なし・完全無償化）</option>
            <option value="national">その他道県（国の就学支援金基準）</option>
          </select>
          <p className="text-[10px] text-slate-400">※自治体独自の上乗せの有無</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 space-y-2">
          <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Wallet className="w-3.5 h-3.5 text-indigo-600" />
              <span>世帯年収（目安）</span>
            </span>
            <span className="text-indigo-700 font-black">{income}万円</span>
          </label>
          <input
            type="range"
            min={300}
            max={1500}
            step={50}
            value={income}
            onChange={(e) => setIncome(Number(e.target.value))}
            className="w-full accent-indigo-600 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-400 font-bold">
            <span>300万</span>
            <span>910万（国境界）</span>
            <span>1,500万</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 space-y-2">
          <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <GraduationCap className="w-3.5 h-3.5 text-indigo-600" />
            <span>扶養する子どもの数</span>
          </label>
          <div className="grid grid-cols-3 gap-1">
            {[1, 2, 3].map((cnt) => (
              <button
                key={cnt}
                type="button"
                onClick={() => setChildrenCount(cnt)}
                className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                  childrenCount === cnt
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-xs"
                    : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                }`}
              >
                {cnt === 3 ? "3人以上" : `${cnt}人`}
              </button>
            ))}
          </div>
          <p className="text-[10px] text-slate-400">※多子世帯優遇措置の判定</p>
        </div>
      </div>

      {/* 計算結果カード */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        <div className="bg-white rounded-2xl p-4 border border-indigo-100 shadow-xs flex flex-col justify-between">
          <div className="text-xs font-bold text-slate-500 mb-1">授業料の年間自己負担額</div>
          <div className="flex items-baseline gap-1 my-1">
            <span className={`text-3xl font-black ${outOfPocket === 0 ? "text-emerald-600" : "text-rose-600"}`}>
              {outOfPocket === 0 ? "実質 0" : outOfPocket.toLocaleString()}
            </span>
            <span className="text-xs font-bold text-slate-600">円/年</span>
          </div>
          <div className="text-[11px] font-bold text-indigo-700 mt-1">
            {outOfPocket === 0 ? "授業料全額が助成対象！" : "国の所得制限を超過（自己負担あり）"}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-emerald-100 shadow-xs flex flex-col justify-between">
          <div className="text-xs font-bold text-slate-500 mb-1">国＋自治体の助成総額</div>
          <div className="flex items-baseline gap-1 my-1">
            <span className="text-3xl font-black text-emerald-600">
              {totalGrant.toLocaleString()}
            </span>
            <span className="text-xs font-bold text-slate-600">円/年</span>
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            国:{nationalGrant.toLocaleString()}円 ＋ 自治体:{localGrant.toLocaleString()}円
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-sky-100 shadow-xs flex flex-col justify-between">
          <div className="text-xs font-bold text-slate-500 mb-1">高校3年間の教育費浮く総額</div>
          <div className="flex items-baseline gap-1 my-1">
            <span className="text-3xl font-black text-sky-700">
              約{(totalGrant * 3 / 10000).toFixed(1)}
            </span>
            <span className="text-xs font-bold text-slate-600">万円 支援</span>
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            ※教科書・制服・修学旅行費等は別途必要
          </div>
        </div>
      </div>

      {/* 地域格差に関する注意点 */}
      <div className="bg-indigo-900 text-white rounded-2xl p-4 text-xs space-y-1.5">
        <div className="font-bold flex items-center gap-1.5 text-indigo-200">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>現在の無償化ルールと地域間格差について</span>
        </div>
        <p className="text-[11px] text-indigo-100 leading-relaxed">
          東京都や大阪府では年収に関係なく私立高校まで全額実質無償化されていますが、国の標準制度の自治体では年収910万円を超えると公立も含めて支援金ゼロとなります。この教育格差を是正するため、国会で全国一律の所得制限撤廃が議論されています。
        </p>
      </div>
    </div>
  );
};