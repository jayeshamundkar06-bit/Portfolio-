"use client";

import React from "react";
import { ProjectItem } from "@/data/projects";
import { useSound } from "@/hooks/useSound";
import { X, ExternalLink, Github, Sparkles, CheckCircle2, ShieldAlert } from "lucide-react";

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const { playClick } = useSound();

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md select-none animate-fadeIn">
      <div className="relative max-w-2xl w-full mc-panel p-6 sm:p-8 max-h-[90vh] overflow-y-auto border-4 border-mc-border shadow-2xl">
        {/* Close Button */}
        <button
          onClick={() => {
            playClick(600);
            onClose();
          }}
          className="absolute top-4 right-4 p-2 bg-mc-panel-dark border-2 border-mc-border hover:border-red-400 text-white transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2 mb-2">
          <span className="font-pixel text-lg text-mc-gold">BUILD BLUEPRINT</span>
          <span className="font-mono text-xs text-slate-400">• {project.minecraftBuilding}</span>
        </div>

        <h2 className="font-pixel text-3xl sm:text-4xl text-white tracking-wide mb-1">
          {project.title}
        </h2>
        <p className="font-pixel text-xl text-mc-diamond mb-4">{project.subtitle}</p>

        {/* Tagline */}
        <div className="bg-mc-dark p-3 border border-mc-border mb-4 font-mono text-xs text-mc-emerald">
          ⚡ {project.tagline}
        </div>

        {/* Description */}
        <p className="font-sans text-sm sm:text-base text-slate-200 leading-relaxed mb-6">
          {project.description}
        </p>

        {/* Disclaimer if present */}
        {project.disclaimer && (
          <div className="mb-6 p-3 bg-amber-950/40 border-2 border-amber-600/60 flex items-start gap-2 text-xs font-sans text-amber-200">
            <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <span>{project.disclaimer}</span>
          </div>
        )}

        {/* Key Features */}
        <div className="mb-6">
          <h3 className="font-pixel text-xl text-white mb-2 border-b border-mc-border pb-1">
            KEY SYSTEM DELIVERABLES:
          </h3>
          <div className="space-y-2">
            {project.features.map((feat, idx) => (
              <div key={idx} className="flex items-start gap-2 font-sans text-xs sm:text-sm text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-mc-emerald shrink-0 mt-0.5" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Technologies / Inventory */}
        <div className="mb-6">
          <h3 className="font-pixel text-xl text-white mb-2 border-b border-mc-border pb-1">
            CRAFTING MATERIALS (TECH STACK):
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, idx) => (
              <span
                key={idx}
                className="bg-mc-dark border border-mc-border px-3 py-1 font-mono text-xs text-slate-200"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-mc-border">
          <div className="font-mono text-xs text-purple-400">
            Biome: {project.minecraftBiome}
          </div>

          <div className="flex gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playClick(1100)}
                className="mc-button mc-button-primary text-base flex items-center gap-2"
              >
                <Github className="w-4 h-4" />
                <span>GITHUB REPO</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
