import React from "react";
import { Heart, Code2 } from "lucide-react";
import { PolicyModals } from "@/components/PolicyModals";

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-200 bg-white py-10 text-slate-500 text-xs mt-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <p className="font-semibold text-slate-800">
            ポリスケープ (PoliScape) - 初心者のための政策可視化オープンプロジェクト
          </p>
          <p className="mt-1 text-slate-500">
            本サイトは、公的一次情報をもとに中立・教育目的で制作されたシビックテックツールです。
          </p>
          <div className="mt-3">
            <PolicyModals />
          </div>
        </div>
        <div className="flex flex-col sm:items-end gap-2 shrink-0">
          <span className="flex items-center gap-1.5 text-slate-400">
            <Code2 className="w-3.5 h-3.5 text-slate-400" />
            <span>Civic Tech Project with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          </span>
          <p className="text-[11px] text-slate-400">
            © {new Date().getFullYear()} PoliScape Project
          </p>
        </div>
      </div>
    </footer>
  );
};
