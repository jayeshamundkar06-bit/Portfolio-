"use client";

import React from "react";
import { Heart, Github } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="relative py-10 border-t border-white/[0.08] bg-[#0a0f18]/80 backdrop-blur-md">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/40">
        <p className="flex items-center gap-1.5">
          © {new Date().getFullYear()} Jayesh Amundkar. Built with{" "}
          <Heart className="w-4 h-4 text-red-400 fill-red-400 inline" /> and code.
        </p>

        <a
          href="https://github.com/jayeshamundkar06-bit"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 text-white/50 hover:text-white transition-colors duration-300"
        >
          <Github className="w-4 h-4" />
          <span>GitHub</span>
        </a>
      </div>
    </footer>
  );
};