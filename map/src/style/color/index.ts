let themeColors = Object.create(null);

const commonTheme = {
  rise: "#f00",
  fall: "#22bb22",
  theme: "#1875f0"
};

const darkTheme = {
  mainBg: "#323a4a;",
  sliderBg: "#001529",
  contentBg: "#151836",
  mainFontColor: "lightgrey"
};

const lightTheme = {
  mainBg: "#fff",
  sliderBg: "#fff",
  contentBg: "#f4f4f4",
  mainFontColor: "rgba(0, 0, 0, 0.85)"
};

let bgStatus = localStorage.getItem("bgStatus");

themeColors = bgStatus === "1" ? Object.assign(themeColors, commonTheme, darkTheme) : Object.assign(themeColors, commonTheme, lightTheme);

export {
  themeColors
};