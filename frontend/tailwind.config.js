// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: ["./src//*.{js,jsx,ts,tsx}"], // make sure to include src/ path
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// };

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",   // ✅ Vite: Include all TSX
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
