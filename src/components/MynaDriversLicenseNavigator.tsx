"use client";

import React, { useState } from "react";
import { Car, CreditCard, Sparkles, CheckCircle2, ShieldCheck } from "lucide-react";

export const MynaDriversLicenseNavigator: React.FC<{ isSimpleMode: boolean }> = ({ isSimpleMode }) => {
  const [licenseType, setLicenseType] = useState<"myna" | "traditional" | "both">("myna");
  const [driverRank, setDriverRank] = useState<"gold" | "general" | "violation">("gold");

  // 手数料試算
  // マイナ免許証のみ: 2,100円
  // 従来免許証のみ: 2,850円
  // 両方保有: 2,950円
  let fee = 2100;
  if (licenseType === "traditional") fee = 2850;
  if (licenseType === "both") fee = 2950;

  const isOnlineEligible = licenseType !== "traditional" && driverRank !== "violation";

  return (
    <section className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 sm:p-7">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-teal-50 text-teal-700">
              <Car className="w-5 h-5" />
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">
              {isSimpleMode ? "マイナ免許証で何が変わる？手数料＆比較ナビ" : "マイナ免許証（運転免許証一体化）メリット比較ナビ"}
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-500">
            {isSimpleMode
              ? "マイナ免許証にすると更新代が安くなる？スマホ講習が使える？3つの持ち方を比較！"
              : "更新手数料差額、オンライン講習受講資格、住所変更ワンストップの判定"}
          </p>
        </div>
        <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-bold self-start sm:self-center border border-teal-200">
          <Sparkles className="w-3.5 h-3.5" />
          <span>2025年3月全国開始済</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-6 space-y-5 bg-slate-50/70 p-4 sm:p-5 rounded-2xl border border-slate-200/60">
          <div>
            <label className="text-xs sm:text-sm font-bold text-slate-700 block mb-2">希望する免許証の持ち方</label>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setLicenseType("myna")}
                className={`p-2.5 rounded-xl border font-bold transition-all text-center ${licenseType === "myna" ? "bg-teal-600 text-white border-teal-600 shadow-xs" : "bg-white text-slate-700 border-slate-200"}`}
              >
                <div>マイナのみ</div>
                <div className="text-[10px] opacity-80">一番おトク</div>
              </button>
              <button
                type="button"
                onClick={() => setLicenseType("traditional")}
                className={`p-2.5 rounded-xl border font-bold transition-all text-center ${licenseType === "traditional" ? "bg-teal-600 text-white border-teal-600 shadow-xs" : "bg-white text-slate-700 border-slate-200"}`}
              >
                <div>従来型のみ</div>
                <div className="text-[10px] opacity-80">これまで通り</div>
              </button>
              <button
                type="button"
                onClick={() => setLicenseType("both")}
                className={`p-2.5 rounded-xl border font-bold transition-all text-center ${licenseType === "both" ? "bg-teal-600 text-white border-teal-600 shadow-xs" : "bg-white text-slate-700 border-slate-200"}`}
              >
                <div>両方持ち</div>
                <div className="text-[10px] opacity-80">安心の2枚</div>
              </button>
            </div>
          </div>

          <div>
            <label className="text-xs sm:text-sm font-bold text-slate-700 block mb-2">あなたの運転者区分</label>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setDriverRank("gold")}
                className={`p-2.5 rounded-xl border font-bold transition-all text-center ${driverRank === "gold" ? "bg-teal-600 text-white border-teal-600 shadow-xs" : "bg-white text-slate-700 border-slate-200"}`}
              >
                優良（ゴールド）
              </button>
              <button
                type="button"
                onClick={() => setDriverRank("general")}
                className={`p-2.5 rounded-xl border font-bold transition-all text-center ${driverRank === "general" ? "bg-teal-600 text-white border-teal-600 shadow-xs" : "bg-white text-slate-700 border-slate-200"}`}
              >
                一般（軽微違反1回）
              </button>
              <button
                type="button"
                onClick={() => setDriverRank("violation")}
                className={`p-2.5 rounded-xl border font-bold transition-all text-center ${driverRank === "violation" ? "bg-teal-600 text-white border-teal-600 shadow-xs" : "bg-white text-slate-700 border-slate-200"}`}
              >
                違反・初回更新
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 space-y-4">
          <div className="bg-gradient-to-br from-teal-600 to-emerald-700 text-white rounded-2xl p-5 sm:p-6 shadow-md">
            <div className="flex items-center justify-between text-xs font-bold text-teal-100 mb-1">
              <span>更新時の手数料</span>
              <span className="bg-white/20 px-2 py-0.5 rounded-full text-[10px]">{licenseType === "myna" ? "最安値" : "通常"}</span>
            </div>
            <div className="flex items-baseline gap-1 my-2">
              <span className="text-3xl sm:text-4xl font-black tracking-tight">{fee.toLocaleString()}</span>
              <span className="text-base sm:text-lg font-bold">円</span>
            </div>
            <p className="text-xs text-teal-100 leading-relaxed">
              {licenseType === "myna"
                ? "従来型より750円安く更新できます（講習手数料等は別途）。"
                : licenseType === "both"
                ? "2枚持ちの場合は両方の管理費がかかるため2,950円となります。"
                : "従来型のみを維持する場合の手数料です。"}',
            </p>
          </div>

          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-2 text-xs">
            <div className="font-bold text-slate-800">オンライン講習の可否</div>
            {isOnlineEligible ? (
              <div className="flex items-center gap-1.5 text-emerald-800 font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                自宅スマホから24時間いつでもオンライン講習を受講可能です！
              </div>
            ) : (
              <p className="text-slate-500 text-[11px]">
                ※従来型のみの保有、または違反運転者講習の場合は警察署・免許センターでの対面受講が必要です。
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};