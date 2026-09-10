"use client";

import React, { useState, useId } from "react";
import { Car, ShieldCheck } from "lucide-react";

export const RideshareFareCalculator: React.FC<{ isSimpleMode: boolean }> = ({ isSimpleMode }) => {
  const distanceSliderId = useId();
  const driverHoursSliderId = useId();

  const [mode, setMode] = useState<"passenger" | "driver">("passenger");
  const [distance, setDistance] = useState<number>(7);
  const [timeZone, setTimeZone] = useState<"day" | "night">("night");
  const [driverHours, setDriverHours] = useState<number>(10);

  const baseFare = 500 + Math.max(0, (distance - 1.2)) * 400;
  const passengerFare = Math.round(timeZone === "night" ? baseFare * 1.2 : baseFare);
  const driverHourlyRate = timeZone === "night" ? 2400 : 2000;
  const driverMonthlyIncome = Math.round(driverHours * 4.3 * driverHourlyRate);

  return (
    <section className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 sm:p-7">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-teal-50 text-teal-700">
              <Car className="w-5 h-5" />
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">
              {isSimpleMode ? "日本版ライドシェアの料金＆収入シミュレーター" : "日本版ライドシェア（自家用車活用事業）試算"}
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-500">
            {isSimpleMode
              ? "乗客として使うときの料金や、ドライバーとして空き時間に副業したときの収入をチェック！"
              : "タクシー事業者管理下での運行（事前確定運賃）およびドライバー副業収入の試算"}
          </p>
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-50 text-teal-800 text-xs font-bold self-start sm:self-center border border-teal-200/60">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>タクシー会社が安全管理</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-6 space-y-5 bg-slate-50/70 p-4 sm:p-5 rounded-2xl border border-slate-200/60">
          <div>
            <label className="text-xs sm:text-sm font-bold text-slate-700 block mb-2">利用モードの選択</label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setMode("passenger")}
                className={`p-3 rounded-xl border font-bold transition-all ${mode === "passenger" ? "bg-teal-600 text-white border-teal-600 shadow-xs" : "bg-white text-slate-700 border-slate-200 hover:border-slate-300"}`}
              >
                乗客として料金を調べる
              </button>
              <button
                type="button"
                onClick={() => setMode("driver")}
                className={`p-3 rounded-xl border font-bold transition-all ${mode === "driver" ? "bg-teal-600 text-white border-teal-600 shadow-xs" : "bg-white text-slate-700 border-slate-200 hover:border-slate-300"}`}
              >
                ドライバーの副業収入を調べる
              </button>
            </div>
          </div>

          {mode === "passenger" ? (
            <>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor={distanceSliderId} className="text-xs sm:text-sm font-bold text-slate-700">移動距離（km）</label>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-black text-teal-700">{distance}</span>
                    <span className="text-xs font-bold text-slate-600">km</span>
                  </div>
                </div>
                <input
                  id={distanceSliderId}
                  type="range"
                  min={2}
                  max={25}
                  step={1}
                  value={distance}
                  onChange={(e) => setDistance(Number(e.target.value))}
                  className="w-full accent-teal-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>2km(駅近)</span>
                  <span>7km(市内移動)</span>
                  <span>15km</span>
                  <span>25km(遠方)</span>
                </div>
              </div>

              <div>
                <label className="text-xs sm:text-sm font-bold text-slate-700 block mb-2">利用時間帯</label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setTimeZone("day")}
                    className={`p-2.5 rounded-xl border font-bold transition-all ${timeZone === "day" ? "bg-teal-600 text-white border-teal-600 shadow-xs" : "bg-white text-slate-700 border-slate-200"}`}
                  >
                    昼間・通常時間帯
                  </button>
                  <button
                    type="button"
                    onClick={() => setTimeZone("night")}
                    className={`p-2.5 rounded-xl border font-bold transition-all ${timeZone === "night" ? "bg-teal-600 text-white border-teal-600 shadow-xs" : "bg-white text-slate-700 border-slate-200"}`}
                  >
                    深夜・雨天（割増あり）
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor={driverHoursSliderId} className="text-xs sm:text-sm font-bold text-slate-700">週の稼働時間</label>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-black text-teal-700">{driverHours}</span>
                    <span className="text-xs font-bold text-slate-600">時間/週</span>
                  </div>
                </div>
                <input
                  id={driverHoursSliderId}
                  type="range"
                  min={4}
                  max={20}
                  step={2}
                  value={driverHours}
                  onChange={(e) => setDriverHours(Number(e.target.value))}
                  className="w-full accent-teal-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>4時間(週末夜のみ)</span>
                  <span>10時間(週末副業)</span>
                  <span>20時間(しっかり副業)</span>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="lg:col-span-6 space-y-4">
          {mode === "passenger" ? (
            <>
              <div className="bg-gradient-to-br from-teal-600 to-emerald-700 text-white rounded-2xl p-5 sm:p-6 shadow-md">
                <div className="flex items-center justify-between text-xs font-bold text-teal-100 mb-1">
                  <span>乗車料金（アプリ事前確定運賃）</span>
                  <span className="bg-white/20 px-2 py-0.5 rounded-full text-[10px]">タクシー同等運賃</span>
                </div>
                <div className="flex items-baseline gap-1 my-2">
                  <span className="text-3xl sm:text-4xl font-black tracking-tight">{passengerFare.toLocaleString()}</span>
                  <span className="text-base sm:text-lg font-bold">円 程度</span>
                </div>
                <p className="text-xs text-teal-100 leading-relaxed">
                  日本版ライドシェアはタクシー運賃と同等に設定されており、乗車前にアプリで料金が確定・事前決済されます。
                </p>
              </div>
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-2 text-xs">
                <div className="font-bold text-slate-800 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-teal-600" /> 日本版ライドシェアの安全設計
                </div>
                <p className="text-slate-600 leading-relaxed text-[11px]">
                  運転手はタクシー会社に雇用され、運行前アルコール点呼や車両点検、専用保険が義務付けられています。
                </p>
              </div>
            </>
          ) : (
            <div className="bg-gradient-to-br from-teal-600 to-emerald-700 text-white rounded-2xl p-5 sm:p-6 shadow-md">
              <div className="flex items-center justify-between text-xs font-bold text-teal-100 mb-1">
                <span>想定される副業月収</span>
                <span className="bg-white/20 px-2 py-0.5 rounded-full text-[10px]">時給換算 約{driverHourlyRate}円</span>
              </div>
              <div className="flex items-baseline gap-1 my-2">
                <span className="text-3xl sm:text-4xl font-black tracking-tight">{driverMonthlyIncome.toLocaleString()}</span>
                <span className="text-base sm:text-lg font-bold">円 / 月</span>
              </div>
              <p className="text-xs text-teal-100 leading-relaxed">
                週{driverHours}時間の空き時間稼働で、月約{driverMonthlyIncome.toLocaleString()}円の副収入が期待できます。
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};