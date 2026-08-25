"use client";

import React, { useState } from "react";
import { Github, ExternalLink, Sparkles, ChevronDown, ChevronUp } from "lucide-react";
import { useSound } from "@/hooks/useSound";

export const ProjectsSection: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const { playClick } = useSound();

  const projects = [
    {
      title: "Wellify",
      subtitle: "Disease Prediction Web App",
      description:
        "Built an educational web application that predicts possible diseases based on user-selected symptoms. Analyzes 18 symptoms and predicts the top three possible conditions with confidence scores.",
      features: [
        "Symptom selection",
        "Disease prediction",
        "Confidence scores",
        "Educational information",
        "Responsive UI"
      ],
      tech: ["HTML", "CSS", "JavaScript"],
      gradient: "from-blue-500 to-cyan-400",
      github: "https://github.com/jayeshamundkar06-bit"
    },
    {
      title: "NeuroSketch",
      subtitle: "Air Drawing Tool",
      description:
        "Built a real-time virtual drawing tool using Python, OpenCV and MediaPipe through webcam-based hand tracking. Features index finger tracking and gesture-based canvas clearing.",
      features: [
        "Index finger tracking",
        "Air drawing",
        "Real-time interaction",
        "Gesture-based canvas clearing"
      ],
      tech: ["Python", "OpenCV", "MediaPipe"],
      gradient: "from-purple-500 to-pink-400",
      github: "https://github.com/jayeshamundkar06-bit"
    },
    {
      title: "Vigor AI",
      subtitle: "Fitness App",
      description:
        "Developed a cross-platform fitness application using React Native and TypeScript. Integrated Sency SMKIT SDK to enable AI-powered fitness assessments and 360° body tracking.",
      features: [
        "AI-powered fitness assessments",
        "Interactive fitness experience",
        "360° body evaluations",
        "Fitness tracking"
      ],
      tech: ["React Native", "TypeScript", "Sency SDK"],
      gradient: "from-green-500 to-emerald-400",
      github: "https://github.com/jayeshamundkar06-bit"
    },
    {
      title: "Build My PC",
      subtitle: "E-Commerce Platform",
      description:
        "A premium e-commerce platform that allows users to design custom PC builds. Features component compatibility checking and budget/persona-based suggestions.",
      features: [
        "Custom PC configuration",
        "Compatibility checking",
        "Smart recommendations",
        "Budget suggestions"
      ],
      tech: ["React", "Node.js"],
      gradient: "from-orange-500 to-yellow-400",
      github: "https://github.com/jayeshamundkar06-bit"
    }
  ];

  const toggleExpand = (idx: number) => {
    playClick(900);
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        {/* Section Heading */}
        <div className="flex items-center mb-4">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            <span className="text-white">Featured </span>
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <div className="ml-6 h-[1px] flex-grow bg-gradient-to-r from-purple-400/30 to-transparent" />
        </div>
        <p className="text-white/50 mb-12 max-w-xl text-sm sm:text-base">
          A selection of projects that showcase my skills in building real-world applications.
        </p>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((proj, idx) => (
            <div
              key={idx}
              className="glass-panel rounded-3xl p-7 sm:p-8 hover:border-white/[0.2] transition-all duration-500 shadow-2xl flex flex-col justify-between group"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className={`text-2xl font-bold bg-gradient-to-r ${proj.gradient} bg-clip-text text-transparent`}>
                      {proj.title}
                    </h3>
                    <p className="text-white/50 text-sm font-medium mt-0.5">
                      {proj.subtitle}
                    </p>
                  </div>

                  <a
                    href={proj.github}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => playClick(1100)}
                    className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 transition-all duration-300 shadow-md"
                    aria-label={`${proj.title} GitHub repository`}
                  >
                    <Github className="w-5 h-5" />
                  </a>
                </div>

                {/* Description */}
                <p className="text-white/70 leading-relaxed text-sm mb-6">
                  {proj.description}
                </p>

                {/* Features Toggle */}
                <button
                  onClick={() => toggleExpand(idx)}
                  className="text-xs font-mono text-accent hover:underline mb-4 flex items-center gap-1"
                >
                  <span>{expandedIndex === idx ? "Hide Key Features" : "View Key Features"}</span>
                  {expandedIndex === idx ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>

                {expandedIndex === idx && (
                  <div className="flex flex-wrap gap-2 mb-6 animate-fadeIn">
                    {proj.features.map((feat, fIdx) => (
                      <span
                        key={fIdx}
                        className="text-xs text-white/70 bg-white/[0.04] px-2.5 py-1 rounded-lg border border-white/[0.06]"
                      >
                        ✦ {feat}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-white/[0.08] mt-4">
                {proj.tech.map((tech, tIdx) => (
                  <span
                    key={tIdx}
                    className={`text-xs font-mono font-semibold px-3 py-1.5 rounded-full bg-gradient-to-r ${proj.gradient} bg-clip-text text-transparent border border-white/[0.1]`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};