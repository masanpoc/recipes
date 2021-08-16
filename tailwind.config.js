module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      gridTemplateColumns: {
        toggle: "repeat( auto-fill, minmax(80px, 1fr) )",
      },
      fontFamily: {
        lato: ["Lato"],
      },
      colors: {
        "grey-highlight": "#888888",
        "yellow-dessert": "#EDF5E1",
        "blue-atlantic": "#05386B",
        "green-forest": "#5CDB95",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
