"use client";

import React from "react";
import Link from "next/link";
import {
  Baby, GraduationCap, Briefcase, Heart, Home, HeartPulse,
  HandHelping, PiggyBank, Calculator, ShieldAlert, Car, Rocket,
  ArrowRight,
} from "lucide-react";
import { LIFE_EVENTS } from "@/lib/life-events";

const ICON_MAP: Record<string, React.ElementType> = {
  Baby,
  GraduationCap,
  Briefcase,
  Heart,
  Home,
  HeartPulse,
  HandHelping,
  PiggyBank,
  Calculator,
  ShieldAlert,
  Car,
  Rocket,
};

const COLOR_MAP: Record<string, { bg: string; icon: string; border: string; hoverBorder: string }> = {
  pink:    { bg: "bg-pink-50",    icon: "text-pink-600",    border: "border-pink-100",    hoverBorder: "hover:border-pink-300" },
  blue:    { bg: "bg-blue-50",    icon: "text-blue-600",    border: "border-blue-100",    hoverBorder: "hover:border-blue-300" },
  indigo:  { bg: "bg-indigo-50",  icon: "text-indigo-600",  border: "border-indigo-100",  hoverBorder: "hover:border-indigo-300" },
  rose:    { bg: "bg-rose-50",    icon: "text-rose-600",    border: "border-rose-100",    hoverBorder: "hover:border-rose-300" },
  emerald: { bg: "bg-emerald-50", icon: "text-emerald-600", border: "border-emerald-100", hoverBorder: "hover:border-emerald-300" },
  red:     { bg: "bg-red-50",     icon: "text-red-600",     border: "border-red-100",     hoverBorder: "hover:border-red-300" },
  amber:   { bg: "bg-amber-50",   icon: "text-amber-600",   border: "border-amber-100",   hoverBorder: "hover:border-amber-300" },
  violet:  { bg: "bg-violet-50",  icon: "text-violet-600",  border: "border-violet-100",  hoverBorder: "hover:border-violet-300" },
  teal:    { bg: "bg-teal-50",    icon: "text-teal-600",    border: "border-teal-100",    hoverBorder: "hover:border-teal-300" },
  orange:  { bg: "bg-orange-50",  icon: "text-orange-600",  border: "border-orange-100",  hoverBorder: "hover:border-orange-300" },
  sky:     { bg: "bg-sky-50",     icon: "text-sky-600",     border: "border-sky-100",     hoverBorder: "hover:border-sky-300" },
  purple:  { bg: "bg-purple-50",  icon: "text-purple-600",  border: "border-purple-100",  hoverBorder: "hover:border-purple-300" },
};

interface LifeEventCardsProps {
  isSimpleMode: boolean;
}

export function LifeEventCards({ isSimpleMode }: LifeEventCardsProps) {
  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base sm:text-lg font-bold text-slate-800">
          {isSimpleMode ? "こまったとき・しりたいこと から さがす" : "人生のできごとから探す"}
        </h2>
        <Link
          href="/life-events"
          className="inline-flex items-center gap-1 text-xs font-bold text-teal-700 hover:text-teal-900 transition-colors"
        >
          {isSimpleMode ? "もっと みる" : "すべて見る"}
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
        {LIFE_EVENTS.map((event) => {
          const IconComponent = ICON_MAP[event.icon] || Rocket;
          const colors = COLOR_MAP[event.color] || COLOR_MAP.teal;

          return (
            <Link
              key={event.id}
              href={`/life-events?event=${event.id}`}
              className={`group bg-white rounded-2xl border ${colors.border} ${colors.hoverBorder} p-3.5 shadow-2xs hover:shadow-sm transition-all flex flex-col gap-2`}
            >
              <div className={`w-8 h-8 rounded-xl ${colors.bg} ${colors.icon} flex items-center justify-center shrink-0`}>
                <IconComponent className="w-4.5 h-4.5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-slate-900 leading-tight">
                  {isSimpleMode ? event.simpleLabel : event.label}
                </div>
                <div className="text-[10px] text-slate-400 font-medium mt-0.5">
                  {event.policyCount}件の制度
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
