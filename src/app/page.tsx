"use client";

import React, { useState } from "react";
import { MinecraftCanvas } from "@/components/World/MinecraftCanvas";
import { MinecraftCursor } from "@/components/Cursor/MinecraftCursor";
import { MinecraftNav } from "@/components/Navigation/MinecraftNav";
import { WorldGenerator } from "@/components/LoadingScreen/WorldGenerator";
import { HeroSection } from "@/components/Hero/HeroSection";
import { AboutSection } from "@/components/About/AboutSection";
import { SkillsSection } from "@/components/Skills/SkillsSection";
import { StrengthsHUD } from "@/components/Strengths/StrengthsHUD";
import { QuestBoard } from "@/components/Experience/QuestBoard";
import { ProjectsSection } from "@/components/Projects/ProjectsSection";
import { Advancements } from "@/components/Certifications/Advancements";
import { DungeonSection } from "@/components/DSA/DungeonSection";
import { NetherPortal } from "@/components/Contact/NetherPortal";
import { CommandBlockModal } from "@/components/EasterEggs/CommandBlockModal";
import { SecretChest } from "@/components/EasterEggs/SecretChest";
import { useScrollProgress } from "@/hooks/useScrollProgress";

export default function Home() {
  const [worldLoaded, setWorldLoaded] = useState(false);
  const [commandBlockOpen, setCommandBlockOpen] = useState(false);
  const { currentSection } = useScrollProgress();

  return (
    <>
      <MinecraftCursor />

      {!worldLoaded ? (
        <WorldGenerator onEnter={() => setWorldLoaded(true)} />
      ) : (
        <main className="relative min-h-screen bg-mc-bg text-slate-100 overflow-x-hidden">
          {/* Continuous Minecraft Cinematic World Canvas Background */}
          <MinecraftCanvas activeSection={currentSection} />

          {/* Floating Hotbar Navigation */}
          <MinecraftNav onOpenCommandBlock={() => setCommandBlockOpen(true)} />

          {/* Secret Easter Egg Loot Chest */}
          <SecretChest />

          {/* Command Terminal Modal */}
          <CommandBlockModal
            isOpen={commandBlockOpen}
            onClose={() => setCommandBlockOpen(false)}
          />

          {/* Scrollable Cinematic World Sections */}
          <div className="relative z-10 space-y-12 sm:space-y-20 pb-16">
            <HeroSection />
            <AboutSection />
            <SkillsSection />
            <StrengthsHUD />
            <QuestBoard />
            <ProjectsSection />
            <Advancements />
            <DungeonSection />
            <NetherPortal />
          </div>
        </main>
      )}
    </>
  );
}
