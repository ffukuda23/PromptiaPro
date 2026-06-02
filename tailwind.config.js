/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
      },
      colors: {
        bg: '#0A0A0F',
        bg2: '#111118',
        surface: '#1C1C28',
        surface2: '#242435',
        accent: '#7C6FF7',
        accent2: '#A99DF8',
        gold: '#E8C96B',
        muted: '#8E8DA8',
        subtle: '#5A596E',
      },
    },
  },
  plugins: [],
}
