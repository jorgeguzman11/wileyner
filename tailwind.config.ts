import type { Config } from "tailwindcss";

/**
 * Design tokens — calm, clinical-but-warm.
 * Single accent (pine green) over warm neutral sand/stone.
 * Real typographic hierarchy: Fraunces (display) + Inter (body).
 */
const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/content/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Warm neutral base
        sand: {
          50: "#faf8f5",
          100: "#f3efe9",
          200: "#e8e1d7",
          300: "#d8cdbe",
          400: "#b8a992",
          500: "#94856d",
        },
        ink: {
          DEFAULT: "#2a2724",
          soft: "#57514a",
          muted: "#847c72",
        },
        // Single accent — pine
        accent: {
          50: "#eef4f1",
          100: "#d6e6de",
          200: "#a9cbbb",
          300: "#75ac95",
          400: "#4c8c73",
          500: "#2f6b5e", // primary accent
          600: "#255649",
          700: "#1e463c",
        },
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Fluid display sizes for real hierarchy
        "display-lg": ["clamp(2.5rem, 6vw, 4rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-md": ["clamp(2rem, 4.5vw, 3rem)", { lineHeight: "1.1", letterSpacing: "-0.015em" }],
        "display-sm": ["clamp(1.5rem, 3vw, 2rem)", { lineHeight: "1.15", letterSpacing: "-0.01em" }],
      },
      boxShadow: {
        // Contained, soft
        soft: "0 1px 2px rgba(42, 39, 36, 0.04), 0 4px 16px rgba(42, 39, 36, 0.05)",
        lift: "0 2px 4px rgba(42, 39, 36, 0.05), 0 8px 28px rgba(42, 39, 36, 0.08)",
      },
      borderRadius: {
        xl: "0.875rem",
        "2xl": "1.25rem",
      },
      maxWidth: {
        content: "72rem",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0", opacity: "0" },
          to: { height: "var(--radix-accordion-content-height)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
