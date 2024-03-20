//packages
import React from "react";

//css
import defaultStyle from "./MenuItemCard.module.css";

//assets
import pic from "@assets/restaurant/restaurant_1.jpg";

//icons
import { FiEdit2 } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import colorTheme from "@constants/colorTheme";

const MenuItemCard = (): React.ReactElement => {
  return (
    <div className={defaultStyle.main_layout}>
      <div className={defaultStyle.card_1}>
        <div className={defaultStyle.image_details_card}>
          <img className={defaultStyle.food_image} src={pic} alt="food" />
          <div className={defaultStyle.food_name_desc_card}>
            <h4 className={defaultStyle.food_name}>Nigiri set</h4>
            <p className={defaultStyle.food_description}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </div>
        <div className={defaultStyle.food_price_edit_card}>
          <h4 className={defaultStyle.food_price}>$20.6</h4>
          <div className={defaultStyle.edit_btn_card}>
            <FiEdit2 size={20} color={colorTheme.light_white} />
            <AiOutlineDelete size={20} color={colorTheme.light_white} />
          </div>
        </div>
      </div>

      <div className={defaultStyle.card_2}>
        <div className={defaultStyle.ingredients_card}>
          <h4 className={defaultStyle.ingredients_title}>Ingredients</h4>
          <p className={defaultStyle.ingredients_description}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </div>
        <div className={defaultStyle.nutrition_card}>
          <h4 className={defaultStyle.ingredients_title}>Nutritional Value</h4>
          <p className={defaultStyle.ingredients_description}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MenuItemCard;
