/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cyber-black': '#0a0a0a',
        'cyber-gray': '#1a1a1a',
        'cyber-green': '#00ff9d',
        'cyber-red': '#ff0055',
        'cyber-blue': '#00d0ff',
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'monospace'], // Suggestion, though we might need to rely on system fonts or import one
      },
      animation: {
        'caret-blink': 'blink 1s step-end infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        }
      }
    },
  },
  plugins: [],
}
