import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/*/.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {},
    },
  },
  plugins: [],
};
export default config;
