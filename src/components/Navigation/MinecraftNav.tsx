"use client";

import React, { useState } from "react";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { useSound } from "@/hooks/useSound";
import { SoundToggle } from "./SoundToggle";
import { Terminal, ShieldAlert, Sparkles, Heart, Drumstick } from "lucide-react";

interface MinecraftNavProps {
  onOpenCommandBlock: () => void;
}

export const MinecraftNav: React.FC<MinecraftNavProps> = ({ onOpenCommandBlock }) => {
  const { currentSection } = useScrollProgress();
  const { playClick } = useSound();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { id: "hero", label: "HOME", slotNum: "1", icon: "🏠" },
    { id: "about", label: "ABOUT", slotNum: "2", icon: "📖" },
    { id: "skills", label: "ARMORY", slotNum: "3", icon: "⚔️" },
    { id: "strengths", label: "STATS", slotNum: "4", icon: "🛡️" },
    { id: "experience", label: "QUESTS", slotNum: "5", icon: "📜" },
    { id: "projects", label: "BUILDS", slotNum: "6", icon: "🏰" },
    { id: "certifications", label: "ACHIEVE", slotNum: "7", icon: "🏆" },
    { id: "dsa", label: "DUNGEON", slotNum: "8", icon: "💀" },
    { id: "contact", label: "PORTAL", slotNum: "9", icon: "🌀" },
  ];

  const scrollToSection = (id: string) => {
    playClick();
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Top Floating HUD Bar */}
      <header className="fixed top-0 left-0 right-0 z-40 px-3 py-2 sm:px-6 flex items-center justify-between bg-mc-dark/85 backdrop-blur-md border-b-2 border-mc-border">
        <div className="flex items-center gap-3">
          <button
            onClick={() => scrollToSection("hero")}
            className="flex items-center gap-2 text-left group"
          >
            <div className="w-8 h-8 bg-mc-panel border-2 border-mc-emerald flex items-center justify-center text-mc-emerald font-pixel text-xl shadow-mc">
              J
            </div>
            <div>
              <div className="font-pixel text-xl sm:text-2xl text-white group-hover:text-mc-diamond transition-colors leading-none">
                JAYESH AMUNDKAR
              </div>
              <div className="font-mono text-[10px] text-mc-emerald tracking-wider flex items-center gap-1">
                <span>[B.Sc.IT 3rd Year]</span>
                <span className="text-mc-gold font-bold">CGPA: 8.36</span>
              </div>
            </div>
          </button>
        </div>

        {/* HUD Hearts and XP Indicator */}
        <div className="hidden lg:flex items-center gap-6">
          <div className="flex flex-col items-center">
            {/* Hearts (10 hearts) */}
            <div className="flex gap-1 text-red-500">
              {Array.from({ length: 10 }).map((_, i) => (
                <Heart key={i} className="w-3.5 h-3.5 fill-red-500 stroke-black stroke-[1.5]" />
              ))}
            </div>
            {/* Hunger Bar (10 drumsticks) */}
            <div className="flex gap-1 text-amber-600 mt-0.5">
              {Array.from({ length: 10 }).map((_, i) => (
                <Drumstick key={i} className="w-3 h-3 fill-amber-600 stroke-black stroke-[1.5]" />
              ))}
            </div>
          </div>

          {/* XP Bar */}
          <div className="flex items-center gap-2">
            <div className="relative w-36 h-3 bg-black border border-mc-border overflow-hidden">
              <div className="h-full bg-gradient-to-r from-lime-500 to-mc-emerald w-[83.6%]" />
            </div>
            <span className="font-arcade text-xs text-mc-emerald font-bold">Lv.83</span>
          </div>
        </div>

        {/* Right Tools */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              playClick(1000);
              onOpenCommandBlock();
            }}
            title="Open Minecraft Command Terminal (Press /)"
            className="p-2 bg-mc-panel border-2 border-mc-border hover:border-mc-diamond text-mc-diamond font-pixel text-sm flex items-center gap-1"
          >
            <Terminal className="w-4 h-4" />
            <span className="hidden md:inline">CMD [/]</span>
          </button>

          <SoundToggle />

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 bg-mc-panel border-2 border-mc-border text-white font-pixel text-base"
          >
            {mobileOpen ? "✕" : "HOTBAR"}
          </button>
        </div>
      </header>

      {/* Desktop Bottom Minecraft Hotbar (9 Item Slots) */}
      <nav className="hidden lg:flex fixed bottom-4 left-1/2 -translate-x-1/2 z-40 bg-mc-panel/90 backdrop-blur-md p-1.5 border-4 border-mc-border shadow-2xl items-center gap-1.5">
        {navItems.map((item) => {
          const isActive = currentSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`relative group w-14 h-14 flex flex-col items-center justify-center transition-all ${
                isActive
                  ? "bg-mc-panel-dark border-2 border-mc-gold shadow-mc-gold scale-105"
                  : "bg-mc-dark border-2 border-mc-border hover:border-slate-300"
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-pixel text-[11px] text-slate-300 group-hover:text-white leading-none mt-0.5">
                {item.label}
              </span>
              <span className="absolute top-0.5 right-1 font-mono text-[9px] text-slate-400">
                {item.slotNum}
              </span>

              {/* Hover tooltip */}
              <div className="absolute bottom-16 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap bg-mc-dark border-2 border-mc-diamond px-2 py-1 text-mc-diamond font-pixel text-sm shadow-xl z-50">
                Navigate to {item.label}
              </div>
            </button>
          );
        })}
      </nav>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-x-0 top-14 bottom-0 z-40 bg-mc-dark/95 backdrop-blur-lg p-6 flex flex-col gap-3 overflow-y-auto border-t-2 border-mc-border">
          <div className="font-pixel text-mc-gold text-xl mb-2 text-center border-b border-mc-border pb-2">
            SELECT WORLD SECTION
          </div>
          <div className="grid grid-cols-2 gap-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`p-3 text-left flex items-center gap-3 border-2 ${
                  currentSection === item.id
                    ? "bg-mc-panel border-mc-gold text-mc-gold"
                    : "bg-mc-dark border-mc-border text-slate-200"
                }`}
              >
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <div className="font-pixel text-lg leading-tight">{item.label}</div>
                  <div className="font-mono text-[10px] text-slate-400">Slot {item.slotNum}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
