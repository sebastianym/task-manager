import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bgPrimary: "#F0F0F2",
        bgSecondary: "#FFFFFF",
        buttonPrimary: "#478CCF",
        textPrimary: "#B249F8",
        textSecondary: "#FF72E1 ",
      },
    },
  },
  plugins: [],
};
export default config;
