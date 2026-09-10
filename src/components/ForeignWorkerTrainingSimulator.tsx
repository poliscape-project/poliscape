"use client";

import React, { useState } from "react";
import { Briefcase, ArrowRightLeft, UserCheck, Award } from "lucide-react";

export const ForeignWorkerTrainingSimulator: React.FC<{ isSimpleMode: boolean }> = ({ isSimpleMode }) => {
  const [workIndustry, setWorkIndustry] = useState<"nursing" | "construction" | "manufacturing">("nursing");
  const [japaneseLevel, setJapaneseLevel] = useState<"N5" | "N4" | "N3">("N4");
  const [stayYears, setStayYears] = useState<number>(2);

  // 転籍可能判定：就労1〜2年超 ＋ 日本語N4以上
  const canTransfer = stayYears >= 2 && (japaneseLevel === "N4" || japaneseLevel === "N3");

  return (
    <div className="bg-gradient-to-br from-indigo-50/80 via-white to-blue-50/60 rounded-3xl p-5 sm:p-7 border border-indigo-200/80 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-indigo-100 pb-4">
        <div className="flex items-center gap-2.5">
          <span className="p-2 rounded-xl bg-indigo-600 text-white shadow-xs">
            <Briefcase className="w-5 h-5" />
          </span>
          <div>
            <h3 className="text-lg sm:text-xl font-black text-slate-900">
              {isSimpleMode ? "外国人の育成就労 転職できる？診断機" : "新・育成就労制度 転籍要件＆特定技能移行シミュレーター"}
            </h3>
            <p className="text-xs text-slate-500">
              就労期間・日本語力から、新制度での転職（転籍）可否と特定技能1号への移行ルートを診断
            </p>
          </div>
        </div>
        <span className="self-start sm:self-auto text-[11px] font-bold px-3 py-1 rounded-full bg-indigo-100 text-indigo-800">
          技能実習から看板替え
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-6 space-y-5 bg-slate-50/70 p-4 sm:p-5 rounded-2xl border border-slate-200/60">
          <div data-widget="button-group" className="bg-white/80 p-3.5 rounded-xl border border-slate-200/70 transition-all hover:border-indigo-300">
            <label className="text-xs sm:text-sm font-bold text-slate-700 block mb-2">
              就労分野（職種）
            </label>
            <div role="radiogroup" className="grid grid-cols-3 gap-2 text-xs">
              <button
                type="button"
                role="radio"
                aria-checked={workIndustry === "nursing"}
                onClick={() => setWorkIndustry("nursing")}
                className={`p-2.5 rounded-xl border font-bold transition-all ${
                  workIndustry === "nursing"
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-xs ring-1 ring-indigo-600"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                }`}
              >
                介護
              </button>
              <button
                type="button"
                role="radio"
                aria-checked={workIndustry === "construction"}
                onClick={() => setWorkIndustry("construction")}
                className={`p-2.5 rounded-xl border font-bold transition-all ${
                  workIndustry === "construction"
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-xs ring-1 ring-indigo-600"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                }`}
              >
                建設
              </button>
              <button
                type="button"
                role="radio"
                aria-checked={workIndustry === "manufacturing"}
                onClick={() => setWorkIndustry("manufacturing")}
                className={`p-2.5 rounded-xl border font-bold transition-all ${
                  workIndustry === "manufacturing"
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-xs ring-1 ring-indigo-600"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                }`}
              >
                製造・加工
              </button>
            </div>
          </div>

          <div data-widget="slider" className="bg-white/80 p-3.5 rounded-xl border border-slate-200/70 transition-all hover:border-indigo-300">
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs sm:text-sm font-bold text-slate-700 cursor-pointer">
                現企業での就労年数
              </label>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-indigo-700">{stayYears}</span>
                <span className="text-xs font-bold text-slate-600">年目</span>
              </div>
            </div>
            <input
              type="range"
              min={1}
              max={3}
              step={1}
              value={stayYears}
              onChange={(e) => setStayYears(Number(e.target.value))}
              className="w-full accent-indigo-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
              aria-label="就労年数"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1 select-none">
              <span>1年目(転籍不可分野有)</span>
              <span>2年目(原則解禁)</span>
              <span>3年目(特定技能移行)</span>
            </div>
          </div>

          <div data-widget="button-group" className="bg-white/80 p-3.5 rounded-xl border border-slate-200/70 transition-all hover:border-indigo-300">
            <label className="text-xs sm:text-sm font-bold text-slate-700 block mb-2">
              日本語能力試験（JLPT）レベル
            </label>
            <div role="radiogroup" className="grid grid-cols-3 gap-2 text-xs">
              <button
                type="button"
                role="radio"
                aria-checked={japaneseLevel === "N5"}
                onClick={() => setJapaneseLevel("N5")}
                className={`p-2.5 rounded-xl border font-bold transition-all ${
                  japaneseLevel === "N5"
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-xs ring-1 ring-indigo-600"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                }`}
              >
                N5（入門）
              </button>
              <button
                type="button"
                role="radio"
                aria-checked={japaneseLevel === "N4"}
                onClick={() => setJapaneseLevel("N4")}
                className={`p-2.5 rounded-xl border font-bold transition-all ${
                  japaneseLevel === "N4"
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-xs ring-1 ring-indigo-600"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                }`}
              >
                N4（基本日常会話）
              </button>
              <button
                type="button"
                role="radio"
                aria-checked={japaneseLevel === "N3"}
                onClick={() => setJapaneseLevel("N3")}
                className={`p-2.5 rounded-xl border font-bold transition-all ${
                  japaneseLevel === "N3"
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-xs ring-1 ring-indigo-600"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                }`}
              >
                N3（日常会話円滑）
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 space-y-4">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-5 sm:p-6 shadow-md">
            <div className="flex items-center justify-between text-xs font-bold text-slate-300 mb-1">
              <span>他企業への転職（転籍）判定</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                canTransfer ? "bg-emerald-500 text-white" : "bg-rose-500 text-white"
              }`}>
                {canTransfer ? "転籍可能" : "要件未達"}
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-black tracking-tight my-2">
              {canTransfer ? "同一業務内で転職可能" : "現在の企業で就労継続が必要"}
            </div>
            <p className="text-xs text-slate-300">
              {canTransfer
                ? "就労期間2年以上かつ日本語N4をクリアしているため、本人の希望による転籍が法的に認められます。"
                : "転籍には原則1〜2年以上の就労実績と、日本語試験（N4以上相当）の合格が必要です。"}
            </p>
          </div>

          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-2 text-xs">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-indigo-600" />
              <span>3年後の「特定技能1号」への無試験移行</span>
            </div>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              育成就労を3年間良好に修了し技能試験に合格すると、最長5年働ける「特定技能1号」へ移行できます。さらに実務経験を積んで「特定技能2号」に合格すれば、家族帯同と無期限の更新（永住権への道）が開かれます。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
