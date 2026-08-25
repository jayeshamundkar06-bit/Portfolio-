"use client";

import React from "react";
import { ArrowRight, Mail, Sparkles } from "lucide-react";
import { useSound } from "@/hooks/useSound";

export const HeroSection: React.FC = () => {
  const { playClick } = useSound();

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 overflow-hidden"
    >
      <div className="container mx-auto max-w-5xl relative z-10 flex flex-col items-center md:items-start text-center md:text-left">
        <div className="max-w-3xl w-full">
          {/* Subheading tag */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] mb-4 md:mb-6 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-xs sm:text-sm font-mono text-accent font-medium uppercase tracking-wider">
              Hi, I&apos;m
            </span>
          </div>

          {/* Name */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white mb-2 sm:mb-4 tracking-tight leading-tight drop-shadow-lg">
            Jayesh Amundkar<span className="text-accent">.</span>
          </h1>

          {/* Role */}
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-textMuted via-slate-200 to-accent bg-clip-text text-transparent mb-4 sm:mb-6">
            Full Stack Developer
          </h2>

          {/* Paragraph */}
          <p className="text-sm sm:text-base md:text-lg text-slate-300 mb-8 max-w-2xl leading-relaxed bg-[#0a0f18]/40 p-4 rounded-2xl backdrop-blur-md border border-white/[0.08] shadow-2xl">
            I&apos;m a passionate Information Technology student and developer who enjoys building modern web applications, solving problems, and turning ideas into real-world digital experiences.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center md:justify-start w-full">
            <a
              href="#projects"
              onClick={() => playClick(1000)}
              className="w-full sm:w-auto text-center px-8 py-4 bg-accent hover:bg-sky-400 text-[#0a0f18] font-bold rounded-full transition-all duration-300 transform hover:scale-105 shadow-[0_0_25px_rgba(56,189,248,0.4)] text-sm sm:text-base flex items-center justify-center gap-2 group"
            >
              <span>View My Work</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="#contact"
              onClick={() => playClick(800)}
              className="w-full sm:w-auto text-center px-8 py-4 bg-white/[0.04] hover:bg-white/[0.08] border border-accent/60 text-accent hover:border-accent font-bold rounded-full transition-all duration-300 backdrop-blur-md text-sm sm:text-base flex items-center justify-center gap-2"
            >
              <Mail className="w-4 h-4" />
              <span>Contact Me</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};