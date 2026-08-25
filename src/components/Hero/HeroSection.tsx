"use client";

import React from "react";
import { PROFILE_DATA } from "@/data/profile";
import { useSound } from "@/hooks/useSound";
import { ArrowDown, Compass, Sparkles, MapPin, GraduationCap, Code } from "lucide-react";

export const HeroSection: React.FC = () => {
  const { playClick } = useSound();

  const scrollTo = (id: string) => {
    playClick(900);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 pt-20 pb-16 select-none overflow-hidden"
    >
      {/* Background cinematic overlay card */}
      <div className="relative z-10 max-w-4xl w-full text-center">
        {/* World Spawn Tag */}
        <div className="inline-flex items-center gap-2 bg-mc-panel border-2 border-mc-gold px-4 py-1.5 shadow-mc mb-6 animate-mc-bob">
          <Compass className="w-4 h-4 text-mc-gold animate-spin" style={{ animationDuration: "12s" }} />
          <span className="font-pixel text-mc-gold text-lg tracking-wider">
            WORLD SPAWN: MUMBAI, INDIA [BIOME: IT_PLAINS]
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="font-pixel text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white tracking-wider mb-2 text-shadow-lg font-bold drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
          {PROFILE_DATA.name.toUpperCase()}
        </h1>

        {/* Subtitle / Roles */}
        <div className="font-pixel text-xl sm:text-2xl md:text-3xl text-mc-diamond tracking-wide mb-6 text-shadow">
          SOFTWARE DEVELOPER • WEB DEVELOPER • DSA ENTHUSIAST
        </div>

        {/* Bio Paragraph */}
        <p className="max-w-2xl mx-auto font-sans text-base sm:text-lg text-slate-200 bg-mc-dark/70 backdrop-blur-sm p-4 sm:p-5 border-2 border-mc-border mb-8 shadow-xl leading-relaxed">
          {PROFILE_DATA.bioHero}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
          <button
            onClick={() => scrollTo("about")}
            className="mc-button mc-button-primary text-xl sm:text-2xl px-6 sm:px-8 py-3 flex items-center gap-2 shadow-mc-emerald"
          >
            <span>ENTER MY WORLD</span>
            <ArrowDown className="w-5 h-5 animate-bounce" />
          </button>

          <button
            onClick={() => scrollTo("projects")}
            className="mc-button mc-button-gold text-xl sm:text-2xl px-6 sm:px-8 py-3 flex items-center gap-2 shadow-mc-gold"
          >
            <span>VIEW MY WORK</span>
            <Sparkles className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Player Stat Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto">
          <div className="mc-panel-dark p-3 text-center border-2 border-mc-border">
            <div className="font-mono text-xs text-slate-400">STATUS</div>
            <div className="font-pixel text-lg text-mc-emerald">3rd Year B.Sc.IT</div>
          </div>
          <div className="mc-panel-dark p-3 text-center border-2 border-mc-border">
            <div className="font-mono text-xs text-slate-400">ACADEMIC SCORE</div>
            <div className="font-pixel text-lg text-mc-gold">CGPA: 8.36</div>
          </div>
          <div className="mc-panel-dark p-3 text-center border-2 border-mc-border">
            <div className="font-mono text-xs text-slate-400">COLLEGE</div>
            <div className="font-pixel text-lg text-mc-diamond truncate">RJ College</div>
          </div>
          <div className="mc-panel-dark p-3 text-center border-2 border-mc-border">
            <div className="font-mono text-xs text-slate-400">FOCUS</div>
            <div className="font-pixel text-lg text-purple-400">Full-Stack & DSA</div>
          </div>
        </div>
      </div>
    </section>
  );
};
