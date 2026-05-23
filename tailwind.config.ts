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
        bg:          "#06050A",
        surface:     "#0F0E13",
        "surface-2": "#181620",
        gold:        "#C9A84C",
        "gold-light":"#E8C96A",
        "gold-dark": "#8B6B1E",
        cream:       "#EDE8DF",
        ivory:       "#F5F1EA",
        muted:       "#5A5660",
        border:      "#1E1C26",
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
