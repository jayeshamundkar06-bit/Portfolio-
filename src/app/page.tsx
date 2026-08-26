"use client";

import React, { useEffect } from "react";
import Lenis from "lenis";
import { MinecraftCanvas } from "@/components/World/MinecraftCanvas";
import { Navbar } from "@/components/Navigation/Navbar";
import { HeroSection } from "@/components/Hero/HeroSection";
import { AboutSection } from "@/components/About/AboutSection";
import { SkillsSection } from "@/components/Skills/SkillsSection";
import { ExperienceSection } from "@/components/Experience/ExperienceSection";
import { ProjectsSection } from "@/components/Projects/ProjectsSection";
import { EducationSection } from "@/components/Education/EducationSection";
import { CertificationsSection } from "@/components/Certifications/CertificationsSection";
import { ContactSection } from "@/components/Contact/ContactSection";
import { Footer } from "@/components/Footer/Footer";

export default function Home() {
  // Initialize buttery smooth physics-based momentum scrolling (Lenis)
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const lenis = new Lenis({
      duration: isMobile ? 0.8 : 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      lerp: isMobile ? 0.15 : 0.1,
      wheelMultiplier: 1.0,
      touchMultiplier: isMobile ? 1.2 : 1.5,
      infinite: false
    });

    // Sync Lenis with requestAnimationFrame loop
    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen bg-primary font-sans text-textLight relative selection:bg-accent selection:text-primary">
      {/* Constant 3D Minecraft Three.js World Background */}
      <MinecraftCanvas />

      {/* Floating Navbar */}
      <Navbar />

      {/* Main Content Sections with Exact Original Portfolio Text and Typography */}
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <EducationSection />
        <CertificationsSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}