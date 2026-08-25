"use client";

import React, { useState, useEffect } from "react";
import { Volume2, VolumeX, Menu, X, Github } from "lucide-react";
import { useSound } from "@/hooks/useSound";

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isMuted, toggleSound, playClick } = useSound();

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Education", href: "#education" },
    { name: "Certifications", href: "#certifications" },
    { name: "Contact", href: "#contact" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0a0f18]/80 backdrop-blur-xl border-b border-white/[0.08] shadow-lg py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#home"
          onClick={() => playClick()}
          className="text-2xl font-bold tracking-tight group flex items-center gap-1 font-sans"
        >
          <span className="text-white">Jayesh</span>
          <span className="text-accent group-hover:text-cyan-300 transition-colors">.</span>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-1 bg-white/[0.03] backdrop-blur-md border border-white/[0.08] px-4 py-1.5 rounded-full">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => playClick()}
              className="px-3.5 py-1.5 text-sm font-medium text-white/70 hover:text-white hover:bg-white/[0.08] rounded-full transition-all duration-300"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Action Controls (Sound & GitHub) */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={toggleSound}
            title={isMuted ? "Unmute 3D Audio" : "Mute Audio"}
            className="p-2 bg-white/[0.04] border border-white/[0.08] hover:border-accent/40 rounded-xl text-white/70 hover:text-accent transition-all flex items-center gap-2 text-xs font-mono"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-accent animate-pulse" />}
            <span>{isMuted ? "AUDIO OFF" : "AUDIO ON"}</span>
          </button>

          <a
            href="https://github.com/jayeshamundkar06-bit"
            target="_blank"
            rel="noreferrer"
            className="p-2 bg-white/[0.04] border border-white/[0.08] hover:border-white/20 rounded-xl text-white/70 hover:text-white transition-all"
            aria-label="GitHub Profile"
          >
            <Github className="w-4 h-4" />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleSound}
            className="p-2 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white/70"
            aria-label="Toggle Sound"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-accent" />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white/70 hover:text-white"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[60px] bg-[#0a0f18]/95 backdrop-blur-2xl border-b border-white/[0.08] p-6 shadow-2xl animate-fadeIn">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => {
                  playClick();
                  setMobileMenuOpen(false);
                }}
                className="px-4 py-3 text-white/70 hover:text-white hover:bg-white/[0.05] rounded-xl transition-all duration-300 font-medium text-base"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};