//packages
import React, { useEffect, useState } from "react";

//css
import defaultStyle from "./MenuItemCard.module.css";

//assets
import pic from "@assets/restaurant/restaurant_1.jpg";

//icons
import { FiEdit2 } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import colorTheme from "@constants/colorTheme";
import { MenuCategoryItems } from "../../../models/restaurant.model";
import ModifyMealForm from "@components/Form/ModifyMealForm/ModifyMealForm";
import WarningModal from "@components/Modal/WarningModal/WarningModal";
import { useRemoveFoodByIdMutation } from "../../../services/restaurant.service";
import { GetCookies } from "@helper/cookies.helper";
import { toast } from "react-toastify";

interface MenuItemCardProps extends MenuCategoryItems {
  categoryId: string;
  refetch?: () => Promise<void>;
}

const MenuItemCard = ({
  description,
  imageUrl,
  ingredients,
  name,
  nutritions,
  price,
  categoryId,
  _id,
  refetch,
}: MenuItemCardProps): React.ReactElement => {
  const [isModal, setIsModal] = useState<boolean>(false);
  const [isDeleteModal, setDeleteModal] = useState<boolean>(false);

  const [DeleteFood, { data: deletedData, isError: isDeletedError }] =
    useRemoveFoodByIdMutation();

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const restaurantId: string = GetCookies("restaurantId");

  console.log("delete", deletedData, isDeletedError);

  const closeDeleteModalHandler = () => {
    setDeleteModal(false);
  };

  const closeModal = () => {
    setIsModal(false);
  };

  const deleteFoodHandler = async () => {
    await DeleteFood({ foodId: _id as string, restaurantId, categoryId });
  };

  useEffect(() => {
    if (deletedData?.statusCode === 200) {
      toast.success("Food deleted!");
      if (refetch) {
        refetch()
          .then((val) => val)
          .catch(() => toast.warning("Re-fresh the page"));
      }
    } else if (isDeletedError) {
      toast.error("Food not deleted!");
    }
  }, [deletedData, isDeletedError]);

  return (
    <div className={defaultStyle.main_layout}>
      <div className={defaultStyle.card_1}>
        <div className={defaultStyle.image_details_card}>
          <img className={defaultStyle.food_image} src={imageUrl} alt="food" />
          <div className={defaultStyle.food_name_desc_card}>
            <h4 className={defaultStyle.food_name}>{name}</h4>
            <p className={defaultStyle.food_description}>{description}</p>
          </div>
        </div>
        <div className={defaultStyle.food_price_edit_card}>
          <h4 className={defaultStyle.food_price}>${price}</h4>
          <div className={defaultStyle.edit_btn_card}>
            <FiEdit2
              size={20}
              color={colorTheme.light_white}
              onClick={() => setIsModal(true)}
            />
            <AiOutlineDelete
              size={20}
              color={colorTheme.light_white}
              onClick={() => setDeleteModal(true)}
            />
          </div>
        </div>
      </div>

      <div className={defaultStyle.card_2}>
        <div className={defaultStyle.ingredients_card}>
          <h4 className={defaultStyle.ingredients_title}>Ingredients</h4>
          <p className={defaultStyle.ingredients_description}>{ingredients}</p>
        </div>
        <div className={defaultStyle.nutrition_card}>
          <h4 className={defaultStyle.ingredients_title}>Nutritional Value</h4>
          <p className={defaultStyle.ingredients_description}>{nutritions}</p>
        </div>
      </div>
      <ModifyMealForm
        closeModal={closeModal}
        isModal={isModal}
        refetch={refetch}
        foodItem={{
          _id,
          description,
          imageUrl,
          ingredients,
          name,
          nutritions,
          price,
          categoryId,
        }}
      />
      <WarningModal
        isOpen={isDeleteModal}
        closeModal={closeDeleteModalHandler}
        description="Are you going to delete the food?"
        handleSure={deleteFoodHandler}
        handleCancle={closeDeleteModalHandler}
      />
    </div>
  );
};

export default MenuItemCard;
