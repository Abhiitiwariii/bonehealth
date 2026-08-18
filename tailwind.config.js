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
        bronzeGlow: "0 8px 24px -6px rgba(180, 83, 9, 0.5)",
        silverGlow: "0 8px 24px -6px rgba(100, 116, 139, 0.45)",
        goldGlow: "0 8px 28px -6px rgba(217, 119, 6, 0.55)",
        platinumGlow: "0 8px 28px -6px rgba(14, 165, 233, 0.5)",
        diamondGlow: "0 10px 32px -6px rgba(192, 38, 211, 0.55)",
        cardLift: "0 2px 8px -2px rgba(46, 42, 38, 0.08), 0 12px 28px -10px rgba(46, 42, 38, 0.16)",
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
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        shine: {
          "0%": { transform: "translateX(-120%) skewX(-20deg)" },
          "60%": { transform: "translateX(220%) skewX(-20deg)" },
          "100%": { transform: "translateX(220%) skewX(-20deg)" },
        },
        ringPulse: {
          "0%, 100%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.04)", opacity: "0.85" },
        },
        coinPop: {
          "0%": { transform: "scale(0.6) translateY(6px)", opacity: "0" },
          "60%": { transform: "scale(1.08) translateY(-2px)", opacity: "1" },
          "100%": { transform: "scale(1) translateY(0)", opacity: "1" },
        },
        confettiFall: {
          "0%": { transform: "translateY(-10%) rotate(0deg)", opacity: "1" },
          "100%": { transform: "translateY(320%) rotate(340deg)", opacity: "0" },
        },
        floatUp: {
          "0%": { opacity: "0", transform: "translateY(10px) scale(0.98)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        badgeUnlock: {
          "0%": { transform: "scale(0.7) rotate(-8deg)", opacity: "0" },
          "70%": { transform: "scale(1.12) rotate(4deg)", opacity: "1" },
          "100%": { transform: "scale(1) rotate(0deg)", opacity: "1" },
        },
      },
      animation: {
        "fade-in": "fadeIn 0.45s ease-out both",
        "pop-in": "popIn 0.25s ease-out both",
        shimmer: "shimmer 2.6s linear infinite",
        shine: "shine 2.8s ease-in-out infinite",
        "ring-pulse": "ringPulse 2.4s ease-in-out infinite",
        "coin-pop": "coinPop 0.5s cubic-bezier(0.34,1.56,0.64,1) both",
        "confetti-fall": "confettiFall 1.6s ease-in forwards",
        "float-up": "floatUp 0.4s ease-out both",
        "badge-unlock": "badgeUnlock 0.5s cubic-bezier(0.34,1.56,0.64,1) both",
      },
    },
  },
  plugins: [],
};
