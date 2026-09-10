"use client";

import React, { useState } from "react";
import { Wallet, AlertTriangle, TrendingDown, Sparkles, CheckCircle2, ArrowRight, Info, ShieldCheck } from "lucide-react";

export const IncomeBarrierCalculator: React.FC<{ isSimpleMode: boolean }> = ({ isSimpleMode }) => {
  // 額面年収（万円単位、80〜200万円）
  const [income, setIncome] = useState<number>(105);
  // 勤務先の規模（大企業：106万の壁対象、中小企業：130万の壁対象）
  const [companySize, setCompanySize] = useState<"large" | "small">("large");
  // 178万円引き上げシミュレーション比較トグル
  const [showReformComparison, setShowReformComparison] = useState<boolean>(false);

  const minIncome = 80;
  const maxIncome = 200;

  // 手取り概算計算（現行制度）
  const incomeYen = income * 10000;

  // 1. 所得税（103万円を超えた分に約5%）
  let incomeTax = 0;
  if (incomeYen > 1030000) {
    incomeTax = Math.floor((incomeYen - 1030000) * 0.05);
  }

  // 2. 住民税（約100万円を超えた分に約10%）
  let residentTax = 0;
  if (incomeYen > 1000000) {
    residentTax = Math.floor((incomeYen - 1000000) * 0.10);
  }

  // 3. 社会保険料（健康保険＋厚生年金：約15%）
  // 大企業（51人以上）：106万以上で本人が勤務先社保に加入
  // 中小企業（50人以下）：106万では社保なし（扶養内）、130万以上で配偶者の扶養から外れ自己加入
  let socialInsurance = 0;
  if (companySize === "large" && incomeYen >= 1060000) {
    socialInsurance = Math.floor(incomeYen * 0.15);
  } else if (companySize === "small" && incomeYen >= 1300000) {
    socialInsurance = Math.floor(incomeYen * 0.15);
  }

  // 現行制度の手取り
  const totalDeduction = incomeTax + residentTax + socialInsurance;
  const takeHome = Math.max(0, incomeYen - totalDeduction);

  // 基準手取り算出ヘルパー（崖直前の手取りと比較）
  const calcBaseTakeHome = (targetIncome: number, size: "large" | "small") => {
    const yen = targetIncome * 10000;
    const it = yen > 1030000 ? Math.floor((yen - 1030000) * 0.05) : 0;
    const rt = yen > 1000000 ? Math.floor((yen - 1000000) * 0.10) : 0;
    let si = 0;
    if (size === "large" && yen >= 1060000) {
      si = Math.floor(yen * 0.15);
    } else if (size === "small" && yen >= 1300000) {
      si = Math.floor(yen * 0.15);
    }
    return yen - (it + rt + si);
  };

  // 手取りの逆転現象の警告 ＆ 親切な補足解説
  let cliffWarning = "";
  let infoNote = "";

  if (companySize === "large") {
    if (income >= 106 && income < 125) {
      const base105 = calcBaseTakeHome(105, "large");
      const drop = Math.round((base105 - takeHome) / 10000);
      cliffWarning = `額面が${income}万円に増えたのに、社会保険料（年約${Math.round(socialInsurance / 10000)}万円）が引かれたため、手取りは105万円の時（約104万円）より約${drop}万円減っています！`;
    } else if (income >= 125 && income < 130) {
      infoNote = "105万円時点の手取りを上回り、手取り回復・就労拡大ゾーンに入りました。";
    } else if (income >= 130) {
      infoNote = "従業員51人以上の勤務先のため、すでに年収106万円で社会保険に加入済みです。130万円で新たな逆転現象は起きず、働いた分手取りは順調に増えていきます。";
    }
  } else {
    // 中小企業（従業員50人以下）
    if (income >= 104 && income < 130) {
      infoNote = "従業員50人以下の勤務先のため「106万円の壁」の対象外です。配偶者の扶養内（社会保険料0円）を維持できているため、税金のみ引かれ手取りが多く残ります。";
    } else if (income >= 130 && income < 155) {
      const base129 = calcBaseTakeHome(129, "small");
      const drop = Math.round((base129 - takeHome) / 10000);
      cliffWarning = `年収130万円の壁を超えて配偶者の扶養から外れたため、社会保険料（年約${Math.round(socialInsurance / 10000)}万円）が発生！手取りは129万円の時（約125万円）より約${drop}万円激減しています！`;
    } else if (income >= 155) {
      infoNote = "129万円時点の手取り（約125万円）を取り戻し、手取り回復ゾーンに入りました。";
    }
  }

  // 178万円引き上げ案での手取り
  let reformIncomeTax = 0;
  if (incomeYen > 1780000) {
    reformIncomeTax = Math.floor((incomeYen - 1780000) * 0.05);
  }
  const reformTakeHome = Math.max(0, incomeYen - (reformIncomeTax + residentTax + socialInsurance));
  const taxSaving = incomeTax - reformIncomeTax;

  // 正確なパーセンテージ位置を計算（min: 80, max: 200, 幅: 120）
  const getPercent = (val: number) => ((val - minIncome) / (maxIncome - minIncome)) * 100;
  const currentPercent = getPercent(income);

  // 各壁のパーセンテージ位置
  const p103 = getPercent(103); // 19.17%
  const p106 = getPercent(106); // 21.67%
  const p130 = getPercent(130); // 41.67%
  const p178 = getPercent(178); // 81.67%

  // 斜め引き出し線のバッジ先座標（すべて同じ行・同じ高さに整列）
  const badge103Pos = 8.5; // 103万：斜め左上
  const badge106Pos = 28.0; // 106万：斜め右上（103万と被らない位置で同じ行）
  const badge130Pos = 50.0; // 130万：斜め右上
  const badge178Pos = 81.7; // 178万：直上

  // 現在どのゾーンにいるかの状態
  const getCurrentStatus = () => {
    if (income < 100) return { label: "完全非課税ゾーン（手取り100%）", color: "text-emerald-300", bg: "bg-emerald-500/20" };
    if (income <= 103) return { label: "所得税非課税ゾーン", color: "text-teal-300", bg: "bg-teal-500/20" };
    if (income >= 178) return { label: "178万円超：新改革ゾーン", color: "text-indigo-300", bg: "bg-indigo-500/20" };

    if (companySize === "large") {
      if (income >= 106 && income < 125) {
        return { label: "⚠️ 106万の壁：手取りの逆転ゾーン", color: "text-rose-300", bg: "bg-rose-500/20" };
      }
      return { label: "手取り回復・就労拡大ゾーン", color: "text-amber-300", bg: "bg-amber-500/20" };
    } else {
      // 中小企業
      if (income < 130) {
        return { label: "扶養内就労ゾーン（社保0円）", color: "text-teal-300", bg: "bg-teal-500/20" };
      }
      if (income >= 130 && income < 155) {
        return { label: "⚠️ 130万の壁：扶養外れ逆転ゾーン", color: "text-rose-300", bg: "bg-rose-500/20" };
      }
      return { label: "手取り回復・就労拡大ゾーン", color: "text-amber-300", bg: "bg-amber-500/20" };
    }
  };

  const status = getCurrentStatus();

  // 勤務先規模に応じたワンタッププリセット
  const quickPresets =
    companySize === "large"
      ? [
          { label: "100万（非課税）", value: 100 },
          { label: "103万（税の壁）", value: 103 },
          { label: "106万（社保の崖）", value: 106 },
          { label: "125万（手取り回復）", value: 125 },
          { label: "130万（社保継続）", value: 130 },
          { label: "178万（引上げ議論）", value: 178 },
        ]
      : [
          { label: "100万（非課税）", value: 100 },
          { label: "103万（税の壁）", value: 103 },
          { label: "129万（扶養上限）", value: 129 },
          { label: "130万（扶養の崖）", value: 130 },
          { label: "155万（手取り回復）", value: 155 },
          { label: "178万（引上げ議論）", value: 178 },
        ];

  return (
    <section className="bg-gradient-to-br from-amber-950 via-slate-900 to-teal-950 text-white rounded-3xl p-5 sm:p-8 shadow-xl relative overflow-hidden border border-amber-500/30">
      {/* 背景装飾 */}
      <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-amber-500/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-teal-500/20 blur-3xl pointer-events-none" />

      <div className="relative z-10">
        {/* ヘッダー */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
              <Wallet className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-amber-300 uppercase tracking-wider block">
                {isSimpleMode ? "いくら働くと手取りはどうなる？" : "手取りの崖シミュレーター"}
              </span>
              <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                {isSimpleMode ? "年収バーを動かして手取りをチェック" : "年収スライダーで「手取りの逆転」を体験"}
              </h3>
            </div>
          </div>
          <span className="text-xs bg-white/10 text-amber-200 px-3 py-1 rounded-full border border-white/10 font-medium">
            スライダーを動かしてテスト ↓
          </span>
        </div>

        {/* 勤務先規模トグル */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 bg-white/5 p-3 rounded-2xl border border-white/5">
          <span className="text-xs text-slate-300 font-bold">勤務先の規模（社会保険の条件）：</span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setCompanySize("large")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                companySize === "large"
                  ? "bg-amber-400 text-slate-950 shadow-xs"
                  : "bg-white/10 text-slate-300 hover:text-white"
              }`}
            >
              従業員51人以上（106万の壁あり）
            </button>
            <button
              type="button"
              onClick={() => setCompanySize("small")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                companySize === "small"
                  ? "bg-amber-400 text-slate-950 shadow-xs"
                  : "bg-white/10 text-slate-300 hover:text-white"
              }`}
            >
              従業員50人以下（130万の壁）
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* 左側：年収スライダー ＆ プリセット */}
          <div className="lg:col-span-7 space-y-5">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10 space-y-5">
              {/* 年収表示 ＆ 状態バッジ */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-white/10">
                <div>
                  <span className="text-xs font-bold text-slate-300 block">額面の年収（総支給）：</span>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="text-4xl sm:text-5xl font-black text-amber-300 tracking-tight">
                      {income}
                    </span>
                    <span className="text-sm font-bold text-slate-300">万円 / 年</span>
                  </div>
                </div>

                <div className={`self-start sm:self-auto px-3 py-1.5 rounded-xl text-xs font-bold ${status.bg} ${status.color} border border-white/10 flex items-center gap-1.5 shadow-xs`}>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{status.label}</span>
                </div>
              </div>

              {/* 美しく洗練されたゲージコンテナ（全4つの壁を同一行に整列・左3つは斜め引き出し線） */}
              <div className="space-y-1 pt-1">
                {/* 1. スライダー上部：SVG斜め引き出し線 ＆ HTMLバッジ（すべて同一行に整列） */}
                <div className="relative h-14 text-[10px] font-bold select-none">
                  {/* SVG斜め引き出し線（レスポンシブ0〜100座標、non-scaling-strokeで歪みゼロ） */}
                  <svg
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    viewBox="0 0 100 56"
                    preserveAspectRatio="none"
                  >
                    {/* ① 103万引き出し線（黄色）：接点 (p103, 56) から斜め左上 (badge103Pos, 20) へ */}
                    <path
                      d={`M ${p103} 56 L ${badge103Pos} 20`}
                      stroke="#fbbf24"
                      strokeWidth="1.5"
                      strokeDasharray="2.5,2.5"
                      vectorEffect="non-scaling-stroke"
                      fill="none"
                    />

                    {/* ② 106万引き出し線（赤色）：接点 (p106, 56) から斜め右上 (badge106Pos, 20) へ同一行接続 */}
                    {companySize === "large" && (
                      <path
                        d={`M ${p106} 56 L ${badge106Pos} 20`}
                        stroke="#f43f5e"
                        strokeWidth="1.5"
                        strokeDasharray="2.5,2.5"
                        vectorEffect="non-scaling-stroke"
                        fill="none"
                      />
                    )}

                    {/* ③ 130万引き出し線：大企業時は社保継続（スレート）、中小企業時は扶養の壁（ローズ） */}
                    <path
                      d={`M ${p130} 56 L ${badge130Pos} 20`}
                      stroke={companySize === "large" ? "#94a3b8" : "#f43f5e"}
                      strokeWidth="1.5"
                      strokeDasharray="2.5,2.5"
                      vectorEffect="non-scaling-stroke"
                      fill="none"
                    />

                    {/* ④ 178万引き出し線（ティール色）：接点 (p178, 56) から直上 (badge178Pos, 20) へ */}
                    <path
                      d={`M ${p178} 56 L ${badge178Pos} 20`}
                      stroke="#2dd4bf"
                      strokeWidth="1.5"
                      strokeDasharray="2.5,2.5"
                      vectorEffect="non-scaling-stroke"
                      fill="none"
                    />
                  </svg>

                  {/* スライダー接点ドット（HTML配置で正円を維持） */}
                  <div
                    className="absolute bottom-0 -translate-x-1/2 w-2 h-2 rounded-full bg-amber-400 ring-2 ring-slate-900 z-10"
                    style={{ left: `${p103}%` }}
                    title="103万円ポイント"
                  />
                  {companySize === "large" && (
                    <div
                      className="absolute bottom-0 -translate-x-1/2 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-slate-900 z-10"
                      style={{ left: `${p106}%` }}
                      title="106万円ポイント（社保の壁）"
                    />
                  )}
                  <div
                    className={`absolute bottom-0 -translate-x-1/2 w-2 h-2 rounded-full ring-2 ring-slate-900 z-10 ${
                      companySize === "large" ? "bg-slate-400" : "bg-rose-500"
                    }`}
                    style={{ left: `${p130}%` }}
                    title="130万円ポイント"
                  />
                  <div
                    className="absolute bottom-0 -translate-x-1/2 w-2 h-2 rounded-full bg-teal-400 ring-2 ring-slate-900 z-10"
                    style={{ left: `${p178}%` }}
                    title="178万円ポイント"
                  />

                  {/* HTMLバッジ（すべて同一の最上段 top-0 に整列・ワンタップで年収変更可能） */}
                  {/* ① 103万バッジ（斜め左上） */}
                  <button
                    type="button"
                    onClick={() => setIncome(103)}
                    className="absolute -translate-x-1/2 top-0 flex flex-col items-center z-20 cursor-pointer hover:scale-105 transition-transform"
                    style={{ left: `${badge103Pos}%` }}
                    title="タップして103万にセット"
                  >
                    <span className="bg-amber-400 text-slate-950 px-2 py-0.5 rounded-md shadow-md text-[9px] sm:text-[10px] font-black whitespace-nowrap ring-1 ring-amber-300 flex items-center gap-0.5 sm:gap-1">
                      103万<span className="opacity-75 font-bold text-[8px]">（税）</span>
                    </span>
                  </button>

                  {/* ② 106万バッジ（斜め右上・大企業時のみ表示） */}
                  {companySize === "large" && (
                    <button
                      type="button"
                      onClick={() => setIncome(106)}
                      className="absolute -translate-x-1/2 top-0 flex flex-col items-center z-20 cursor-pointer hover:scale-105 transition-transform"
                      style={{ left: `${badge106Pos}%` }}
                      title="タップして106万にセット（社保の崖）"
                    >
                      <span className="bg-rose-500 text-white px-2 py-0.5 rounded-md shadow-md text-[9px] sm:text-[10px] font-black whitespace-nowrap ring-1 ring-rose-400 flex items-center gap-0.5 sm:gap-1">
                        106万<span className="opacity-90 font-bold text-[8px]">（社保）</span>
                      </span>
                    </button>
                  )}

                  {/* ③ 130万バッジ（斜め右上・同一行） */}
                  <button
                    type="button"
                    onClick={() => setIncome(130)}
                    className="absolute -translate-x-1/2 top-0 flex flex-col items-center z-20 cursor-pointer hover:scale-105 transition-transform"
                    style={{ left: `${badge130Pos}%` }}
                    title={companySize === "large" ? "タップして130万にセット（すでに106万で加入済）" : "タップして130万にセット（扶養外れの崖）"}
                  >
                    {companySize === "large" ? (
                      <span className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded-md shadow-md text-[9px] sm:text-[10px] font-bold whitespace-nowrap ring-1 ring-slate-600 flex items-center gap-0.5 sm:gap-1">
                        130万<span className="opacity-75 text-[8px]">（加入済）</span>
                      </span>
                    ) : (
                      <span className="bg-rose-500 text-white px-2 py-0.5 rounded-md shadow-md text-[9px] sm:text-[10px] font-black whitespace-nowrap ring-1 ring-rose-400 flex items-center gap-0.5 sm:gap-1">
                        130万<span className="opacity-90 font-bold text-[8px]">（扶養の壁）</span>
                      </span>
                    )}
                  </button>

                  {/* ④ 178万バッジ（直上・同一行） */}
                  <button
                    type="button"
                    onClick={() => setIncome(178)}
                    className="absolute -translate-x-1/2 top-0 flex flex-col items-center z-20 cursor-pointer hover:scale-105 transition-transform"
                    style={{ left: `${badge178Pos}%` }}
                    title="タップして178万にセット"
                  >
                    <span className="bg-teal-400 text-slate-950 px-2 py-0.5 rounded-md shadow-md text-[9px] sm:text-[10px] font-black whitespace-nowrap ring-1 ring-teal-300 flex items-center gap-0.5 sm:gap-1">
                      178万<span className="opacity-75 font-bold text-[8px]">（改革案）</span>
                    </span>
                  </button>
                </div>

                {/* 2. スライダーレール ＆ レンジ入力 */}
                <div className="relative flex items-center">
                  {/* 背景のゾーン色分けレール */}
                  <div className="absolute inset-x-0 h-3 rounded-full bg-slate-800 overflow-hidden flex shadow-inner">
                    {/* 非課税ゾーン（80〜103万） */}
                    <div style={{ width: `${p103}%` }} className="h-full bg-teal-500/30" />
                    {/* 所得税・社保ゾーン（103〜130万） */}
                    <div style={{ width: `${p130 - p103}%` }} className="h-full bg-rose-500/40" />
                    {/* 回復ゾーン（130〜178万） */}
                    <div style={{ width: `${p178 - p130}%` }} className="h-full bg-amber-500/20" />
                    {/* 178万超ゾーン */}
                    <div style={{ width: `${100 - p178}%` }} className="h-full bg-indigo-500/20" />
                  </div>

                  {/* スライダーインプット */}
                  <input
                    type="range"
                    min={minIncome}
                    max={maxIncome}
                    step="1"
                    value={income}
                    onChange={(e) => setIncome(Number(e.target.value))}
                    className="w-full h-3 opacity-0 cursor-pointer relative z-30"
                  />

                  {/* カスタムツマミ（thumb）と現在値インジケーター */}
                  <div
                    className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-amber-400 border-2 border-white shadow-lg pointer-events-none z-20 flex items-center justify-center transition-transform hover:scale-110"
                    style={{ left: `${currentPercent}%` }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-950" />
                  </div>
                </div>

                {/* 3. スライダー下部のすっきりした目盛り定規 */}
                <div className="relative h-4 text-[10px] font-semibold text-slate-400 flex justify-between px-0.5 pt-1">
                  <span>80万</span>
                  <span className="hidden sm:inline">100万</span>
                  <span className="hidden sm:inline">120万</span>
                  <span className="hidden sm:inline">140万</span>
                  <span className="hidden sm:inline">160万</span>
                  <span className="hidden sm:inline">180万</span>
                  <span>200万</span>
                </div>
              </div>

              {/* ワンタッププリセットボタン */}
              <div className="pt-3 border-t border-white/10">
                <div className="text-[11px] text-slate-300 font-bold mb-2 flex items-center justify-between">
                  <span>よくある年収ラインをワンタップで試す：</span>
                  <span className="text-[10px] text-slate-400 font-normal">タップで移動 ↑</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {quickPresets.map((p) => (
                    <button
                      key={p.value}
                      type="button"
                      onClick={() => setIncome(p.value)}
                      className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        income === p.value
                          ? "bg-amber-400 text-slate-950 shadow-md ring-2 ring-amber-300/50"
                          : "bg-white/10 text-slate-300 hover:bg-white/20 hover:text-white"
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 内訳詳細バー */}
            <div className="bg-slate-950/60 rounded-2xl p-4 border border-white/10 text-xs space-y-2.5">
              <div className="font-bold text-slate-300 flex items-center justify-between">
                <span>給与から引かれるお金の内訳：</span>
                <span className="text-rose-300 font-bold">
                  合計 −{Math.round(totalDeduction / 10000)}万円
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-white/5 p-2 rounded-xl">
                  <div className="text-[10px] text-slate-400">所得税</div>
                  <div className="font-bold text-slate-200 mt-0.5">
                    {incomeTax > 0 ? `約${(incomeTax / 10000).toFixed(1)}万円` : "0円（非課税）"}
                  </div>
                </div>
                <div className="bg-white/5 p-2 rounded-xl">
                  <div className="text-[10px] text-slate-400">住民税</div>
                  <div className="font-bold text-slate-200 mt-0.5">
                    {residentTax > 0 ? `約${(residentTax / 10000).toFixed(1)}万円` : "0円（非課税）"}
                  </div>
                </div>
                <div className="bg-white/5 p-2 rounded-xl border border-rose-500/20">
                  <div className="text-[10px] text-rose-300 font-bold">社会保険料</div>
                  <div className="font-bold text-rose-300 mt-0.5">
                    {socialInsurance > 0 ? `約${Math.round(socialInsurance / 10000)}万円` : "0円（扶養内）"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 右側：手取り計算結果 ＆ 崖の警告 */}
          <div className="lg:col-span-5 bg-gradient-to-b from-white/15 to-white/5 backdrop-blur-lg rounded-3xl p-5 sm:p-6 border border-white/20 text-center flex flex-col justify-center relative shadow-2xl space-y-4">
            <div>
              <div className="inline-flex items-center justify-center gap-1 text-xs font-bold text-teal-300 mb-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>実際の手元に残るお金（手取り）</span>
              </div>

              {/* 手取り年収 */}
              <div className="text-4xl sm:text-5xl font-black text-white tracking-tight my-2">
                {Math.round(takeHome / 10000)}{" "}
                <span className="text-2xl font-bold text-teal-300">万円 / 年</span>
              </div>
              <div className="text-xs text-slate-300 font-medium">
                額面 {income}万円 から税・社保（{Math.round(totalDeduction / 10000)}万円）を引いた額
              </div>
            </div>

            {/* 逆転現象（手取りの崖）の警告表示 */}
            {cliffWarning ? (
              <div className="bg-rose-950/60 p-3.5 rounded-2xl border border-rose-500/40 text-left text-xs space-y-1">
                <div className="font-bold text-rose-300 flex items-center gap-1">
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                  <span>手取りの逆転現象（手取りの崖）が発生！</span>
                </div>
                <p className="text-[11px] text-rose-200 leading-relaxed">
                  {cliffWarning}
                </p>
                <div className="text-[10px] text-rose-300/80 pt-1">
                  💡 これが、年末に「これ以上働くと損するから」とシフトを削る人が多い理由です。
                </div>
              </div>
            ) : (
              <div className="bg-emerald-950/40 p-3.5 rounded-2xl border border-emerald-500/30 text-xs text-emerald-200 text-left space-y-1.5">
                <div className="font-bold flex items-center justify-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>手取りの逆転現象は起きていません</span>
                </div>
                {infoNote && (
                  <p className="text-[11px] text-emerald-300/90 leading-relaxed pt-1.5 border-t border-emerald-500/20">
                    💡 {infoNote}
                  </p>
                )}
              </div>
            )}

            {/* 178万円引き上げ案の比較ボタン */}
            <div className="pt-2 border-t border-white/10 text-left">
              <button
                type="button"
                onClick={() => setShowReformComparison((prev) => !prev)}
                className="w-full text-left text-xs font-bold text-amber-300 hover:text-white flex items-center justify-between"
              >
                <span>💡 178万円へ引き上げられたらどうなる？</span>
                <span>{showReformComparison ? "閉じる ▲" : "見る ▼"}</span>
              </button>

              {showReformComparison && (
                <div className="mt-2.5 p-3 bg-slate-950/70 rounded-xl border border-white/10 text-xs space-y-1.5">
                  <div className="text-[11px] text-slate-300">
                    所得税の基礎控除等が178万円まで引き上げられた場合：
                  </div>
                  <div className="flex items-center justify-between font-bold text-amber-300">
                    <span>所得税の減税額：</span>
                    <span>年間 ＋{taxSaving > 0 ? (taxSaving).toLocaleString() : "0"} 円 お得！</span>
                  </div>
                  <p className="text-[10px] text-slate-400 leading-relaxed">
                    ※ただし社会保険料（106万・130万の壁）は別制度のため、社会保険の壁が同時に変わらない場合は手取りの崖は残ります。
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
