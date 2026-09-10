"use client";

import React, { useState } from "react";
import { ShieldAlert, CheckCircle2, AlertTriangle } from "lucide-react";

export const ElectricKickboardRuleChecker: React.FC<{ isSimpleMode: boolean }> = ({ isSimpleMode }) => {
  const [age, setAge] = useState<"under16" | "over16">("over16");
  const [place, setPlace] = useState<"road" | "sidewalk">("road");
  const [speedMode, setSpeedMode] = useState<"20km" | "6km">("20km");

  let isLegal = true;
  let violationText = "";

  if (age === "under16") {
    isLegal = false;
    violationText = "【無免許・年齢違反】16歳未満の運転は法律で禁止されています（6ヶ月以下の懲役又は10万円以下の罰金）。";
  } else if (place === "sidewalk" && speedMode === "20km") {
    isLegal = false;
    violationText = "【通行区分違反】歩道を通行できるのは「最高速度6km/hモード（緑ランプ点滅）」設定時のみです（反則金6,000円）。";
  }

  return (
    <section className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 sm:p-7">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-teal-50 text-teal-700">
              <AlertTriangle className="w-5 h-5" />
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">
              {isSimpleMode ? "電動キックボード乗ってOK？ルール判定ナビ" : "特定小型原付（電動キックボード）交通ルール判定ナビ"}
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-500">
            {isSimpleMode
              ? "年齢や走りたい場所を選んで、法律違反（反則金）にならないか今すぐチェック！"
              : "16歳以上免許不要ルール、歩道通行要件（6km/hモード）、反則金対象の判定"}
          </p>
        </div>
        <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold self-start sm:self-center">
          <span>反則金制度（青切符）適用</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-6 space-y-5 bg-slate-50/70 p-4 sm:p-5 rounded-2xl border border-slate-200/60">
          <div>
            <label className="text-xs sm:text-sm font-bold text-slate-700 block mb-2">運転者の年齢</label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setAge("over16")}
                className={`p-2.5 rounded-xl border font-bold transition-all ${age === "over16" ? "bg-teal-600 text-white border-teal-600 shadow-xs" : "bg-white text-slate-700 border-slate-200"}`}
              >
                16歳以上（免許不要）
              </button>
              <button
                type="button"
                onClick={() => setAge("under16")}
                className={`p-2.5 rounded-xl border font-bold transition-all ${age === "under16" ? "bg-rose-600 text-white border-rose-600 shadow-xs" : "bg-white text-slate-700 border-slate-200"}`}
              >
                16歳未満（運転禁止）
              </button>
            </div>
          </div>

          <div>
            <label className="text-xs sm:text-sm font-bold text-slate-700 block mb-2">走る場所</label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setPlace("road")}
                className={`p-2.5 rounded-xl border font-bold transition-all ${place === "road" ? "bg-teal-600 text-white border-teal-600 shadow-xs" : "bg-white text-slate-700 border-slate-200"}`}
              >
                車道・自転車道（原則）
              </button>
              <button
                type="button"
                onClick={() => setPlace("sidewalk")}
                className={`p-2.5 rounded-xl border font-bold transition-all ${place === "sidewalk" ? "bg-teal-600 text-white border-teal-600 shadow-xs" : "bg-white text-slate-700 border-slate-200"}`}
              >
                歩道（例外通行）
              </button>
            </div>
          </div>

          <div>
            <label className="text-xs sm:text-sm font-bold text-slate-700 block mb-2">速度モード設定</label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setSpeedMode("20km")}
                className={`p-2.5 rounded-xl border font-bold transition-all ${speedMode === "20km" ? "bg-teal-600 text-white border-teal-600 shadow-xs" : "bg-white text-slate-700 border-slate-200"}`}
              >
                通常モード（最高20km/h）
              </button>
              <button
                type="button"
                onClick={() => setSpeedMode("6km")}
                className={`p-2.5 rounded-xl border font-bold transition-all ${speedMode === "6km" ? "bg-teal-600 text-white border-teal-600 shadow-xs" : "bg-white text-slate-700 border-slate-200"}`}
              >
                特例モード（最高6km/h）
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 space-y-4">
          <div className={`rounded-2xl p-5 sm:p-6 shadow-md text-white ${isLegal ? "bg-gradient-to-br from-teal-600 to-emerald-700" : "bg-gradient-to-br from-rose-600 to-red-700"}`}
          >
            <div className="text-xs font-bold text-white/90 mb-1">判定結果</div>
            <div className="text-2xl sm:text-3xl font-black mb-2">
              {isLegal ? "合法な走行状態です" : "道路交通法違反（取締り対象）"}
            </div>
            <p className="text-xs text-white/90 leading-relaxed font-medium">
              {isLegal
                ? place === "sidewalk"
                  ? "緑色ランプ点滅の6km/hモードであれば、普通自転車等及び歩行者等通行可の歩道を走行可能です。"
                  : "車道または自転車道を時速20km/h以下で走行してください。左側通行が原則です。"
                : violationText}
            </p>
          </div>

          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-2 text-xs">
            <div className="font-bold text-slate-800">ヘルメットと保険の必須ルール</div>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              ヘルメット着用は努力義務ですが、頭部外傷の防止のため強く推奨されています。またナンバープレート取得と自賠責保険加入は法律上必須です。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};