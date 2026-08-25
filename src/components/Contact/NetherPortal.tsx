"use client";

import React, { useState } from "react";
import { PROFILE_DATA } from "@/data/profile";
import { useSound } from "@/hooks/useSound";
import { Copy, Check, Github, Linkedin, Mail, Send, Sparkles } from "lucide-react";

export const NetherPortal: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [broadcastLog, setBroadcastLog] = useState<string[]>([]);
  const { playPortalWarp, playClick, playItemPop } = useSound();

  const handleCopyEmail = () => {
    playItemPop();
    navigator.clipboard.writeText(PROFILE_DATA.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    playClick(1200);
    const newMsg = `<Visitor> ${chatMessage}`;
    setBroadcastLog((prev) => [...prev, newMsg]);
    setChatMessage("");

    // Simulate server response
    setTimeout(() => {
      setBroadcastLog((prev) => [
        ...prev,
        `[Jayesh] Message received in Nether frequency! Email me at ${PROFILE_DATA.email} for collaborations.`
      ]);
    }, 800);
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen py-20 px-4 sm:px-6 flex flex-col justify-center items-center select-none overflow-hidden"
    >
      {/* Nether Swirling Portal Backing Glow */}
      <div className="absolute w-[360px] sm:w-[540px] h-[480px] bg-purple-600/20 rounded-full blur-3xl pointer-events-none animate-portal" />

      {/* Section Header */}
      <div className="text-center mb-10 relative z-10">
        <div className="inline-flex items-center gap-2 bg-mc-panel border-2 border-purple-500 px-3 py-1 mb-2 shadow-mc-portal">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span className="font-pixel text-purple-300 text-base tracking-wider">
            FINAL DESTINATION: THE NETHER PORTAL
          </span>
        </div>
        <h2 className="font-pixel text-4xl sm:text-6xl md:text-7xl text-white tracking-wider text-shadow">
          LET&apos;S BUILD SOMETHING
        </h2>
        <p className="font-sans text-sm sm:text-base text-slate-300 max-w-xl mx-auto mt-2">
          &ldquo;Have an idea, project, or opportunity? Let&apos;s connect.&rdquo;
        </p>
      </div>

      {/* Portal Contact Console */}
      <div className="relative z-10 max-w-3xl w-full mc-panel bg-[#150d1e] border-4 border-[#3c1361] p-6 sm:p-8 shadow-mc-portal">
        <div className="text-center mb-6">
          <div className="font-mono text-xs text-purple-300 mb-1">
            PORTAL COORDINATES: {PROFILE_DATA.coordinates}
          </div>
          <div className="font-pixel text-2xl text-mc-diamond">
            TRANSMISSION CHANNELS
          </div>
        </div>

        {/* Primary Social & Email Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
          {/* Email Button */}
          <a
            href={`mailto:${PROFILE_DATA.email}`}
            onClick={() => playPortalWarp()}
            className="mc-button mc-button-primary py-3 flex flex-col items-center justify-center text-center"
          >
            <Mail className="w-6 h-6 mb-1" />
            <span className="text-lg">EMAIL ME</span>
            <span className="font-mono text-[10px] opacity-80 truncate max-w-full">
              {PROFILE_DATA.email}
            </span>
          </a>

          {/* GitHub Button */}
          <a
            href={PROFILE_DATA.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playClick(1000)}
            className="mc-button py-3 flex flex-col items-center justify-center text-center hover:border-mc-diamond"
          >
            <Github className="w-6 h-6 mb-1" />
            <span className="text-lg">GITHUB</span>
            <span className="font-mono text-[10px] text-slate-300">jayeshamundkar06-bit</span>
          </a>

          {/* LinkedIn Button */}
          <a
            href={PROFILE_DATA.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playClick(1000)}
            className="mc-button mc-button-gold py-3 flex flex-col items-center justify-center text-center"
          >
            <Linkedin className="w-6 h-6 mb-1" />
            <span className="text-lg">LINKEDIN</span>
            <span className="font-mono text-[10px] text-amber-200">/in/jayeshamundkar</span>
          </a>
        </div>

        {/* Copy Email Fast Action */}
        <div className="bg-black/50 border-2 border-purple-800 p-3 mb-6 flex items-center justify-between">
          <span className="font-mono text-xs text-purple-200 truncate mr-2">
            {PROFILE_DATA.email}
          </span>
          <button
            onClick={handleCopyEmail}
            className="mc-button text-sm px-3 py-1 flex items-center gap-1.5 shrink-0"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-mc-emerald" />
                <span className="text-mc-emerald">COPIED!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>COPY EMAIL</span>
              </>
            )}
          </button>
        </div>

        {/* Simulated Minecraft Server Chat Broadcast Box */}
        <div className="border-2 border-purple-900/80 bg-black/70 p-4">
          <div className="font-pixel text-lg text-purple-300 mb-2">
            SEND A FAST MESSAGE TO JAYESH:
          </div>

          {broadcastLog.length > 0 && (
            <div className="bg-[#0b0712] border border-purple-950 p-2 mb-3 max-h-32 overflow-y-auto space-y-1 font-mono text-xs">
              {broadcastLog.map((log, idx) => (
                <div
                  key={idx}
                  className={log.startsWith("[Jayesh]") ? "text-mc-emerald" : "text-mc-diamond"}
                >
                  {log}
                </div>
              ))}
            </div>
          )}

          <form onSubmit={handleBroadcast} className="flex gap-2">
            <input
              type="text"
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              placeholder="Type your message or project note here..."
              className="flex-1 bg-mc-dark border-2 border-mc-border px-3 py-2 text-white font-sans text-sm outline-none focus:border-purple-400 placeholder:text-slate-500"
            />
            <button
              type="submit"
              className="mc-button mc-button-primary px-4 py-2 flex items-center gap-1 text-base"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">SEND</span>
            </button>
          </form>
        </div>
      </div>

      {/* Footer copyright & credits */}
      <footer className="mt-16 text-center text-xs font-mono text-slate-400 relative z-10 space-y-1">
        <div>Crafted with ⛏️ by Jayesh Amundkar • B.Sc.IT (CGPA 8.36)</div>
        <div className="text-[10px] text-slate-400">
          Minecraft-inspired portfolio. All trademarks belong to their respective owners.
        </div>
      </footer>
    </section>
  );
};
