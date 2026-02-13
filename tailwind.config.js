/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
    },
    extend: {
      colors: {
        gacha: {
          gold: "#FCD34D", // Amber 300
          orange: "#F97316", // Orange 500
          red: "#EF4444", // Red 500
          brown: "#78350F", // Amber 900
          purple: "#7C3AED", // Violet 600
          cream: "#FEF3C7", // Amber 100
        },
      },
      backgroundImage: {
        'gacha-gradient': 'linear-gradient(to bottom, #FFFBEB, #FEF3C7, #FDE68A)', // Warm beige gradient
        'modal-gradient': 'linear-gradient(to bottom right, #A78BFA, #7C3AED)', // Purple gradient
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};