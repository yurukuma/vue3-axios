module.exports = {
  purge: ["./public/**/*.html", "./src/**/*.vue"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    container: {
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      flex: {
        2: "2 2 0%",
      },
      minWidth: {
        8: "2rem",
      },
      minHeight: {
        8: "2rem",
      },
    },
  },
  variants: {
    extend: {
      borderWidth: ["first"],
      textColor: ["visited"],
    },
  },
  plugins: [],
};
