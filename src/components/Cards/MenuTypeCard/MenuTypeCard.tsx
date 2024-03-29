//packages
import React, { useState } from "react";

//css
import defaultStyle from "./MenuTypeCard.module.css";
import { AiOutlineDelete } from "react-icons/ai";
import colorTheme from "@constants/colorTheme";
import WarningModal from "@components/Modal/WarningModal/WarningModal";
import { useRemoveMenuCategaoryMutation } from "../../../services/restaurant.service";
import { toast } from "react-toastify";

//types
export interface MenuTypeCardPropsType {
  categoryId: string;
  title: string;
  subText: string;
  isSelected: boolean;
  handleReFetch?: () => Promise<void>;
}

const MenuTypeCard = ({
  title,
  subText,
  isSelected,
  categoryId,
  handleReFetch,
}: MenuTypeCardPropsType): React.ReactElement => {
  const [isDeleteModal, setIsDeleteModal] = useState<boolean>(false);

  /** rtk query */
  const [
    RemoveMenuCategory,
    { data: removeData, error: removeError, isError: removeIsError },
  ] = useRemoveMenuCategaoryMutation();

  const closeModal = () => {
    setIsDeleteModal(false);
  };

  const handleSure = async () => {
    try {
      await RemoveMenuCategory({ categoryId });
      if (handleReFetch) await handleReFetch();
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  console.log(removeData);

  return (
    <div
      className={`${defaultStyle.main_layout} ${
        isSelected && defaultStyle.selected
      }`}>
      <div className={defaultStyle.title_delete_btn_card}>
        <h4 className={defaultStyle.title}>{title}</h4>
        <AiOutlineDelete
          size={20}
          color={colorTheme.light_white}
          onClick={() => setIsDeleteModal(true)}
        />
      </div>
      <p className={defaultStyle.item_text}>{subText}</p>

      <WarningModal
        description="Are you sure?"
        isOpen={isDeleteModal}
        closeModal={closeModal}
        handleSure={handleSure}
        handleCancle={closeModal}
      />
    </div>
  );
};

export default MenuTypeCard;
