/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'neon-blue': '#00f3ff',
                'neon-purple': '#bc13fe',
                'deep-bg': '#050b14',
                'glass-panel': 'rgba(16, 24, 39, 0.7)',
                'alert-red': '#ff2a6d',
                'success-green': '#05ff00',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                mono: ['Fira Code', 'monospace'],
            },
            animation: {
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'spin-slow': 'spin 8s linear infinite',
            },
            boxShadow: {
                'neon': '0 0 10px rgba(0, 243, 255, 0.5), 0 0 20px rgba(0, 243, 255, 0.3)',
                'neon-red': '0 0 10px rgba(255, 42, 109, 0.5), 0 0 20px rgba(255, 42, 109, 0.3)',
            },
        },
    },
    plugins: [],
}
