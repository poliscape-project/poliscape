"use client";

import React, { useState } from "react";
import { Calculator, Plus, Minus, Sparkles, TrendingUp, Baby, School, GraduationCap } from "lucide-react";

interface Child {
  id: string;
  age: number; // 0歳〜22歳
}

// 年齢に応じた区分とラベルを判定
const getAgeCategory = (age: number) => {
  if (age <= 2) return { label: "乳幼児（0〜2歳）", type: "infant", color: "bg-pink-100 text-pink-800" };
  if (age <= 5) return { label: "未就学（3〜5歳）", type: "preschool", color: "bg-orange-100 text-orange-800" };
  if (age <= 11) return { label: `小学生（${age - 5}年生）`, type: "elementary", color: "bg-emerald-100 text-emerald-800" };
  if (age <= 14) return { label: `中学生（${age - 11}年生）`, type: "middle", color: "bg-teal-100 text-teal-800" };
  if (age <= 17) return { label: `高校生（${age - 14}年生）✨新制度`, type: "high", color: "bg-amber-100 text-amber-900 font-bold" };
  if (age <= 18) return { label: "高校卒業年代（18歳）✨新制度", type: "high", color: "bg-amber-100 text-amber-900 font-bold" };
  return { label: "大学生年代（多子カウント対象）", type: "college", color: "bg-indigo-100 text-indigo-800" };
};

