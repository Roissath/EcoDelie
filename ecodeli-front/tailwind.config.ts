import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0070C0',    // Bleu EcoDeli
        secondary: '#28A745',  // Vert EcoDeli
        accent: '#00B894',     // Accent vert doux
        dark: '#121212',       // Pour dark mode
        light: '#F5F7FA',      // Fond clair
        text: '#1a1a1a',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
