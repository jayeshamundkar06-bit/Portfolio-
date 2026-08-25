import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        mc: {
          bg: "#0d0f12",
          dark: "#14171c",
          panel: "#1e222b",
          border: "#3a4150",
          highlight: "#5a657c",
          stone: "#7a8288",
          wood: "#8b5a2b",
          dirt: "#866043",
          grass: "#5b8c32",
          water: "#2b5d88",
          gold: "#f9a825",
          diamond: "#4deeea",
          emerald: "#55ff55",
          redstone: "#ff3333",
          amethyst: "#a855f7",
          obsidian: "#191024",
          portal: "#b026ff",
          text: "#e2e8f0",
          textMuted: "#94a3b8"
        }
      },
      fontFamily: {
        pixel: ["'VT323'", "'Press Start 2P'", "monospace"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"]
      },
      boxShadow: {
        mc: "inset -2px -2px 0px 0px #111418, inset 2px 2px 0px 0px #4d576a",
        "mc-pressed": "inset 2px 2px 0px 0px #111418, inset -2px -2px 0px 0px #4d576a",
        "mc-gold": "0 0 15px rgba(249, 168, 37, 0.4)",
        "mc-diamond": "0 0 20px rgba(77, 238, 234, 0.45)",
        "mc-portal": "0 0 25px rgba(176, 38, 255, 0.5)",
        "mc-emerald": "0 0 15px rgba(85, 255, 85, 0.4)",
      },
      animation: {
        "float-slow": "float 4s ease-in-out infinite",
        "pulse-glow": "pulseGlow 2.5s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite",
        "portal-swirl": "portalSwirl 10s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" }
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.7", filter: "drop-shadow(0 0 10px rgba(77, 238, 234, 0.4))" },
          "50%": { opacity: "1", filter: "drop-shadow(0 0 22px rgba(77, 238, 234, 0.8))" }
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" }
        },
        portalSwirl: {
          "0%": { transform: "rotate(0deg) scale(1)" },
          "50%": { transform: "rotate(180deg) scale(1.05)" },
          "100%": { transform: "rotate(360deg) scale(1)" }
        }
      }
    },
  },
  plugins: [],
};
export default config;
