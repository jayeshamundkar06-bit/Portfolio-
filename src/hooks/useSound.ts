"use client";

import { useEffect, useState } from "react";
import { soundEngine } from "@/lib/soundEngine";

export function useSound() {
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("mc_audio_muted");
      const muted = stored !== null ? stored === "true" : true;
      setIsMuted(muted);
      soundEngine.setMuted(muted);
    }
  }, []);

  const toggleSound = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    soundEngine.setMuted(nextMuted);
    if (typeof window !== "undefined") {
      localStorage.setItem("mc_audio_muted", String(nextMuted));
    }
    if (!nextMuted) {
      soundEngine.playItemPop();
    }
  };

  return {
    isMuted,
    toggleSound,
    playClick: (freq?: number) => soundEngine.playClick(freq),
    playItemPop: () => soundEngine.playItemPop(),
    playPling: (semi?: number) => soundEngine.playPling(semi),
    playLevelUp: () => soundEngine.playLevelUp(),
    playChestOpen: () => soundEngine.playChestOpen(),
    playPortalWarp: () => soundEngine.playPortalWarp()
  };
}
