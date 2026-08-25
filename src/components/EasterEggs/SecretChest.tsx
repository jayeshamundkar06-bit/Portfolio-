"use client";

import React, { useState } from "react";
import { useSound } from "@/hooks/useSound";
import confetti from "canvas-confetti";
import { Sparkles, Trophy } from "lucide-react";

export const SecretChest: React.FC = () => {
  const [opened, setOpened] = useState(false);
  const { playChestOpen, playLevelUp } = useSound();

  const handleOpenChest = () => {
    if (!opened) {
      playChestOpen();
      setTimeout(() => playLevelUp(), 200);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.8 },
        colors: ["#4deeea", "#f9a825", "#55ff55"]
      });
      setOpened(true);
    }
  };

  return (
    <div className="fixed bottom-20 right-4 z-40 select-none">
      <button
        onClick={handleOpenChest}
        title="Secret Developer Loot Chest"
        className={`group relative p-2.5 bg-[#2b1e13] border-2 border-[#694828] hover:border-mc-gold shadow-2xl transition-transform hover:scale-110 ${
          opened ? "border-mc-gold shadow-mc-gold" : ""
        }`}
      >
        <div className="text-2xl">{opened ? "🎁" : "📦"}</div>
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-mc-gold rounded-full animate-ping" />

        {/* Hover Hint */}
        <div className="absolute right-full mr-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-mc-dark border border-mc-gold px-2 py-1 font-pixel text-xs text-mc-gold whitespace-nowrap pointer-events-none">
          {opened ? "LOOT CLAIMED!" : "SECRET CHEST"}
        </div>
      </button>

      {/* Advancement Toast */}
      {opened && (
        <div className="fixed top-16 right-4 z-50 mc-panel p-3 border-2 border-mc-gold bg-mc-dark text-left animate-bounce flex items-center gap-3">
          <Trophy className="w-6 h-6 text-mc-gold shrink-0" />
          <div>
            <div className="font-pixel text-mc-gold text-sm">ADVANCEMENT MADE!</div>
            <div className="font-pixel text-white text-base">Secret Loot Discovered</div>
          </div>
        </div>
      )}
    </div>
  );
};
