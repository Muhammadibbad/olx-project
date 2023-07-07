/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    "./src/**/*.{html, js, ts, vue}",
    "./src/**/*"
  ],
  theme: {
    // fontFamily:{
    //  "green-col":"#F7F8F8"
    // },
    fontSize: {
      '1.4rem': '23px', // Add your custom font size here
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        custom: ['Roboto,Helvetica', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
