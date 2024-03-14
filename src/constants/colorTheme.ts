//packages
import { CSSProperties } from "react";

//types
interface ColorThemeType {
  black: string;
  white: string;
  light_black_200: string;
  primary_accent: string;
  secondary_accent: string;
  primary_border: string;
  secondary_border: string;
  primary_accent_border: string;
  third_accent: string;
  third_card_bg: string;
}

//theme
const colorTheme: ColorThemeType = {
  black: "#000000",
  white: "#ffffff",
  light_black_200: "#767676",
  primary_accent: "#404aff",
  secondary_accent: "#5e66ff",
  primary_border: "#cbcbcb",
  secondary_border: "#dddddd",
  primary_accent_border: "#404aff",
  third_accent: "#ffa500",
  third_card_bg: "#ff6f0014",
};

export default colorTheme;
