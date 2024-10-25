import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        FlockBlue: "#6C93EC",
        FlockBlack: "#000308",
        FlockWhite: "#FFFFFF",
        FlockPink: "#E69FBD",
        FlockGreen: "#BDD4DA",
        FlockGrey: "#D9D9D9",
      },
      fontFamily: {
        sans: ["Gilroy", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
