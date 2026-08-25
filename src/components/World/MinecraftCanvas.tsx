"use client";

import React, { useEffect, useRef } from "react";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface MinecraftCanvasProps {
  activeSection: string;
}

export const MinecraftCanvas: React.FC<MinecraftCanvasProps> = ({ activeSection }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { scrollProgress } = useScrollProgress();
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Particle System
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      alpha: number;
      decay: number;
      type: "cloud" | "rune" | "portal" | "ember" | "spore";
      char?: string;
    }

    const particles: Particle[] = [];
    const runeChars = ["ᔑ", "ʖ", "ᓵ", "↸", "ᒷ", "⎓", "⊣", "⍑", "╎", "⋮", "ꖌ", "ꖎ", "ᒲ", "リ", "𝙹", "!", "◇", "✦"];

    // Initialize clouds
    const clouds = Array.from({ length: 6 }, (_, i) => ({
      x: (width / 6) * i + Math.random() * 50,
      y: 40 + Math.random() * (height * 0.25),
      width: 140 + Math.random() * 120,
      height: 35 + Math.random() * 25,
      speed: 0.2 + Math.random() * 0.3
    }));

    let time = 0;
    let characterX = width * 0.15;
    let characterY = height * 0.65;
    let charWalkFrame = 0;

    const render = () => {
      time += 0.02;

      // Section Theme Interpolation based on scrollProgress
      // 0.0 - 0.15: Overworld Day / Sunrise
      // 0.15 - 0.35: Enchanted Library Warmth
      // 0.35 - 0.55: Forest & Armory
      // 0.55 - 0.75: Village Builds & Workshop
      // 0.75 - 0.88: Deepslate Dungeon
      // 0.88 - 1.00: Nether Portal

      let skyTop = "#1a365d";
      let skyBottom = "#3182ce";
      let terrainColor = "#38a169";
      let isNether = false;
      let isDungeon = false;

      if (scrollProgress < 0.15) {
        // Overworld Sunrise / Morning
        skyTop = "#1e3a8a";
        skyBottom = "#f59e0b";
        terrainColor = "#48bb78";
      } else if (scrollProgress < 0.35) {
        // Enchanted Library (Warm wood & magical dusk)
        skyTop = "#0f172a";
        skyBottom = "#431407";
        terrainColor = "#78350f";
      } else if (scrollProgress < 0.55) {
        // Forest Armory
        skyTop = "#064e3b";
        skyBottom = "#10b981";
        terrainColor = "#2f855a";
      } else if (scrollProgress < 0.75) {
        // Village / Crafting Forge
        skyTop = "#1e1b4b";
        skyBottom = "#3b82f6";
        terrainColor = "#334155";
      } else if (scrollProgress < 0.88) {
        // Deepslate Dungeon
        skyTop = "#030712";
        skyBottom = "#111827";
        terrainColor = "#1f2937";
        isDungeon = true;
      } else {
        // Nether Portal
        skyTop = "#2e0854";
        skyBottom = "#581c87";
        terrainColor = "#18022e";
        isNether = true;
      }

      // Draw Sky Gradient
      const skyGradient = ctx.createLinearGradient(0, 0, 0, height);
      skyGradient.addColorStop(0, skyTop);
      skyGradient.addColorStop(1, skyBottom);
      ctx.fillStyle = skyGradient;
      ctx.fillRect(0, 0, width, height);

      // Draw Minecraft Voxel Sun / Moon or Portal Eye
      ctx.save();
      if (!isNether && !isDungeon) {
        const celestialY = 80 + Math.sin(time * 0.2) * 10;
        const celestialX = width * 0.8 - scrollProgress * 150;
        // Sun
        ctx.fillStyle = "#fffbeb";
        ctx.shadowColor = "#fde047";
        ctx.shadowBlur = 30;
        ctx.fillRect(celestialX, celestialY, 44, 44);
        ctx.fillStyle = "#fef08a";
        ctx.fillRect(celestialX + 6, celestialY + 6, 32, 32);
      } else if (isNether) {
        // Swirling Nether Rune Ring
        ctx.save();
        ctx.translate(width * 0.8, 120);
        ctx.rotate(time * 0.4);
        ctx.strokeStyle = "#c084fc";
        ctx.lineWidth = 4;
        ctx.shadowColor = "#d946ef";
        ctx.shadowBlur = 25;
        ctx.strokeRect(-30, -30, 60, 60);
        ctx.restore();
      }
      ctx.restore();

      // Draw Pixel Clouds
      if (!isDungeon) {
        ctx.fillStyle = isNether ? "rgba(147, 51, 234, 0.2)" : "rgba(255, 255, 255, 0.4)";
        clouds.forEach((cloud) => {
          if (!prefersReducedMotion) {
            cloud.x += cloud.speed;
            if (cloud.x > width + 50) cloud.x = -cloud.width;
          }
          // Stepped cloud shape
          ctx.fillRect(cloud.x, cloud.y, cloud.width, cloud.height);
          ctx.fillRect(cloud.x + 20, cloud.y - 12, cloud.width * 0.6, 12);
          ctx.fillRect(cloud.x + 40, cloud.y + cloud.height, cloud.width * 0.5, 10);
        });
      }

      // Draw Distant Block Mountains
      ctx.fillStyle = isNether ? "#3b0764" : isDungeon ? "#111827" : "#2d3748";
      ctx.beginPath();
      const mountainBaseY = height * 0.62;
      const step = 40;
      for (let x = 0; x <= width; x += step) {
        const peak = Math.sin(x * 0.005 + 1) * 90 + Math.cos(x * 0.01) * 40;
        const my = mountainBaseY - peak;
        ctx.fillRect(x, my, step, height - my);
      }

      // Foreground Stepped Terrain
      ctx.fillStyle = terrainColor;
      const fgBaseY = height * 0.72;
      for (let x = 0; x <= width; x += 32) {
        const bump = Math.sin(x * 0.01 + scrollProgress * 5) * 20;
        const ty = fgBaseY - bump;
        ctx.fillRect(x, ty, 32, height - ty);

        // Top grass highlight / Nether crust
        ctx.fillStyle = isNether ? "#a855f7" : isDungeon ? "#374151" : "#68d391";
        ctx.fillRect(x, ty, 32, 6);
        ctx.fillStyle = terrainColor;
      }

      // Draw Trees / Pillars in the background
      const numTrees = Math.floor(width / 240);
      for (let i = 0; i < numTrees; i++) {
        const tx = i * 240 + 80;
        const ty = fgBaseY - 60;
        // Wood Trunk
        ctx.fillStyle = isNether ? "#581c87" : "#78350f";
        ctx.fillRect(tx + 18, ty, 14, 60);
        // Foliage blocks
        ctx.fillStyle = isNether ? "#9333ea" : isDungeon ? "#1f2937" : "#2e8540";
        ctx.fillRect(tx, ty - 45, 50, 45);
        ctx.fillRect(tx + 8, ty - 65, 34, 20);
      }

      // Spawn ambient particles
      if (particles.length < 40 && !prefersReducedMotion) {
        if (isNether) {
          particles.push({
            x: Math.random() * width,
            y: height,
            vx: (Math.random() - 0.5) * 1.5,
            vy: -Math.random() * 2.5 - 1,
            size: Math.random() * 6 + 3,
            color: Math.random() > 0.5 ? "#c084fc" : "#e879f9",
            alpha: 0.9,
            decay: 0.008,
            type: "portal"
          });
        } else if (scrollProgress > 0.15 && scrollProgress < 0.4) {
          // Enchantment Runes
          particles.push({
            x: Math.random() * width,
            y: Math.random() * height * 0.8 + height * 0.1,
            vx: (Math.random() - 0.5) * 0.8,
            vy: -Math.random() * 0.8 - 0.2,
            size: 14,
            color: "#c084fc",
            alpha: 1,
            decay: 0.006,
            type: "rune",
            char: runeChars[Math.floor(Math.random() * runeChars.length)]
          });
        } else {
          // Fireflies / Spores
          particles.push({
            x: Math.random() * width,
            y: fgBaseY - Math.random() * 200,
            vx: (Math.random() - 0.5) * 0.6,
            vy: -Math.random() * 0.4 - 0.1,
            size: Math.random() * 4 + 2,
            color: Math.random() > 0.5 ? "#fde047" : "#86efac",
            alpha: 0.8,
            decay: 0.007,
            type: "spore"
          });
        }
      }

      // Update & Draw Particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;

        if (p.alpha <= 0 || p.y < 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(p.alpha, 0);

        if (p.type === "rune" && p.char) {
          ctx.font = "14px 'VT323', monospace";
          ctx.fillStyle = p.color;
          ctx.shadowColor = "#a855f7";
          ctx.shadowBlur = 8;
          ctx.fillText(p.char, p.x, p.y);
        } else {
          ctx.fillStyle = p.color;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 6;
          ctx.fillRect(p.x, p.y, p.size, p.size);
        }
        ctx.restore();
      }

      // Draw Minecraft Character (Jayesh: Adventurer Developer)
      drawCharacter(ctx, scrollProgress, time, fgBaseY);

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    // Draw Jayesh as a Minecraft Character
    const drawCharacter = (
      context: CanvasRenderingContext2D,
      progress: number,
      t: number,
      groundY: number
    ) => {
      context.save();

      // Dynamic position based on scroll progression
      // The character walks across the world as user scrolls
      const targetCharX = (width * 0.1) + progress * (width * 0.7);
      characterX += (targetCharX - characterX) * 0.1;
      characterY = groundY - 58;

      charWalkFrame += 0.15;
      const legSwing = Math.sin(charWalkFrame) * 8;
      const armSwing = Math.cos(charWalkFrame) * 8;

      context.translate(characterX, characterY);

      // Character Shadow
      context.fillStyle = "rgba(0, 0, 0, 0.35)";
      context.beginPath();
      context.ellipse(12, 60, 16, 6, 0, 0, Math.PI * 2);
      context.fill();

      // Right Leg (Pixelated Pants: Navy Blue)
      context.fillStyle = "#1e293b";
      context.fillRect(4, 38 + legSwing, 6, 20);
      // Boot
      context.fillStyle = "#0f172a";
      context.fillRect(4, 54 + legSwing, 6, 6);

      // Left Leg
      context.fillStyle = "#334155";
      context.fillRect(14, 38 - legSwing, 6, 20);
      // Boot
      context.fillStyle = "#0f172a";
      context.fillRect(14, 54 - legSwing, 6, 6);

      // Torso / Developer Adventurer Jacket (Emerald & Obsidian trim)
      context.fillStyle = "#065f46"; // Dark emerald tunic
      context.fillRect(4, 18, 16, 22);
      // Inner shirt / Developer tie / Redstone lapel
      context.fillStyle = "#10b981";
      context.fillRect(10, 20, 4, 18);
      // Belt with Gold Buckle
      context.fillStyle = "#451a03";
      context.fillRect(4, 36, 16, 4);
      context.fillStyle = "#f59e0b";
      context.fillRect(10, 36, 4, 4);

      // Left Arm (Back)
      context.fillStyle = "#047857";
      context.fillRect(0, 18 - armSwing, 5, 18);
      // Hand (Skin tone)
      context.fillStyle = "#c68b59";
      context.fillRect(0, 34 - armSwing, 5, 5);

      // Head (Skin tone)
      context.fillStyle = "#d49b6a";
      context.fillRect(4, 2, 16, 16);

      // Hair (Dark Brown, neat developer cut)
      context.fillStyle = "#27170e";
      context.fillRect(4, 0, 16, 6);
      context.fillRect(2, 2, 4, 6);
      context.fillRect(18, 2, 3, 6);

      // Trimmed Beard (Characteristic feature requested)
      context.fillStyle = "#1f120a";
      context.fillRect(6, 12, 12, 6);
      context.fillRect(8, 10, 2, 2);
      context.fillRect(14, 10, 2, 2);

      // Eyes (Pixel white & brown pupil)
      context.fillStyle = "#ffffff";
      context.fillRect(7, 7, 3, 3);
      context.fillRect(14, 7, 3, 3);
      context.fillStyle = "#3b2219";
      context.fillRect(8, 8, 2, 2);
      context.fillRect(15, 8, 2, 2);

      // Right Arm (Front) holding item according to section
      context.fillStyle = "#065f46";
      context.fillRect(19, 18 + armSwing, 5, 18);
      // Hand
      context.fillStyle = "#d49b6a";
      context.fillRect(19, 34 + armSwing, 5, 5);

      // Held Item based on progression
      if (progress < 0.3) {
        // Compass / Map
        context.fillStyle = "#f59e0b";
        context.fillRect(22, 32 + armSwing, 8, 8);
      } else if (progress < 0.6) {
        // Enchanted Diamond Sword / Tool
        context.fillStyle = "#4deeea";
        context.fillRect(23, 24 + armSwing, 3, 14);
        context.fillRect(21, 34 + armSwing, 7, 3);
      } else if (progress < 0.85) {
        // Redstone / Crafting Blueprint
        context.fillStyle = "#ef4444";
        context.fillRect(22, 30 + armSwing, 6, 8);
      } else {
        // Eye of Ender / Nether Pearl
        context.fillStyle = "#a855f7";
        context.fillRect(22, 30 + armSwing, 7, 7);
      }

      // Name Tag floating above character: "Jayesh Amundkar (Dev)"
      context.font = "10px 'Press Start 2P', monospace";
      const nameText = "Jayesh [Lv.83]";
      const textWidth = context.measureText(nameText).width;
      context.fillStyle = "rgba(0, 0, 0, 0.7)";
      context.fillRect(12 - textWidth / 2 - 4, -18, textWidth + 8, 14);
      context.fillStyle = "#55ff55";
      context.fillText(nameText, 12 - textWidth / 2, -7);

      context.restore();
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [scrollProgress, prefersReducedMotion]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full block" />
      {/* Subtle scanline and vignette overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-mc-bg via-transparent to-transparent opacity-80" />
      <div className="absolute inset-0 pixel-grid-bg opacity-30" />
    </div>
  );
};
