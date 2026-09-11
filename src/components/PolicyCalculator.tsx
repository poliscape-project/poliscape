"use client";

import React, { useState, useMemo } from "react";
import {
  Calculator,
  Plus,
  Minus,
  Sparkles,
  TrendingUp,
  Baby,
  School,
  GraduationCap,
  CalendarClock,
  RotateCcw,
  Coins,
  ArrowRight,
  Info
} from "lucide-react";

interface Child {
  id: string;
  age: number; // 基準年齢（現在）
}

// 年齢に応じた区分とラベルを判定
const getAgeCategory = (age: number) => {
  if (age <= 2) return { label: "乳幼児（0〜2歳）", type: "infant", color: "bg-pink-100 text-pink-800" };
  if (age <= 5) return { label: "未就学（3〜5歳）", type: "preschool", color: "bg-orange-100 text-orange-800" };
  if (age <= 11) return { label: `小学生（${age - 5}年生）`, type: "elementary", color: "bg-emerald-100 text-emerald-800" };
  if (age <= 14) return { label: `中学生（${age - 11}年生）`, type: "middle", color: "bg-teal-100 text-teal-800" };
  if (age <= 17) return { label: `高校生（${age - 14}年生）✨新制度`, type: "high", color: "bg-amber-100 text-amber-900 font-bold" };
  if (age <= 18) return { label: "高校3年・卒業年代（18歳）✨新制度", type: "high", color: "bg-amber-100 text-amber-900 font-bold" };
  if (age <= 22) return { label: "大学生年代（多子カウント対象）", type: "college", color: "bg-indigo-100 text-indigo-800" };
  return { label: "社会人年代（カウント対象外）", type: "adult", color: "bg-slate-200 text-slate-700" };
};

