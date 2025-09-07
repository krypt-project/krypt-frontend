// tailwind.config.js
import typography from "@tailwindcss/typography"

/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,html}"],
  theme: {
    extend: {},
  },
  plugins: [typography()],
}

export default config