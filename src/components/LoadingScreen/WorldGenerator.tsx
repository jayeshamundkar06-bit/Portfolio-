"use client";

import React, { useState, useEffect } from "react";
import { useSound } from "@/hooks/useSound";

interface WorldGeneratorProps {
  onEnter: () => void;
}

export const WorldGenerator: React.FC<WorldGeneratorProps> = ({ onEnter }) => {
  const [progress, setProgress] = useState(0);
  const [phaseText, setPhaseText] = useState("GENERATING WORLD TERRAIN...");
  const [isReady, setIsReady] = useState(false);
  const { playLevelUp, playClick } = useSound();

  useEffect(() => {
    const phases = [
      { at: 15, text: "GENERATING SEED (MUMBAI_IT_BIOME)..." },
      { at: 35, text: "BUILDING ENCHANTED LIBRARY & ARMORY..." },
      { at: 60, text: "COMPILING SKILL INVENTORY & CODE ALPHA QUESTS..." },
      { at: 85, text: "IGNITING THE NETHER PORTAL & RENDERING JAYESH..." },
      { at: 100, text: "WORLD READY! ALL CHUNKS LOADED." },
    ];

    let currentProg = 0;
    const interval = setInterval(() => {
      currentProg += Math.floor(Math.random() * 8) + 4;
      if (currentProg >= 100) {
        currentProg = 100;
        clearInterval(interval);
        setIsReady(true);
        playLevelUp();
      }
      setProgress(currentProg);

      const matchingPhase = phases.find((p) => currentProg <= p.at);
      if (matchingPhase) {
        setPhaseText(matchingPhase.text);
      }
    }, 90);

    return () => clearInterval(interval);
  }, [playLevelUp]);

  const handleStart = () => {
    playClick(1200);
    onEnter();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#16120e] flex flex-col items-center justify-center p-6 select-none pixel-grid-bg">
      {/* Dirt Texture Background pattern */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#866043_2px,transparent_2px)] [background-size:16px_16px]" />

      <div className="relative z-10 max-w-lg w-full bg-mc-panel border-4 border-mc-border p-6 sm:p-8 shadow-2xl text-center">
        {/* Title */}
        <div className="w-12 h-12 mx-auto mb-3 bg-mc-dark border-2 border-mc-gold flex items-center justify-center text-2xl shadow-mc">
          ⛏️
        </div>
        <h1 className="font-pixel text-3xl sm:text-4xl text-white mb-1 tracking-wider text-shadow">
          JAYESH AMUNDKAR
        </h1>
        <p className="font-pixel text-mc-diamond text-lg mb-6">
          DEVELOPER CINEMATIC WORLD
        </p>

        {/* Loading Phase Info */}
        <div className="font-pixel text-mc-emerald text-base sm:text-lg mb-3 tracking-wide h-6">
          {phaseText}
        </div>

        {/* Progress Bar Container */}
        <div className="w-full bg-mc-dark border-2 border-mc-border p-1 mb-4 shadow-inner">
          <div
            className="h-6 bg-gradient-to-r from-green-700 via-mc-emerald to-lime-400 transition-all duration-150 relative overflow-hidden"
            style={{ width: `${progress}%` }}
          >
            {/* Animated shimmer highlight */}
            <div className="absolute inset-0 bg-white/20 animate-pulse" />
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
            className="mc-button mc-button-primary w-full text-2xl py-3 animate-pulse-glow"
          >
            ENTER WORLD
          </button>
        ) : (
          <div className="font-pixel text-slate-400 text-lg py-2">
            INITIALIZING VOXEL SHADERS...
          </div>
        )}
      </div>

      <div className="relative z-10 mt-6 font-mono text-xs text-slate-400 text-center">
        Tip: You can press <span className="text-mc-diamond font-bold">/</span> anytime to open the Minecraft Command Terminal.
      </div>
    </div>
  );
};
