"use client";

import React, { useState } from "react";
import { PROJECTS_DATA, ProjectItem } from "@/data/projects";
import { ProjectModal } from "./ProjectModal";
import { useSound } from "@/hooks/useSound";
import { Castle, FlaskConical, Sparkles, Activity, Cpu, ArrowUpRight } from "lucide-react";

export const ProjectsSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const { playClick, playItemPop } = useSound();

  const iconMap: Record<string, React.ReactNode> = {
    FlaskConical: <FlaskConical className="w-8 h-8 text-mc-emerald" />,
    Sparkles: <Sparkles className="w-8 h-8 text-purple-400" />,
    Activity: <Activity className="w-8 h-8 text-mc-gold" />,
    Cpu: <Cpu className="w-8 h-8 text-mc-diamond" />
  };

  return (
    <section id="projects" className="relative min-h-screen py-20 px-4 sm:px-6 flex flex-col justify-center items-center select-none">
      {/* Section Header */}
      <div className="text-center mb-10 relative z-10">
        <div className="inline-flex items-center gap-2 bg-mc-panel border-2 border-mc-diamond px-3 py-1 mb-2 shadow-mc">
          <Castle className="w-4 h-4 text-mc-diamond" />
          <span className="font-pixel text-mc-diamond text-base tracking-wider">
            CHAPTER V: MY BUILDS & VILLAGE
          </span>
        </div>
        <h2 className="font-pixel text-4xl sm:text-5xl md:text-6xl text-white tracking-wider text-shadow">
          FEATURED ARCHITECTURES
        </h2>
        <p className="font-sans text-sm sm:text-base text-slate-300 max-w-xl mx-auto mt-2">
          Explore Jayesh&apos;s major software projects built across specialized Minecraft sanctums and workshops.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="relative z-10 max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-6">
        {PROJECTS_DATA.map((proj) => (
          <div
            key={proj.id}
            onClick={() => {
              playItemPop();
              setSelectedProject(proj);
            }}
            className="mc-panel p-6 flex flex-col justify-between group hover:border-mc-gold transition-all duration-200 cursor-pointer"
          >
            <div>
              {/* Card Top: Sanctum name and icon */}
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-mc-dark border-2 border-mc-border group-hover:border-mc-gold transition-colors">
                  {iconMap[proj.icon] || <Castle className="w-8 h-8 text-mc-diamond" />}
                </div>
                <span className="font-pixel text-lg text-mc-gold bg-black/40 px-3 py-1 border border-mc-border">
                  {proj.minecraftBuilding}
                </span>
              </div>

              {/* Title & Subtitle */}
              <h3 className="font-pixel text-3xl sm:text-4xl text-white group-hover:text-mc-diamond transition-colors leading-tight">
                {proj.title}
              </h3>
              <div className="font-pixel text-xl text-mc-emerald mb-3">
                {proj.subtitle}
              </div>

              {/* Description */}
              <p className="font-sans text-sm text-slate-200 leading-relaxed mb-4 line-clamp-3">
                {proj.description}
              </p>
            </div>

            <div>
              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {proj.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="font-mono text-[11px] bg-mc-dark border border-mc-border px-2 py-0.5 text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Card Action */}
              <div className="pt-3 border-t border-mc-border flex items-center justify-between font-pixel text-lg text-mc-gold group-hover:text-white">
                <span>INSPECT BUILDING</span>
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
