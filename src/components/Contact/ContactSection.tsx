"use client";

import React from "react";
import { Mail, Phone, MapPin, Github, ArrowRight } from "lucide-react";
import { useSound } from "@/hooks/useSound";

export const ContactSection: React.FC = () => {
  const { playClick } = useSound();

  const contactItems = [
    {
      icon: <Mail className="w-5 h-5" />,
      label: "Email",
      value: "jayesh.amundkar06@gmail.com",
      href: "mailto:jayesh.amundkar06@gmail.com",
      gradient: "from-blue-500 to-cyan-400"
    },
    {
      icon: <Phone className="w-5 h-5" />,
      label: "Phone",
      value: "+91 8104082206",
      href: "tel:+918104082206",
      gradient: "from-green-500 to-emerald-400"
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      label: "Location",
      value: "Mumbai, Maharashtra, India",
      href: "#",
      gradient: "from-orange-500 to-yellow-400"
    },
    {
      icon: <Github className="w-5 h-5" />,
      label: "GitHub",
      value: "jayeshamundkar06-bit",
      href: "https://github.com/jayeshamundkar06-bit",
      gradient: "from-purple-500 to-pink-400"
    }
  ];

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        <div className="glass-panel rounded-[2rem] p-8 sm:p-12 md:p-16 text-center hover:border-accent/40 transition-all duration-700 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-accent/60 to-transparent" />

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-md">
            Let&apos;s Build Something{" "}
            <span className="bg-gradient-to-r from-accent via-cyan-300 to-purple-400 bg-clip-text text-transparent">
              Together.
            </span>
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-white/70 mb-12 max-w-2xl mx-auto leading-relaxed">
            Have an idea, opportunity, or project in mind? I&apos;d love to connect and build something meaningful.
          </p>

          {/* Contact Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 max-w-2xl mx-auto text-left">
            {contactItems.map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                onClick={() => playClick(1000)}
                className="bg-white/[0.04] backdrop-blur-sm border border-white/[0.1] rounded-2xl p-4 sm:p-5 flex items-center gap-4 hover:border-white/30 hover:bg-white/[0.08] transition-all duration-300 group"
              >
                <div
                  className={`w-11 h-11 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-white shrink-0 shadow-lg`}
                >
                  {item.icon}
                </div>
                <div className="min-w-0">
                  <div className="text-xs text-white/50 uppercase tracking-wider font-mono">
                    {item.label}
                  </div>
                  <div className="text-sm text-white/90 truncate group-hover:text-white font-medium">
                    {item.value}
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <a
              href="mailto:jayesh.amundkar06@gmail.com"
              onClick={() => playClick(1200)}
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-gradient-to-r from-accent to-cyan-400 hover:from-cyan-400 hover:to-accent text-[#0a0f18] font-bold rounded-full transition-all duration-300 transform hover:scale-105 shadow-[0_0_30px_rgba(56,189,248,0.4)] text-sm sm:text-base group"
            >
              <span>Say Hello</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="https://github.com/jayeshamundkar06-bit"
              target="_blank"
              rel="noreferrer"
              onClick={() => playClick(900)}
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-white/[0.06] hover:bg-white/[0.12] text-white border border-white/[0.12] hover:border-white/[0.25] font-bold rounded-full transition-all duration-300 backdrop-blur-sm text-sm sm:text-base"
            >
              <Github className="w-4 h-4" />
              <span>GitHub Profile</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};