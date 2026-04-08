/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'neon-green': '#39ff14',
        'neon-pink': '#ff073a',
        'neon-blue': '#00d4ff',
        'neon-purple': '#bf00ff',
        'cyber-dark': '#0a0a0a',
        'cyber-gray': '#1a1a1a',
        'cyber-light': '#2a2a2a',
        'vice-orange': '#ff6b35',
        'vice-purple': '#7209b7',
        'vice-pink': '#f72585',
        'midnight': '#0f0f23',
        'gold': '#ffd700',
      },
      fontFamily: {
        'cyber': ['Orbitron', 'monospace'],
        'display': ['Bebas Neue', 'Impact', 'sans-serif'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
        'mono': ['JetBrains Mono', 'Courier New', 'monospace'],
      },
      animation: {
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite alternate',
        'float': 'float 3s ease-in-out infinite',
        'neon-flicker': 'neon-flicker 1.5s infinite alternate',
        'slide-up': 'slide-up 0.8s ease-out forwards',
        'fade-in': 'fade-in 1s ease-out forwards',
        'text-glow': 'text-glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        'glow-pulse': {
          '0%': { boxShadow: '0 0 5px #39ff14, 0 0 10px #39ff14, 0 0 15px #39ff14' },
          '100%': { boxShadow: '0 0 10px #39ff14, 0 0 20px #39ff14, 0 0 30px #39ff14' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'neon-flicker': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.8 },
        },
        'slide-up': {
          '0%': { transform: 'translateY(100px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        'fade-in': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        'text-glow': {
          '0%': { textShadow: '0 0 5px #39ff14, 0 0 10px #39ff14' },
          '100%': { textShadow: '0 0 10px #39ff14, 0 0 20px #39ff14, 0 0 30px #39ff14' },
        },
      },
      backgroundImage: {
        'cyber-grid': "linear-gradient(rgba(57, 255, 20, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(57, 255, 20, 0.1) 1px, transparent 1px)",
        'neon-gradient': 'linear-gradient(45deg, #ff073a, #bf00ff, #00d4ff, #39ff14)',
        'vice-gradient': 'linear-gradient(135deg, #7209b7, #f72585, #ff6b35)',
        'dark-gradient': 'linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 100%)',
      },
      backgroundSize: {
        'grid': '50px 50px',
      },
      backdropBlur: {
        'cyber': '10px',
      },
    },
  },
  plugins: [],
}
