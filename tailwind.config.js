/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
        shadowPrimary: 'var(--shadow-primary)',
        shadowSecondary: 'var(--shadow-secondary)',
      },
      fontSize: {
        '9': '9px',
        '11': '11px',
      },
      letterSpacing: {
        '3': '3px',
      },
      lineHeight: {
        '38': '38px',
        '6.2': '6.2px',
      },
      borderWidth: {
        '5': '5px',
      },
      translate: {
        '-full': '-100%',
        'full': '100%',
      },
      clipPath: {
        'one': 'polygon(0 2%, 100% 2%, 100% 95%, 95% 95%, 95% 90%, 85% 90%, 85% 95%, 8% 95%, 0 70%)',
        'two': 'polygon(0 78%, 100% 78%, 100% 100%, 95% 100%, 95% 90%, 85% 90%, 85% 100%, 8% 100%, 0 78%)',
        'three': 'polygon(0 44%, 100% 44%, 100% 54%, 95% 54%, 95% 54%, 85% 54%, 85% 54%, 8% 54%, 0 54%)',
        'four': 'polygon(0 0, 100% 0, 100% 0, 95% 0, 95% 0, 85% 0, 85% 0, 8% 0, 0 0)',
        'five': 'polygon(0 0, 100% 0, 100% 0, 95% 0, 95% 0, 85% 0, 85% 0, 8% 0, 0 0)',
        'six': 'polygon(0 40%, 100% 40%, 100% 85%, 95% 85%, 95% 85%, 85% 85%, 85% 85%, 8% 85%, 0 70%)',
        'seven': 'polygon(0 63%, 100% 63%, 100% 80%, 95% 80%, 95% 80%, 85% 80%, 85% 80%, 8% 80%, 0 70%)',
      },
      animation: {
        glitch: 'glitch 2s infinite',
        glitchChecked: 'glitch 5s infinite',
      },
    },
  },
  plugins: [],
}

