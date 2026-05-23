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
        bg:      "#000000",
        surface: "#111111",
        "surface-2": "#1A1A1A",
        gold:    "#D4AF37",
        "gold-light": "#F2D060",
        "gold-dark":  "#8B7220",
        cream:   "#F5F5F5",
        muted:   "#6b6b6b",
        border:  "#222222",
      },
      fontFamily: {
        display: ["var(--font-bebas)", "Bebas Neue", "sans-serif"],
        body:    ["var(--font-space)", "Space Grotesk", "sans-serif"],
        sans:    ["var(--font-inter)", "Inter", "sans-serif"],
      },
      animation: {
        "spin-slow":       "spin 24s linear infinite",
        "marquee":         "marquee 32s linear infinite",
        "marquee-reverse": "marqueeReverse 32s linear infinite",
        "gold-pulse":      "goldPulse 3s ease-in-out infinite",
        "fade-up":         "fadeUp 0.9s ease forwards",
      },
      keyframes: {
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%":   { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        marqueeReverse: {
          "0%":   { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
        goldPulse: {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%":      { opacity: "1",   transform: "scale(1.06)" },
        },
      },
      backgroundImage: {
        "gold-gradient":  "linear-gradient(135deg, #F2D060 0%, #D4AF37 50%, #8B7220 100%)",
        "gold-radial":    "radial-gradient(ellipse at center, rgba(212,175,55,0.25) 0%, transparent 65%)",
      },
    },
  },
  plugins: [],
};

export default config;
