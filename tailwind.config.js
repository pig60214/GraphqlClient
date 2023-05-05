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
      fontSize: {
        '18xl': '16rem',
      },
      backgroundColor: {
        'yellow-green': '#6bb949',
      },
      boxShadow: {
        'around': '0 0 8px rgba(0, 0, 0, 0.3)',
      },
      keyframes: {
        show: {
          'from': { opacity: 0 },
          'to': { opacity: 1 },
        }
       },
      animation: {
        'show': 'show 2s linear forwards',
      }
    },
  },
  plugins: [],
  purge: ["./src/**/*.{vue,js,ts,jsx,tsx}"],
}