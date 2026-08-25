"use client";

import React, { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export const MinecraftCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    // Check if touch device
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement | null;
      if (target) {
        const clickable = target.closest("button, a, input, textarea, select, [role='button'], .cursor-pointer, .mc-slot");
        setIsPointer(!!clickable);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  if (isTouchDevice || prefersReducedMotion) return null;

  return (
    <div
      className="fixed pointer-events-none z-50 transition-transform duration-75 ease-out"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: `translate(-50%, -50%) scale(${isClicking ? 0.85 : isPointer ? 1.25 : 1})`,
      }}
    >
      {/* Minecraft Crosshair Cursor */}
      <div className="relative w-6 h-6 flex items-center justify-center">
        <div className={`w-6 h-1 ${isPointer ? "bg-mc-diamond shadow-mc-diamond" : "bg-white/80 shadow-sm"}`} />
        <div className={`absolute h-6 w-1 ${isPointer ? "bg-mc-diamond shadow-mc-diamond" : "bg-white/80 shadow-sm"}`} />
        <div className="absolute w-2 h-2 bg-black/40" />
      </div>
    </div>
  );
};
