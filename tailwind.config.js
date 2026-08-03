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
        clay: "#B5654A",
        sage: "#6E8B6E",
        ink: "#2E2A26",
      },
      fontSize: {
        base: "1.05rem",
        lg: "1.2rem",
        xl: "1.4rem",
        "2xl": "1.75rem",
        "3xl": "2.1rem",
      },
    },
  },
  plugins: [],
};
