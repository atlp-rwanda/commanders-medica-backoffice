import type { Config } from "tailwindcss";

const primary = {
  50: "#eef5ff",
  100: "#e9f0ff",
  200: "#a7c4fe",
  300: "#7ca6fe",
  400: "#5089fd",
  500: "#246Bfd",
  600: "#1d55f3",
  700: "#1640df",
  800: "#1835b5",
  900: "#1a328e",
  950: "#152156",
};
const greyscale = {
  50: "#fafafa",
  100: "#f5f5f5",
  200: "#eeeeee",
  300: "#e0e0e0",
  400: "#bdbdbd",
  500: "#9e9e9e",
  600: "#757575",
  700: "#616161",
  800: "#424242",
  900: "#212121",
};

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary,
        greyscale,
        lightblue: "#246BFD",
        reducedblue: "#246BFD14",
        darkblue: "#3062C8",
        lightgrey: "#FAFAFA",
        grey: "#9E9E9E",
        white: "#FFFFFF",
        popup: "#09101D",
        whiteSmoke: "#F5F5F5",
        error: "#F75555",
        def: "#FFFFFF",
      },
      fontFamily: {
        sans: ["var(--font-urbanist)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
