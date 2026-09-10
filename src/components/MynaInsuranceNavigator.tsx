"use client";

import React, { useState } from "react";
import {
  CreditCard,
  CheckCircle2,
  HelpCircle,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Calendar,
  AlertTriangle,
  FileText,
  ScanFace,
  Info
} from "lucide-react";

export const MynaInsuranceNavigator: React.FC<{ isSimpleMode: boolean }> = ({ isSimpleMode }) => {
  // 診断ステート
  // Q1: マイナンバーカードの保有 (yes / no)
  const [hasCard, setHasCard] = useState<"yes" | "no">("yes");
  // Q2: 保険証利用登録 (registered / not_registered / opt_out)
  const [regStatus, setRegStatus] = useState<"registered" | "not_registered" | "opt_out">("registered");
  // Q3: 暗証番号の不安 (confident / worried)
  const [pinPreference, setPinPreference] = useState<"confident" | "worried">("confident");

  // 診断結果の判定（2026年現在：経過措置は終了済）
  const getDiagnosticResult = () => {
    // 1. マイナンバーカードを持っていない、または登録解除した、または登録していない場合
    if (hasCard === "no" || regStatus === "not_registered" || regStatus === "opt_out") {
      return {
        type: "certificate",
        title: "「資格確認書」の交付申請ルート（要申請）",
        badge: "会社・役所へ要申請",
        badgeColor: "bg-amber-400 text-slate-950 font-black",
        icon: FileText,
        items: ["申請して受け取った「資格確認書」"],
        summary: "マイナ保険証を使わない場合、会社（健保組合）または市区町村（国保）へ『資格確認書』の交付申請を行うことで、今まで通り1〜3割負担で受診できます。",
        details: [
          "【要申請】待っているだけでは手元に届かないケースが多いため、加入先の保険者（会社の総務・健保窓口、または市役所の保険年金窓口）に申請書を提出してください。",
          "【受診方法】病院の窓口で『資格確認書（紙またはカード）』を提示するだけで、以前の健康保険証と全く同じように保険診療（1〜3割負担）が受けられます。",
          "【注意点】高額療養費の「限度額適用認定証」は自動適用されないため、高額な手術や入院の際は従来通り事前の書類申請が必要です。"
        ],
        actionGuide: "加入している医療保険者（会社の健保窓口や役所の国保係）へ『資格確認書交付申請書』を提出しましょう。"
      };
    }

    // 2. 暗証番号に不安がある場合
    if (pinPreference === "worried") {
      return {
        type: "face_auth",
        title: "顔認証・目視確認ルート（暗証番号なし受診）",
        badge: "暗証番号を忘れてもOK",
        badgeColor: "bg-indigo-400 text-slate-950 font-black",
        icon: ScanFace,
        items: ["マイナンバーカード（顔認証または目視）"],
        summary: "4桁の暗証番号を覚えていなくても、医療機関のカードリーダーで『顔認証』または『窓口目視』でスムーズに受診できます。",
        details: [
          "【顔認証で受付】病院の受付機器にカードを置き、画面のカメラを見るだけで暗証番号を入力せずに本人確認が完了します。",
          "【窓口の目視確認】機械の顔認証がうまく反応しない場合でも、病院スタッフがカードの写真を目視確認して受付可能です。",
          "【顔認証マイナンバーカード】市区町村の窓口で申請すれば、暗証番号の設定自体をなくした『顔認証専用カード』に切り替えることもできます（高齢者・認知症の方におすすめ）。"
        ],
        actionGuide: "病院の受付機器で『顔認証』を選択するか、窓口スタッフに『目視確認をお願いします』とお伝えください。"
      };
    }

    // 3. 標準のマイナ保険証ルート
    return {
      type: "myna",
      title: "マイナ保険証ルート（基本の受診方法）",
      badge: "最もスムーズな標準受診",
      badgeColor: "bg-teal-400 text-slate-950 font-black",
      icon: ShieldCheck,
      items: ["マイナンバーカード（顔認証 or 4桁暗証番号）"],
      summary: "マイナンバーカードを窓口のカードリーダーにかざすだけで、スムーズに保険診療が受けられます。",
      details: [
        "【限度額認定証が不要】高額療養費制度の限度額が窓口で自動適用され、急な入院や手術でも数十万円の一時立て替えがなくなります。",
        "【安全な医療】本人の同意に基づき、過去の処方薬や特定健診データを医師・薬剤師と共有し、重複投薬や飲み合わせ事故を防止します。",
        "【医療費控除が簡単】マイナポータル連携で、確定申告の医療費控除の領収書管理や入力が自動化されます。"
      ],
      actionGuide: "病院や薬局の受付にあるカードリーダーにマイナンバーカードを置いて受付してください。"
    };
  };

  const result = getDiagnosticResult();

  return (
    <section className="bg-gradient-to-br from-teal-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-5 sm:p-8 shadow-xl relative overflow-hidden border border-teal-500/30">
      {/* 背景装飾 */}
      <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-teal-500/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none" />

      <div className="relative z-10 space-y-6">
        {/* ヘッダー */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-teal-400/20 border border-teal-400/40 flex items-center justify-center text-teal-300">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-teal-300 uppercase tracking-wider block">
                {isSimpleMode ? "私はどうやって病院に行く？" : "受診ルート診断ナビゲーター"}
              </span>
              <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                {isSimpleMode ? "3つの質問で持ち物・受診方法をチェック" : "あなたに必要な「受診方法・持ち物・申請」を30秒診断"}
              </h3>
            </div>
          </div>
          <span className="text-xs bg-white/10 text-teal-200 px-3 py-1 rounded-full border border-white/10 font-medium">
            選択肢をタップ ↓
          </span>
        </div>

        {/* タイムライン概要バー（2026年現在の現実を反映） */}
        <div className="bg-white/5 rounded-2xl p-4 border border-white/10 text-xs">
          <div className="font-bold text-slate-300 flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-teal-300" />
              <span>保険証移行のタイムライン（経過措置は終了済）</span>
            </div>
            <span className="text-[10px] bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded-full border border-rose-500/30 font-bold">
              旧保険証は完全失効
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 text-[11px]">
            <div className="bg-white/5 p-2.5 rounded-xl border-l-4 border-slate-500 opacity-75">
              <div className="text-slate-400 text-[10px]">2024年12月2日【終了】</div>
              <div className="font-bold text-slate-300 mt-0.5">現行保険証の発行終了</div>
              <p className="text-slate-400 text-[10px] mt-1">紙・プラ保険証の新規発行がストップ</p>
            </div>
            <div className="bg-white/5 p-2.5 rounded-xl border-l-4 border-slate-500 opacity-75">
              <div className="text-slate-400 text-[10px]">2025年12月1日【終了】</div>
              <div className="font-bold text-slate-300 mt-0.5">1年間の経過措置が終了</div>
              <p className="text-slate-400 text-[10px] mt-1">手元の旧保険証がすべて有効期限切れに</p>
            </div>
            <div className="bg-teal-500/20 p-2.5 rounded-xl border-l-4 border-teal-400 ring-1 ring-teal-500/30">
              <div className="text-teal-300 text-[10px] font-bold">現在（2026年）</div>
              <div className="font-bold text-white mt-0.5">完全移行・2択の時代へ</div>
              <p className="text-teal-200 text-[10px] mt-1">「マイナ保険証」または「申請した資格確認書」</p>
            </div>
          </div>
        </div>

        {/* 診断設問エリア ＆ 結果表示（2カラム） */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* 左側：設問ボタン */}
          <div className="lg:col-span-6 space-y-4">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10 space-y-4 text-xs">
              <div className="font-bold text-teal-300 text-sm flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>あなたの状況を選択してください</span>
              </div>

              {/* Q1: マイナンバーカード */}
              <div className="space-y-1.5">
                <label className="text-slate-300 font-bold block">
                  Q1. マイナンバーカードを持っていますか？
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setHasCard("yes")}
                    className={`p-2.5 rounded-xl font-bold transition-all text-center border ${
                      hasCard === "yes"
                        ? "bg-teal-400 text-slate-950 border-teal-300 shadow-md"
                        : "bg-white/5 text-slate-300 border-white/10 hover:bg-white/15"
                    }`}
                  >
                    持っている
                  </button>
                  <button
                    type="button"
                    onClick={() => setHasCard("no")}
                    className={`p-2.5 rounded-xl font-bold transition-all text-center border ${
                      hasCard === "no"
                        ? "bg-teal-400 text-slate-950 border-teal-300 shadow-md"
                        : "bg-white/5 text-slate-300 border-white/10 hover:bg-white/15"
                    }`}
                  >
                    持っていない
                  </button>
                </div>
              </div>

              {/* Q2: 利用登録状況（カードありの場合のみ） */}
              {hasCard === "yes" && (
                <div className="space-y-1.5 pt-2 border-t border-white/10">
                  <label className="text-slate-300 font-bold block">
                    Q2. 健康保険証の利用登録をしていますか？
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setRegStatus("registered")}
                      className={`p-2 rounded-xl text-[11px] font-bold transition-all text-center border ${
                        regStatus === "registered"
                          ? "bg-teal-400 text-slate-950 border-teal-300 shadow-md"
                          : "bg-white/5 text-slate-300 border-white/10 hover:bg-white/15"
                      }`}
                    >
                      登録済み
                    </button>
                    <button
                      type="button"
                      onClick={() => setRegStatus("not_registered")}
                      className={`p-2 rounded-xl text-[11px] font-bold transition-all text-center border ${
                        regStatus === "not_registered"
                          ? "bg-teal-400 text-slate-950 border-teal-300 shadow-md"
                          : "bg-white/5 text-slate-300 border-white/10 hover:bg-white/15"
                      }`}
                    >
                      まだしていない
                    </button>
                    <button
                      type="button"
                      onClick={() => setRegStatus("opt_out")}
                      className={`p-2 rounded-xl text-[11px] font-bold transition-all text-center border ${
                        regStatus === "opt_out"
                          ? "bg-teal-400 text-slate-950 border-teal-300 shadow-md"
                          : "bg-white/5 text-slate-300 border-white/10 hover:bg-white/15"
                      }`}
                    >
                      解除したい
                    </button>
                  </div>
                </div>
              )}

              {/* Q3: 暗証番号の不安（カードあり＆登録済みの場合） */}
              {hasCard === "yes" && regStatus === "registered" && (
                <div className="space-y-1.5 pt-2 border-t border-white/10">
                  <label className="text-slate-300 font-bold block">
                    Q3. 4桁の暗証番号の管理・入力に不安はありますか？
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setPinPreference("confident")}
                      className={`p-2.5 rounded-xl font-bold transition-all text-center border ${
                        pinPreference === "confident"
                          ? "bg-teal-400 text-slate-950 border-teal-300 shadow-md"
                          : "bg-white/5 text-slate-300 border-white/10 hover:bg-white/15"
                      }`}
                    >
                      問題ない（覚えている）
                    </button>
                    <button
                      type="button"
                      onClick={() => setPinPreference("worried")}
                      className={`p-2.5 rounded-xl font-bold transition-all text-center border ${
                        pinPreference === "worried"
                          ? "bg-teal-400 text-slate-950 border-teal-300 shadow-md"
                          : "bg-white/5 text-slate-300 border-white/10 hover:bg-white/15"
                      }`}
                    >
                      不安 / 顔認証が良い
                    </button>
                  </div>
                </div>
              )}

              {/* 過去の保険証についての注意書き */}
              <div className="pt-2 border-t border-white/10 flex items-start gap-1.5 text-[11px] text-slate-300">
                <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  ※従来の健康保険証は2025年12月1日をもって経過措置が終了したため、現在は窓口で使用できません。
                </span>
              </div>
            </div>
          </div>

          {/* 右側：診断結果カード */}
          <div className="lg:col-span-6 bg-gradient-to-b from-white/15 to-white/5 backdrop-blur-lg rounded-3xl p-5 sm:p-6 border border-white/20 text-left relative shadow-2xl space-y-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-300 mb-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>診断結果：あなたの受診方法</span>
              </div>

              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className={`text-xs px-2.5 py-0.5 rounded-md font-bold ${result.badgeColor}`}>
                  {result.badge}
                </span>
              </div>

              <h4 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                {result.title}
              </h4>
            </div>

            {/* 持ち物ボックス */}
            <div className="bg-slate-950/60 p-3.5 rounded-2xl border border-white/10 space-y-1.5">
              <div className="text-[11px] text-teal-300 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>病院に行く時の持ち物：</span>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-0.5">
                {result.items.map((item, i) => (
                  <span
                    key={i}
                    className="bg-white/15 text-white font-bold px-3 py-1 rounded-xl text-xs border border-white/20 shadow-xs"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* 概要とポイント */}
            <p className="text-xs text-slate-200 leading-relaxed">
              {result.summary}
            </p>

            {/* 詳細箇条書き */}
            <div className="space-y-1.5 text-[11px] text-slate-300 pt-1 border-t border-white/10">
              {result.details.map((d, i) => (
                <div key={i} className="flex items-start gap-1.5 leading-relaxed">
                  <span className="text-teal-400 font-bold mt-0.5">•</span>
                  <span>{d}</span>
                </div>
              ))}
            </div>

            {/* アクションガイド */}
            <div className="bg-teal-500/15 p-3 rounded-xl border border-teal-500/30 text-xs text-teal-200 flex items-start gap-2">
              <ArrowRight className="w-4 h-4 text-teal-300 shrink-0 mt-0.5" />
              <div className="leading-relaxed">
                <span className="font-bold block text-teal-300">今すぐ必要なアクション：</span>
                {result.actionGuide}
              </div>
            </div>
          </div>
        </div>

        {/* 不安・疑問を解消するミニQ&A（2026年最新版） */}
        <div className="pt-2 border-t border-white/10">
          <div className="text-xs font-bold text-slate-300 mb-3 flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-teal-300" />
            <span>よくある疑問・不安を30秒でチェック（2026年現在）</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="bg-white/5 p-3.5 rounded-2xl border border-white/5 space-y-1">
              <span className="font-bold text-amber-300 text-[11px] block">
                Q. 昔の健康保険証はまだ使えますか？
              </span>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                <strong className="text-white">使えません。</strong> 2025年12月1日をもって1年間の猶予期間が終了したため、現在は「マイナ保険証」または「資格確認書」が必要です。
              </p>
            </div>

            <div className="bg-white/5 p-3.5 rounded-2xl border border-white/5 space-y-1">
              <span className="font-bold text-teal-300 text-[11px] block">
                Q. 資格確認書は放っておいても勝手に届く？
              </span>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                <strong className="text-white">届かないケースが多いため申請が必要です。</strong> マイナカード保有者等は自動送付されないため、健保や役所へ申請書を提出しましょう。
              </p>
            </div>

            <div className="bg-white/5 p-3.5 rounded-2xl border border-white/5 space-y-1">
              <span className="font-bold text-indigo-300 text-[11px] block">
                Q. カードがないと全額自己負担（10割）になる？
              </span>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                <strong className="text-white">申請すれば大丈夫です。</strong> 交付申請した「資格確認書」を提示すれば、これまで通り1〜3割負担で受診できます。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
