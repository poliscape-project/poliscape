"use client";

import React, { useState } from "react";
import {
  GraduationCap,
  AlertTriangle,
  Sparkles,
  CheckCircle2,
  UserCheck,
  UserX,
  Plus,
  Minus,
  Info,
  AlertCircle,
  HelpCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

type SchoolType =
  | "private_univ" // 私立大学
  | "public_univ" // 国公立大学
  | "med_pharma" // 医学部・薬学部（6年制）
  | "grad_school" // 大学院生
  | "vocational" // 短大・専門学校
  | "ronin" // 浪人中
  | "other"; // 高校生以下・社会人

interface Sibling {
  id: string;
  name: string;
  age: number;
  schoolType: SchoolType;
  isRetained: boolean; // 留年しているか
  roninYears: number; // 浪人年数
  isDependent: boolean; // 税法上の扶養に入っているか
}

export const UniversityTuitionCalculator: React.FC<{ isSimpleMode: boolean }> = ({ isSimpleMode }) => {
  // 初期値：長男21歳（私立大学）、次男19歳（国公立大学）、三男16歳（高校生）
  const [siblings, setSiblings] = useState<Sibling[]>([
    { id: "1", name: "第1子", age: 21, schoolType: "private_univ", isRetained: false, roninYears: 0, isDependent: true },
    { id: "2", name: "第2子", age: 19, schoolType: "public_univ", isRetained: false, roninYears: 0, isDependent: true },
    { id: "3", name: "第3子", age: 16, schoolType: "other", isRetained: false, roninYears: 0, isDependent: true },
  ]);

  const [showFaq, setShowFaq] = useState<boolean>(true);

  const updateAge = (id: string, delta: number) => {
    setSiblings((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          const newAge = Math.min(30, Math.max(0, s.age + delta));
          const autoDependent = newAge >= 25 ? false : s.isDependent;
          return { ...s, age: newAge, isDependent: autoDependent };
        }
        return s;
      })
    );
  };

  const toggleDependent = (id: string) => {
    setSiblings((prev) =>
      prev.map((s) => (s.id === id ? { ...s, isDependent: !s.isDependent } : s))
    );
  };

  const toggleRetained = (id: string) => {
    setSiblings((prev) =>
      prev.map((s) => (s.id === id ? { ...s, isRetained: !s.isRetained } : s))
    );
  };

  const setSchoolType = (id: string, schoolType: SchoolType) => {
    setSiblings((prev) =>
      prev.map((s) => (s.id === id ? { ...s, schoolType, isRetained: false } : s))
    );
  };

  const setRoninYears = (id: string, roninYears: number) => {
    setSiblings((prev) =>
      prev.map((s) => (s.id === id ? { ...s, roninYears } : s))
    );
  };

  const addSibling = () => {
    if (siblings.length >= 5) return;
    const last = siblings[siblings.length - 1];
    const newAge = Math.max(0, (last ? last.age : 15) - 3);
    setSiblings((prev) => [
      ...prev,
      {
        id: Math.random().toString(),
        name: `第${prev.length + 1}子`,
        age: newAge,
        schoolType: newAge >= 18 && newAge <= 22 ? "private_univ" : "other",
        isRetained: false,
        roninYears: 0,
        isDependent: true,
      },
    ]);
  };

  const removeSibling = (id: string) => {
    if (siblings.length <= 1) return;
    setSiblings((prev) => prev.filter((c) => c.id !== id));
  };

  // 扶養されている子どもの人数
  const dependentCount = siblings.filter((s) => s.isDependent).length;
  // 3人以上扶養されているか
  const isEligible = dependentCount >= 3;

  // 減免額の計算
  let totalWaiver = 0;
  let hasRetainedChild = false;
  let hasRoninChild = false;
  let hasGradSchoolChild = false;
  let hasMedPharmaChild = false;

  siblings.forEach((s) => {
    if (s.schoolType === "ronin") hasRoninChild = true;
    if (s.schoolType === "grad_school") hasGradSchoolChild = true;
    if (s.schoolType === "med_pharma") hasMedPharmaChild = true;
    if (s.isRetained) hasRetainedChild = true;

    if (isEligible && !s.isRetained) {
      if (s.schoolType === "private_univ") totalWaiver += 700000;
      if (s.schoolType === "public_univ") totalWaiver += 540000;
      if (s.schoolType === "med_pharma") totalWaiver += 700000; // 私立医学部上限
      if (s.schoolType === "vocational") totalWaiver += 590000; // 専門学校上限
      // 大学院生は本人の学費減免0円（制度対象外）
    }
  });

  return (
    <section className="bg-gradient-to-br from-indigo-950 via-slate-900 to-teal-950 text-white rounded-3xl p-5 sm:p-8 shadow-xl relative overflow-hidden border border-indigo-500/30">
      {/* 背景装飾 */}
      <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-teal-500/20 blur-3xl pointer-events-none" />

      <div className="relative z-10">
        {/* ヘッダー */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-400/20 border border-indigo-400/40 flex items-center justify-center text-indigo-300">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider">
                  {isSimpleMode ? "じぶんの家はタダになる？" : "リアル診断シミュレーター"}
                </span>
                <span className="text-[10px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30 px-2 py-0.2 rounded-full">
                  医学部・大学院・浪人・留年に対応！
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white mt-0.5">
                {isSimpleMode ? "兄弟の年齢を入れて「3人扶養」チェック" : "兄弟の年齢・進路を入力して無償化判定"}
              </h3>
            </div>
          </div>
          <span className="text-xs bg-white/10 text-indigo-200 px-3 py-1 rounded-full border border-white/10 font-medium">
            年齢・進路をタップ ↓
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* 左側：兄弟の年齢・ステータス入力 */}
          <div className="lg:col-span-7 space-y-3.5">
            {siblings.map((sib, idx) => {
              const isCollegeAge = sib.age >= 18 && sib.age <= 26;
              return (
                <div
                  key={sib.id}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 flex flex-col gap-3 transition-all hover:bg-white/15"
                >
                  {/* 上段：名前と年齢 */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-full bg-indigo-400 text-slate-950 font-black text-xs flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <div>
                        <span className="text-sm font-bold text-slate-100 mr-2">
                          第{idx + 1}子
                        </span>
                        <span className="text-xs text-indigo-200 font-semibold">
                          {sib.age <= 15
                            ? "小・中学生"
                            : sib.age <= 17
                            ? "高校生年代"
                            : sib.schoolType === "med_pharma"
                            ? "医学部・薬学部（6年制）🩺"
                            : sib.schoolType === "grad_school"
                            ? "大学院生（修士・博士）🔬"
                            : sib.schoolType === "vocational"
                            ? "短大・専門学校 🏫"
                            : sib.schoolType === "ronin"
                            ? `浪人生（${sib.roninYears === 0 ? "1" : sib.roninYears}浪目）`
                            : isCollegeAge
                            ? "大学学部生年代 🎓"
                            : "卒業・社会人年代"}
                        </span>
                      </div>
                    </div>

                    {/* 年齢コントロール */}
                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      <div className="flex items-center bg-slate-950/70 rounded-xl border border-white/10 p-1">
                        <button
                          type="button"
                          onClick={() => updateAge(sib.id, -1)}
                          className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold flex items-center justify-center"
                          title="1歳若く"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <div className="px-3 text-center min-w-[54px]">
                          <span className="text-lg font-black text-white">{sib.age}</span>
                          <span className="text-[11px] font-medium text-slate-400 ml-0.5">歳</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => updateAge(sib.id, 1)}
                          className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold flex items-center justify-center"
                          title="1歳年上"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {siblings.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeSibling(sib.id)}
                          className="text-slate-400 hover:text-rose-400 p-1.5"
                          title="削除"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* 中段：進路選択ピル（18歳以上の場合） */}
                  {isCollegeAge && (
                    <div className="flex flex-wrap items-center gap-1.5 bg-slate-950/40 p-1.5 rounded-xl border border-white/5 text-xs">
                      <span className="text-[10px] text-slate-400 px-1 font-bold">進路:</span>
                      <button
                        type="button"
                        onClick={() => setSchoolType(sib.id, "private_univ")}
                        className={`px-2 py-1 rounded-lg font-bold transition-all text-[11px] ${
                          sib.schoolType === "private_univ"
                            ? "bg-teal-400 text-slate-950 shadow-xs"
                            : "text-slate-300 hover:text-white"
                        }`}
                      >
                        私立大
                      </button>
                      <button
                        type="button"
                        onClick={() => setSchoolType(sib.id, "public_univ")}
                        className={`px-2 py-1 rounded-lg font-bold transition-all text-[11px] ${
                          sib.schoolType === "public_univ"
                            ? "bg-teal-400 text-slate-950 shadow-xs"
                            : "text-slate-300 hover:text-white"
                        }`}
                      >
                        国公立大
                      </button>
                      <button
                        type="button"
                        onClick={() => setSchoolType(sib.id, "med_pharma")}
                        className={`px-2 py-1 rounded-lg font-bold transition-all text-[11px] ${
                          sib.schoolType === "med_pharma"
                            ? "bg-emerald-400 text-slate-950 shadow-xs"
                            : "text-slate-300 hover:text-white"
                        }`}
                        title="医学部・薬学部（最長6年制）"
                      >
                        医・薬(6年)
                      </button>
                      <button
                        type="button"
                        onClick={() => setSchoolType(sib.id, "grad_school")}
                        className={`px-2 py-1 rounded-lg font-bold transition-all text-[11px] ${
                          sib.schoolType === "grad_school"
                            ? "bg-purple-400 text-slate-950 shadow-xs"
                            : "text-slate-300 hover:text-white"
                        }`}
                        title="大学院生（本人は対象外・弟妹の扶養カウント対象）"
                      >
                        大学院
                      </button>
                      <button
                        type="button"
                        onClick={() => setSchoolType(sib.id, "vocational")}
                        className={`px-2 py-1 rounded-lg font-bold transition-all text-[11px] ${
                          sib.schoolType === "vocational"
                            ? "bg-blue-400 text-slate-950 shadow-xs"
                            : "text-slate-300 hover:text-white"
                        }`}
                      >
                        短大・専門
                      </button>
                      <button
                        type="button"
                        onClick={() => setSchoolType(sib.id, "ronin")}
                        className={`px-2 py-1 rounded-lg font-bold transition-all text-[11px] ${
                          sib.schoolType === "ronin"
                            ? "bg-amber-400 text-slate-950 shadow-xs"
                            : "text-slate-300 hover:text-white"
                        }`}
                      >
                        浪人中
                      </button>
                    </div>
                  )}

                  {/* 下段：留年・浪人年数・扶養トグル */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/10 text-xs">
                    <div className="flex items-center gap-2">
                      {/* 留年トグル */}
                      {(sib.schoolType === "private_univ" ||
                        sib.schoolType === "public_univ" ||
                        sib.schoolType === "med_pharma" ||
                        sib.schoolType === "vocational") && (
                        <button
                          type="button"
                          onClick={() => toggleRetained(sib.id)}
                          className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                            sib.isRetained
                              ? "bg-rose-500 text-white ring-2 ring-rose-400"
                              : "bg-white/10 hover:bg-white/20 text-slate-300"
                          }`}
                        >
                          <AlertCircle className="w-3 h-3" />
                          <span>{sib.isRetained ? "留年中（減免停止）" : "留年なし"}</span>
                        </button>
                      )}

                      {/* 浪人年数選択 */}
                      {sib.schoolType === "ronin" && (
                        <div className="flex items-center gap-1">
                          <span className="text-[10px] text-amber-200">年数:</span>
                          <button
                            type="button"
                            onClick={() => setRoninYears(sib.id, 1)}
                            className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                              sib.roninYears <= 1 ? "bg-amber-400 text-slate-950" : "bg-white/10 text-slate-300"
                            }`}
                          >
                            1浪
                          </button>
                          <button
                            type="button"
                            onClick={() => setRoninYears(sib.id, 2)}
                            className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                              sib.roninYears === 2 ? "bg-amber-400 text-slate-950" : "bg-white/10 text-slate-300"
                            }`}
                          >
                            2浪
                          </button>
                          <button
                            type="button"
                            onClick={() => setRoninYears(sib.id, 3)}
                            className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                              sib.roninYears >= 3 ? "bg-rose-500 text-white" : "bg-white/10 text-slate-300"
                            }`}
                          >
                            3浪以上⚠️
                          </button>
                        </div>
                      )}
                    </div>

                    {/* 扶養トグル */}
                    <button
                      type="button"
                      onClick={() => toggleDependent(sib.id)}
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all shadow-xs ${
                        sib.isDependent
                          ? "bg-emerald-500 hover:bg-emerald-600 text-white"
                          : "bg-slate-700 hover:bg-slate-600 text-slate-300"
                      }`}
                    >
                      {sib.isDependent ? (
                        <>
                          <UserCheck className="w-3.5 h-3.5" />
                          <span>親が扶養中</span>
                        </>
                      ) : (
                        <>
                          <UserX className="w-3.5 h-3.5" />
                          <span>就職・扶養外れ</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}

            {siblings.length < 5 && (
              <button
                type="button"
                onClick={addSibling}
                className="w-full py-2.5 rounded-xl border-2 border-dashed border-indigo-400/40 text-indigo-300 hover:bg-indigo-400/10 font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
              >
                <Plus className="w-4 h-4" />
                お子さんを追加する（最大5人）
              </button>
            )}
          </div>

          {/* 右側：判定結果 ＆ 動的解説 */}
          <div className="lg:col-span-5 bg-gradient-to-b from-white/15 to-white/5 backdrop-blur-lg rounded-3xl p-5 sm:p-6 border border-white/20 text-center flex flex-col justify-center relative shadow-2xl space-y-4">
            {isEligible ? (
              <div>
                <div className="inline-flex items-center justify-center gap-1 text-xs font-bold text-emerald-300 mb-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>扶養3人以上（現在 {dependentCount}人扶養）：【対象】</span>
                </div>
                <div className="text-4xl sm:text-5xl font-black text-white tracking-tight my-2">
                  {(totalWaiver / 10000).toLocaleString()}{" "}
                  <span className="text-2xl font-bold text-teal-300">万円 / 年</span>
                </div>
                <div className="text-xs text-slate-300 font-medium">
                  {totalWaiver > 0
                    ? `大学等の対象学生（免除額合計）の年間支援額です`
                    : `現在、免除対象の在学生がいないため減免額は0円です`}
                </div>
              </div>
            ) : (
              <div className="p-2">
                <div className="inline-flex items-center justify-center gap-1 text-xs font-bold text-rose-300 bg-rose-500/20 px-3 py-1 rounded-full mb-2 border border-rose-500/30">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                  <span>「3人扶養の崖」により【対象外】</span>
                </div>
                <div className="text-3xl sm:text-4xl font-black text-slate-300 tracking-tight my-1">
                  0 <span className="text-xl font-bold text-slate-400">円（減免なし）</span>
                </div>
                <p className="text-xs text-rose-200/90 leading-relaxed mt-2 bg-rose-950/40 p-3 rounded-xl border border-rose-500/20 text-left">
                  ⚠️ 親が扶養する子が<strong>{dependentCount}人</strong>になったため、大学に通う弟・妹も多子世帯無償化から外れ、全額自己負担となります。
                </p>
              </div>
            )}

            {/* 状況に応じた公的ルールの動的解説ボックス */}
            {(hasRetainedChild || hasRoninChild || hasGradSchoolChild || hasMedPharmaChild) && (
              <div className="text-left bg-slate-950/60 p-3.5 rounded-2xl border border-white/10 text-xs space-y-2">
                <div className="font-bold text-amber-300 flex items-center gap-1">
                  <Info className="w-3.5 h-3.5" />
                  <span>公的ルール（文科省・JASSO）：</span>
                </div>

                {hasGradSchoolChild && (
                  <p className="text-[11px] text-purple-200 leading-relaxed">
                    ・<strong>大学院生</strong>：本人の大学院授業料は制度の対象外（減免なし）です。ただし親が扶養している限り<strong>「3人扶養カウント」に含まれるため、弟・妹の大学無償化はキープ</strong>されます！
                  </p>
                )}

                {hasMedPharmaChild && (
                  <p className="text-[11px] text-emerald-200 leading-relaxed">
                    ・<strong>医学部・薬学部（6年制）</strong>：最長6年目まで減免が継続（私立年上限約70万円）。24歳まで扶養されるため、<strong>弟・妹の3人扶養期間が2年延びるメリット</strong>があります。
                  </p>
                )}

                {hasRetainedChild && (
                  <p className="text-[11px] text-slate-200 leading-relaxed">
                    ・<strong>留年した本人</strong>：文科省基準により本人の減免は停止（0円）ですが、親の扶養内であれば<strong>弟・妹の3人扶養カウントは継続</strong>されます。
                  </p>
                )}

                {hasRoninChild && (
                  <p className="text-[11px] text-amber-200 leading-relaxed">
                    ・<strong>浪人生</strong>：高卒後2年以内（1浪・2浪）なら進学時に無償化対象。親の扶養中なら浪人中も3人扶養に含まれます。
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* よくある疑問（Q&A・公的例外ルール）ミニガイド */}
        <div className="mt-6 pt-5 border-t border-white/10">
          <button
            type="button"
            onClick={() => setShowFaq((prev) => !prev)}
            className="flex items-center justify-between w-full text-left text-xs font-bold text-indigo-300 hover:text-white transition-colors"
          >
            <div className="flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-amber-400" />
              <span>よくある疑問・例外ルール（文科省公的基準より）</span>
            </div>
            {showFaq ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {showFaq && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3 text-xs">
              <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                <div className="font-bold text-teal-300 mb-1">
                  Q. 医学部・薬学部（6年制）は全額無料になる？
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  国の減免上限は一律「私立大：年約70万円」です。私立医学部は年間数百万円かかるため全額無料にはなりませんが、最長6年間上限まで減免されます。また24歳まで扶養が続くため、弟・妹の無償化期間が延びるメリットがあります。
                </p>
              </div>

              <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                <div className="font-bold text-purple-300 mb-1">
                  Q. 大学院生本人の学費も安くなる？
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  大学院は本制度の対象外のため本人の学費は免除されません（別途JASSO等の奨学金制度あり）。ただし親の税法上の扶養に入っていれば「3人扶養」の頭数に含まれるため、学部生の弟・妹の無償化はキープされます。
                </p>
              </div>

              <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                <div className="font-bold text-blue-300 mb-1">
                  Q. 短大・高専・専門学校は対象？
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  対象です。私立短大（年約56万円）、私立専門学校（年約59万円）、高等専門学校4・5年生（年約23万円）など、学校種ごとに定められた上限額まで授業料が免除されます。
                </p>
              </div>

              <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                <div className="font-bold text-amber-300 mb-1">
                  Q. 放送大学（通信制大学）は？
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  国の確認を受けた通信制大学も対象ですが、通学制の年額免除と異なり「1単位あたり約5,500円」など単位ごとの減免上限が適用されます。
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
