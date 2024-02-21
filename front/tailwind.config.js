/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "custom-primary": "#c1f1f4",
        "custom-secondary": "#21888e",
        "custom-tertiary": "#fff6ec",
      },
    }
  },
  plugins: [],
}

