"use client";

import React from "react";
import { Award, CheckCircle2, Heart } from "lucide-react";

export const CertificationsSection: React.FC = () => {
  const certifications = [
    { name: "Certified Java Web Developer", gradient: "from-orange-500 to-red-400" },
    { name: "TATA Cybersecurity Analyst — Forage", gradient: "from-blue-500 to-cyan-400" },
    { name: "Generative AI — LinkedIn Learning (2026)", gradient: "from-purple-500 to-pink-400" },
    { name: "Migrating from AWS to Azure — Microsoft Learn (2026)", gradient: "from-green-500 to-emerald-400" }
  ];

  const strengths = [
    "Eager to learn and explore new technologies",
    "Strong problem-solving skills",
    "Team player and effective communicator",
    "Quick adaptation to new tools and environments"
  ];

  const interests = ["Travelling", "Reading Books", "Drawing", "Playing Games"];

  return (
    <section id="certifications" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        {/* Section Heading */}
        <div className="flex items-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            <span className="text-white">Licenses & </span>
            <span className="bg-gradient-to-r from-orange-400 to-yellow-300 bg-clip-text text-transparent">
              Certifications
            </span>
          </h2>
          <div className="ml-6 h-[1px] flex-grow bg-gradient-to-r from-orange-400/30 to-transparent" />
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {certifications.map((cert, idx) => (
            <div
              key={idx}
              className="glass-panel rounded-2xl p-6 hover:border-white/[0.2] transition-all duration-500 shadow-2xl flex items-center gap-4 group"
            >
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cert.gradient} flex items-center justify-center text-white shrink-0 shadow-lg`}
              >
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-sm sm:text-base font-medium text-white/80 group-hover:text-white transition-colors">
                {cert.name}
              </h3>
            </div>
          ))}
        </div>

        {/* Strengths & Other Interests Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Strengths */}
          <div className="glass-panel rounded-3xl p-8 hover:border-accent/40 transition-all duration-500 shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-6">
              My <span className="bg-gradient-to-r from-accent to-cyan-300 bg-clip-text text-transparent">Strengths</span>
            </h3>
            <ul className="space-y-4">
              {strengths.map((str, idx) => (
                <li key={idx} className="flex items-start gap-3 text-white/70 text-sm sm:text-base">
                  <span className="w-2 h-2 rounded-full bg-gradient-to-r from-accent to-cyan-400 mt-2 shrink-0" />
                  <span>{str}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Interests */}
          <div className="glass-panel rounded-3xl p-8 hover:border-purple-400/40 transition-all duration-500 shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-6">
              Other <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Interests</span>
            </h3>
            <div className="flex flex-wrap gap-3">
              {interests.map((interest, idx) => (
                <span
                  key={idx}
                  className="px-5 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white/70 font-medium hover:text-white hover:border-purple-400/40 transition-all duration-300 cursor-default"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};