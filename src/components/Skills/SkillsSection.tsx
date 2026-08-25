"use client";

import React, { useState } from "react";
import { SKILL_CATEGORIES, SkillItem } from "@/data/skills";
import { useSound } from "@/hooks/useSound";
import { Shield, Sparkles, Sword, Code2, Globe, Database, Wrench, Brain } from "lucide-react";

export const SkillsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("languages");
  const [activeItem, setActiveItem] = useState<SkillItem | null>(SKILL_CATEGORIES[0].skills[0]);
  const { playItemPop, playClick } = useSound();

  const currentCat = SKILL_CATEGORIES.find((c) => c.id === selectedCategory) || SKILL_CATEGORIES[0];

  const getTierBadge = (tier: string) => {
    switch (tier) {
      case "Legendary":
        return "text-mc-gold border-mc-gold bg-amber-950/60";
      case "Epic":
        return "text-purple-400 border-purple-400 bg-purple-950/60";
      case "Rare":
        return "text-mc-diamond border-mc-diamond bg-cyan-950/60";
      default:
        return "text-slate-300 border-slate-400 bg-slate-800/60";
    }
  };

  return (
    <section id="skills" className="relative min-h-screen py-20 px-4 sm:px-6 flex flex-col justify-center items-center select-none">
      {/* Section Header */}
      <div className="text-center mb-8 relative z-10">
        <div className="inline-flex items-center gap-2 bg-mc-panel border-2 border-mc-emerald px-3 py-1 mb-2 shadow-mc">
          <Sword className="w-4 h-4 text-mc-emerald" />
          <span className="font-pixel text-mc-emerald text-base tracking-wider">
            CHAPTER II: THE ARMORY & STABLE
          </span>
        </div>
        <h2 className="font-pixel text-4xl sm:text-5xl md:text-6xl text-white tracking-wider text-shadow">
          SKILLS & INVENTORY
        </h2>
        <p className="font-sans text-sm sm:text-base text-slate-300 max-w-xl mx-auto mt-2">
          Riding through the forest armory: inspect Jayesh&apos;s weapons, enchanted tools, and technology inventory.
        </p>
      </div>

      {/* Main Inventory HUD */}
      <div className="relative z-10 max-w-5xl w-full grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Category Tabs (Left / Top) */}
        <div className="lg:col-span-4 flex flex-col gap-2">
          <div className="font-pixel text-mc-gold text-lg mb-1 px-1">SELECT INVENTORY CHEST:</div>
          {SKILL_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                playClick(950);
                setSelectedCategory(cat.id);
                setActiveItem(cat.skills[0]);
              }}
              className={`p-3 text-left border-2 flex items-center justify-between transition-all ${
                selectedCategory === cat.id
                  ? "bg-mc-panel border-mc-gold text-mc-gold shadow-mc-gold translate-x-1"
                  : "bg-mc-panel-dark border-mc-border text-slate-300 hover:border-slate-400"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="font-pixel text-xl">{cat.title}</span>
              </div>
              <span className="font-mono text-xs bg-black/50 px-2 py-0.5 border border-mc-border">
                {cat.skills.length} Items
              </span>
            </button>
          ))}
        </div>

        {/* Item Slot Grid & Active Item Inspector (Right) */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          {/* Minecraft 9-Slot / Grid Container */}
          <div className="mc-panel p-5">
            <div className="flex items-center justify-between border-b-2 border-mc-border pb-2 mb-4">
              <span className="font-pixel text-2xl text-white tracking-wide">
                {currentCat.title.toUpperCase()}
              </span>
              <span className="font-mono text-xs text-mc-diamond">
                {currentCat.subtitle}
              </span>
            </div>

            {/* Inventory Slots Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-3 mb-6">
              {currentCat.skills.map((skill, i) => {
                const isSelected = activeItem?.name === skill.name;
                return (
                  <button
                    key={i}
                    onClick={() => {
                      playItemPop();
                      setActiveItem(skill);
                    }}
                    className={`mc-slot p-3 flex flex-col items-center justify-center min-h-[90px] relative text-center group cursor-pointer ${
                      isSelected ? "border-mc-gold bg-mc-panel shadow-mc-gold scale-105" : ""
                    }`}
                  >
                    <div className="font-pixel text-lg text-white group-hover:text-mc-diamond transition-colors leading-tight mb-1">
                      {skill.name}
                    </div>
                    <span className="font-mono text-[10px] text-slate-400 truncate max-w-full">
                      {skill.minecraftItem}
                    </span>
                    <span
                      className={`mt-1 font-mono text-[9px] px-1.5 py-0.2 border uppercase ${getTierBadge(
                        skill.tier
                      )}`}
                    >
                      {skill.tier}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Detailed Item Lore / Enchantment Box */}
            {activeItem && (
              <div className="mc-tooltip p-4 text-left border-2 border-purple-600 bg-[#120e1e]">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-purple-800 pb-2 mb-2">
                  <div>
                    <h3 className="font-pixel text-2xl text-mc-diamond tracking-wide">
                      {activeItem.name}
                    </h3>
                    <div className="font-mono text-xs text-purple-300 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{activeItem.enchantment}</span>
                    </div>
                  </div>
                  <span
                    className={`font-pixel text-base px-2 py-0.5 border ${getTierBadge(
                      activeItem.tier
                    )}`}
                  >
                    {activeItem.tier} Quality
                  </span>
                </div>

                <p className="font-sans text-sm text-slate-200 leading-relaxed mb-2">
                  {activeItem.lore}
                </p>

                <div className="flex items-center justify-between font-mono text-xs text-slate-400 pt-1 border-t border-purple-900/60">
                  <span>Equipped as: {activeItem.minecraftItem}</span>
                  <span className="text-mc-emerald">Category: {activeItem.category}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
