"use client";

import React, { useState } from "react";
import { ShieldCheck, Scale, AlertCircle, FileText, X } from "lucide-react";

type ModalType = "about" | "neutrality" | "disclaimer" | "privacy" | null;

export const PolicyModals: React.FC = () => {
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  const closeModal = () => setActiveModal(null);

  return (
    <>
      {/* フッターリンク群 */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500">
        <button
          type="button"
          onClick={() => setActiveModal("about")}
          className="hover:text-teal-700 underline underline-offset-4 cursor-pointer transition-colors"
        >
          当サイトについて
        </button>
        <button
          type="button"
          onClick={() => setActiveModal("neutrality")}
          className="hover:text-teal-700 underline underline-offset-4 cursor-pointer transition-colors"
        >
          中立性・編集方針
        </button>
        <button
          type="button"
          onClick={() => setActiveModal("disclaimer")}
          className="hover:text-teal-700 underline underline-offset-4 cursor-pointer transition-colors"
        >
          免責事項
        </button>
        <button
          type="button"
          onClick={() => setActiveModal("privacy")}
          className="hover:text-teal-700 underline underline-offset-4 cursor-pointer transition-colors"
        >
          プライバシーポリシー
        </button>
      </div>

      {/* モーダル表示 */}
      {activeModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-7 shadow-2xl border border-slate-200 max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-4 mb-4">
              <div className="flex items-center gap-2">
                {activeModal === "about" && <ShieldCheck className="w-5 h-5 text-teal-600" />}
                {activeModal === "neutrality" && <Scale className="w-5 h-5 text-indigo-600" />}
                {activeModal === "disclaimer" && <AlertCircle className="w-5 h-5 text-amber-600" />}
                {activeModal === "privacy" && <FileText className="w-5 h-5 text-slate-600" />}
                <h2 className="text-lg font-bold text-slate-900">
                  {activeModal === "about" && "当サイトについて (PoliScape)"}
                  {activeModal === "neutrality" && "中立性・編集方針"}
                  {activeModal === "disclaimer" && "免責事項・注意事項"}
                  {activeModal === "privacy" && "プライバシーポリシー"}
                </h2>
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                aria-label="閉じる"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-sm text-slate-600 space-y-4 leading-relaxed">
              {activeModal === "about" && (
                <>
                  <p>
                    <strong>ポリスケープ (PoliScape)</strong> は、複雑になりがちな国の政策や制度変更を、公的データに基づいて誰にでもわかりやすく可視化する非営利のシビックテックプロジェクトです。
                  </p>
                  <p>
                    「政治や政策は難しくて自分に関係ないように思える」「メディアの切り取りやSNSの対立煽りで何が事実かわからない」という課題を解消し、ひとりひとりが客観的なデータに基づいてくらしの選択肢を持てる社会を目指しています。
                  </p>
                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs">
                    <p className="font-semibold text-slate-800 mb-1">プロジェクトの柱</p>
                    <ul className="list-disc pl-4 space-y-1 text-slate-600">
                      <li>全500政策の網羅的アーカイブとタイムライン整理</li>
                      <li>3行要約・ビフォーアフター・特大数字による直感的理解</li>
                      <li>専門知識なしで使える37種類の個別家計シミュレーター＆判定ナビ</li>
                      <li>やさしい日本語モードによるアクセシビリティ担保</li>
                    </ul>
                  </div>
                </>
              )}

              {activeModal === "neutrality" && (
                <>
                  <p>
                    当サイトは、特定の政党、政治団体、宗教団体、企業・特定の利益団体から独立して運営されています。
                  </p>
                  <div className="bg-indigo-50/70 p-3.5 rounded-xl border border-indigo-100 text-xs space-y-2 text-indigo-950">
                    <p className="font-bold">編集方針の3原則</p>
                    <ol className="list-decimal pl-4 space-y-1.5">
                      <li>
                        <strong>一次情報の尊重:</strong> 各府省庁の公開資料、審議会答申、国会会議録、官報、統計データ等の公的ソースを必ず明記します。
                      </li>
                      <li>
                        <strong>両論併記（公平性）:</strong> 政策の導入意図や期待されるメリットだけでなく、懸念される課題、慎重意見、財源や運用上のデメリットも対等に記載します。
                      </li>
                      <li>
                        <strong>感情的言動の排除:</strong> レトリックや煽り文句を排し、事実関係とデータに基づいた客観的記述に徹します。
                      </li>
                    </ol>
                  </div>
                </>
              )}

              {activeModal === "disclaimer" && (
                <>
                  <p>
                    当サイトに掲載している政策データおよび各種シミュレーターの計算結果は、公開されている公的資料に基づき作成していますが、制度の最新の法改正や個人の所得・世帯構成等の詳細条件により、実際の適用結果と異なる場合があります。
                  </p>
                  <p>
                    当サイトのシミュレーション結果はあくまで目安（概算）としてご利用いただき、実際の申請や法的手続きにあたっては、必ず管轄の自治体、税務署、年金事務所、または各府省庁の公式一次情報をご確認ください。
                  </p>
                  <p className="text-xs text-slate-500">
                    当サイトの利用によって生じたいかなる損害・不利益についても、運営者は一切の責任を負いかねますのであらかじめご了承ください。
                  </p>
                </>
              )}

              {activeModal === "privacy" && (
                <>
                  <p>
                    当サイトでは、利用者の皆様のプライバシーを最優先に考えています。
                  </p>
                  <ul className="list-disc pl-4 space-y-2 text-xs">
                    <li>
                      <strong>個人情報の非収集:</strong> 氏名、メールアドレス、電話番号、住所などの個人を特定できる情報は一切収集・保持いたしません。
                    </li>
                    <li>
                      <strong>シミュレーターのローカル処理:</strong> 画面上で入力した年収や家族構成などの数値は、すべてお使いのブラウザ内でのみ計算され、外部サーバーに送信・保存されることはありません。
                    </li>
                    <li>
                      <strong>アクセス解析・閲覧数:</strong> サービスの品質向上および政策ごとの関心度把握のため、ページごとの閲覧数のみを匿名で集計しています。個人を特定する追跡（クロスサイトトラッキング）は行っていません。
                    </li>
                  </ul>
                </>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={closeModal}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
              >
                閉じる
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
