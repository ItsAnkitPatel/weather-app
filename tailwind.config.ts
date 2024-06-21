import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        flashing: {
          "0%, 100%": { opacity: "0.2" },
          "20%": { opacity: "1" },
        },
        stretch: {
          '0%, 100%': { transform: 'scaleX(1)' },
          '50%': { transform: 'scaleX(1.2)' },
        }
      },
      animation: {
        flashing: "flashing 1.4s infinite linear",
        stretch: 'stretch 2s infinite',
      },
    },
  },
  plugins: [require("tailwind-merge")],
};
export default config;
