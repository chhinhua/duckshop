/** @type {import('tailwindcss').Config} */

export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        fontFamily: {
            sans: ['Graphik', 'sans-serif'],
            serif: ['Merriweather', 'serif'],
        },
        extend: {
            backgroundColor: {
                header: 'white',
                footer: '#787A91',
            },
            spacing: {
                120: '30rem',
                128: '32rem',
                140: '35rem',
                144: '36rem',
            },
            darkSelector: '.dark-mode',
        },
    },
    plugins: [],
};
