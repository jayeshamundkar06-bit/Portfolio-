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
        primary: "#0a0f18",
        secondary: "#0f172a",
        accent: "#38bdf8",
        textLight: "#f8fafc",
        textMuted: "#94a3b8"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "JetBrains Mono", "monospace"]
      }
    },
  },
  plugins: [],
};
export default config;