"use client";

import React from "react";
import { Briefcase, CheckCircle2, Building2 } from "lucide-react";

export const ExperienceSection: React.FC = () => {
  const responsibilities = [
    "Built responsive web applications using Java-based technologies and frontend tools.",
    "Developed backend functionalities and REST APIs for dynamic web features.",
    "Identified and fixed bugs to improve application performance and usability.",
    "Gained hands-on experience with full-stack development and version control."
  ];

  const tags = ["Java", "REST APIs", "Frontend", "Git", "Full Stack"];

  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        {/* Section Heading */}
        <div className="flex items-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            <span className="text-white">Work </span>
            <span className="bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
              Experience
            </span>
          </h2>
          <div className="ml-6 h-[1px] flex-grow bg-gradient-to-r from-green-400/30 to-transparent" />
        </div>

        {/* Timeline Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Timeline Bar */}
          <div className="absolute left-4 sm:left-6 top-0 bottom-0 w-[2px] bg-gradient-to-b from-green-400/60 via-emerald-400/30 to-transparent" />

          {/* Timeline Item */}
          <div className="relative pl-12 sm:pl-16 group">
            {/* Timeline Dot */}
            <div className="absolute left-2.5 sm:left-4.5 top-8 w-4 h-4 rounded-full bg-gradient-to-br from-green-400 to-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.6)] ring-4 ring-[#0a0f18]" />

            {/* Experience Card */}
            <div className="glass-panel rounded-3xl p-8 md:p-10 hover:border-green-400/40 transition-all duration-500 shadow-2xl">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-2">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1">
                    Java Web Developer Intern
                  </h3>
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-green-400" />
                    <span className="text-lg font-medium bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
                      Code Alpha
                    </span>
                  </div>
                </div>
                <span className="text-xs font-mono text-white/50 bg-white/[0.05] px-3.5 py-1.5 rounded-full border border-white/[0.08] w-fit">
                  Internship
                </span>
              </div>

              {/* Responsibilities list */}
              <ul className="space-y-3.5 mb-8">
                {responsibilities.map((resp, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-white/70 text-sm sm:text-base leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-1" />
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>

              {/* Tech Tags */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-white/[0.08]">
                {tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-mono px-3 py-1.5 bg-green-400/10 text-green-300 rounded-full border border-green-400/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};