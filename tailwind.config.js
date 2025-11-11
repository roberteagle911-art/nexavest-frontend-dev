/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: "#00E5FF",
        dark: "#0A0A12"
      },
      fontFamily: {
        display: ['Poppins', 'sans-serif']
      }
    }
  },
  plugins: []
}
