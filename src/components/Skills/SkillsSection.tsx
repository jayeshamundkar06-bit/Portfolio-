"use client";

import React, { useState } from "react";
import { Code2, Globe, Database, Wrench, Heart, Terminal, FileCode, Layers, Server, ShieldCheck, CheckCircle2 } from "lucide-react";
import { useSound } from "@/hooks/useSound";

export const SkillsSection: React.FC = () => {
  const { playItemPop } = useSound();

  const skillGroups = [
    {
      title: "Programming Languages",
      icon: <Code2 className="w-5 h-5" />,
      gradient: "from-blue-500 to-cyan-400",
      skills: ["Java", "Python", "JavaScript", "C++", "C"]
    },
    {
      title: "Web Technologies",
      icon: <Globe className="w-5 h-5" />,
      gradient: "from-purple-500 to-pink-400",
      skills: ["HTML", "CSS", "React.js", "Node.js", "Express.js", "REST APIs"]
    },
    {
      title: "Databases",
      icon: <Database className="w-5 h-5" />,
      gradient: "from-green-500 to-emerald-400",
      skills: ["MySQL", "Oracle", "SQL Server", "MongoDB"]
    },
    {
      title: "Tools & Concepts",
      icon: <Wrench className="w-5 h-5" />,
      gradient: "from-orange-500 to-yellow-400",
      skills: ["GitHub", "VS Code", "Postman", "OOP", "Responsive Design", "Debugging", "DSA"]
    },
    {
      title: "Other Interests",
      icon: <Heart className="w-5 h-5" />,
      gradient: "from-pink-500 to-rose-400",
      skills: ["Data Structures", "Basic Networking", "Excel", "Power BI"]
    }
  ];

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        {/* Section Heading */}
        <div className="flex items-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            <span className="text-white">My </span>
            <span className="bg-gradient-to-r from-accent to-cyan-300 bg-clip-text text-transparent">
              Skills
            </span>
          </h2>
          <div className="ml-6 h-[1px] flex-grow bg-gradient-to-r from-accent/30 to-transparent" />
        </div>

        {/* Skill Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillGroups.map((group, idx) => (
            <div
              key={idx}
              className="glass-panel rounded-3xl p-7 hover:border-white/[0.2] transition-all duration-500 shadow-2xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3.5 mb-6">
                  <div
                    className={`w-11 h-11 rounded-xl bg-gradient-to-br ${group.gradient} flex items-center justify-center text-white shadow-lg`}
                  >
                    {group.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-white">{group.title}</h3>
                </div>

                {/* Skill Pills */}
                <div className="flex flex-wrap gap-2.5">
                  {group.skills.map((skill, sIdx) => (
                    <button
                      key={sIdx}
                      onClick={() => playItemPop()}
                      className="px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:border-accent/40 text-sm font-medium text-white/80 hover:text-white transition-all duration-300 transform hover:-translate-y-0.5"
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};