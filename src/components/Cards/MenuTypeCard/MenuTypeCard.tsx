//packages
import React from "react";

//css
import defaultStyle from "./MenuTypeCard.module.css";

//types
export interface MenuTypeCardPropsType {
  title: string;
  subText: string;
  isSelected: boolean;
}

const MenuTypeCard = ({
  title,
  subText,
  isSelected,
}: MenuTypeCardPropsType): React.ReactElement => {
  return (
    <div
      className={`${defaultStyle.main_layout} ${
        isSelected && defaultStyle.selected
      }`}>
      <h4 className={defaultStyle.title}>{title}</h4>
      <p className={defaultStyle.item_text}>{subText}</p>
    </div>
  );
};

export default MenuTypeCard;
