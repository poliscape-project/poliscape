"use client";

import React, { useState } from "react";
import { ShieldAlert, CheckCircle2, AlertTriangle, FileText } from "lucide-react";

export const StealthMarketingChecker: React.FC<{ isSimpleMode: boolean }> = ({ isSimpleMode }) => {
  const [hasReward, setHasReward] = useState<boolean>(true); // 報酬・商品無償提供
  const [hasInstruction, setHasInstruction] = useState<boolean>(true); // 投稿指示・内容指定
  const [hasClearPrTag, setHasClearPrTag] = useState<boolean>(false); // 明瞭なPR表記

  // ステマ判定：事業者が関与（対価＋指示）しているのに明瞭なPR表記がない場合、違法（ステマ該当）
  const isStealthMarketing = (hasReward || hasInstruction) && !hasClearPrTag;

  return (
    <div className="bg-gradient-to-br from-rose-50/80 via-white to-orange-50/60 rounded-3xl p-5 sm:p-7 border border-rose-200/80 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-rose-100 pb-4">
        <div className="flex items-center gap-2.5">
          <span className="p-2 rounded-xl bg-rose-600 text-white shadow-xs">
            <ShieldAlert className="w-5 h-5" />
          </span>
          <div>
            <h3 className="text-lg sm:text-xl font-black text-slate-900">
              {isSimpleMode ? "この投稿、ステマ？違反？診断チェッカー" : "ステマ規制（景品表示法）法令遵守リスク診断ナビ"}
            </h3>
            <p className="text-xs text-slate-500">
              対価提供や投稿指示の有無、PR表記の明確さから、ステマ告示違反リスクを判定
            </p>
          </div>
        </div>
        <span className="self-start sm:self-auto text-[11px] font-bold px-3 py-1 rounded-full bg-rose-100 text-rose-800">
          違反時は社名公表
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-6 space-y-3 bg-slate-50/70 p-4 sm:p-5 rounded-2xl border border-slate-200/60 text-xs">
          <label className="text-xs sm:text-sm font-bold text-slate-700 block mb-1">
            SNS投稿やクチコミの状況チェック
          </label>

          <div data-widget="button-group" className="bg-white/80 p-3 rounded-xl border border-slate-200/70 space-y-1.5">
            <span className="font-bold text-slate-800 block text-[11px]">1. 金銭や商品の無償提供・割引があるか？</span>
            <div role="radiogroup" className="grid grid-cols-2 gap-2">
              <button
                type="button"
                role="radio"
                aria-checked={hasReward}
                onClick={() => setHasReward(true)}
                className={`p-2 rounded-lg font-bold transition-all ${
                  hasReward ? "bg-rose-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                あり（ギフティング・報酬等）
              </button>
              <button
                type="button"
                role="radio"
                aria-checked={!hasReward}
                onClick={() => setHasReward(false)}
                className={`p-2 rounded-lg font-bold transition-all ${
                  !hasReward ? "bg-teal-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                完全になし（自腹購入）
              </button>
            </div>
          </div>

          <div data-widget="button-group" className="bg-white/80 p-3 rounded-xl border border-slate-200/70 space-y-1.5">
            <span className="font-bold text-slate-800 block text-[11px]">2. 企業からの投稿依頼やキーワード指定があるか？</span>
            <div role="radiogroup" className="grid grid-cols-2 gap-2">
              <button
                type="button"
                role="radio"
                aria-checked={hasInstruction}
                onClick={() => setHasInstruction(true)}
                className={`p-2 rounded-lg font-bold transition-all ${
                  hasInstruction ? "bg-rose-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                あり（下書き事前確認など）
              </button>
              <button
                type="button"
                role="radio"
                aria-checked={!hasInstruction}
                onClick={() => setHasInstruction(false)}
                className={`p-2 rounded-lg font-bold transition-all ${
                  !hasInstruction ? "bg-teal-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                なし（自主的な感想）
              </button>
            </div>
          </div>

          <div data-widget="button-group" className="bg-white/80 p-3 rounded-xl border border-slate-200/70 space-y-1.5">
            <span className="font-bold text-slate-800 block text-[11px]">3. 誰でもわかる明瞭な広告表示（#PRなど）があるか？</span>
            <div role="radiogroup" className="grid grid-cols-2 gap-2">
              <button
                type="button"
                role="radio"
                aria-checked={hasClearPrTag}
                onClick={() => setHasClearPrTag(true)}
                className={`p-2 rounded-lg font-bold transition-all ${
                  hasClearPrTag ? "bg-teal-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                あり（文頭や目立つ箇所に明記）
              </button>
              <button
                type="button"
                role="radio"
                aria-checked={!hasClearPrTag}
                onClick={() => setHasClearPrTag(false)}
                className={`p-2 rounded-lg font-bold transition-all ${
                  !hasClearPrTag ? "bg-rose-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                なし（大量タグの末尾や極小文字）
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 space-y-4">
          <div className={`rounded-2xl p-5 sm:p-6 shadow-md text-white ${
            isStealthMarketing ? "bg-gradient-to-br from-rose-900 to-red-800" : "bg-gradient-to-br from-emerald-900 to-teal-800"
          }`}>
            <div className="flex items-center justify-between text-xs font-bold text-slate-300 mb-1">
              <span>景品表示法上の診断結果</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                isStealthMarketing ? "bg-rose-500 text-white" : "bg-emerald-500 text-white"
              }`}>
                {isStealthMarketing ? "法律違反リスク大" : "適法・問題なし"}
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-black tracking-tight my-2">
              {isStealthMarketing ? "ステマ該当（不当表示）の危険あり" : "ガイドライン適合（クリーンなPR/感想）"}
            </div>
            <p className="text-xs text-slate-300 leading-relaxed pt-2 border-t border-white/10">
              {isStealthMarketing
                ? "企業側が関与しているにもかかわらず、消費者が広告と認識できない形式です。依頼主である企業に措置命令（再発防止命令＋社名公表）が下る可能性が極めて高い状態です。"
                : "明確にPR表記がなされているか、あるいは純粋な自主的投稿であるため、景表法のステマ規制に違反しません。"}
            </p>
          </div>

          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-2 text-xs">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>処罰されるのは「インフルエンサー」ではなく「企業」</span>
            </div>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              法律上、措置命令や社名公表の処分を受けるのは投稿を依頼した広告主（企業）です。ただし、ステマに加担したインフルエンサーもSNS上で炎上しフォロワーや案件を失う社会的制裁を受けます。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
