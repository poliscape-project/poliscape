"use client";

import React, { useState, useId } from "react";
import { Gift, AlertTriangle, Award } from "lucide-react";

export const FurusatoTaxCalculator: React.FC<{ isSimpleMode: boolean }> = ({ isSimpleMode }) => {
  const incomeSliderId = useId();
  const [annualIncome, setAnnualIncome] = useState<number>(500);
  const [familyType, setFamilyType] = useState<"single" | "couple" | "child1" | "child2">("single");

  let limit = 0;
  if (annualIncome <= 300) limit = 28000;
  else if (annualIncome <= 400) limit = 43000;
  else if (annualIncome <= 500) limit = 61000;
  else if (annualIncome <= 600) limit = 77000;
  else if (annualIncome <= 700) limit = 108000;
  else if (annualIncome <= 800) limit = 129000;
  else if (annualIncome <= 1000) limit = 176000;
  else limit = Math.round(annualIncome * 200);

  if (familyType === "couple") limit = Math.round(limit * 0.82);
  else if (familyType === "child1") limit = Math.round(limit * 0.75);
  else if (familyType === "child2") limit = Math.round(limit * 0.68);

  const giftValue = Math.round(limit * 0.3);

  return (
    <section className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 sm:p-7">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-teal-50 text-teal-700">
              <Gift className="w-5 h-5" />
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">
              {isSimpleMode ? "ふるさと納税 上限額とルール変更チェッカー" : "ふるさと納税 控除限度額＆制度厳格化シミュレーター"}
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-500">
            {isSimpleMode
              ? "年収と家族の形から上限額と、2025年10月からのポイント禁止ルールをチェック！"
              : "総務省の受領証明書基準による控除上限額試算と、2025年10月施行の仲介サイトポイント付与禁止の影響"}
          </p>
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold self-start sm:self-center border border-amber-200">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
          <span>2025年10月ポイント付与全面禁止</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-6 space-y-5 bg-slate-50/70 p-4 sm:p-5 rounded-2xl border border-slate-200/60">
          <div>
            <div className="flex justify-between items-center mb-2">
              <label htmlFor={incomeSliderId} className="text-xs sm:text-sm font-bold text-slate-700">世帯主の給与年収（額面）</label>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-black text-teal-700">{annualIncome}</span>
                <span className="text-xs font-bold text-slate-600">万円</span>
              </div>
            </div>
            <input
              id={incomeSliderId}
              type="range"
              min={300}
              max={1200}
              step={20}
              value={annualIncome}
              onChange={(e) => setAnnualIncome(Number(e.target.value))}
              className="w-full accent-teal-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>300万</span>
              <span>500万</span>
              <span>800万</span>
              <span>1200万</span>
            </div>
          </div>

          <div>
            <label className="text-xs sm:text-sm font-bold text-slate-700 block mb-2">家族構成</label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setFamilyType("single")}
                className={`p-3 rounded-xl border font-bold text-left transition-all ${familyType === "single" ? "bg-teal-600 text-white border-teal-600 shadow-xs" : "bg-white text-slate-700 border-slate-200 hover:border-slate-300"}`}
              >
                <div>独身・共働き</div>
                <div className={`text-[10px] font-normal ${familyType === "single" ? "text-teal-100" : "text-slate-400"}`}>配偶者控除なし</div>
              </button>
              <button
                type="button"
                onClick={() => setFamilyType("couple")}
                className={`p-3 rounded-xl border font-bold text-left transition-all ${familyType === "couple" ? "bg-teal-600 text-white border-teal-600 shadow-xs" : "bg-white text-slate-700 border-slate-200 hover:border-slate-300"}`}
              >
                <div>夫婦（配偶者控除あり）</div>
                <div className={`text-[10px] font-normal ${familyType === "couple" ? "text-teal-100" : "text-slate-400"}`}>配偶者に収入なし</div>
              </button>
              <button
                type="button"
                onClick={() => setFamilyType("child1")}
                className={`p-3 rounded-xl border font-bold text-left transition-all ${familyType === "child1" ? "bg-teal-600 text-white border-teal-600 shadow-xs" : "bg-white text-slate-700 border-slate-200 hover:border-slate-300"}`}
              >
                <div>夫婦＋子1人（高校生）</div>
                <div className={`text-[10px] font-normal ${familyType === "child1" ? "text-teal-100" : "text-slate-400"}`}>16歳以上の扶養あり</div>
              </button>
              <button
                type="button"
                onClick={() => setFamilyType("child2")}
                className={`p-3 rounded-xl border font-bold text-left transition-all ${familyType === "child2" ? "bg-teal-600 text-white border-teal-600 shadow-xs" : "bg-white text-slate-700 border-slate-200 hover:border-slate-300"}`}
              >
                <div>夫婦＋子2人（高校＋大学）</div>
                <div className={`text-[10px] font-normal ${familyType === "child2" ? "text-teal-100" : "text-slate-400"}`}>扶養親族2人</div>
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 space-y-4">
          <div className="bg-gradient-to-br from-teal-600 to-emerald-700 text-white rounded-2xl p-5 sm:p-6 shadow-md">
            <div className="flex items-center justify-between text-xs font-bold text-teal-100 mb-1">
              <span>実質自己負担2,000円で寄附できる上限目安</span>
              <span className="bg-white/20 px-2 py-0.5 rounded-full text-[10px]">総務省基準</span>
            </div>
            <div className="flex items-baseline gap-1 my-2">
              <span className="text-3xl sm:text-4xl font-black tracking-tight">約 {limit.toLocaleString()}</span>
              <span className="text-base sm:text-lg font-bold">円 / 年</span>
            </div>
            <div className="text-xs text-teal-100 flex items-center gap-1.5 mt-1">
              <span>もらえる返礼品の想定上限額（3割換算）:</span>
              <strong className="text-white">約 {giftValue.toLocaleString()} 円相当</strong>
            </div>
          </div>

          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 space-y-3 text-xs">
            <div className="font-bold text-slate-900 flex items-center gap-1.5 text-sm">
              <Award className="w-4 h-4 text-amber-600" />
              制度の適正化ルール（2大変更）
            </div>
            <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-1">
              <div className="font-bold text-rose-700">① 仲介サイトのポイント付与禁止（2025年10月〜）</div>
              <p className="text-slate-600 leading-relaxed text-[11px]">
                大手ポータルサイトでの寄附に伴う独自ポイント還元が全面的に禁止されました。寄附金が真に地域振興に使われるようにするための是正措置です。
              </p>
            </div>
            <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-1">
              <div className="font-bold text-slate-800">② 経費5割ルールの厳格適用</div>
              <p className="text-slate-600 leading-relaxed text-[11px]">
                ワンストップ特例事務費や受領証送料なども募集経費（5割以下）に含めることが義務化されました。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};