import React from "react";

import defaultStyle from "./CartMenuItemCard.module.css";
import { AiOutlineDelete } from "react-icons/ai";
import colorTheme from "@constants/colorTheme";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useAppDispatch } from "../../../redux/store/store";
import { cartSliceActions } from "../../../redux/features/cart.slice";

export interface CartMenuItemCardProps {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  description: string;
  imageUrl: string;
  category: string;
}

const CartMenuItemCard = ({
  _id,
  description,
  imageUrl,
  name,
  price,
  quantity,
  category,
}: CartMenuItemCardProps): React.ReactElement => {
  const dispatch = useAppDispatch();

  const addToCart = () => {
    dispatch(
      cartSliceActions.addToCart({
        _id,
        name,
        price,
        imageUrl,
        category,
        description,
        quantity,
      })
    );
  };

  const removeFromCart = () => {
    dispatch(cartSliceActions.removeFromCart({ id: _id }));
  };

  return (
    <div className={defaultStyle.main_layout}>
      <div className={defaultStyle.image_details_card}>
        <img src={imageUrl} alt="food" className={defaultStyle.image_style} />
        <div className={defaultStyle.details_card}>
          <h4 className={defaultStyle.food_name}>{name}</h4>
          <p className={defaultStyle.food_description}>{description}</p>
        </div>
      </div>
      <div className={defaultStyle.price_quantity_card}>
        <div className={defaultStyle.quantity_card}>
          <button
            type="button"
            className={defaultStyle.quantity_btn}
            onClick={removeFromCart}>
            <FaMinus size={12} color={colorTheme.black} />
          </button>
          <p>{quantity}</p>
          <button
            type="button"
            className={defaultStyle.quantity_btn}
            onClick={addToCart}>
            <FaPlus size={12} color={colorTheme.black} />
          </button>
        </div>
        <div className={defaultStyle.price_card}>
          <h4 className={defaultStyle.price_text}>${price}</h4>
          <AiOutlineDelete size={20} color={colorTheme.light_white} />
        </div>
      </div>
    </div>
  );
};

export default CartMenuItemCard;
