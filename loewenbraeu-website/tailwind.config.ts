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
        bg:        "#06080F",
        surface:   "#0C1020",
        surface2:  "#121829",
        navy:      "#1A2B5C",
        gold:      "#B8891F",
        "gold-lt": "#D4A840",
        cream:     "#EDE9DF",
        muted:     "#5A6580",
        border:    "#1A2240",
      },
    },
  },
  plugins: [],
};
export default config;
