"use client";

import React, { useState, useEffect } from "react";
import { soundEngine } from "@/lib/soundEngine";

interface WorldGeneratorProps {
  onEnter: () => void;
}

export const WorldGenerator: React.FC<WorldGeneratorProps> = ({ onEnter }) => {
  const [progress, setProgress] = useState(15);
  const [phaseText, setPhaseText] = useState("GENERATING SEED (MUMBAI_IT_BIOME)...");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const phases = [
      { at: 25, text: "GENERATING SEED (MUMBAI_IT_BIOME)..." },
      { at: 50, text: "BUILDING ENCHANTED LIBRARY & ARMORY..." },
      { at: 75, text: "COMPILING SKILLS & CODE ALPHA QUESTS..." },
      { at: 99, text: "IGNITING NETHER PORTAL & RENDERING JAYESH..." },
      { at: 100, text: "WORLD READY! ALL CHUNKS LOADED." },
    ];

    let current = 15;
    const timer = setInterval(() => {
      current += Math.floor(Math.random() * 12) + 10;
      if (current >= 100) {
        current = 100;
        clearInterval(timer);
        setIsReady(true);
        soundEngine.playLevelUp();
      }
      setProgress(current);

      const matching = phases.find((p) => current <= p.at) || phases[phases.length - 1];
      setPhaseText(matching.text);
    }, 120);

    return () => clearInterval(timer);
  }, []);

  const handleStart = () => {
    soundEngine.playClick(1200);
    onEnter();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#16120e] flex flex-col items-center justify-center p-4 sm:p-6 select-none pixel-grid-bg">
      {/* Dirt Texture Background pattern */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#866043_2px,transparent_2px)] [background-size:16px_16px]" />

      <div className="relative z-10 max-w-lg w-full mc-panel border-4 border-mc-border p-6 sm:p-8 shadow-2xl text-center">
        {/* Pickaxe Icon */}
        <div className="w-12 h-12 mx-auto mb-3 bg-mc-dark border-2 border-mc-gold flex items-center justify-center text-2xl shadow-mc">
          ⛏️
        </div>
        <h1 className="font-pixel text-3xl sm:text-4xl text-white mb-1 tracking-wider text-shadow">
          JAYESH AMUNDKAR
        </h1>
        <p className="font-pixel text-mc-diamond text-base sm:text-lg mb-6">
          DEVELOPER CINEMATIC WORLD
        </p>

        {/* Loading Phase Info */}
        <div className="font-pixel text-mc-emerald text-base sm:text-lg mb-3 tracking-wide min-h-[1.75rem]">
          {phaseText}
        </div>

        {/* Progress Bar Container */}
        <div className="w-full bg-mc-dark border-2 border-mc-border p-1 mb-4 shadow-inner">
          <div
            className="h-6 bg-gradient-to-r from-green-700 via-mc-emerald to-lime-400 transition-all duration-150 relative overflow-hidden"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute inset-0 bg-white/25 animate-pulse" />
          </div>
        </div>

        {/* Percentage */}
        <div className="font-arcade text-xs text-slate-300 mb-6">
          PROGRESS: {progress}%
        </div>

        {/* Enter Button */}
        {isReady ? (
          <button
            onClick={handleStart}
            className="mc-button mc-button-primary w-full text-2xl py-3 shadow-mc-emerald animate-pulse-glow"
          >
            ENTER WORLD
          </button>
        ) : (
          <button
            onClick={handleStart}
            className="mc-button w-full text-lg py-2.5 hover:border-mc-emerald text-slate-300"
          >
            SKIP & ENTER NOW
          </button>
        )}
      </div>

      <div className="relative z-10 mt-6 font-mono text-xs text-slate-400 text-center">
        Tip: You can press <span className="text-mc-diamond font-bold">/</span> anytime to open the Minecraft Command Terminal.
      </div>
    </div>
  );
};