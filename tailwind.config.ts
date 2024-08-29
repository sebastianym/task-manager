import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        name: "dark",
        colorBg: "#252525",
        colorBg2: "#212121",
        colorBg3: "#181818",
        colorDanger: "#fe6854",
        colorPrimary: "#7263F3",
        colorPrimary2: "#705DF2",
        colorGrey0: "#f8f8f8",
        colorGrey1: "#dbe1e8",
        colorGrey2: "#b2becd",
        colorGrey3: "#6c7983",
        colorWhite: "#fff",
        colorPrimaryGreen: "#6FCF97",
        colorPrimaryGreenGrad:
          "linear-gradient(91deg,#F56693 0,#6FCF97 90.46%)",
        buttonGradient1:
          "linear-gradient(110.42deg, rgba(107, 190, 146, 0.1) 29.2%, rgba(245, 102, 146, 0.1) 63.56%)",
        buttonGradient2:
          "linear-gradient(110.42deg, rgba(25, 151, 222, 0.1) 29.2%, rgba(168, 85, 247, 0.1) 63.56%)",
        buttonGradient3:
          "linear-gradient(110.42deg, rgba(25, 151, 222, 0.1) 29.2%, rgba(168, 85, 247, 0.1) 63.56%)",
        buttonGradient4:
          "linear-gradient(110.42deg, rgba(168, 85, 247, 0.1) 29.2%, rgba(245, 102, 146, 0.1) 63.56%)",
        buttonGradient5:
          "linear-gradient(110.42deg, rgba(25, 151, 222, 0.1) 29.2%, rgba(168, 85, 247, 0.1) 63.56%)",
        buttonGradient6:
          "linear-gradient(110.42deg, rgba(25, 151, 222, 0.1) 29.2%, rgba(168, 85, 247, 0.1) 63.56%)",
        buttonGradient7:
          "linear-gradient(110.42deg, rgba(41, 25, 222, 0.1) 29.2%, rgba(235, 87, 87, 0.1) 63.56%)",
        buttonGradient8:
          "linear-gradient(110.42deg, rgba(25, 151, 222, 0.1) 29.2%, rgba(168, 85, 247, 0.1) 63.56%)",
        buttonGradient9:
          "linear-gradient(110.42deg, rgba(226, 195, 33, 0.1) 29.2%, rgba(247, 104, 85, 0.1) 63.56%)",
        buttonGradient10:
          "linear-gradient(110.42deg, rgba(235, 87, 87, 0.1) 29.2%, rgba(189, 68, 166, 0.1) 53.82%, rgba(247, 85, 143, 0.1) 63.56%)",
        buttonGradient11:
          "linear-gradient(110.42deg, rgba(25, 151, 222, 0.1) 29.2%, rgba(168, 85, 247, 0.1) 63.56%)",
        buttonGradient12:
          "linear-gradient(110.42deg, rgba(226, 195, 33, 0.1) 29.2%, rgba(247, 104, 85, 0.1) 63.56%)",
        buttonGradient13:
          "linear-gradient(110.42deg, rgba(226, 195, 33, 0.1) 29.2%, rgba(99, 3, 255, 0.1) 63.56%)",
        buttonGradient14:
          "linear-gradient(110.42deg, rgba(41, 25, 222, 0.1) 29.2%, rgba(235, 87, 87, 0.1) 63.56%)",
        shadow1: "4px 4px 84px rgba(16, 10, 86, 0.04)",
        shadow2: "0px 48px 77px rgba(8, 18, 69, 0.07)",
        shadow3: "0 14px 40px rgb(0 0 0 / 25%)",
        colorIcons: "rgba(249,249,249, 0.35)",
        colorIcons2: "rgba(249,249,249, 0.75)",
        colorIcons3: "rgba(249,249,249, 0.08)",
      },
    },
  },
  plugins: [],
};
export default config;
