/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { PolicyPerspectiveItem } from "@/types/policy";
import { ThumbsUp, HelpCircle, Scale, ChevronDown, ChevronUp, MessageSquare } from "lucide-react";
import { getVoices } from "@/lib/voices";

interface PolicyPerspectivesProps {
  policyId?: string;
  benefitsTitle: string;
  benefits: PolicyPerspectiveItem[];
  challengesTitle: string;
  challenges: PolicyPerspectiveItem[];
  isSimpleMode: boolean;
}

export const PolicyPerspectives: React.FC<PolicyPerspectivesProps> = ({
  policyId = "child-allowance-expansion",
  benefitsTitle,
  benefits,
  challengesTitle,
  challenges,
  isSimpleMode,
}) => {
  const [showDetailedDebate, setShowDetailedDebate] = useState<boolean>(false);
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };


  const rawVoices = getVoices(policyId);
  const voices = rawVoices ? {
    benefits: rawVoices.benefits.map((v: any) => ({
      speaker: v.speaker,
      comment: isSimpleMode ? v.commentSimple : v.commentStandard
    })),
    challenges: rawVoices.challenges.map((v: any) => ({
      speaker: v.speaker, 
      comment: isSimpleMode ? v.commentSimple : v.commentStandard
    }))
  } : {
    benefits: (benefits || []).slice(0, 2).map((b) => ({
      speaker: b.tag || (isSimpleMode ? "応援する人" : "推進・期待側の声"),
      comment: isSimpleMode ? `「${b.simpleDetail || b.summary}」` : `「${b.summary}」`,
    })),
    challenges: (challenges || []).slice(0, 2).map((c) => ({
      speaker: c.tag || (isSimpleMode ? "心配する人" : "懸念・慎重側の声"),
      comment: isSimpleMode ? `「${c.simpleDetail || c.summary}」` : `「${c.summary}」`,
    })),
  };
  const benefitVoices = voices.benefits || [];
  const challengeVoices = voices.challenges || [];

  return (
    <section className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 sm:p-7">
      <div className="mb-5">
        <div className="flex items-center justify-between gap-2 mb-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-teal-50 text-teal-700">
              <Scale className="w-4 h-4" />
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">
              {isSimpleMode ? "みんなどう思ってる？（賛成と心配）" : "両論の整理（メリットと検討課題）"}
            </h3>
          </div>
          <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
            フラットに両論併記
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-500">
          どちらか一方を正解と決めつけず、どんな意見や論点があるのかを市民目線でまとめました。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* メリット */}
        <div className="bg-emerald-50/50 rounded-2xl p-4 border border-emerald-200/60 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900 mb-3">
              <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                <ThumbsUp className="w-3 h-3" />
              </span>
              <span>{benefitsTitle}</span>
            </div>

            <div className="space-y-2.5">
              {benefitVoices.map((voice: any, idx: number) => (
                <div
                  key={idx}
                  className="bg-white p-3 rounded-xl border border-emerald-100 shadow-2xs relative text-xs leading-relaxed text-slate-800"
                >
                  <div className="text-[10px] font-bold text-emerald-700 mb-1 flex items-center gap-1">
                    <MessageSquare className="w-3 h-3" />
                    {voice.speaker}
                  </div>
                  <div className="font-semibold text-slate-900">{voice.comment}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 課題・懸念 */}
        <div className="bg-amber-50/50 rounded-2xl p-4 border border-amber-200/60 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 mb-3">
              <span className="w-5 h-5 rounded-full bg-amber-600 text-white flex items-center justify-center">
                <HelpCircle className="w-3 h-3" />
              </span>
              <span>{challengesTitle}</span>
            </div>

            <div className="space-y-2.5">
              {challengeVoices.map((voice: any, idx: number) => (
                <div
                  key={idx}
                  className="bg-white p-3 rounded-xl border border-amber-100 shadow-2xs relative text-xs leading-relaxed text-slate-800"
                >
                  <div className="text-[10px] font-bold text-amber-700 mb-1 flex items-center gap-1">
                    <MessageSquare className="w-3 h-3" />
                    {voice.speaker}
                  </div>
                  <div className="font-semibold text-slate-900">{voice.comment}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 詳しい論点アコーディオン */}
      <div className="mt-5 pt-4 border-t border-slate-100 text-center">
        <button
          type="button"
          onClick={() => setShowDetailedDebate((prev) => !prev)}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-teal-700 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-xl transition-all"
        >
          <span>{showDetailedDebate ? "詳しい議論をたたむ" : "公的審議会での詳しい論点を見る（＋3項目ずつ）"}</span>
          {showDetailedDebate ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        {showDetailedDebate && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4 text-left animate-in fade-in duration-200">
            <div className="space-y-2.5">
              <div className="text-xs font-bold text-emerald-800 mb-1">公的データ上の期待効果:</div>
              {benefits.map((item) => {
                const isExpanded = !!expandedItems[item.id];
                return (
                  <div key={item.id} className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-slate-800">{item.title}</span>
                      <span className="text-[10px] bg-white px-1.5 py-0.5 rounded border border-slate-200 text-slate-500">{item.tag}</span>
                    </div>
                    <p className="text-slate-600 mb-2">{item.summary}</p>
                    <button
                      type="button"
                      onClick={() => toggleExpand(item.id)}
                      className="text-[11px] font-medium text-teal-700 hover:underline flex items-center gap-0.5"
                    >
                      {isExpanded ? "解説をたたむ ▲" : "くわしい根拠 ▼"}
                    </button>
                    {isExpanded && (
                      <div className="mt-2 p-2 bg-white rounded border border-slate-200 text-slate-600 leading-relaxed">
                        {isSimpleMode ? item.simpleDetail : item.detail}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="space-y-2.5">
              <div className="text-xs font-bold text-amber-800 mb-1">国会・審議会での懸念点:</div>
              {challenges.map((item) => {
                const isExpanded = !!expandedItems[item.id];
                return (
                  <div key={item.id} className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-slate-800">{item.title}</span>
                      <span className="text-[10px] bg-white px-1.5 py-0.5 rounded border border-slate-200 text-slate-500">{item.tag}</span>
                    </div>
                    <p className="text-slate-600 mb-2">{item.summary}</p>
                    <button
                      type="button"
                      onClick={() => toggleExpand(item.id)}
                      className="text-[11px] font-medium text-amber-700 hover:underline flex items-center gap-0.5"
                    >
                      {isExpanded ? "解説をたたむ ▲" : "くわしい根拠 ▼"}
                    </button>
                    {isExpanded && (
                      <div className="mt-2 p-2 bg-white rounded border border-slate-200 text-slate-600 leading-relaxed">
                        {isSimpleMode ? item.simpleDetail : item.detail}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
