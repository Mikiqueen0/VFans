/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./**/@material-tailwind/**/*.{html,js,ts,jsx,tsx,mdx}"
  ],
  mode: "jit",
  theme: {
    fontSize: {
      xs: ['12px', '16px'],
      sm: ['14px', '20px'],
      base: ['16px', '19.5px'],
      lg: ['18px', '21.94px'],
      xl: ['20px', '24.38px'],
      '2xl': ['24px', '29.26px'],
      '3xl': ['28px', '50px'],
      '4xl': ['48px', '58px'],
      '8xl': ['96px', '106px']
    },
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif']
      },
      colors: {
        'primary': "#262626",
        'lighter-primary': '#353535',
        "emerald-green": "#00BE85",
        "darkest-black": "#0F0F0F",
        "dark-field": "#111111",
        "dark-background": "#181818"
      },
      boxShadow: {
        '3xl': '0 10px 40px rgba(0, 0, 0, 0.1)'
      },
      screens: {
        "wide": "1440px"
      },
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-3px)' },
          '50%': { transform: 'translateX(3px)' },
          '75%': { transform: 'translateX(-3px)' },
        },
      },
      animation: {
        shake: 'shake 0.3s',
      },
    },
  },
  plugins: [
    // function ({addUtilities}) {
    //   const newUtilities = {
    //     ".scrollbar-thin" : {
    //       scrollbarWidth: "thin",
    //       scrollbarColor: "rgba(0, 0, 0, 0.2) rgba(0, 0, 0, 0.1)"
    //     },
    //     ".scrollbar-webkit": {
    //       "&::-webkit-scrollbar": {
    //         width: "8px"
    //         // height: "6px"
    //       },
    //       "&::-webkit-scrollbar-track": {
    //         background: "rgba(0, 0, 0, 0)"
    //       },
    //       "&::-webkit-scrollbar-thumb": {
    //         backgroundColor: "rgba(0, 0, 0, 0.2)"
    //         // borderRadius: "20px",
    //         // border: "1px solid white"
    //       }
    //     }
    //   }

    //   addUtilities(newUtilities, ['responsive', 'hover'])
    // }
    function ({ addUtilities }) {
      const newUtilities = {
        // Thin scrollbar
        ".scrollbar-thin": {
          scrollbarWidth: "thin", // Firefox
          scrollbarColor: "rgba(0, 0, 0, 0.2) rgba(0, 0, 0, 0.1)", // Firefox
          "&::-webkit-scrollbar": {
            width: "8px", // WebKit-based browsers
            height: "8px"
          },
          "&::-webkit-scrollbar-track": {
            background: "rgba(0, 0, 0, 0)" // WebKit-based browsers
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(0, 0, 0, 0.2)", // WebKit-based browsers
            borderRadius: "4px"
          }
        },
        // Hidden scrollbar
        ".scrollbar-none": {
          scrollbarWidth: "none", // Firefox
          "-ms-overflow-style": "none", // Internet Explorer 10+
          "&::-webkit-scrollbar": {
            display: "none" // WebKit-based browsers
          }
        }
      };

      addUtilities(newUtilities, ['responsive', 'hover']);
    }
  ]
}

