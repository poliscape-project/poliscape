"use client";

import React, { useState } from "react";
import { ShieldAlert, CheckCircle2, Clock, FileWarning } from "lucide-react";

export const InheritanceRegistrationChecker: React.FC<{ isSimpleMode: boolean }> = ({ isSimpleMode }) => {
  const [inheritTiming, setInheritTiming] = useState<"past" | "recent">("past");
  const [status, setStatus] = useState<"done" | "talking" | "abandoned">("abandoned");

  let deadlineText = "";
  let riskLevel = "low";

  if (status === "done") {
    deadlineText = "登記完了済み：過料のリスクはありません";
    riskLevel = "safe";
  } else if (inheritTiming === "past") {
    deadlineText = "猶予期限：2027年3月31日まで（法改正前の相続分）";
    riskLevel = status === "abandoned" ? "high" : "medium";
  } else {
    deadlineText = "不動産取得を知った日から「3年以内」が期限";
    riskLevel = status === "abandoned" ? "high" : "medium";
  }

  return (
    <section className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 sm:p-7">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-teal-50 text-teal-700">
              <FileWarning className="w-5 h-5" />
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">
              {isSimpleMode ? "実家の放置で過料10万円？相続登記チェッカー" : "相続登記の義務化・過料（最大10万円）リスク診断"}
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-500">
            {isSimpleMode
              ? "実家や土地を相続した時期から、いつまでに手続きが必要か、罰則があるかチェック！"
              : "2024年4月施行の改正不動産登記法に基づく申請義務の期限と罰則リスク判定"}
          </p>
        </div>
        <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold self-start sm:self-center">
          <span>過料 最大10万円</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-6 space-y-5 bg-slate-50/70 p-4 sm:p-5 rounded-2xl border border-slate-200/60">
          <div>
            <label className="text-xs sm:text-sm font-bold text-slate-700 block mb-2">相続が発生した（亡くなった）時期</label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setInheritTiming("past")}
                className={`p-3 rounded-xl border font-bold transition-all ${inheritTiming === "past" ? "bg-teal-600 text-white border-teal-600 shadow-xs" : "bg-white text-slate-700 border-slate-200"}`}
              >
                2024年4月以前（昔の相続）
              </button>
              <button
                type="button"
                onClick={() => setInheritTiming("recent")}
                className={`p-3 rounded-xl border font-bold transition-all ${inheritTiming === "recent" ? "bg-teal-600 text-white border-teal-600 shadow-xs" : "bg-white text-slate-700 border-slate-200"}`}
              >
                2024年4月以降（最近の相続）
              </button>
            </div>
          </div>

          <div>
            <label className="text-xs sm:text-sm font-bold text-slate-700 block mb-2">現在の名義・遺産分割の状況</label>
            <div className="space-y-2 text-xs">
              <label className={`flex items-start gap-2.5 p-2.5 rounded-xl border cursor-pointer transition-all ${status === "abandoned" ? "bg-rose-50 border-rose-400 text-slate-900" : "bg-white border-slate-200 text-slate-600"}`}>
                <input type="radio" name="status" checked={status === "abandoned"} onChange={() => setStatus("abandoned")} className="mt-0.5 accent-rose-600" />
                <div><span className="font-bold">名義変更せずそのまま放置している</span>（親や祖父母の名義）</div>
              </label>
              <label className={`flex items-start gap-2.5 p-2.5 rounded-xl border cursor-pointer transition-all ${status === "talking" ? "bg-amber-50 border-amber-400 text-slate-900" : "bg-white border-slate-200 text-slate-600"}`}>
                <input type="radio" name="status" checked={status === "talking"} onChange={() => setStatus("talking")} className="mt-0.5 accent-amber-600" />
                <div><span className="font-bold">親族間で遺産分割の話し合い中・難航中</span></div>
              </label>
              <label className={`flex items-start gap-2.5 p-2.5 rounded-xl border cursor-pointer transition-all ${status === "done" ? "bg-teal-50 border-teal-400 text-slate-900" : "bg-white border-slate-200 text-slate-600"}`}>
                <input type="radio" name="status" checked={status === "done"} onChange={() => setStatus("done")} className="mt-0.5 accent-teal-600" />
                <div><span className="font-bold">法務局で相続登記の手続きを完了した</span></div>
              </label>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 space-y-4">
          <div className={`rounded-2xl p-5 sm:p-6 shadow-md text-white ${riskLevel === "safe" ? "bg-gradient-to-br from-teal-600 to-emerald-700" : riskLevel === "high" ? "bg-gradient-to-br from-rose-600 to-red-700" : "bg-gradient-to-br from-amber-600 to-orange-700"}`}>
            <div className="text-xs font-bold text-white/90 mb-1">判定結果</div>
            <div className="text-2xl sm:text-3xl font-black mb-2">
              {riskLevel === "safe" ? "適法・義務完了" : riskLevel === "high" ? "過料（最大10万円）のリスクあり" : "注意：期限内に手続きが必要"}
            </div>
            <p className="text-xs text-white/90 leading-relaxed font-semibold">
              {deadlineText}
            </p>
          </div>

          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-2 text-xs">
            <div className="font-bold text-slate-800">遺産分割がまとまらない場合の救済策</div>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              話し合いが長引いている場合は、法務局へ<strong>「相続人申告登記」</strong>を単独で申し出ることで、正規の登記前でも過料のペナルティを合法的に免れることができます。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};