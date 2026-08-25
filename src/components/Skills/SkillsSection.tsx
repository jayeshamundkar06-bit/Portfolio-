"use client";

import React from "react";
import {
  Code2,
  Globe,
  Database,
  Wrench,
  Heart,
  Network,
  Bug,
  Layout,
  Layers,
  FileSpreadsheet
} from "lucide-react";
import {
  FaJava,
  FaPython,
  FaJs,
  FaHtml5,
  FaCss3Alt,
  FaReact,
  FaNodeJs,
  FaGithub
} from "react-icons/fa";
import {
  SiCplusplus,
  SiC,
  SiExpress,
  SiMysql,
  SiMongodb,
  SiPostman
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import { GrOracle } from "react-icons/gr";
import { TbApi, TbBinaryTree, TbBrandSpeedtest } from "react-icons/tb";
import { DiMsqlServer } from "react-icons/di";
import { BiBarChartAlt2 } from "react-icons/bi";
import { useSound } from "@/hooks/useSound";

interface SkillItem {
  name: string;
  icon: React.ReactNode;
}

interface SkillGroup {
  title: string;
  icon: React.ReactNode;
  gradient: string;
  skills: SkillItem[];
}

export const SkillsSection: React.FC = () => {
  const { playItemPop } = useSound();

  const skillGroups: SkillGroup[] = [
    {
      title: "Programming Languages",
      icon: <Code2 className="w-5 h-5" />,
      gradient: "from-blue-500 to-cyan-400",
      skills: [
        { name: "Java", icon: <FaJava className="w-6 h-6 text-[#f89820]" /> },
        { name: "Python", icon: <FaPython className="w-6 h-6 text-[#3776AB]" /> },
        { name: "JavaScript", icon: <FaJs className="w-6 h-6 text-[#F7DF1E]" /> },
        { name: "C++", icon: <SiCplusplus className="w-6 h-6 text-[#00599C]" /> },
        { name: "C", icon: <SiC className="w-6 h-6 text-[#A8B9CC]" /> }
      ]
    },
    {
      title: "Web Technologies",
      icon: <Globe className="w-5 h-5" />,
      gradient: "from-purple-500 to-pink-400",
      skills: [
        { name: "HTML", icon: <FaHtml5 className="w-6 h-6 text-[#E34F26]" /> },
        { name: "CSS", icon: <FaCss3Alt className="w-6 h-6 text-[#1572B6]" /> },
        { name: "React.js", icon: <FaReact className="w-6 h-6 text-[#61DAFB]" /> },
        { name: "Node.js", icon: <FaNodeJs className="w-6 h-6 text-[#339933]" /> },
        { name: "Express.js", icon: <SiExpress className="w-6 h-6 text-[#ffffff]" /> },
        { name: "REST APIs", icon: <TbApi className="w-6 h-6 text-[#38bdf8]" /> }
      ]
    },
    {
      title: "Databases",
      icon: <Database className="w-5 h-5" />,
      gradient: "from-green-500 to-emerald-400",
      skills: [
        { name: "MySQL", icon: <SiMysql className="w-6 h-6 text-[#4479A1]" /> },
        { name: "Oracle", icon: <GrOracle className="w-6 h-6 text-[#F80000]" /> },
        { name: "SQL Server", icon: <DiMsqlServer className="w-6 h-6 text-[#CC292B]" /> },
        { name: "MongoDB", icon: <SiMongodb className="w-6 h-6 text-[#47A248]" /> }
      ]
    },
    {
      title: "Tools & Concepts",
      icon: <Wrench className="w-5 h-5" />,
      gradient: "from-orange-500 to-yellow-400",
      skills: [
        { name: "GitHub", icon: <FaGithub className="w-6 h-6 text-[#f0f6fc]" /> },
        { name: "VS Code", icon: <VscVscode className="w-6 h-6 text-[#007ACC]" /> },
        { name: "Postman", icon: <SiPostman className="w-6 h-6 text-[#FF6C37]" /> },
        { name: "OOP", icon: <Layers className="w-6 h-6 text-[#a855f7]" /> },
        { name: "Responsive Design", icon: <Layout className="w-6 h-6 text-[#38bdf8]" /> },
        { name: "Debugging", icon: <Bug className="w-6 h-6 text-[#ef4444]" /> },
        { name: "DSA", icon: <TbBinaryTree className="w-6 h-6 text-[#10b981]" /> }
      ]
    },
    {
      title: "Other Interests",
      icon: <Heart className="w-5 h-5" />,
      gradient: "from-pink-500 to-rose-400",
      skills: [
        { name: "Data Structures", icon: <TbBinaryTree className="w-6 h-6 text-[#f43f5e]" /> },
        { name: "Basic Networking", icon: <Network className="w-6 h-6 text-[#06b6d4]" /> },
        { name: "Excel", icon: <FileSpreadsheet className="w-6 h-6 text-[#107c41]" /> },
        { name: "Power BI", icon: <BiBarChartAlt2 className="w-6 h-6 text-[#F2C811]" /> }
      ]
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

                {/* Skill Icon Tiles with Tooltip on Hover */}
                <div className="flex flex-wrap gap-3">
                  {group.skills.map((skill, sIdx) => (
                    <div key={sIdx} className="relative group/skill flex items-center justify-center">
                      <button
                        onClick={() => playItemPop()}
                        aria-label={skill.name}
                        className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.08] hover:border-accent/50 hover:bg-white/[0.1] flex items-center justify-center text-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-accent/20"
                      >
                        <span className="flex items-center justify-center transition-transform duration-300 group-hover/skill:scale-125">
                          {skill.icon}
                        </span>
                      </button>

                      {/* Tooltip on Hover */}
                      <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover/skill:opacity-100 transition-all duration-200 transform group-hover/skill:-translate-y-1 z-30 flex flex-col items-center">
                        <div className="px-2.5 py-1 rounded-lg bg-slate-900/95 border border-white/15 text-xs font-semibold text-white shadow-xl whitespace-nowrap backdrop-blur-md">
                          {skill.name}
                        </div>
                        <div className="w-1.5 h-1.5 bg-slate-900 border-r border-b border-white/15 rotate-45 -mt-1" />
                      </div>
                    </div>
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