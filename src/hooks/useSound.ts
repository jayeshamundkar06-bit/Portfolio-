"use client";

import { useEffect, useState, useCallback } from "react";
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

  const toggleSound = useCallback(() => {
    setIsMuted((prev) => {
      const nextMuted = !prev;
      soundEngine.setMuted(nextMuted);
      if (typeof window !== "undefined") {
        localStorage.setItem("mc_audio_muted", String(nextMuted));
      }
      if (!nextMuted) {
        soundEngine.playItemPop();
      }
      return nextMuted;
    });
  }, []);

  const playClick = useCallback((freq?: number) => soundEngine.playClick(freq), []);
  const playItemPop = useCallback(() => soundEngine.playItemPop(), []);
  const playPling = useCallback((semi?: number) => soundEngine.playPling(semi), []);
  const playLevelUp = useCallback(() => soundEngine.playLevelUp(), []);
  const playChestOpen = useCallback(() => soundEngine.playChestOpen(), []);
  const playPortalWarp = useCallback(() => soundEngine.playPortalWarp(), []);

  return {
    isMuted,
    toggleSound,
    playClick,
    playItemPop,
    playPling,
    playLevelUp,
    playChestOpen,
    playPortalWarp
  };
}