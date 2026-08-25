"use client";

import React, { useState } from "react";
import { PROFILE_DATA } from "@/data/profile";
import { useSound } from "@/hooks/useSound";
import { BookOpen, GraduationCap, ChevronLeft, ChevronRight, Award, MapPin, Sparkles } from "lucide-react";

export const AboutSection: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const { playClick, playPling } = useSound();

  const totalPages = 3;

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      playClick(1000);
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      playClick(800);
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <section id="about" className="relative min-h-screen py-20 px-4 sm:px-6 flex flex-col justify-center items-center select-none">
      {/* Section Header */}
      <div className="text-center mb-10 relative z-10">
        <div className="inline-flex items-center gap-2 bg-mc-panel border-2 border-purple-500 px-3 py-1 mb-2 shadow-mc">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span className="font-pixel text-purple-300 text-base tracking-wider">
            CHAPTER I: THE ADVENTURER
          </span>
        </div>
        <h2 className="font-pixel text-4xl sm:text-5xl md:text-6xl text-white tracking-wider text-shadow">
          THE ENCHANTED LIBRARY
        </h2>
        <p className="font-sans text-sm sm:text-base text-slate-300 max-w-xl mx-auto mt-2">
          Inside the oak-paneled library, glowing bookshelves and ancient codices chronicle Jayesh&apos;s academic and developer journey.
        </p>
      </div>

      {/* Minecraft Enchanted Book Viewer */}
      <div className="relative z-10 max-w-4xl w-full">
        {/* Book Container with Wooden Leather Trim */}
        <div className="mc-panel bg-[#241a12] border-4 border-[#633a15] p-4 sm:p-8 shadow-2xl relative">
          {/* Book Parchment Inner Page */}
          <div className="mc-parchment p-6 sm:p-8 min-h-[380px] sm:min-h-[420px] flex flex-col justify-between">
            {/* Page Header */}
            <div className="flex items-center justify-between border-b-2 border-[#8a5d2e] pb-3 mb-4">
              <div className="flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-[#523214]" />
                <span className="font-pixel text-2xl text-[#3b220e] tracking-wide">
                  {currentPage === 0 && "BOOK OF JAYESH — PAGE 1: PASSION"}
                  {currentPage === 1 && "BOOK OF JAYESH — PAGE 2: FOUNDATION"}
                  {currentPage === 2 && "TOME OF SCHOLARSHIP — EDUCATION"}
                </span>
              </div>
              <span className="font-pixel text-lg text-[#523214]">
                [{currentPage + 1} / {totalPages}]
              </span>
            </div>

            {/* Page Body */}
            <div className="flex-1 flex flex-col justify-center">
              {currentPage === 0 && (
                <div className="space-y-4">
                  <p className="font-sans text-base sm:text-lg text-[#26170b] leading-relaxed font-medium">
                    &ldquo;{PROFILE_DATA.aboutParagraphs[0]}&rdquo;
                  </p>
                  <p className="font-sans text-base sm:text-lg text-[#26170b] leading-relaxed font-medium">
                    &ldquo;{PROFILE_DATA.aboutParagraphs[1]}&rdquo;
                  </p>
                  <div className="bg-[#dfc593] p-3 border border-[#966b38] font-pixel text-[#3a200a] text-lg">
                    ⚡ Current Status: Eager to contribute technical skills in a real-world team environment!
                  </div>
                </div>
              )}

              {currentPage === 1 && (
                <div className="space-y-4">
                  <p className="font-sans text-base sm:text-lg text-[#26170b] leading-relaxed font-medium">
                    &ldquo;{PROFILE_DATA.aboutParagraphs[2]}&rdquo;
                  </p>
                  <p className="font-sans text-base sm:text-lg text-[#26170b] leading-relaxed font-medium">
                    &ldquo;{PROFILE_DATA.aboutParagraphs[3]}&rdquo;
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-center pt-2">
                    <div className="bg-[#dfc593] p-2 border border-[#966b38] font-pixel text-[#3a200a] text-lg">
                      🛡️ Clean Architecture
                    </div>
                    <div className="bg-[#dfc593] p-2 border border-[#966b38] font-pixel text-[#3a200a] text-lg">
                      🔍 Detail-Oriented
                    </div>
                  </div>
                </div>
              )}

              {currentPage === 2 && (
                <div className="space-y-3">
                  {PROFILE_DATA.education.map((edu, idx) => (
                    <div
                      key={idx}
                      className="bg-[#f0dfb8] border-2 border-[#8a5d2e] p-3 shadow-sm hover:bg-[#faeed0] transition-colors"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <GraduationCap className="w-5 h-5 text-[#633a15]" />
                          <h4 className="font-pixel text-xl sm:text-2xl text-[#26170b] font-bold leading-tight">
                            {edu.institution}
                          </h4>
                        </div>
                        <span className="font-pixel text-lg bg-[#633a15] text-[#faeed0] px-2 py-0.5">
                          {edu.score}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs sm:text-sm font-sans font-medium text-[#4a2e15] mt-1">
                        <span>{edu.degree}</span>
                        <span className="italic">{edu.year}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Page Footer Navigation */}
            <div className="flex items-center justify-between pt-4 border-t-2 border-[#8a5d2e] mt-4">
              <button
                onClick={handlePrev}
                disabled={currentPage === 0}
                className={`mc-button px-4 py-1.5 flex items-center gap-1 ${
                  currentPage === 0 ? "opacity-40 cursor-not-allowed" : ""
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                <span>PREV PAGE</span>
              </button>

              <div className="font-pixel text-base text-[#523214] hidden sm:block">
                FLIP PAGES TO EXPLORE
              </div>

              <button
                onClick={handleNext}
                disabled={currentPage === totalPages - 1}
                className={`mc-button px-4 py-1.5 flex items-center gap-1 ${
                  currentPage === totalPages - 1 ? "opacity-40 cursor-not-allowed" : ""
                }`}
              >
                <span>NEXT PAGE</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
