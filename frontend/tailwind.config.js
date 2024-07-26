//@type {import('tailwindcss').Config}

//module.exports = {
//  content: [
//    "./index.html",
//    "./src/**/*.{vue,js,ts,jsx,tsx}",
//    '.node_modules/preline/*.js'
//  ],
//  theme: {
//    extend: {},
//  },
//  plugins: [
//    require('preline/plugin')
//  ],
//}

module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#14ace4",
      },
    },
  },
  plugins: [],
}