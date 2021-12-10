module.exports = {
  purge: ["./public/**/*.html", "./src/**/*.vue"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      flex: {
        2: "2 2 0%",
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
