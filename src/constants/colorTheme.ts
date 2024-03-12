import { CSSProperties } from "react";

interface ColorThemeType {
  black: string;
  white: string;
  light_black_200: string;
  primary_accent: string;
  secondary_accent: string;
  primary_border: string;
  secondary_border: string;
}

const colorTheme: ColorThemeType = {
  black: "#000000",
  white: "#ffffff",
  light_black_200: "#767676",
  primary_accent: "#404aff",
  secondary_accent: "#5e66ff",
  primary_border: "#cbcbcb",
  secondary_border: "#dddddd",
};

export default colorTheme;
