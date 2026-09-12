/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { PolicyPerspectiveItem, VoiceSetItem } from "@/types/policy";
import { ThumbsUp, HelpCircle, Scale, ChevronDown, ChevronUp, MessageSquare } from "lucide-react";

interface PolicyPerspectivesProps {
  policyId?: string;
  voices?: VoiceSetItem;
  benefitsTitle: string;
  benefits: PolicyPerspectiveItem[];
  challengesTitle: string;
  challenges: PolicyPerspectiveItem[];
  isSimpleMode: boolean;
}

export const PolicyPerspectives: React.FC<PolicyPerspectivesProps> = ({
  voices: customVoices,
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

  const formattedVoices = customVoices ? {
    benefits: customVoices.benefits.map((v: any) => ({
      speaker: v.speaker,
      comment: isSimpleMode ? v.commentSimple : v.commentStandard
    })),
    challenges: customVoices.challenges.map((v: any) => ({
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

  const benefitVoices = formattedVoices.benefits || [];
  const challengeVoices = formattedVoices.challenges || [];

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

      {/* ふきだし形式：推進側 vs 慎重側 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6">
        {/* 推進・期待する声 */}
        <div className="bg-gradient-to-b from-teal-50/50 to-slate-50/50 border border-teal-200/60 rounded-2xl p-4 sm:p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-900 bg-teal-100/80 px-2.5 py-1 rounded-full">
                <ThumbsUp className="w-3.5 h-3.5 text-teal-700" />
                <span>{isSimpleMode ? "いいな！助かる！という声" : "期待・推進側の主な視点"}</span>
              </span>
              <span className="text-[11px] text-teal-700 font-medium">
                {benefitVoices.length}つの視点
              </span>
            </div>

            <div className="space-y-3">
              {benefitVoices.map((voice: any, idx: number) => (
                <div key={idx} className="bg-white p-3.5 rounded-xl border border-teal-100 shadow-2xs">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span>
                    <span className="text-[11px] font-bold text-slate-700">{voice.speaker}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                    {voice.comment}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-teal-100/80 flex items-center justify-between text-[11px] text-teal-800 font-medium">
            <span>期待される主な効果</span>
            <span className="truncate max-w-[200px] text-right text-slate-600 font-normal">
              {benefitsTitle}
            </span>
          </div>
        </div>

        {/* 慎重・懸念する声 */}
        <div className="bg-gradient-to-b from-amber-50/50 to-slate-50/50 border border-amber-200/60 rounded-2xl p-4 sm:p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-900 bg-amber-100/80 px-2.5 py-1 rounded-full">
                <HelpCircle className="w-3.5 h-3.5 text-amber-700" />
                <span>{isSimpleMode ? "大丈夫？心配だな…という声" : "慎重・検討課題の主な視点"}</span>
              </span>
              <span className="text-[11px] text-amber-700 font-medium">
                {challengeVoices.length}つの視点
              </span>
            </div>

            <div className="space-y-3">
              {challengeVoices.map((voice: any, idx: number) => (
                <div key={idx} className="bg-white p-3.5 rounded-xl border border-amber-100 shadow-2xs">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                    <span className="text-[11px] font-bold text-slate-700">{voice.speaker}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                    {voice.comment}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-amber-100/80 flex items-center justify-between text-[11px] text-amber-800 font-medium">
            <span>主な検討課題・論点</span>
            <span className="truncate max-w-[200px] text-right text-slate-600 font-normal">
              {challengesTitle}
            </span>
          </div>
        </div>
      </div>

      {/* くわしい議論を見るトグル */}
      <div className="pt-2 border-t border-slate-100">
        <button
          type="button"
          onClick={() => setShowDetailedDebate((prev) => !prev)}
          className="w-full flex items-center justify-center gap-1.5 py-2.5 px-4 text-xs font-bold text-slate-600 bg-slate-50 hover:bg-slate-100 rounded-xl transition-all border border-slate-200/80 cursor-pointer"
        >
          <MessageSquare className="w-3.5 h-3.5 text-slate-500" />
          <span>{showDetailedDebate ? "詳細な論点解説をたたむ" : "各省庁や審議会での具体的な論点・根拠を見る"}</span>
          {showDetailedDebate ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        {showDetailedDebate && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in duration-200">
            <div className="space-y-2.5">
              <div className="text-xs font-bold text-teal-800 mb-1">公式審議会での推進論拠:</div>
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
                      className="text-[11px] font-medium text-teal-700 hover:underline flex items-center gap-0.5 cursor-pointer"
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
                      className="text-[11px] font-medium text-amber-700 hover:underline flex items-center gap-0.5 cursor-pointer"
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
