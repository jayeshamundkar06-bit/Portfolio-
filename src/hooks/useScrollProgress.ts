"use client";

import { useEffect, useRef, useCallback } from "react";

export function useScrollProgress() {
  const scrollProgressRef = useRef(0);
  const currentSectionRef = useRef("hero");

  // Use a ref-only approach so scroll events NEVER trigger React re-renders.
  // The Three.js render loop reads scrollProgressRef.current directly.
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
        const currentScroll = window.scrollY;
        if (totalScroll > 0) {
          scrollProgressRef.current = Math.min(Math.max(currentScroll / totalScroll, 0), 1);
        }

        // Section detection
        const sections = ["home", "about", "skills", "experience", "projects", "education", "certifications", "contact"];
        for (const section of sections) {
          const el = document.getElementById(section);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= window.innerHeight * 0.45 && rect.bottom >= window.innerHeight * 0.45) {
              currentSectionRef.current = section;
              break;
            }
          }
        }

        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { scrollProgress: scrollProgressRef.current, scrollProgressRef, currentSection: currentSectionRef.current };
}
