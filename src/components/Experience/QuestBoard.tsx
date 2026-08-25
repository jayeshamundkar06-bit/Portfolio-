"use client";

import React from "react";
import { EXPERIENCE_DATA } from "@/data/experience";
import { CheckCircle2, ShieldCheck, Scroll, Layout, Server, Bug, GitBranch } from "lucide-react";

export const QuestBoard: React.FC = () => {
  const iconMap: Record<string, React.ReactNode> = {
    Layout: <Layout className="w-5 h-5 text-mc-diamond" />,
    Server: <Server className="w-5 h-5 text-mc-gold" />,
    Bug: <Bug className="w-5 h-5 text-red-400" />,
    GitBranch: <GitBranch className="w-5 h-5 text-mc-emerald" />,
  };

  return (
    <section id="experience" className="relative min-h-screen py-20 px-4 sm:px-6 flex flex-col justify-center items-center select-none">
      {/* Section Header */}
      <div className="text-center mb-10 relative z-10">
        <div className="inline-flex items-center gap-2 bg-mc-panel border-2 border-mc-emerald px-3 py-1 mb-2 shadow-mc">
          <Scroll className="w-4 h-4 text-mc-emerald" />
          <span className="font-pixel text-mc-emerald text-base tracking-wider">
            CHAPTER IV: QUEST COMPLETED
          </span>
        </div>
        <h2 className="font-pixel text-4xl sm:text-5xl md:text-6xl text-white tracking-wider text-shadow">
          BOUNTY & QUEST BOARD
        </h2>
        <p className="font-sans text-sm sm:text-base text-slate-300 max-w-xl mx-auto mt-2">
          Verified industry internship quest logged into Jayesh&apos;s developer journal.
        </p>
      </div>

      {/* Wooden Quest Bulletin Board */}
      <div className="relative z-10 max-w-4xl w-full">
        <div className="mc-panel bg-[#221811] border-4 border-[#573516] p-6 sm:p-8 shadow-2xl relative">
          {/* Quest Banner Header */}
          <div className="bg-[#17100b] border-2 border-[#734720] p-4 mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-mc-emerald font-pixel text-xl sm:text-2xl">
                <CheckCircle2 className="w-6 h-6 text-mc-emerald" />
                <span>{EXPERIENCE_DATA.status}</span>
              </div>
              <h3 className="font-pixel text-2xl sm:text-4xl text-white tracking-wide mt-1">
                {EXPERIENCE_DATA.role}
              </h3>
              <div className="font-sans text-sm font-medium text-mc-gold mt-0.5">
                Organization: <span className="underline">{EXPERIENCE_DATA.company}</span> • {EXPERIENCE_DATA.location}
              </div>
            </div>

            <div className="bg-mc-panel border-2 border-mc-gold px-4 py-2 text-center">
              <div className="font-mono text-[10px] text-slate-400 uppercase">EXPERIENCE REWARD</div>
              <div className="font-pixel text-xl text-mc-gold">+500 DEV XP</div>
            </div>
          </div>

          {/* Quest Log Responsibilities */}
          <div className="space-y-4">
            <div className="font-pixel text-xl text-mc-diamond border-b border-mc-border pb-1">
              DOCUMENTED OBJECTIVES & DELIVERABLES:
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {EXPERIENCE_DATA.responsibilities.map((resp, index) => (
                <div
                  key={resp.id}
                  className="bg-[#1a130e] border-2 border-[#452a12] p-4 flex gap-3 hover:border-mc-gold transition-colors"
                >
                  <div className="p-2 bg-black/40 border border-[#5a3717] h-fit">
                    {iconMap[resp.icon] || <ShieldCheck className="w-5 h-5 text-mc-emerald" />}
                  </div>
                  <div className="flex-1">
                    <div className="font-pixel text-base text-mc-gold mb-1">
                      TASK #{index + 1}
                    </div>
                    <p className="font-sans text-sm text-slate-200 leading-relaxed">
                      {resp.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
