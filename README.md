# React + TypeScript + Vite

# Install Tailwind CSS with Vite and Yarn

/_ Terminal _/
yarn create vite my-project
cd my-project

yarn add -D tailwindcss postcss autoprefixer
yarn tailwindcss init -p

/_ tailwind.config.js _/
/** @type {import('tailwindcss').Config} \*/
module.exports = {
content: [
"./index.html",
"./src/**/\*.{js,ts,jsx,tsx}",
],
theme: {
extend: {},
},
plugins: [],
}

/_ index.css _/
@tailwind base;
@tailwind components;
@tailwind utilities;

/_ Terminal _/
yarn dev

/_ Enjoy _/
