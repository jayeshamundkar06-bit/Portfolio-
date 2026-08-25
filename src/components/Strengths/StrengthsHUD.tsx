"use client";

import React from "react";
import { PROFILE_DATA } from "@/data/profile";
import { Shield, Sparkles, Swords, Users, Zap } from "lucide-react";

export const StrengthsHUD: React.FC = () => {
  const iconMap: Record<string, React.ReactNode> = {
    Sparkles: <Sparkles className="w-6 h-6 text-mc-emerald" />,
    Swords: <Swords className="w-6 h-6 text-mc-diamond" />,
    Users: <Users className="w-6 h-6 text-mc-gold" />,
    Zap: <Zap className="w-6 h-6 text-purple-400" />
  };

  return (
    <section id="strengths" className="relative py-20 px-4 sm:px-6 flex flex-col justify-center items-center select-none">
      {/* Section Header */}
      <div className="text-center mb-10 relative z-10">
        <div className="inline-flex items-center gap-2 bg-mc-panel border-2 border-mc-gold px-3 py-1 mb-2 shadow-mc">
          <Shield className="w-4 h-4 text-mc-gold" />
          <span className="font-pixel text-mc-gold text-base tracking-wider">
            CHAPTER III: PLAYER STATUS
          </span>
        </div>
        <h2 className="font-pixel text-4xl sm:text-5xl md:text-6xl text-white tracking-wider text-shadow">
          PLAYER ATTRIBUTES
        </h2>
        <p className="font-sans text-sm sm:text-base text-slate-300 max-w-xl mx-auto mt-2">
          Jayesh&apos;s core developer strengths presented as Minecraft active buffs and attributes.
        </p>
      </div>

      {/* Player Inventory Status Screen */}
      <div className="relative z-10 max-w-4xl w-full mc-panel p-6 sm:p-8">
        <div className="flex items-center justify-between border-b-2 border-mc-border pb-3 mb-6">
          <div className="font-pixel text-2xl text-white">CHARACTER STATUS: JAYESH AMUNDKAR</div>
          <div className="font-mono text-xs text-mc-emerald">CLASS: FULL-STACK ADVENTURER</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PROFILE_DATA.strengths.map((st, i) => (
            <div
              key={i}
              className="mc-panel-dark p-4 border-2 border-mc-border hover:border-mc-emerald transition-colors flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-black/40 border border-mc-border">
                      {iconMap[st.icon] || <Sparkles className="w-5 h-5 text-mc-gold" />}
                    </div>
                    <h3 className="font-pixel text-xl sm:text-2xl text-white group-hover:text-mc-diamond transition-colors leading-tight">
                      {st.title}
                    </h3>
                  </div>
                </div>
                <p className="font-sans text-sm text-slate-300 leading-relaxed mb-3">
                  {st.description}
                </p>
              </div>

              <div className="pt-2 border-t border-mc-border/60 flex items-center justify-between text-xs font-mono">
                <span className="text-purple-400 flex items-center gap-1">
                  🔮 {st.minecraftBuff}
                </span>
                <span className="text-mc-emerald font-bold">{st.attribute}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
