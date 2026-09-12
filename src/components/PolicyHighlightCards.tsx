/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { PolicyTopic } from "@/types/policy";
import {
  Activity, AlertTriangle, Anchor, Baby, Ban, BatteryCharging, BookOpen, Briefcase, Building,
  Bus, Calculator, Calendar, Camera, Car, CheckCircle, CheckCircle2, Clock, Coins, Compass,
  CornerDownRight, Cpu, CreditCard, DollarSign, Eye, Factory, FileCheck, FileCode,
  FileSpreadsheet, FileText, Flame, Gift, Globe, GraduationCap, Heart, HeartHandshake,
  HeartPulse, Home, Hotel, Landmark, Laptop, Layers, Leaf, Lock, MapPin, MessageSquare,
  Music, PhoneCall, PiggyBank, Repeat, Satellite, Scale, Send, Share2, Shield, ShieldAlert,
  ShieldCheck, Ship, Smartphone, Sparkles, Sun, Ticket, Train, Trees, TrendingDown,
  TrendingUp, UserCheck, Users, Wallet, Wind, Wrench, Zap
} from "lucide-react";

// アイコン名文字列からコンポーネントへのマッピング
const ICON_MAP: Record<string, React.ElementType> = {
  Activity, AlertTriangle, Anchor, Baby, Ban, BatteryCharging, BookOpen, Briefcase, Building,
  Bus, Calculator, Calendar, Camera, Car, CheckCircle, CheckCircle2, Clock, Coins, Compass,
  CornerDownRight, Cpu, CreditCard, DollarSign, Eye, Factory, FileCheck, FileCode,
  FileSpreadsheet, FileText, Flame, Gift, Globe, GraduationCap, Heart, HeartHandshake,
  HeartPulse, Home, Hotel, Landmark, Laptop, Layers, Leaf, Lock, MapPin, MessageSquare,
  Music, PhoneCall, PiggyBank, Repeat, Satellite, Scale, Send, Share2, Shield, ShieldAlert,
  ShieldCheck, Ship, Smartphone, Sparkles, Sun, Ticket, Train, Trees, TrendingDown,
  TrendingUp, UserCheck, Users, Wallet, Wind, Wrench, Zap
};

interface PolicyHighlightCardsProps {
  policy: PolicyTopic;
  isSimpleMode: boolean;
}

export const PolicyHighlightCards: React.FC<PolicyHighlightCardsProps> = ({
  policy,
  isSimpleMode,
}) => {
  const isUnderDiscussion = policy.status === "discussing" || policy.status === "proposed";

  // policy.highlights (JSON由来) がある場合はそれを整形
  let highlights: any[] | null = null;

  if (policy.highlights && policy.highlights.length > 0) {
    highlights = policy.highlights.map((card) => ({
      label: isSimpleMode ? (card.labelSimple || card.label) : (card.labelStandard || card.label),
      value: card.value,
      unit: card.unit,
      oldValue: card.oldValue,
      description: isSimpleMode
        ? (card.descriptionSimple || card.description)
        : (card.descriptionStandard || card.description),
      badge: card.badge,
      badgeColor: card.badgeColor,
      icon: ICON_MAP[card.icon] || Sparkles,
    }));
  }

  // fallback: highlights が未定義の政策は policy.changes から自動生成
  if (!highlights) {
    highlights =
      policy.changes && policy.changes.length > 0
        ? policy.changes.slice(0, 4).map((c, idx) => ({
            label: c.topic,
            value: c.highlight || (isUnderDiscussion ? "見直し案" : "新制度"),
            unit: "",
            oldValue: isUnderDiscussion ? `現行: ${c.before}` : `これまで: ${c.before}`,
            description: c.after,
            badge: c.highlight || (isUnderDiscussion ? "審議中" : "新制度"),
            badgeColor: isUnderDiscussion
              ? "bg-amber-100 text-amber-900"
              : idx % 2 === 0
              ? "bg-teal-100 text-teal-800"
              : "bg-emerald-100 text-emerald-800",
            icon: Sparkles,
          }))
        : [];
  }

  return (
    <section>
      <div className="flex items-center justify-between mb-3 px-1">
        <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
          <span>{isSimpleMode ? "数字でわかる！重要ポイント" : "4つの主な注目ポイント"}</span>
        </h3>
        <span className="text-xs text-slate-500">ひと目でわかる重要ポイント</span>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {highlights.map((card: any, idx: number) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-xs hover:shadow-md hover:border-teal-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-2">
                  <span className="p-1.5 rounded-lg bg-slate-100 text-slate-700">
                    <Icon className="w-4 h-4 text-teal-700" />
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${card.badgeColor}`}>
                    {card.badge}
                  </span>
                </div>

                <div className="text-xs font-semibold text-slate-500 mb-1">
                  {card.label}
                </div>

                <div className="flex items-baseline gap-0.5 my-1">
                  <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    {card.value}
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-slate-600">
                    {card.unit}
                  </span>
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-100">
                <div className="text-[11px] text-slate-400 line-through truncate">
                  {card.oldValue}
                </div>
                <div className="text-xs font-bold text-teal-700 mt-0.5 leading-snug">
                  {card.description}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
