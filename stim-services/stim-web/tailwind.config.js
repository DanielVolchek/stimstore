/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        // generated from coolor: https://coolors.co/8ed081-b4d2ba-dce2aa-b57f50-4b543b
        pistachio: "#8ED081",
        celadon: "#B4D2BA",
        alabaster: "#F3F0E2",
        copper: "#B57F50",
        ebony: "#4B543B",
      },
    },
  },
  plugins: [],
};
