"use client";

import React from "react";
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