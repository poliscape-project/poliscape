"use client";

import React, { useState, useId } from "react";
import { Calendar, Clock } from "lucide-react";

export const PensionAgeSimulator: React.FC<{ isSimpleMode: boolean }> = ({ isSimpleMode }) => {
  const ageSliderId = useId();
  const basePensionSliderId = useId();

  const [startAge, setStartAge] = useState<number>(65);
  const [basePension, setBasePension] = useState<number>(15);

  const diffMonths = (startAge - 65) * 12;
  let rateMultiplier = 1;
  if (startAge < 65) {
    rateMultiplier = 1 - (Math.abs(diffMonths) * 0.004);
  } else if (startAge > 65) {
    rateMultiplier = 1 + (diffMonths * 0.007);
  }

  const monthlyPension = Math.round(basePension * 10000 * rateMultiplier);
  const annualPension = monthlyPension * 12;
  const ratePercent = Math.round((rateMultiplier - 1) * 1000) / 10;

  let breakevenText = "65歳が標準基準です";
  if (startAge === 60) breakevenText = "80歳10ヶ月（これ以上生きると65歳受給の方が得）";
  else if (startAge < 65) breakevenText = "約81歳未満で亡くなる場合は繰上げが得";
  else if (startAge === 70) breakevenText = "81歳11ヶ月（これ以上長生きすると得）";
  else if (startAge === 75) breakevenText = "86歳11ヶ月（これ以上長生きすると得）";
  else if (startAge > 65) breakevenText = "開始から約12年長生きすると65歳開始の総額を超える";

  const totalAt85 = startAge <= 85 ? Math.round(annualPension * (85 - startAge)) : 0;
  const baseTotalAt85 = Math.round((basePension * 10000 * 12) * 20);

  return (
    <section className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 sm:p-7">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-teal-50 text-teal-700">
              <Calendar className="w-5 h-5" />
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">
              {isSimpleMode ? "年金はいつからもらうとお得？計算機" : "年金受給開始年齢（60〜75歳）損益分岐シミュレーター"}
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-500">
            {isSimpleMode
              ? "もらい始める年齢を動かして、毎月もらえるお金と何歳まで生きるとトクかを比較！"
              : "繰上げ受給（最大-24%）と繰下げ受給（最大+84%）の月額受給額および生涯受給総額の分岐点試算"}
          </p>
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-50 text-teal-800 text-xs font-bold self-start sm:self-center border border-teal-200/60">
          <Clock className="w-3.5 h-3.5" />
          <span>選択肢：60歳〜75歳</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-6 space-y-4 bg-slate-50/70 p-4 sm:p-5 rounded-2xl border border-slate-200/60">
          <div
            data-widget="slider"
            className="bg-white/80 p-3.5 rounded-xl border border-slate-200/70 transition-all hover:border-teal-300"
          >
            <div className="flex justify-between items-center mb-2">
              <label htmlFor={ageSliderId} className="text-xs sm:text-sm font-bold text-slate-700 cursor-pointer">
                受給開始年齢
              </label>
              <div className="flex items-baseline gap-1 cursor-pointer">
                <span className="text-2xl font-black text-teal-700">{startAge}</span>
                <span className="text-xs font-bold text-slate-600">歳から受給</span>
              </div>
            </div>
            <input
              id={ageSliderId}
              type="range"
              min={60}
              max={75}
              step={1}
              value={startAge}
              onChange={(e) => setStartAge(Number(e.target.value))}
              className="w-full accent-teal-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
              aria-label="受給開始年齢"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1 select-none">
              <span className="text-rose-600 font-bold">60歳 (-24%)</span>
              <span className="font-bold text-slate-700">65歳 (基準 0%)</span>
              <span className="text-emerald-700 font-bold">70歳 (+42%)</span>
              <span className="text-teal-700 font-bold">75歳 (+84%)</span>
            </div>
            <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-slate-100 text-[10px] text-slate-400">
              <span className="text-slate-400">上段のゲージ</span>
              <div className="flex items-center gap-1.5">
                <span className="bg-slate-100 px-1.5 py-0.5 rounded text-[9px] font-mono text-slate-500">← →</span>
                <span>年齢変更</span>
                <span className="text-slate-300">|</span>
                <span className="bg-slate-100 px-1.5 py-0.5 rounded text-[9px] font-mono text-slate-500">↓</span>
                <span>下段へ移動</span>
              </div>
            </div>
          </div>

          <div
            data-widget="slider"
            className="bg-white/80 p-3.5 rounded-xl border border-slate-200/70 transition-all hover:border-teal-300"
          >
            <div className="flex justify-between items-center mb-2">
              <label htmlFor={basePensionSliderId} className="text-xs sm:text-sm font-bold text-slate-700 cursor-pointer">
                65歳時点の想定年金（基準月額）
              </label>
              <div className="flex items-baseline gap-1 cursor-pointer">
                <span className="text-xl font-black text-slate-800">{basePension}</span>
                <span className="text-xs font-bold text-slate-600">万円/月</span>
              </div>
            </div>
            <input
              id={basePensionSliderId}
              type="range"
              min={6}
              max={25}
              step={1}
              value={basePension}
              onChange={(e) => setBasePension(Number(e.target.value))}
              className="w-full accent-teal-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
              aria-label="65歳時点の想定年金（基準月額）"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1 select-none">
              <span>6.8万円(国民年金のみ)</span>
              <span>15万円(会社員平均)</span>
              <span>22万円(共働き/高所得)</span>
            </div>
            <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-slate-100 text-[10px] text-slate-400">
              <span className="text-slate-400">下段のゲージ</span>
              <div className="flex items-center gap-1.5">
                <span className="bg-slate-100 px-1.5 py-0.5 rounded text-[9px] font-mono text-slate-500">← →</span>
                <span>金額変更</span>
                <span className="text-slate-300">|</span>
                <span className="bg-slate-100 px-1.5 py-0.5 rounded text-[9px] font-mono text-slate-500">↑</span>
                <span>上段へ移動</span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 space-y-4">
          <div className="bg-gradient-to-br from-teal-600 to-emerald-700 text-white rounded-2xl p-5 sm:p-6 shadow-md">
            <div className="flex items-center justify-between text-xs font-bold text-teal-100 mb-1">
              <span>{startAge}歳受給開始時の月額受給額</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${ratePercent >= 0 ? "bg-emerald-400 text-slate-900" : "bg-rose-400 text-slate-900"}`}
              >
                {ratePercent >= 0 ? `+${ratePercent}% 増額` : `${ratePercent}% 減額`}
              </span>
            </div>
            <div className="flex items-baseline gap-1 my-2">
              <span className="text-3xl sm:text-4xl font-black tracking-tight">{monthlyPension.toLocaleString()}</span>
              <span className="text-base sm:text-lg font-bold">円 / 月</span>
            </div>
            <div className="text-xs text-teal-100">年間受給額: 約 {(annualPension / 10000).toFixed(1)} 万円（生涯この受給率が固定）</div>
          </div>

          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 space-y-3 text-xs">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-teal-600" /> 損益分岐点（何歳まで生きるとお得？）
            </div>
            <div className="bg-white p-3 rounded-xl border border-slate-200 font-semibold text-slate-800">
              {breakevenText}
            </div>
            <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-1">
              <div className="text-slate-500 font-medium">85歳時点での生涯累計受給額比較：</div>
              <div className="flex justify-between items-baseline pt-1">
                <span>{startAge}歳から受給した場合:</span>
                <span className="font-bold text-teal-700 text-sm">{(totalAt85 / 10000).toLocaleString()} 万円</span>
              </div>
              <div className="flex justify-between items-baseline text-slate-500">
                <span>65歳基準受給の場合:</span>
                <span>{(baseTotalAt85 / 10000).toLocaleString()} 万円</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};