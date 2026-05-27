import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    screens: {
      xs: "400px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        obsidian: "#0A0A0F",
        midnight: "#14141E",
        ember: { brown: "#3D241A", deep: "#1F140E" },
        covenant: { gold: "#D4AF37", bright: "#F4C542", dark: "#8B6914" },
        crimson: "#8B0000",
        parchment: { DEFAULT: "#F4E9D5", mute: "#C9BFAC" },
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "serif"],
        heading: ["var(--font-playfair)", "serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0) rotate(-1deg)" },
          "50%": { transform: "translateY(-12px) rotate(1deg)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        spinSlow: {
          to: { transform: "rotate(360deg)" },
        },
        scrollHint: {
          "0%": { transform: "scaleY(0)", opacity: "0", transformOrigin: "top" },
          "50%": { transform: "scaleY(1)", opacity: "1", transformOrigin: "top" },
          "100%": { transform: "scaleY(0)", opacity: "0", transformOrigin: "bottom" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
        spinSlow: "spinSlow 30s linear infinite",
        scrollHint: "scrollHint 2.2s ease-in-out infinite",
      },
      boxShadow: {
        molten: "inset 0 2px 0 rgba(255,240,180,0.65), inset 0 -2px 0 rgba(80,50,10,0.5), 0 8px 32px rgba(212,175,55,0.4), 0 2px 4px rgba(0,0,0,0.4)",
        moltenHover: "inset 0 2px 0 rgba(255,240,180,0.7), inset 0 -2px 0 rgba(80,50,10,0.5), 0 16px 48px rgba(212,175,55,0.55), 0 4px 8px rgba(0,0,0,0.4)",
        glass: "0 30px 60px -20px rgba(0,0,0,0.6), inset 0 1px 0 rgba(244,197,66,0.15)",
      },
    },
  },
  plugins: [],
};
export default config;
