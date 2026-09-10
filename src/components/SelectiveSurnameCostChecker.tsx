"use client";

import React, { useState } from "react";
import { Users, Clock, CheckCircle2 } from "lucide-react";

export const SelectiveSurnameCostChecker: React.FC<{ isSimpleMode: boolean }> = ({ isSimpleMode }) => {
  const [hasPassport, setHasPassport] = useState<boolean>(true);
  const [hasQualifications, setHasQualifications] = useState<boolean>(true);

  let itemsCount = 10;
  if (hasPassport) itemsCount += 2;
  if (hasQualifications) itemsCount += 4;

  const estimatedHours = itemsCount * 1.5;
  const estimatedCost = (hasPassport ? 6000 : 0) + (hasQualifications ? 5000 : 0) + 3000;

  return (
    <section className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 sm:p-7">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-teal-50 text-teal-700">
              <Users className="w-5 h-5" />
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">
              {isSimpleMode ? "結婚で名字を変える大変さ診断機" : "改姓手続きコスト診断＆夫婦別姓比較"}
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-500">
            {isSimpleMode
              ? "結婚して名字を変えるときに、いくつの手続きが必要で何時間かかるかを診断！"
              : "改姓に伴う各種名義変更の手間・費用と、選択的夫婦別姓導入時のメリット・課題"}
          </p>
        </div>
        <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold self-start sm:self-center">
          <span>法改正議論継続中</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-6 space-y-5 bg-slate-50/70 p-4 sm:p-5 rounded-2xl border border-slate-200/60">
          <div>
            <label className="text-xs sm:text-sm font-bold text-slate-700 block mb-2">パスポートの保有・海外渡航の機会</label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setHasPassport(true)}
                className={`p-2.5 rounded-xl border font-bold transition-all ${hasPassport ? "bg-teal-600 text-white border-teal-600 shadow-xs" : "bg-white text-slate-700 border-slate-200"}`}
              >
                パスポートあり（海外出張・旅行）
              </button>
              <button
                type="button"
                onClick={() => setHasPassport(false)}
                className={`p-2.5 rounded-xl border font-bold transition-all ${!hasPassport ? "bg-teal-600 text-white border-teal-600 shadow-xs" : "bg-white text-slate-700 border-slate-200"}`}
              >
                パスポートなし
              </button>
            </div>
          </div>

          <div>
            <label className="text-xs sm:text-sm font-bold text-slate-700 block mb-2">国家資格や銀行口座・名義の数</label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setHasQualifications(true)}
                className={`p-2.5 rounded-xl border font-bold transition-all ${hasQualifications ? "bg-teal-600 text-white border-teal-600 shadow-xs" : "bg-white text-slate-700 border-slate-200"}`}
              >
                国家資格・専門職登録あり
              </button>
              <button
                type="button"
                onClick={() => setHasQualifications(false)}
                className={`p-2.5 rounded-xl border font-bold transition-all ${!hasQualifications ? "bg-teal-600 text-white border-teal-600 shadow-xs" : "bg-white text-slate-700 border-slate-200"}`}
              >
                一般資格・口座のみ
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 space-y-4">
          <div className="bg-gradient-to-br from-teal-600 to-emerald-700 text-white rounded-2xl p-5 sm:p-6 shadow-md">
            <div className="flex items-center justify-between text-xs font-bold text-teal-100 mb-1">
              <span>改姓に伴う想定手続き項目数</span>
              <span className="bg-white/20 px-2 py-0.5 rounded-full text-[10px]">改姓者本人の負担</span>
            </div>
            <div className="flex items-baseline gap-1 my-2">
              <span className="text-3xl sm:text-4xl font-black tracking-tight">{itemsCount}</span>
              <span className="text-base sm:text-lg font-bold">箇所以上の名義変更</span>
            </div>
            <p className="text-xs text-teal-100 leading-relaxed">
              銀行・クレカ・免許・保険等で合計約 <strong>{estimatedHours}時間</strong> の手間と約 <strong>{estimatedCost.toLocaleString()}円</strong> の諸費用が発生します。
            </p>
          </div>

          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-2 text-xs">
            <div className="font-bold text-slate-800">選択的夫婦別姓が実現した場合</div>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              別姓を選択した場合はこれらの改姓手続きがすべて不要となり、仕事上の実績やキャリアの連続性が保たれます。一方、同姓を望む夫婦は従来通り同姓を選べます。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};