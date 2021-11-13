import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

let scale = width / 360;
scale = scale.toFixed(2);

export const COLORS = {
  // base colors
  primary: "#FC6D3F", // orange
  secondary: "#B11F24", // gray

  // colors
  black: "#1E1F20",
  white: "#FFFFFF",
  MainOrange: "#CD2F34",
  mainBlue: "#466AE8",
  mainYellow: "#F49C00",
  mainBackground: "#F6F8FB",
  mainRed: "#B11F24",
  mainRed2: "#FF5C62",
  mainRed3: "#D86217",
  mainTextGray: "#50525B",
  textGray: "#312D2C",
  mainGreen: "#0DD83A",
  boxGray: "#E8EAEF",
  focusColor: "#B11F24",
  unFocusColor: "#9799A0",

  borderGRey: "#DEE0E4",
  borderGRey1: "#BBBDC2",
  Grey: "#E5E5E5",
  Grey2: "#DEE0E4",
  MainGray: "#74767E",
  lightGray: "#F5F5F6",
  lightGray2: "#F6F6F7",
  lightGray3: "#EFEFF1",
  lightGray4: "#F8F8F9",
  transparent: "transparent",
  darkgray: "#898C95",
};

export const SIZES = {
  height: height,
  width: width,
  scale: scale,
};

export const FONTS = {
  mainFontBold: {
    fontFamily: "sans-serif",
    fontWeight: "bold",
  },
  mainFontLight: {
    fontFamily: "sans-serif",
  },
};

const appTheme = { COLORS, SIZES, FONTS };

export default appTheme;
