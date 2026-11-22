/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './pages/**/*.js', './assets/js/**/*.js'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        surface: 'var(--surface)',
        'surface-elevated': 'var(--surface-elevated)',
        'surface-hover': 'var(--surface-hover)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-muted': 'var(--text-muted)',
        border: 'var(--border)',
        'border-strong': 'var(--border-strong)',
        primary: 'var(--primary)',
        'primary-hover': 'var(--primary-hover)',
        secondary: 'var(--secondary)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};
