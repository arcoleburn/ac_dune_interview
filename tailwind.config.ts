// tailwind.config.ts
export default {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
      ],
    theme: {
      extend: {
        keyframes: {
          flash: {
            '0%': { backgroundColor: 'white' },
            '100%': { backgroundColor: 'transparent' },
          },
        },
        animation: {
          flash: 'flash 1s ease-in-out',
        },
      },
    },
    plugins: [],

  };