//package
import React, { useCallback } from "react";

//css
import defaultStyle from "./RestaurantCard.module.css";

//icons
import { RiShoppingBag3Line } from "react-icons/ri";
import { FiClock } from "react-icons/fi";
import { BsDot } from "react-icons/bs";

//constants
import colorTheme from "@constants/colorTheme";

//assets
import burgerIcon from "@assets/burger_icon.png";
import pizzaIcon from "@assets/pizza_icon.png";
import veganIcon from "@assets/vegan_icon.png";
import dessertsIcon from "@assets/desserts_icon.png";

//types
export interface RestaurantCardTagsType {
  tagsType: "Pizza" | "Burger" | "Vegan" | "Desserts";
}

export interface RestaurantCardPropsType {
  imageUrl: string;
  title: string;
  deliveryDuration: string;
  minOrderVal: string;
  tags: RestaurantCardTagsType["tagsType"][];
}

//React Element
const RestaurantCard = ({
  deliveryDuration,
  imageUrl,
  minOrderVal,
  tags,
  title,
}: RestaurantCardPropsType): React.ReactElement => {
  const findTag = useCallback((val: RestaurantCardTagsType["tagsType"]) => {
    switch (val) {
      case "Pizza":
        return pizzaIcon;

      case "Burger":
        return burgerIcon;

      case "Vegan":
        return veganIcon;

      case "Desserts":
        return dessertsIcon;

      default:
        return "";
    }
  }, []);

  return (
    <div className={defaultStyle.main_layout}>
      <div className={defaultStyle.image_card}>
        <img
          src={imageUrl}
          alt="restaurant"
          className={defaultStyle.image_style}
        />
      </div>
      <div className={defaultStyle.details_card}>
        <div className={defaultStyle.title_card}>
          <h4 className={defaultStyle.title_text}>{title}</h4>
          <RiShoppingBag3Line size={20} color={colorTheme.primary_border} />
        </div>
        <div className={defaultStyle.duration_card}>
          <FiClock size={15} color={colorTheme.primary_border} />
          <p className={defaultStyle.duration_text}>{deliveryDuration}</p>
          <BsDot />
          <p className={defaultStyle.min_order_text}>{minOrderVal}</p>
        </div>
        <ul className={defaultStyle.tag_card}>
          {tags.map((item, _index) => (
            <li key={_index} className={defaultStyle.tag_item}>
              <img
                src={findTag(item)}
                alt="tag"
                className={defaultStyle.tag_icon}
              />
              <p className={defaultStyle.tag_text}>{item}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RestaurantCard;
