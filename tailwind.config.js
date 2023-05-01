module.exports = {
  prefix: 'tw-',
  content: [
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      rotate: {
        '40': '40deg',     // used by July
        '105': '105deg',   // used by Jun., Sep.
        '-105': '-105deg', // used by Aug.
      },
    },
  },
  plugins: [],
  purge: ["./src/**/*.{vue,js,ts,jsx,tsx}"],
}