export const PolicyCalculator: React.FC<{ isSimpleMode: boolean }> = ({ isSimpleMode }) => {
  // 初期値：第1子 17歳、第2子 9歳、第3子 2歳（典型的な3人きょうだいモデル）
  const [children, setChildren] = useState<Child[]>([
    { id: "1", age: 17 },
    { id: "2", age: 9 },
    { id: "3", age: 2 },
  ]);

  // 経過年数（連動して年齢を進めるオフセット）
  const [yearsOffset, setYearsOffset] = useState<number>(0);

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

  // 年齢降順（上の子から順）にソートして、指定オフセット年後の受給額を計算
  const sortedChildren = useMemo(() => {
    return [...children]
      .map((c) => ({
        id: c.id,
        baseAge: c.age,
        age: c.age + yearsOffset,
      }))
      .sort((a, b) => b.age - a.age);
  }, [children, yearsOffset]);

  // 現在表示中（+yearsOffset 年後）の月額・年額の計算
  const { childBreakdown, oldAnnualTotal, newAnnualTotal, diffAnnual, newMonthlyTotal } = useMemo(() => {
    let oldMonthly = 0;
    let newMonthly = 0;

    // 新制度：22歳以下を多子加算のカウント対象とする
    const countEligibleNew = sortedChildren.filter((c) => c.age <= 22);
    // 旧制度：18歳以下を多子加算のカウント対象とする
    const countEligibleOld = sortedChildren.filter((c) => c.age <= 18);

    const breakdown = sortedChildren.map((child, index) => {
      // 新制度での多子カウント順位（22歳以下のきょうだいの中で上から何番目か）
      const newRankIdx = countEligibleNew.findIndex((c) => c.id === child.id);
      const isThirdOrMoreNew = newRankIdx >= 2;
      const isEligibleNew = child.age <= 18;

      // 旧制度での多子カウント順位（18歳以下のきょうだいの中で上から何番目か）
      const oldRankIdx = countEligibleOld.findIndex((c) => c.id === child.id);
      const isThirdOrMoreOld = oldRankIdx >= 2;
      const isEligibleOld = child.age <= 15;

      // 旧制度の月額
      let oldAmt = 0;
      if (isEligibleOld) {
        if (child.age <= 2) {
          oldAmt = 15000;
        } else if (child.age <= 11) {
          oldAmt = isThirdOrMoreOld ? 15000 : 10000;
        } else {
          oldAmt = 10000; // 中学生
        }
      }

      // 新制度の月額
      let newAmt = 0;
      if (isEligibleNew) {
        if (isThirdOrMoreNew) {
          newAmt = 30000; // 第3子以降は一律3万円
        } else {
          if (child.age <= 2) {
            newAmt = 15000;
          } else {
            newAmt = 10000; // 3歳〜高校生は1万円
          }
        }
      }

      oldMonthly += oldAmt;
      newMonthly += newAmt;

      return {
        id: child.id,
        baseAge: child.baseAge,
        age: child.age,
        index,
        oldAmount: oldAmt,
        newAmount: newAmt,
        diff: newAmt - oldAmt,
        category: getAgeCategory(child.age),
        isThirdOrMoreNew,
      };
    });

    const oldAnn = oldMonthly * 12;
    const newAnn = newMonthly * 12;

    return {
      childBreakdown: breakdown,
      oldAnnualTotal: oldAnn,
      newAnnualTotal: newAnn,
      diffAnnual: newAnn - oldAnn,
      newMonthlyTotal: newMonthly,
    };
  }, [sortedChildren]);

  // 高校卒業（18歳）までの今後の受取見込み累計総額を計算（基準年齢から末っ子卒業まで）
  const lifetimeTotal = useMemo(() => {
    // 18歳以下の子どものうち最も若い子の年齢
    const eligibleBase = children.filter((c) => c.age <= 18);
    if (eligibleBase.length === 0) {
      return { futureNewTotal: 0, futureOldTotal: 0, futureDiff: 0, yearsSpan: 0 };
    }

    const minAge = Math.min(...eligibleBase.map((c) => c.age));
    const yearsSpan = Math.max(1, 18 - minAge + 1);

    let futureNew = 0;
    let futureOld = 0;

    for (let y = 0; y < yearsSpan; y++) {
      const aged = children
        .map((c) => ({ id: c.id, age: c.age + y }))
        .sort((a, b) => b.age - a.age);

      const countNew = aged.filter((c) => c.age <= 22);
      const countOld = aged.filter((c) => c.age <= 18);

      aged.forEach((c) => {
        // 新制度
        if (c.age <= 18) {
          const rank = countNew.findIndex((item) => item.id === c.id);
          const isThird = rank >= 2;
          const monthly = isThird ? 30000 : c.age <= 2 ? 15000 : 10000;
          futureNew += monthly * 12;
        }

        // 旧制度
        if (c.age <= 15) {
          const rankOld = countOld.findIndex((item) => item.id === c.id);
          const isThirdOld = rankOld >= 2;
          let monthlyOld = 0;
          if (c.age <= 2) {
            monthlyOld = 15000;
          } else if (c.age <= 11) {
            monthlyOld = isThirdOld ? 15000 : 10000;
          } else {
            monthlyOld = 10000;
          }
          futureOld += monthlyOld * 12;
        }
      });
    }

    return {
      futureNewTotal: futureNew,
      futureOldTotal: futureOld,
      futureDiff: futureNew - futureOld,
      yearsSpan,
    };
  }, [children]);

  return (
    <section className="bg-gradient-to-br from-teal-900 via-slate-900 to-emerald-950 text-white rounded-3xl p-5 sm:p-8 shadow-xl relative overflow-hidden border border-teal-500/30">
      {/* 背景装飾 */}
      <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-teal-500/20 blur-3xl pointer-events-none" />

      <div className="relative z-10">
        {/* ヘッダー */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-teal-400/20 border border-teal-400/40 flex items-center justify-center text-teal-300 shrink-0">
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

        {/* 時を進める（連動年齢シミュレーション）バー */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3.5 border border-white/15 mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-inner">
          <div className="flex items-center gap-2 text-xs font-bold text-teal-100">
            <CalendarClock className="w-4 h-4 text-amber-300 shrink-0" />
            <span>全員の年齢を連動して進める:</span>
            {yearsOffset > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black animate-pulse">
                ＋{yearsOffset}年後を表示中
              </span>
            )}
          </div>
          <div className="flex items-center gap-1.5 flex-wrap">
            {[
              { label: "現在", offset: 0 },
              { label: "＋1年後", offset: 1 },
              { label: "＋2年後", offset: 2 },
              { label: "＋3年後", offset: 3 },
              { label: "＋5年後", offset: 5 },
            ].map((btn) => (
              <button
                key={btn.offset}
                type="button"
                onClick={() => setYearsOffset(btn.offset)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  yearsOffset === btn.offset
                    ? "bg-amber-400 text-slate-950 shadow-md font-black scale-105"
                    : "bg-white/10 hover:bg-white/20 text-slate-200"
                }`}
              >
                {btn.label}
              </button>
            ))}
            {yearsOffset > 0 && (
              <button
                type="button"
                onClick={() => setYearsOffset(0)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-teal-300 transition-colors cursor-pointer"
                title="現在に戻す"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
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
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-bold text-slate-100">
                        第{item.index + 1}子
                      </span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${item.category.color}`}>
                        {item.category.label}
                      </span>
                    </div>
                    <div className="text-xs text-slate-300 mt-1">
                      新制度：
                      {item.newAmount > 0 ? (
                        <span className="font-bold text-teal-300"> 月 {item.newAmount.toLocaleString()} 円</span>
                      ) : (
                        <span className="text-slate-400">
                          {item.age <= 22 ? "支給なし（多子算定用）" : "支給・算定ともに対象外"}
                        </span>
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
                      className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold flex items-center justify-center transition-colors cursor-pointer"
                      title="1歳若く"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <div className="px-2.5 text-center min-w-[62px]">
                      {yearsOffset > 0 ? (
                        <div className="flex flex-col items-center">
                          <span className="text-sm font-black text-amber-300">{item.age}歳</span>
                          <span className="text-[9px] text-slate-400 leading-tight">元:{item.baseAge}歳</span>
                        </div>
                      ) : (
                        <div>
                          <span className="text-lg font-black text-white">{item.age}</span>
                          <span className="text-[11px] font-medium text-slate-400 ml-0.5">歳</span>
                        </div>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => updateAge(item.id, 1)}
                      className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold flex items-center justify-center transition-colors cursor-pointer"
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
                      className="text-slate-400 hover:text-rose-400 p-1.5 transition-colors cursor-pointer"
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
                className="w-full py-2.5 rounded-xl border-2 border-dashed border-teal-400/40 text-teal-300 hover:bg-teal-400/10 font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                お子さんを追加する（最大5人まで試算可能）
              </button>
            )}

            <div className="bg-white/5 rounded-xl p-2.5 text-[11px] text-teal-100/80 space-y-1">
              <p className="flex items-start gap-1">
                <Info className="w-3.5 h-3.5 text-teal-300 shrink-0 mt-0.5" />
                <span>
                  <strong>多子加算のルール：</strong> 18歳以上22歳までの子どもも扶養・監護していれば「第3子の判定カウント」に含まれます。上の子が22歳を超えるとカウント対象外になり、第3子の受給額が3万円から1万円に切り替わります。
                </span>
              </p>
            </div>
          </div>

          {/* 右側：計算結果カード */}
          <div className="lg:col-span-5 space-y-4">
            {/* 年間受給額カード */}
            <div className="bg-gradient-to-b from-white/15 to-white/5 backdrop-blur-lg rounded-3xl p-5 sm:p-6 border border-white/20 text-center shadow-2xl relative">
              <div className="inline-flex items-center justify-center gap-1 text-xs font-bold text-teal-300 mb-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>
                  {yearsOffset === 0
                    ? "新制度での年間受給額（現在）"
                    : `【＋${yearsOffset}年後】の年間受給額`}
                </span>
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
              <div className="mt-4 pt-3.5 border-t border-white/15 flex flex-col items-center">
                <div className="text-xs text-slate-300 mb-1">旧制度と比べると…</div>
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 px-4 py-1.5 rounded-2xl font-black text-sm sm:text-base shadow-md">
                  <TrendingUp className="w-4 h-4 stroke-[3]" />
                  <span>
                    年間 ＋{(diffAnnual / 10000).toLocaleString()} 万円 アップ！
                  </span>
                </div>
              </div>
            </div>

            {/* 18歳高校卒業までの累計受取見込みカード（新機能！） */}
            <div className="bg-gradient-to-br from-amber-400/15 via-teal-900/40 to-slate-900/60 backdrop-blur-lg rounded-3xl p-5 border border-amber-300/30 text-center shadow-xl">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-300 mb-1.5">
                <Coins className="w-4 h-4 text-amber-300" />
                <span>18歳（高校卒業）までの受取見込み総額</span>
              </div>

              {lifetimeTotal.futureNewTotal > 0 ? (
                <>
                  <div className="text-3xl sm:text-4xl font-black text-white tracking-tight my-1">
                    約 {(lifetimeTotal.futureNewTotal / 10000).toLocaleString()}{" "}
                    <span className="text-xl font-bold text-amber-300">万円</span>
                  </div>
                  <div className="text-xs text-teal-200 mt-1 font-semibold">
                    旧制度比 ＋{(lifetimeTotal.futureDiff / 10000).toLocaleString()} 万円 アップ見込み！
                  </div>
                  <p className="text-[10px] text-slate-300/80 mt-2 leading-relaxed">
                    ※末っ子が高校卒業を迎えるまでの世帯累計総額です。上の子が22歳を迎えて第3子加算が外れるタイミングも年度ごとに自動反映されています。
                  </p>
                </>
              ) : (
                <p className="text-xs text-slate-300 py-2">
                  現在、18歳以下の支給対象のお子さんはいません
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
