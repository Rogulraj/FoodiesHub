import React from "react";

// icons
import { FaPlus } from "react-icons/fa6";

//css
import defaultStyle from "./RestaurantMenuCard.module.css";

import colorTheme from "@constants/colorTheme";

interface RestaurantMenuCardProps {
  name: string;
  imageUrl: string;
  description: string;
  price: string;
}

const RestaurantMenuCard = ({
  description,
  name,
  price,
  imageUrl,
}: RestaurantMenuCardProps) => {
  return (
    <div className={defaultStyle.main_layout}>
      <div className={defaultStyle.image_card}>
        <img src={imageUrl} alt="food" className={defaultStyle.image_style} />
      </div>
      <div className={defaultStyle.details_card}>
        <h4 className={defaultStyle.detail_title}>{name}</h4>
        <p className={defaultStyle.detail_paragraph}>{description}</p>
        <div className={defaultStyle.price_card}>
          <p className={defaultStyle.price}>${price}</p>
          <div className={defaultStyle.plus_icon_card}>
            <FaPlus size={15} color={colorTheme.primary_accent} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantMenuCard;
