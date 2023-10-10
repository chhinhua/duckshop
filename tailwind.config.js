/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    content: ['./src/**/*.{html,js}'],
    theme: {
        screens: {
            xs: '475px',
            ...defaultTheme.screens,
        },
        colors: {
            transparent: 'transparent',
            black: '#000',
            white: '#fff',
            gray: {
                100: '#f7fafc',
                900: '#1a202c',
            },
            ...defaultTheme.colors,
        },
        fontFamily: {
            sans: ['Graphik', 'sans-serif'],
            serif: ['Merriweather', 'serif'],
            ...defaultTheme.fontFamily,
        },
        extend: {
            backgroundColor: {
                header: 'white',
                footer: '#787A91',
            },
            spacing: {
                140: '35rem',
            },
        },
    },
    plugins: [],
};