export const PolicyCalculator: React.FC<{ isSimpleMode: boolean }> = ({ isSimpleMode }) => {
  // 初期値：16歳（高校1年）、13歳（中学2年）
  const [children, setChildren] = useState<Child[]>([
    { id: "1", age: 16 },
    { id: "2", age: 13 },
  ]);

  const updateAge = (id: string, delta: number) => {
    setChildren((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const newAge = Math.min(22, Math.max(0, c.age + delta));
          return { ...c, age: newAge };
        }
        return c;
      })
    );
  };

  const setDirectAge = (id: string, age: number) => {
    const validAge = Math.min(22, Math.max(0, age));
    setChildren((prev) =>
      prev.map((c) => (c.id === id ? { ...c, age: validAge } : c))
    );
  };

  const addChild = () => {
    if (children.length >= 5) return;
    const lastChild = children[children.length - 1];
    const newAge = Math.max(0, (lastChild ? lastChild.age : 5) - 3);
    setChildren((prev) => [...prev, { id: Math.random().toString(), age: newAge }]);
  };

  const removeChild = (id: string) => {
    if (children.length <= 1) return;
    setChildren((prev) => prev.filter((c) => c.id !== id));
  };

  // 年齢降順（上の子から順）にソートして計算
  const sortedChildren = [...children].sort((a, b) => b.age - a.age);

  // 22歳年度末（22歳以下）までの子をカウント対象とする
  // 支給対象は18歳年度末（18歳以下）
  let oldMonthlyTotal = 0;
  let newMonthlyTotal = 0;

  const childBreakdown = sortedChildren.map((child, index) => {
    const isThirdOrMore = index >= 2;
    const isEligibleNew = child.age <= 18;
    const isEligibleOld = child.age <= 15;

    // 旧制度の月額
    let oldAmount = 0;
    if (isEligibleOld) {
      if (child.age <= 2) {
        oldAmount = 15000;
      } else if (child.age <= 11) {
        oldAmount = isThirdOrMore ? 15000 : 10000;
      } else {
        oldAmount = 10000; // 中学生
      }
    }

    // 新制度の月額
    let newAmount = 0;
    if (isEligibleNew) {
      if (isThirdOrMore) {
        newAmount = 30000; // 第3子以降は一律3万円
      } else {
        if (child.age <= 2) {
          newAmount = 15000;
        } else {
          newAmount = 10000; // 3歳〜高校生は1万円
        }
      }
    }

    oldMonthlyTotal += oldAmount;
    newMonthlyTotal += newAmount;

    return {
      id: child.id,
      age: child.age,
      index,
      oldAmount,
      newAmount,
      diff: newAmount - oldAmount,
      category: getAgeCategory(child.age),
    };
  });

  const oldAnnualTotal = oldMonthlyTotal * 12;
  const newAnnualTotal = newMonthlyTotal * 12;
  const diffAnnual = newAnnualTotal - oldAnnualTotal;

  return (
    <section className="bg-gradient-to-br from-teal-900 via-slate-900 to-emerald-950 text-white rounded-3xl p-5 sm:p-8 shadow-xl relative overflow-hidden border border-teal-500/30">
      {/* 背景装飾 */}
      <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-teal-500/20 blur-3xl pointer-events-none" />

      <div className="relative z-10">
        {/* ヘッダー */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-teal-400/20 border border-teal-400/40 flex items-center justify-center text-teal-300">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-teal-300 uppercase tracking-wider block">
                {isSimpleMode ? "じぶんの家はいくらもらえる？" : "リアル年齢シミュレーター"}
              </span>
              <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                {isSimpleMode ? "こどもの年齢を入れて金額チェック" : "お子さんの年齢を入力して試算"}
              </h3>
            </div>
          </div>
          <span className="text-xs bg-white/10 text-teal-200 px-3 py-1 rounded-full border border-white/10 font-medium">
            年齢を＋・ーで変更 ↓
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* 左側：お子さんの年齢入力リスト */}
          <div className="lg:col-span-7 space-y-3">
            {childBreakdown.map((item) => (
              <div
                key={item.id}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-3.5 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all hover:bg-white/15"
              >
                {/* お子さん情報 */}
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-teal-400 text-slate-950 font-black text-xs flex items-center justify-center shrink-0">
                    {item.index + 1}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-slate-100">
                        第{item.index + 1}子
                      </span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${item.category.color}`}>
                        {item.category.label}
                      </span>
                    </div>
                    <div className="text-xs text-slate-300 mt-0.5">
                      新制度：
                      {item.newAmount > 0 ? (
                        <span className="font-bold text-teal-300"> 月 {item.newAmount.toLocaleString()} 円</span>
                      ) : (
                        <span className="text-slate-400"> 支給なし（多子算定用）</span>
                      )}
                      {item.diff > 0 && (
                        <span className="text-amber-300 font-bold ml-1.5">
                          (＋{(item.diff).toLocaleString()}円/月)
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* 年齢コントロール（＋・ー ボタン ＆ 数字表示） */}
                <div className="flex items-center justify-end gap-2 shrink-0">
                  <div className="flex items-center bg-slate-950/70 rounded-xl border border-white/10 p-1">
                    <button
                      type="button"
                      onClick={() => updateAge(item.id, -1)}
                      className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold flex items-center justify-center transition-colors"
                      title="1歳若く"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <div className="px-3 text-center min-w-[54px]">
                      <span className="text-lg font-black text-white">{item.age}</span>
                      <span className="text-[11px] font-medium text-slate-400 ml-0.5">歳</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => updateAge(item.id, 1)}
                      className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold flex items-center justify-center transition-colors"
                      title="1歳年上"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* 削除 */}
                  {children.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeChild(item.id)}
                      className="text-slate-400 hover:text-rose-400 p-1.5 transition-colors"
                      title="削除"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}

            {/* お子さん追加ボタン */}
            {children.length < 5 && (
              <button
                type="button"
                onClick={addChild}
                className="w-full py-2.5 rounded-xl border-2 border-dashed border-teal-400/40 text-teal-300 hover:bg-teal-400/10 font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
              >
                <Plus className="w-4 h-4" />
                お子さんを追加する（最大5人まで試算可能）
              </button>
            )}

            <p className="text-[11px] text-teal-200/70 pt-1">
              💡 18歳以上22歳までの子どもも扶養中であれば「第3子の判定カウント」に含まれます。
            </p>
          </div>

          {/* 右側：計算結果カード */}
          <div className="lg:col-span-5 bg-gradient-to-b from-white/15 to-white/5 backdrop-blur-lg rounded-3xl p-5 sm:p-6 border border-white/20 text-center flex flex-col justify-center relative shadow-2xl">
            <div className="inline-flex items-center justify-center gap-1 text-xs font-bold text-teal-300 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>新制度での年間受給額</span>
            </div>

            {/* 新制度の金額 */}
            <div className="text-4xl sm:text-5xl font-black text-white tracking-tight my-1">
              {(newAnnualTotal / 10000).toLocaleString()}{" "}
              <span className="text-2xl font-bold text-teal-300">万円 / 年</span>
            </div>
            <div className="text-xs text-slate-300 font-medium">
              （月額合計 {(newMonthlyTotal).toLocaleString()} 円 × 年6回受給）
            </div>

            {/* 増額ハイライトバッジ */}
            <div className="mt-4 pt-4 border-t border-white/15 flex flex-col items-center">
              <div className="text-xs text-slate-300 mb-1">旧制度と比べると…</div>
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 px-4 py-2 rounded-2xl font-black text-base sm:text-lg shadow-lg">
                <TrendingUp className="w-5 h-5 stroke-[3]" />
                <span>
                  年間 ＋{(diffAnnual / 10000).toLocaleString()} 万円 アップ！
                </span>
              </div>
              <p className="text-[11px] text-teal-200/80 mt-2">
                ※親の所得制限撤廃・高校生延長・第3子倍増が自動反映されています
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
