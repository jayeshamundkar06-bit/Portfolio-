"use client";

import React, { useState } from "react";
import { CERTIFICATIONS_DATA, CertificationItem } from "@/data/certifications";
import { useSound } from "@/hooks/useSound";
import { Award, Trophy, Sparkles, Shield, Cloud, Sword } from "lucide-react";

export const Advancements: React.FC = () => {
  const { playLevelUp, playClick } = useSound();
  const [activeAdvancement, setActiveAdvancement] = useState<CertificationItem | null>(null);

  const iconMap: Record<string, React.ReactNode> = {
    DiamondSword: <Award className="w-7 h-7 text-mc-diamond" />,
    Shield: <Shield className="w-7 h-7 text-mc-gold" />,
    Sparkles: <Sparkles className="w-7 h-7 text-purple-400" />,
    Cloud: <Cloud className="w-7 h-7 text-mc-emerald" />,
  };

  return (
    <section id="certifications" className="relative min-h-screen py-20 px-4 sm:px-6 flex flex-col justify-center items-center select-none">
      {/* Section Header */}
      <div className="text-center mb-10 relative z-10">
        <div className="inline-flex items-center gap-2 bg-mc-panel border-2 border-mc-gold px-3 py-1 mb-2 shadow-mc">
          <Trophy className="w-4 h-4 text-mc-gold" />
          <span className="font-pixel text-mc-gold text-base tracking-wider">
            CHAPTER VI: ADVANCEMENTS MADE!
          </span>
        </div>
        <h2 className="font-pixel text-4xl sm:text-5xl md:text-6xl text-white tracking-wider text-shadow">
          CERTIFICATIONS & TROPHIES
        </h2>
        <p className="font-sans text-sm sm:text-base text-slate-300 max-w-xl mx-auto mt-2">
          Specialized credentials unlocked across software engineering, cloud migration, and cybersecurity.
        </p>
      </div>

      {/* Advancements Tree / Cards */}
      <div className="relative z-10 max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-4">
        {CERTIFICATIONS_DATA.map((cert) => (
          <div
            key={cert.id}
            onClick={() => {
              playLevelUp();
              setActiveAdvancement(cert);
            }}
            className="mc-panel p-5 hover:border-mc-gold transition-all cursor-pointer flex gap-4 group"
          >
            {/* Minecraft Advancement Icon Slot */}
            <div className="mc-slot w-16 h-16 shrink-0 flex items-center justify-center group-hover:border-mc-gold transition-colors">
              {iconMap[cert.minecraftIcon] || <Award className="w-7 h-7 text-mc-gold" />}
            </div>

            {/* Information */}
            <div className="flex-1">
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="font-pixel text-sm text-mc-gold bg-black/40 px-2 py-0.5 border border-mc-border">
                  {cert.advancementType.toUpperCase()} UNLOCKED
                </span>
                <span className="font-mono text-xs text-mc-emerald">+{cert.xpPoints} XP</span>
              </div>

              <h3 className="font-pixel text-2xl text-white group-hover:text-mc-diamond transition-colors leading-tight">
                {cert.title}
              </h3>

              <div className="font-mono text-xs text-slate-300 mt-1 mb-2">
                Issuer: <span className="text-mc-gold">{cert.issuer}</span>
                {cert.year && <span className="text-slate-400"> ({cert.year})</span>}
              </div>

              <p className="font-sans text-xs text-slate-300 leading-relaxed line-clamp-2">
                {cert.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
