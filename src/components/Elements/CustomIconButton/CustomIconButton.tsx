import React, { CSSProperties } from "react";

import defaultStyle from "./CustomIconButton.module.css";
import { FaPlusCircle } from "react-icons/fa";
import colorTheme from "@constants/colorTheme";

interface CustomIconButtonProps {
  mainText: string;
  btnStyle?: CSSProperties;
  mainTextStyle?: CSSProperties;
}

const CustomIconButton = ({
  mainText,
  btnStyle,
  mainTextStyle,
}: CustomIconButtonProps): React.ReactElement => {
  return (
    <button type="button" className={defaultStyle.btn} style={btnStyle}>
      <FaPlusCircle size={20} color={colorTheme.white} />
      <h1 className={defaultStyle.btn_text} style={mainTextStyle}>
        {mainText}
      </h1>
    </button>
  );
};

export default CustomIconButton;
