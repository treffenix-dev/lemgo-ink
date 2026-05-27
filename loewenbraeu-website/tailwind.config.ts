import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-cormorant)", "Georgia", "serif"],
        sans:    ["var(--font-inter)", "sans-serif"],
      },
      colors: {
        bg:        "rgb(var(--color-bg) / <alpha-value>)",
        surface:   "rgb(var(--color-surface) / <alpha-value>)",
        surface2:  "rgb(var(--color-surface2) / <alpha-value>)",
        navy:      "rgb(var(--color-navy) / <alpha-value>)",
        gold:      "rgb(var(--color-gold) / <alpha-value>)",
        "gold-lt": "rgb(var(--color-gold-lt) / <alpha-value>)",
        cream:     "rgb(var(--color-cream) / <alpha-value>)",
        muted:     "rgb(var(--color-muted) / <alpha-value>)",
        border:    "rgb(var(--color-border) / <alpha-value>)",
      },
    },
  },
  plugins: [],
};
export default config;
