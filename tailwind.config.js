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
    },
  },
  plugins: [],
};
