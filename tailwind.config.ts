import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/views/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/constants/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      malachite: {
        "50": "#e8fee7",
        "100": "#cafdca",
        "200": "#9cfa9e",
        "300": "#62f468",
        "400": "#33e83b",
        "500": "#15da22",
        "600": "#0ba518",
        "700": "#0e7d19",
        "800": "#11631a",
        "900": "#13541c",
        "950": "#052e0b",
      },
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
export default config;
