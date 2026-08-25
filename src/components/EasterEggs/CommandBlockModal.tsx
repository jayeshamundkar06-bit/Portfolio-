"use client";

import React, { useState, useEffect, useRef } from "react";
import { EASTER_EGG_COMMANDS } from "@/data/easterEggs";
import { useSound } from "@/hooks/useSound";
import { Terminal, X, Send, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";

interface CommandBlockModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandBlockModal: React.FC<CommandBlockModalProps> = ({ isOpen, onClose }) => {
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<string[]>([
    "[System] Minecraft Developer Console v1.0.0",
    "[System] Type /help to see available commands or /tp to navigate."
  ]);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { playClick, playItemPop, playLevelUp } = useSound();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/" && !isOpen) {
        e.preventDefault();
        onClose(); // Inverted or toggle
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim();
    if (!cmd) return;

    playClick(1000);
    setHistory((prev) => [...prev, `> ${cmd}`]);
    setInputVal("");

    const lower = cmd.toLowerCase();

    if (lower === "/clear") {
      setHistory(["[System] Console cleared."]);
      return;
    }

    if (lower.startsWith("/tp ")) {
      const target = lower.replace("/tp ", "").trim();
      const el = document.getElementById(target);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        setHistory((prev) => [...prev, `[Server] Teleported Player to section [${target}]!`]);
        playLevelUp();
        onClose();
      } else {
        setHistory((prev) => [
          ...prev,
          `[Error] Unknown destination '${target}'. Available: hero, about, skills, strengths, experience, projects, certifications, dsa, contact`
        ]);
      }
      return;
    }

    if (lower === "/give diamond") {
      confetti({
        particleCount: 50,
        spread: 60,
        colors: ["#4deeea", "#55ff55", "#f9a825"]
      });
      playLevelUp();
    }

    const matched = EASTER_EGG_COMMANDS.find((c) => c.command.toLowerCase() === lower);
    if (matched) {
      setHistory((prev) => [...prev, matched.response]);
    } else {
      setHistory((prev) => [
        ...prev,
        `[Unknown Command] '${cmd}'. Type /help for command list.`
      ]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm select-none">
      <div className="relative max-w-xl w-full mc-panel bg-[#160f24] border-4 border-purple-600 p-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-purple-800 pb-3 mb-4">
          <div className="flex items-center gap-2 text-purple-300 font-pixel text-2xl">
            <Terminal className="w-5 h-5 text-mc-diamond" />
            <span>COMMAND BLOCK CONSOLE</span>
          </div>
          <button
            onClick={() => {
              playClick(600);
              onClose();
            }}
            className="p-1.5 bg-black/40 border border-mc-border hover:border-red-400 text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Output Console Log */}
        <div className="bg-[#0b0812] border-2 border-purple-950 p-3 h-52 overflow-y-auto mb-4 font-mono text-xs text-slate-300 space-y-1">
          {history.map((line, idx) => (
            <div
              key={idx}
              className={
                line.startsWith(">")
                  ? "text-mc-gold font-bold"
                  : line.startsWith("[Error]")
                  ? "text-red-400"
                  : line.startsWith("[Server]")
                  ? "text-mc-emerald"
                  : "text-slate-300"
              }
            >
              {line}
            </div>
          ))}
        </div>

        {/* Command Input Form */}
        <form onSubmit={handleCommand} className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Enter command (e.g. /help, /give diamond, /tp projects)"
            className="flex-1 bg-black/60 border-2 border-purple-800 px-3 py-2 text-white font-mono text-xs outline-none focus:border-mc-diamond"
          />
          <button
            type="submit"
            className="mc-button mc-button-primary text-sm px-4 py-2 flex items-center gap-1"
          >
            <Send className="w-4 h-4" />
            <span>EXECUTE</span>
          </button>
        </form>
      </div>
    </div>
  );
};
