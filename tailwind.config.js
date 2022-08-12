/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'audio-play': "url('/src/assets/audio-play.svg')",
      }
    },
  },
  plugins: [],
}
