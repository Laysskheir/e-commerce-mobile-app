/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      // colors: {
      //   primary: "#2256f5",
      //   secondary: "#6B7280",
      //   accent: "#FFC107",
      //   gradient: {
      //     start: "#4285f4",
      //     end: "#025fff",
      //   },
      // },
      colors: {
        primary: "#1a1a1a",
        secondary: "#6B7280",
        accent: "#FFC107",
        gradient: {
          start: "#212121", 
          end: "#0a0a0a", 
        },
      },
      animation: {
        "line-shadow": "line-shadow 15s linear infinite",
      },
      keyframes: {
        "line-shadow": {
          "0%": { "background-position": "0 0" },
          "100%": { "background-position": "100% -100%" },
        },
      },
      spacing: {
        128: "32rem",
        144: "36rem",
      },
      borderRadius: {
        DEFAULT: '0.75rem',
        "4xl": "2rem",
      },
    },
  },
  plugins: [],
};
