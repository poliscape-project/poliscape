"use client";

import React, { useState, useId } from "react";
import { FileSpreadsheet, CheckCircle, ShieldAlert } from "lucide-react";

export const InvoiceSimulator: React.FC<{ isSimpleMode: boolean }> = ({ isSimpleMode }) => {
  const salesSliderId = useId();
  const [annualSales, setAnnualSales] = useState<number>(500);
  const [isRegistered, setIsRegistered] = useState<boolean>(true);

  const taxFromSales = Math.round((annualSales * 10000 / 1.1) * 0.1);
  const taxPaymentSpecial = Math.round(taxFromSales * 0.2);

  return (
    <section className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 sm:p-7">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-teal-50 text-teal-700">
              <FileSpreadsheet className="w-5 h-5" />
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">
              {isSimpleMode ? "インボイスで手取りはどう変わる？計算機" : "消費税インボイス制度＆「2割特例」試算シミュレーター"}
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-500">
            {isSimpleMode
              ? "フリーランス向けに、登録した場合の納税額（2割特例）と未登録時の取引影響をシミュレーション！"
              : "適格請求書発行事業者登録による消費税納付額（2割特例適用時）と免税継続時の影響の比較"}
          </p>
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold self-start sm:self-center">
          <span>2023年10月施行・2割特例実施中</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-6 space-y-5 bg-slate-50/70 p-4 sm:p-5 rounded-2xl border border-slate-200/60">
          <div>
            <div className="flex justify-between items-center mb-2">
              <label htmlFor={salesSliderId} className="text-xs sm:text-sm font-bold text-slate-700">年間売上高（税込）</label>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-black text-teal-700">{annualSales}</span>
                <span className="text-xs font-bold text-slate-600">万円</span>
              </div>
            </div>
            <input
              id={salesSliderId}
              type="range"
              min={100}
              max={1000}
              step={20}
              value={annualSales}
              onChange={(e) => setAnnualSales(Number(e.target.value))}
              className="w-full accent-teal-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>100万</span>
              <span>300万</span>
              <span>500万</span>
              <span>1,000万円（免税上限）</span>
            </div>
          </div>

          <div>
            <label className="text-xs sm:text-sm font-bold text-slate-700 block mb-2">インボイス事業者の登録状況</label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setIsRegistered(true)}
                className={`p-3 rounded-xl border font-bold text-left transition-all ${isRegistered ? "bg-teal-600 text-white border-teal-600 shadow-xs" : "bg-white text-slate-700 border-slate-200 hover:border-slate-300"}`}
              >
                <div>課税事業者に登録する</div>
                <div className={`text-[10px] font-normal ${isRegistered ? "text-teal-100" : "text-slate-400"}`}>2割特例を利用可能</div>
              </button>
              <button
                type="button"
                onClick={() => setIsRegistered(false)}
                className={`p-3 rounded-xl border font-bold text-left transition-all ${!isRegistered ? "bg-amber-600 text-white border-amber-600 shadow-xs" : "bg-white text-slate-700 border-slate-200 hover:border-slate-300"}`}
              >
                <div>免税事業者を継続する</div>
                <div className={`text-[10px] font-normal ${!isRegistered ? "text-amber-100" : "text-slate-400"}`}>消費税の納付義務なし</div>
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 space-y-4">
          {isRegistered ? (
            <>
              <div className="bg-gradient-to-br from-teal-600 to-emerald-700 text-white rounded-2xl p-5 sm:p-6 shadow-md">
                <div className="flex items-center justify-between text-xs font-bold text-teal-100 mb-1">
                  <span>課税事業者登録時：納める消費税（2割特例）</span>
                  <span className="bg-white/20 px-2 py-0.5 rounded-full text-[10px]">激変緩和特例</span>
                </div>
                <div className="flex items-baseline gap-1 my-2">
                  <span className="text-3xl sm:text-4xl font-black tracking-tight">約 {taxPaymentSpecial.toLocaleString()}</span>
                  <span className="text-base sm:text-lg font-bold">円 / 年</span>
                </div>
                <p className="text-xs text-teal-100 leading-relaxed">
                  本来の売上消費税（約{taxFromSales.toLocaleString()}円）の<strong>2割だけ</strong>を納めればよいため、税負担は実質売上の約1.8%にとどまります。
                </p>
              </div>
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-2.5 text-xs">
                <div className="font-bold text-slate-800 flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-teal-600" /> 取引上の安心感
                </div>
                <p className="text-slate-600 leading-relaxed">
                  取引先が満額の仕入税額控除を受けられるため、取引先から値引き要求や取引見送りをされる心配がなくなります。
                </p>
              </div>
            </>
          ) : (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 sm:p-6 space-y-3">
              <div className="flex items-center gap-2 text-amber-900 font-bold text-base">
                <ShieldAlert className="w-5 h-5 text-amber-600" /> 免税事業者継続時の影響
              </div>
              <p className="text-xs text-amber-800 leading-relaxed">
                消費税の納付義務はありませんが、インボイスを発行できないため取引先が仕入税額控除を満額受けられなくなります。
              </p>
            </div>
          )}
          <div className="p-3.5 rounded-xl bg-slate-100/90 border border-slate-200 text-slate-600 text-xs">
            <strong>判断の目安：</strong> 取引先が一般消費者（BtoC）のみであれば免税のままで問題ありませんが、企業取引（BtoB）中心の場合は登録検討が一般的です。
          </div>
        </div>
      </div>
    </section>
  );
};