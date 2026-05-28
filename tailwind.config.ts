import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#2aa3b5",
          50: "#f0fafb",
          100: "#d9f2f5",
          200: "#b3e5eb",
          300: "#7dd0da",
          400: "#3fb8ca",
          500: "#2aa3b5",
          600: "#1f7f8e",
          700: "#1d6573",
          800: "#1d5260",
          900: "#1d3d4a",
          950: "#0f2530",
        },
        mint: {
          50: "#f2faf7",
          100: "#e5f5ef",
          200: "#c8eadd",
          300: "#9dd8c2",
          400: "#6abfa0",
          500: "#46a381",
        },
        teal: {
          DEFAULT: "#2aa3b5",
          50: "#f0fafb",
          100: "#d9f2f5",
          400: "#3fb8ca",
          500: "#2aa3b5",
          600: "#1f7f8e",
          700: "#1d6573",
        },
        dark: {
          DEFAULT: "#1d3d4a",
          50: "#f2f7f8",
          100: "#d9e8eb",
          500: "#1d3d4a",
          600: "#172f39",
          700: "#112129",
        },
        accent: "#b83575",
        navy: {
          950: "#040d1a",
          900: "#071428",
          800: "#0d1f3c",
        },
        crimson: {
          500: "#dc2626",
          400: "#ef4444",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        heading: ["var(--font-montserrat)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out forwards",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
