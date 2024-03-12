import React, { CSSProperties } from "react";

//css
import defaultStyle from "./CustomButton.module.css";

//types
export interface CustomButtonPropsType {
  variant: "primary" | "secondary";
  title: string;
  onClick?: () => void;
  type: HTMLButtonElement["type"];
  style?: CSSProperties;
}

const CustomButton = ({
  variant,
  onClick,
  title,
  type,
  style,
}: CustomButtonPropsType): React.ReactElement => {
  const findClassName = (key: CustomButtonPropsType["variant"]) => {
    switch (key) {
      case "primary":
        return defaultStyle.primary_style;

      case "secondary":
        return defaultStyle.secondary_style;

      default:
        return defaultStyle.common_style;
    }
  };

  const dynamicClassName = findClassName(variant);

  return (
    <button
      onClick={onClick}
      style={style}
      type={type}
      className={`${defaultStyle.common_style} ${dynamicClassName}`}>
      {title}
    </button>
  );
};

export default CustomButton;
