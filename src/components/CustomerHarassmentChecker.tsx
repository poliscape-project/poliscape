/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { ShieldAlert, CheckCircle2, AlertTriangle, Users, FileText, Ban } from "lucide-react";

export const CustomerHarassmentChecker: React.FC<{ isSimpleMode?: boolean }> = ({ isSimpleMode = false }) => {
  const [behavior, setBehavior] = useState<string>("kneel"); // "defect", "loud", "kneel", "sns", "repeat"
  const [hasSystem, setHasSystem] = useState<boolean>(true);

  // リスク判定ロジック
  let isKasuhara = false;
  let riskLevel = "low";
  let advice = "";

  if (behavior === "defect") {
    isKasuhara = false;
    riskLevel = "low";
    advice = "正当な権利行使・苦情です。不良品への交換や誠実な事実確認と謝罪が適切な対応となります。";
  } else if (behavior === "loud") {
    isKasuhara = true;
    riskLevel = "medium";
    advice = "口調や態度の過剰さによりカスハラに該当する可能性大。複数人での対応と通話録音の実施を推奨します。";
  } else if (behavior === "kneel" || behavior === "sns" || behavior === "repeat") {
    isKasuhara = true;
    riskLevel = "high";
    advice = "明白なカスタマーハラスメント（強要罪・名誉毀損・業務妨害罪に抵触の恐れ）。即座に警察通報・組織対応すべき事案です。";
  }

  return (
    <div className="bg-gradient-to-br from-slate-50/90 via-white to-rose-50/60 rounded-3xl p-5 sm:p-7 border border-slate-200/80 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-4">
        <div className="flex items-center gap-2.5">
          <span className="p-2 rounded-xl bg-slate-800 text-white shadow-xs">
            <ShieldAlert className="w-5 h-5" />
          </span>
          <div>
            <h3 className="text-lg sm:text-xl font-black text-slate-900">
              {isSimpleMode ? "カスハラ判定チェッカー" : "カスタマーハラスメント（カスハラ）該否判定＆対応ナビ"}
            </h3>
            <p className="text-xs text-slate-500">
              正当な苦情と悪質ハラスメントの境界線をチェックし、推奨初動対応を判定
            </p>
          </div>
        </div>
        <span className="self-start sm:self-auto text-[11px] font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-800">
          都条例施行・国の義務化協議中
        </span>
      </div>

      {/* 行為の選択 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 space-y-2">
          <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <Ban className="w-3.5 h-3.5 text-rose-600" />
            <span>お客様・取引先の要求・言動</span>
          </label>
          <div className="space-y-1.5">
            {[
              { id: "defect", label: "商品の欠陥・不良品に対する交換・返金要求", type: "正当な苦情" },
              { id: "loud", label: "激昂・大声での威圧・長時間の怒鳴り散らし", type: "カスハラ懸念" },
              { id: "kneel", label: "土下座の強要・金銭の不当要求・金品要求", type: "違法カスハラ" },
              { id: "sns", label: "店員の名札・顔写真を盗撮しSNSへ晒す脅迫", type: "違法カスハラ" },
              { id: "repeat", label: "数時間におよぶ電話拘束・執拗な居座り", type: "違法カスハラ" },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setBehavior(item.id)}
                className={`w-full p-2.5 text-left rounded-xl border transition-all flex items-center justify-between ${
                  behavior === item.id
                    ? "bg-slate-900 border-slate-900 text-white shadow-xs"
                    : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                }`}
              >
                <span className="text-xs font-bold">{item.label}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                  behavior === item.id ? "bg-white/20 text-white" : "bg-white text-slate-500 border border-slate-200"
                }`}>{item.type}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 space-y-3 flex flex-col justify-between">
          <div>
            <div className="text-xs font-bold text-slate-700 mb-2">企業の体制・対応状況</div>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasSystem}
                  onChange={(e) => setHasSystem(e.target.checked)}
                  className="rounded text-slate-900 accent-slate-900 w-4 h-4"
                />
                <span>マニュアル策定・複数人対応・通話録音の体制あり</span>
              </label>
              <p className="text-[11px] text-slate-400 pl-6">
                東京都条例および国のガイドラインでは、現場のワンオペ対応を避け、組織的な複数人対応と通話録音の周知が強く求められます。
              </p>
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] space-y-1">
            <div className="font-bold text-slate-800">名札の実名表記見直しについて:</div>
            <p className="text-slate-500">
              フルネーム名札から「名字のみ」「アルファベット」「スタッフ番号」への変更が国・都により推奨されています。
            </p>
          </div>
        </div>
      </div>

      {/* 判定カード */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="text-xs font-bold text-slate-500 mb-1">カスハラ該当性判定</div>
          <div className="flex items-baseline gap-1 my-1">
            <span className={`text-2xl sm:text-3xl font-black ${
              riskLevel === "low" ? "text-emerald-600" : riskLevel === "medium" ? "text-amber-600" : "text-rose-600"
            }`}>
              {riskLevel === "low" ? "正当な苦情" : riskLevel === "medium" ? "カスハラ該当" : "悪質違法カスハラ"}
            </span>
          </div>
          <div className="text-[11px] font-bold text-slate-500 mt-1">
            {isKasuhara ? "現場スタッフの単独謝罪を停止" : "誠実な交換・返金対応を推奨"}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs sm:col-span-2 flex flex-col justify-between">
          <div className="text-xs font-bold text-slate-500 mb-1">推奨される初動アクション</div>
          <div className="text-xs sm:text-sm font-bold text-slate-800 my-1 leading-relaxed">
            {advice}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            組織的対応（店長・上司同席、通話録音、記録保持）を徹底
          </div>
        </div>
      </div>
    </div>
  );
};