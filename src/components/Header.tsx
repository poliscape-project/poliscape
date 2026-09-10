"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, ShieldCheck, BookOpen } from "lucide-react";

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
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-white font-bold text-lg shadow-sm group-hover:scale-105 group-hover:shadow-md transition-all">
            政
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-slate-900 tracking-tight group-hover:text-teal-700 transition-colors">
                ポリスケープ <span className="text-xs font-normal text-slate-500">PoliScape</span>
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-medium bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200/60">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                公的データ準拠
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5 group-hover:text-slate-600 transition-colors">
              対立をあおらず、客観的な事実と両論をわかりやすく伝えるシビックテック
            </p>
          </div>
        </Link>

        {/* コントロール：やさしい日本語トグル */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
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
      </div>
    </header>
  );
};
