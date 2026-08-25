"use client";

import React from "react";
import { DSA_DATA } from "@/data/dsa";
import { useSound } from "@/hooks/useSound";
import { Skull, Swords, ExternalLink, Flame, ShieldAlert, Binary } from "lucide-react";

export const DungeonSection: React.FC = () => {
  const { playClick, playItemPop } = useSound();

  return (
    <section id="dsa" className="relative min-h-screen py-20 px-4 sm:px-6 flex flex-col justify-center items-center select-none">
      {/* Section Header */}
      <div className="text-center mb-10 relative z-10">
        <div className="inline-flex items-center gap-2 bg-mc-panel border-2 border-red-500 px-3 py-1 mb-2 shadow-mc">
          <Skull className="w-4 h-4 text-red-500 animate-pulse" />
          <span className="font-pixel text-red-400 text-base tracking-wider">
            CHAPTER VII: THE DUNGEON
          </span>
        </div>
        <h2 className="font-pixel text-4xl sm:text-5xl md:text-6xl text-white tracking-wider text-shadow">
          DATA STRUCTURES & ALGORITHMS
        </h2>
        <p className="font-sans text-sm sm:text-base text-slate-300 max-w-xl mx-auto mt-2">
          {DSA_DATA.subtitle} — Conquering computational complexity and algorithmic challenges.
        </p>
      </div>

      {/* Dungeon Chamber Box */}
      <div className="relative z-10 max-w-4xl w-full mc-panel bg-[#111317] border-4 border-[#333a48] p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-mc-border pb-4 mb-6">
          <div>
            <div className="font-pixel text-2xl text-white">{DSA_DATA.title}</div>
            <p className="font-sans text-sm text-slate-300 max-w-lg mt-1">
              {DSA_DATA.description}
            </p>
          </div>

          <a
            href={DSA_DATA.leetcodeUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playClick(1000)}
            className="mc-button mc-button-gold text-lg px-4 py-2 flex items-center gap-2"
          >
            <span>LEETCODE PROFILE</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Mob Challenge Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {DSA_DATA.topics.map((t, idx) => (
            <div
              key={idx}
              onClick={() => playItemPop()}
              className="bg-[#181c24] border-2 border-mc-border p-4 hover:border-red-500 transition-colors flex items-center gap-4 group cursor-pointer"
            >
              <div className="p-3 bg-black/50 border border-mc-border text-red-400 group-hover:text-mc-gold transition-colors">
                <Swords className="w-6 h-6" />
              </div>

              <div>
                <div className="font-pixel text-xl text-white group-hover:text-mc-diamond transition-colors leading-tight">
                  {t.name}
                </div>
                <div className="font-mono text-xs text-red-400 flex items-center gap-1 mt-0.5">
                  <Flame className="w-3.5 h-3.5" />
                  <span>Encounter: {t.mobEncounter}</span>
                </div>
                <div className="font-sans text-xs text-slate-400 mt-1">
                  Focus: {t.level}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Status update banner */}
        <div className="bg-black/60 border border-mc-border p-3 flex items-center gap-3 font-mono text-xs text-slate-300">
          <div className="w-2.5 h-2.5 rounded-full bg-mc-emerald animate-ping shrink-0" />
          <span>{DSA_DATA.statusMessage}</span>
        </div>
      </div>
    </section>
  );
};
