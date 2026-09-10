"use client";

import React, { useState, useId } from "react";
import { Briefcase } from "lucide-react";

export const WorkStyleChecker: React.FC<{ isSimpleMode: boolean }> = ({ isSimpleMode }) => {
  const incomeSliderId = useId();
  const [annualSalary, setAnnualSalary] = useState<number>(1100);
  const [jobType, setJobType] = useState<"finance" | "rd" | "consulting" | "general">("finance");
  const [hasConsent, setHasConsent] = useState<boolean>(true);

  const isIncomeEligible = annualSalary >= 1075;
  const isJobEligible = jobType !== "general";
  const isFullyEligible = isIncomeEligible && isJobEligible && hasConsent;

  return (
    <section className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 sm:p-7">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-teal-50 text-teal-700">
              <Briefcase className="w-5 h-5" />
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">
              {isSimpleMode ? "高プロ（残業代ゼロ制度）該当判定チェッカー" : "高度プロフェッショナル制度（高プロ）適用要件診断"}
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-500">
            {isSimpleMode
              ? "年収と仕事内容から、自分が「時間に関係なく成果で評価される対象」になるか診断！"
              : "年収1,075万円要件、対象5業務、本人の同意要件および健康管理時間の義務判定"}
          </p>
        </div>
        <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold self-start sm:self-center">
          <span>年収1,075万円基準</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-6 space-y-5 bg-slate-50/70 p-4 sm:p-5 rounded-2xl border border-slate-200/60">
          <div>
            <div className="flex justify-between items-center mb-2">
              <label htmlFor={incomeSliderId} className="text-xs sm:text-sm font-bold text-slate-700">給与年収（賞与含む確定年収）</label>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-black text-teal-700">{annualSalary}</span>
                <span className="text-xs font-bold text-slate-600">万円</span>
              </div>
            </div>
            <input
              id={incomeSliderId}
              type="range"
              min={800}
              max={1800}
              step={25}
              value={annualSalary}
              onChange={(e) => setAnnualSalary(Number(e.target.value))}
              className="w-full accent-teal-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>800万</span>
              <span className="font-bold text-rose-600">1,075万円（法定ライン）</span>
              <span>1,500万</span>
              <span>1,800万</span>
            </div>
          </div>

          <div>
            <label className="text-xs sm:text-sm font-bold text-slate-700 block mb-2">職種・担当業務</label>
            <div className="space-y-2 text-xs">
              <label className={`flex items-start gap-2.5 p-2.5 rounded-xl border cursor-pointer transition-all ${jobType === "finance" ? "bg-teal-50/60 border-teal-500 text-slate-900" : "bg-white border-slate-200 text-slate-600"}`}>
                <input type="radio" name="jobType" checked={jobType === "finance"} onChange={() => setJobType("finance")} className="mt-0.5 accent-teal-600" />
                <div><span className="font-bold">金融ディーリング・商品開発・アナリスト</span>（対象）</div>
              </label>
              <label className={`flex items-start gap-2.5 p-2.5 rounded-xl border cursor-pointer transition-all ${jobType === "consulting" ? "bg-teal-50/60 border-teal-500 text-slate-900" : "bg-white border-slate-200 text-slate-600"}`}>
                <input type="radio" name="jobType" checked={jobType === "consulting"} onChange={() => setJobType("consulting")} className="mt-0.5 accent-teal-600" />
                <div><span className="font-bold">ITコンサルタント・戦略コンサルタント</span>（対象）</div>
              </label>
              <label className={`flex items-start gap-2.5 p-2.5 rounded-xl border cursor-pointer transition-all ${jobType === "rd" ? "bg-teal-50/60 border-teal-500 text-slate-900" : "bg-white border-slate-200 text-slate-600"}`}>
                <input type="radio" name="jobType" checked={jobType === "rd"} onChange={() => setJobType("rd")} className="mt-0.5 accent-teal-600" />
                <div><span className="font-bold">研究開発・先端技術開発</span>（対象）</div>
              </label>
              <label className={`flex items-start gap-2.5 p-2.5 rounded-xl border cursor-pointer transition-all ${jobType === "general" ? "bg-amber-50/60 border-amber-500 text-slate-900" : "bg-white border-slate-200 text-slate-600"}`}>
                <input type="radio" name="jobType" checked={jobType === "general"} onChange={() => setJobType("general")} className="mt-0.5 accent-amber-600" />
                <div><span className="font-bold">一般事務・営業・管理職・その他業務</span>（対象外）</div>
              </label>
            </div>
          </div>

          <div>
            <label className="text-xs sm:text-sm font-bold text-slate-700 block mb-2">本人の書面同意</label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setHasConsent(true)}
                className={`p-2.5 rounded-xl border font-bold transition-all ${hasConsent ? "bg-teal-600 text-white border-teal-600 shadow-xs" : "bg-white text-slate-700 border-slate-200"}`}
              >
                同意書を提出した
              </button>
              <button
                type="button"
                onClick={() => setHasConsent(false)}
                className={`p-2.5 rounded-xl border font-bold transition-all ${!hasConsent ? "bg-rose-600 text-white border-rose-600 shadow-xs" : "bg-white text-slate-700 border-slate-200"}`}
              >
                同意していない・拒否した
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 space-y-4">
          <div className={`rounded-2xl p-5 sm:p-6 shadow-md text-white ${isFullyEligible ? "bg-gradient-to-br from-indigo-600 to-purple-700" : "bg-slate-700"}`}
          >
            <div className="text-xs font-bold text-indigo-100 mb-1">診断結果</div>
            <div className="text-2xl sm:text-3xl font-black mb-2">
              {isFullyEligible ? "高度プロフェッショナル制度の適用対象" : "高プロの適用対象外（一般労働法制適用）"}
            </div>
            <p className="text-xs text-indigo-100 leading-relaxed">
              {isFullyEligible
                ? "年収要件・職種要件・同意要件のすべてを満たしています。労働時間規制（1日8時間、残業代等）が除外され、成果で評価されます。"
                : "要件を満たしていないため、通常通り1日8時間規制や残業代の支払いが義務付けられます。"}
            </p>
          </div>

          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-2 text-xs">
            <div className="font-bold text-slate-800">適用時の必須ルール（健康管理時間）</div>
            <ul className="list-disc pl-4 space-y-1 text-[11px] text-slate-600">
              <li>年間104日以上（かつ4週4日以上）の確実な休日確保</li>
              <li>週40時間を超えた在社時間が月100時間を超えた場合、医師の面接指導が法律上義務化</li>
              <li>本人はいつでも書面により同意を撤回することが可能</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};