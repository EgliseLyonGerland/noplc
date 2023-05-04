import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: "'Roboto Condensed', sans-serif",
      },
    },
  },
  plugins: [daisyui],
  /** @type {typeof import('daisyui').config} */
  daisyui: {
    themes: ["night"],
  },
};
