/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./app/**/*.{js,ts,jsx,tsx}"],
  //just in time
  mode: "jit",
  // 深色模式
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#050816",
        tertiary: "rgba(253, 247, 247, 0.32)",
        "black-100": "#100d25",
        "black-200": "#090325",
        "blue-100": "rgba(9, 42, 154, 0.63)",
        "blue-200": "#092CA4",
        "white-100": "#f3f3f3",
        "white-50": "rgba(253, 247, 247, 0.60)",
        "yellow-50": "rgba(253, 246, 231, 0.32)",
      },
      textColor: {
        DEFAULT: "#1F2937",
        light: "#6c7581",
      },
      boxShadow: {
        card: "0px 35px 120px -15px #211e35",
      },
      screens: {
        //TODO:響應式斷點，手機、平板、筆電
        phone: "450px",
        // => @media (min-width: 450px) { ... }
        tablet: "768px",
        // => @media (min-width: 640px) { ... }
        laptop: "1024px",
        // => @media (min-width: 1024px) { ... }
      },
      backgroundImage: {
        "light-pattern": "url('/img/light_background.png')",
        "dark-pattern": "url('/img/dark_background.png')",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
