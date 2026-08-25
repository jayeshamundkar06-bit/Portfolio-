"use client";

import React from "react";
import { GraduationCap } from "lucide-react";

export const EducationSection: React.FC = () => {
  const educationList = [
    {
      institution: "Ramniranjan Jhunjhunwala College",
      degree: "B.Sc. Information Technology (B.Sc.IT)",
      score: "CGPA: 8.36",
      year: "2026",
      gradient: "from-accent to-cyan-400",
      description: "Currently pursuing a Bachelor's degree in Information Technology with a strong academic record."
    },
    {
      institution: "PVG Vidya Bhawan College",
      degree: "HSC",
      score: "60.00%",
      year: "2023",
      gradient: "from-purple-500 to-pink-400",
      description: "Completed Higher Secondary Certificate with a focus on science and mathematics."
    },
    {
      institution: "R. N. Gandhi High School",
      degree: "SSC",
      score: "85.00%",
      year: "2020",
      gradient: "from-green-500 to-emerald-400",
      description: "Completed Secondary School Certificate with distinction."
    }
  ];

  return (
    <section id="education" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        {/* Section Heading */}
        <div className="flex items-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            <span className="text-white">My </span>
            <span className="bg-gradient-to-r from-accent to-cyan-300 bg-clip-text text-transparent">
              Education
            </span>
          </h2>
          <div className="ml-6 h-[1px] flex-grow bg-gradient-to-r from-accent/30 to-transparent" />
        </div>

        {/* Vertical Timeline */}
        <div className="relative max-w-4xl mx-auto">
          <div className="absolute left-4 sm:left-6 top-0 bottom-0 w-[2px] bg-gradient-to-b from-accent/60 via-purple-400/30 to-green-400/30" />

          <div className="space-y-10">
            {educationList.map((edu, idx) => (
              <div key={idx} className="relative pl-12 sm:pl-16 group">
                {/* Bullet */}
                <div
                  className={`absolute left-2.5 sm:left-4.5 top-8 w-4 h-4 rounded-full bg-gradient-to-br ${edu.gradient} shadow-lg ring-4 ring-[#0a0f18]`}
                />

                {/* Card */}
                <div className="glass-panel rounded-3xl p-8 hover:border-white/[0.2] transition-all duration-500 shadow-2xl">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
                    <div className="flex items-center gap-3">
                      <GraduationCap className="w-5 h-5 text-accent" />
                      <span className={`text-sm font-mono px-3 py-1 rounded-full bg-gradient-to-r ${edu.gradient} bg-clip-text text-transparent border border-white/[0.08]`}>
                        {edu.year}
                      </span>
                    </div>

                    <span className="text-white font-bold text-base sm:text-lg bg-white/[0.05] px-4 py-1.5 rounded-xl border border-white/[0.08] w-fit">
                      {edu.score}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">
                    {edu.institution}
                  </h3>
                  <p className={`font-semibold bg-gradient-to-r ${edu.gradient} bg-clip-text text-transparent mb-3 text-sm sm:text-base`}>
                    {edu.degree}
                  </p>
                  <p className="text-white/50 text-sm leading-relaxed">
                    {edu.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};