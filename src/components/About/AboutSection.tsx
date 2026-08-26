"use client";

import React from "react";
import { GraduationCap, Code2, Globe, Cpu, Award, Sparkles, Terminal } from "lucide-react";

export const AboutSection: React.FC = () => {
  const badges = [
    { icon: <GraduationCap className="w-4 h-4" />, text: "B.Sc. IT Graduate", color: "from-blue-500 to-cyan-400" },
    { icon: <Code2 className="w-4 h-4" />, text: "Software Development", color: "from-purple-500 to-pink-400" },
    { icon: <Globe className="w-4 h-4" />, text: "Full Stack Development", color: "from-green-500 to-emerald-400" },
    { icon: <Terminal className="w-4 h-4" />, text: "Java", color: "from-orange-500 to-red-400" },
    { icon: <Cpu className="w-4 h-4" />, text: "Web Technologies", color: "from-cyan-500 to-blue-400" },
    { icon: <Sparkles className="w-4 h-4" />, text: "Problem Solving", color: "from-yellow-500 to-orange-400" },
    { icon: <Award className="w-4 h-4" />, text: "Continuous Learning", color: "from-pink-500 to-rose-400" }
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10 max-w-6xl">
        {/* Heading */}
        <div className="flex items-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            <span className="text-white">About </span>
            <span className="bg-gradient-to-r from-accent to-cyan-300 bg-clip-text text-transparent">
              Me
            </span>
          </h2>
          <div className="ml-6 h-[1px] flex-grow bg-gradient-to-r from-accent/30 to-transparent" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Main Story Card (Left 7 Cols) */}
          <div className="md:col-span-7 relative group">
            <div className="relative glass-panel rounded-3xl p-8 md:p-10 h-full hover:border-accent/40 transition-all duration-500 shadow-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 rounded-full bg-accent animate-pulse" />
                <span className="text-accent text-sm font-mono tracking-wider uppercase font-semibold">
                  Who I Am
                </span>
              </div>

              <p className="text-base sm:text-lg text-white/80 leading-relaxed mb-6 font-sans">
                I am a passionate and dedicated{" "}
                <span className="text-white font-semibold underline decoration-accent/50">
                  Graduate in Information Technology
                </span>{" "}
                with a strong interest in software development, web technologies, and problem-solving.
              </p>

              <p className="text-base sm:text-lg text-white/60 leading-relaxed font-sans">
                I have built a solid foundation through academic projects, online courses, and self-learning. I enjoy exploring new technologies and building practical applications that solve real-world problems.
              </p>

              {/* Code Snippet Card */}
              <div className="mt-8 bg-black/40 rounded-xl p-5 border border-white/5 font-mono text-xs sm:text-sm text-slate-300 shadow-inner">
                <span className="text-purple-400">const</span>{" "}
                <span className="text-blue-300">jayesh</span>{" "}
                <span className="text-white">=</span>{" "}
                <span className="text-yellow-300">&#123;</span>
                <br />
                <span className="text-white ml-4">passion:</span>{" "}
                <span className="text-emerald-400">&quot;Building Digital Experiences&quot;</span>
                <span className="text-white">,</span>
                <br />
                <span className="text-white ml-4">goal:</span>{" "}
                <span className="text-emerald-400">&quot;Full Stack Mastery&quot;</span>
                <br />
                <span className="text-yellow-300">&#125;</span>
                <span className="text-white">;</span>
              </div>
            </div>
          </div>

          {/* Stats & Badges (Right 5 Cols) */}
          <div className="md:col-span-5 flex flex-col gap-6">
            {/* 4 Stat Counters */}
            <div className="glass-panel rounded-3xl p-8 hover:border-accent/40 transition-all duration-500 shadow-2xl">
              <div className="grid grid-cols-2 gap-6 text-center">
                <div>
                  <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-accent to-cyan-300 bg-clip-text text-transparent">
                    8.36
                  </div>
                  <div className="text-white/50 text-sm mt-1 font-sans">CGPA</div>
                </div>
                <div>
                  <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    4+
                  </div>
                  <div className="text-white/50 text-sm mt-1 font-sans">Projects</div>
                </div>
                <div>
                  <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                    10+
                  </div>
                  <div className="text-white/50 text-sm mt-1 font-sans">Technologies</div>
                </div>
                <div>
                  <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
                    4
                  </div>
                  <div className="text-white/50 text-sm mt-1 font-sans">Certifications</div>
                </div>
              </div>
            </div>

            {/* Interest & Capability Badges */}
            <div className="glass-panel rounded-3xl p-6 flex-grow hover:border-accent/40 transition-all duration-500 shadow-2xl">
              <div className="flex flex-wrap gap-2.5">
                {badges.map((b, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 bg-white/[0.04] border border-white/[0.08] px-3.5 py-2 rounded-xl hover:border-accent/40 transition-all duration-300 cursor-default"
                  >
                    <div className={`bg-gradient-to-r ${b.color} bg-clip-text text-transparent`}>
                      {b.icon}
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-white/80">
                      {b.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};