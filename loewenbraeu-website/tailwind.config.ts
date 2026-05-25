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
        sans:    ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-playfair)", "serif"],
      },
      colors: {
        bg:       "#0c0805",
        surface:  "#171009",
        surface2: "#211608",
        gold:     "#c9900a",
        "gold-lt":"#e8b040",
        cream:    "#f0e4cc",
        muted:    "#8a7a62",
        border:   "#2a1e0e",
      },
    },
  },
  plugins: [],
};
export default config;
