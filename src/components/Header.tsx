"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, ShieldCheck, BookOpen, Landmark, Scale, Heart, BookMarked, Newspaper } from "lucide-react";

interface HeaderProps {
  isSimpleMode: boolean;
  onToggleSimpleMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  isSimpleMode,
  onToggleSimpleMode,
}) => {
  return (
    <header className="border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* ロゴ・コンセプト（クリックでトップへ戻る） */}
        <Link
          href="/"
          className="flex items-center gap-3 group rounded-xl transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
          title="トップページ（政策一覧）へもどる"
        >
          <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-teal-400 shadow-sm group-hover:scale-105 group-hover:bg-slate-800 transition-all border border-slate-700/60">
            <BookMarked className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-black text-slate-900 tracking-tight group-hover:text-teal-700 transition-colors">
                日本政策図鑑
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-medium bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200/60">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                公的データ準拠
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5 group-hover:text-slate-600 transition-colors">
              くらしに関わる国のルールを、データと図解で
            </p>
          </div>
        </Link>

        {/* コントロール：根拠法ナビ & やさしい日本語トグル */}
        <nav aria-label="メインナビゲーション">
          <div className="flex items-center gap-2 self-end sm:self-auto flex-wrap">
            <Link
              href="/life-events"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-pink-50 text-pink-800 hover:bg-pink-100 border border-pink-200/70 transition-all shadow-2xs cursor-pointer"
              title="人生のできごとから政策を探す"
            >
              <Heart className="w-3.5 h-3.5 text-pink-600" />
              <span>くらしの逆引き</span>
            </Link>
            <Link
              href="/laws"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-800 hover:bg-indigo-100 border border-indigo-200/70 transition-all shadow-2xs cursor-pointer"
              title="主要53法律の解説と関連政策一覧"
            >
              <Landmark className="w-3.5 h-3.5 text-indigo-600" />
              <span>根拠法アーカイブ</span>
            </Link>
            <a
              href="https://jijizukan.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-800 hover:bg-blue-100 border border-blue-200/70 transition-all shadow-2xs cursor-pointer"
              title="時事図鑑（姉妹サイト）"
            >
              <Newspaper className="w-3.5 h-3.5 text-blue-600" />
              <span>時事図鑑</span>
            </a>
            <button
              type="button"
              onClick={onToggleSimpleMode}
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all shadow-sm ${
                isSimpleMode
                  ? "bg-amber-500 text-white ring-2 ring-amber-300 shadow-amber-100"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
              aria-pressed={isSimpleMode}
            >
              <Sparkles className={`w-3.5 h-3.5 ${isSimpleMode ? "animate-pulse" : "text-slate-500"}`} />
              <span>やさしい日本語モード</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold uppercase ${
                  isSimpleMode ? "bg-white text-amber-700" : "bg-slate-200 text-slate-600"
                }`}
              >
                {isSimpleMode ? "ON" : "OFF"}
              </span>
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};
