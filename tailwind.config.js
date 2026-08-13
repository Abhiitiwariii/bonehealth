/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./lib/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#FDF6EC",
        sand: "#F6E9D8",
        clay: "#C1543A",
        marigold: "#E8A33D",
        maroon: "#8A3A3A",
        sage: "#5F8161",
        ink: "#2E2A26",
        primary: "#2563EB",
        "primary-dark": "#1D4ED8",
        surface: "#FAFAFA",
      },
      fontSize: {
        base: "1.125rem",
        lg: "1.25rem",
        xl: "1.4rem",
        "2xl": "1.75rem",
        "3xl": "2.1rem",
        card: "1.375rem",
      },
      fontFamily: {
        display: ["var(--font-display)", "var(--font-dev)", "sans-serif"],
        sans: ["var(--font-body)", "var(--font-dev)", "sans-serif"],
      },
      boxShadow: {
        soft: "0 4px 20px -4px rgba(46, 42, 38, 0.12)",
        glow: "0 8px 30px -6px rgba(193, 84, 58, 0.35)",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(6px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        popIn: {
          "0%": { opacity: "0", transform: "scale(0.92)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        "fade-in": "fadeIn 0.45s ease-out both",
        "pop-in": "popIn 0.25s ease-out both",
      },
    },
  },
  plugins: [],
};
