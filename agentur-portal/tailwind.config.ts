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
        background:        "hsl(var(--background))",
        foreground:        "hsl(var(--foreground))",
        card:              "hsl(var(--card))",
        "card-foreground": "hsl(var(--card-foreground))",
        border:            "hsl(var(--border))",
        input:             "hsl(var(--input))",
        ring:              "hsl(var(--ring))",
        muted:             "hsl(var(--muted))",
        "muted-foreground":"hsl(var(--muted-foreground))",
        accent:            "hsl(var(--accent))",
        "accent-foreground":"hsl(var(--accent-foreground))",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in": {
          from: { opacity: "0", transform: "translateX(-16px)" },
          to:   { opacity: "1", transform: "translateX(0)" },
        },
      },
      animation: {
        "fade-in":  "fade-in 0.3s ease-out",
        "slide-in": "slide-in 0.3s ease-out",
      },
    },
  },
  plugins: [],
};

export default config;
