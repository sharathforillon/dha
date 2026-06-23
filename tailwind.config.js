/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#0F6CBD',
          secondary: '#0078D4',
          accent: '#EAF4FF',
          dark: '#0E5BA8',
          deeper: '#063866',
        },
        surface: {
          DEFAULT: '#F8FAFC',
          card: '#FFFFFF',
          hover: '#F1F5F9',
          active: '#EAF4FF',
        },
        border: {
          DEFAULT: '#E2E8F0',
          light: '#F1F5F9',
          medium: '#CBD5E1',
        },
        text: {
          primary: '#0F172A',
          secondary: '#475569',
          muted: '#94A3B8',
          inverse: '#FFFFFF',
        },
        status: {
          approved: '#107C10',
          'approved-bg': '#F0FAF0',
          conditions: '#9E5A00',
          'conditions-bg': '#FFF4E0',
          remediation: '#C13515',
          'remediation-bg': '#FEF2F0',
          rejected: '#D13438',
          'rejected-bg': '#FBEAEA',
          review: '#0078D4',
          'review-bg': '#EAF4FF',
        },
        severity: {
          critical: '#D13438',
          'critical-bg': '#FBEAEA',
          high: '#C13515',
          'high-bg': '#FEF2F0',
          medium: '#9E5A00',
          'medium-bg': '#FFF4E0',
          low: '#107C10',
          'low-bg': '#F0FAF0',
        },
      },
      fontFamily: {
        sans: ['IBM Plex Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['IBM Plex Mono', 'Fira Code', 'monospace'],
      },
      fontSize: {
        'display': ['2rem', { lineHeight: '1.2', fontWeight: '700', letterSpacing: '-0.02em' }],
        'headline': ['1.5rem', { lineHeight: '1.3', fontWeight: '600', letterSpacing: '-0.01em' }],
        'title': ['1.125rem', { lineHeight: '1.4', fontWeight: '600' }],
        'label-lg': ['0.875rem', { lineHeight: '1.4', fontWeight: '600', letterSpacing: '0.04em' }],
        'label': ['0.8125rem', { lineHeight: '1.4', fontWeight: '500', letterSpacing: '0.02em' }],
        'caption': ['0.75rem', { lineHeight: '1.4', fontWeight: '400' }],
      },
      boxShadow: {
        'xs': '0 1px 2px 0 rgb(0 0 0 / 0.04)',
        'card': '0 1px 3px 0 rgb(0 0 0 / 0.06), 0 1px 2px -1px rgb(0 0 0 / 0.04)',
        'card-md': '0 4px 8px -1px rgb(0 0 0 / 0.08), 0 2px 4px -2px rgb(0 0 0 / 0.05)',
        'card-hover': '0 8px 20px -3px rgb(0 0 0 / 0.10), 0 3px 8px -3px rgb(0 0 0 / 0.06)',
        'panel': '0 20px 60px -10px rgb(0 0 0 / 0.18), 0 8px 20px -5px rgb(0 0 0 / 0.10)',
        'inset': 'inset 0 2px 4px 0 rgb(0 0 0 / 0.04)',
      },
      borderRadius: {
        'card': '8px',
        'pill': '100px',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-soft': 'pulseSoft 2s infinite',
        'count-up': 'countUp 1s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(8px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
      },
    },
  },
  plugins: [],
}
