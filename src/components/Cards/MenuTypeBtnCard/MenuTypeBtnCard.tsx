import React from "react";

//css
import defaultStyle from "./MenuTypeBtnCard.module.css";

//icons
import { FaCirclePlus } from "react-icons/fa6";
import colorTheme from "@constants/colorTheme";
import { ModalType } from "@pages/Restaurant/Menu/RestaurantMenu";

export interface MenuTypeBtnCardPropsType {
  title: string;
  openModal: (type: ModalType["type"]) => void;
  modalType: ModalType["type"];
}

const MenuTypeBtnCard = ({
  title,
  openModal,
  modalType,
}: MenuTypeBtnCardPropsType): React.ReactElement => {
  return (
    <div
      className={defaultStyle.main_layout}
      onClick={() => openModal(modalType)}>
      <FaCirclePlus size={25} fill={colorTheme.primary_border} />
      <h4 className={defaultStyle.title}>{title}</h4>
    </div>
  );
};

export default MenuTypeBtnCard;
