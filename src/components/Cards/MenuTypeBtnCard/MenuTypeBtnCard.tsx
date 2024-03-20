import React from "react";

//css
import defaultStyle from "./MenuTypeBtnCard.module.css";

//icons
import { FaCirclePlus } from "react-icons/fa6";
import colorTheme from "@constants/colorTheme";

export interface MenuTypeBtnCardPropsType {
  title: string;
}

const MenuTypeBtnCard = ({
  title,
}: MenuTypeBtnCardPropsType): React.ReactElement => {
  return (
    <div className={defaultStyle.main_layout}>
      <FaCirclePlus size={25} fill={colorTheme.primary_border} />
      <h4 className={defaultStyle.title}>{title}</h4>
    </div>
  );
};

export default MenuTypeBtnCard;
