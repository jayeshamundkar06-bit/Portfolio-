"use client";

import React from "react";
import { Volume2, VolumeX } from "lucide-react";
import { useSound } from "@/hooks/useSound";

export const SoundToggle: React.FC = () => {
  const { isMuted, toggleSound } = useSound();

  return (
    <button
      onClick={toggleSound}
      title={isMuted ? "Unmute Minecraft Ambience & SFX" : "Mute Sound"}
      className="relative group p-2 bg-mc-panel border-2 border-mc-border hover:border-mc-gold text-slate-200 transition-all flex items-center gap-2"
      aria-label="Toggle sound"
    >
      {isMuted ? (
        <VolumeX className="w-5 h-5 text-slate-400 group-hover:text-red-400" />
      ) : (
        <Volume2 className="w-5 h-5 text-mc-emerald animate-pulse" />
      )}
      <span className="hidden sm:inline font-pixel text-base">
        {isMuted ? "AUDIO: OFF" : "AUDIO: ON"}
      </span>
    </button>
  );
};
