/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"], // Tailwind を適用するファイルを指定
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")], // daisyUI を追加
};
