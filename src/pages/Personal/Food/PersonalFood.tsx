import React from "react";
import defaultStyle from "./PersonalFood.module.css";
import PrimaryHeader from "@components/Headers/PrimaryHeader/PrimaryHeader";
import MaxWidthLayout from "@components/Layouts/MaxWidthLayout/MaxWidthLayout";
import CustomHelmet from "@components/Elements/CustomHelmet/CustomHelmet";

import { IoChevronBack } from "react-icons/io5";
import { FaMinus, FaPlus } from "react-icons/fa6";
import colorTheme from "@constants/colorTheme";

import pic from "@assets/restaurant/restaurant_1.jpg";
import CustomButton from "@components/Elements/CustomButton/CustomButton";
import { useLocation, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/store/store";
import { cartSliceActions } from "../../../redux/features/cart.slice";
import { useGetFoodByIdQuery } from "../../../services/restaurant.service";

const PersonalFood = (): React.ReactElement => {
  const { id: foodId } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // Get individual query parameters
  const restaurantId: string = queryParams.get("restaurantId");
  const category: string = queryParams.get("category");

  const { data: foodData, error: foodError } = useGetFoodByIdQuery({
    foodId,
    restaurantId,
    category,
  });

  const dispatch = useAppDispatch();
  const { cartList } = useAppSelector((state) => state.cart);

  const addToCart = () => {
    dispatch(
      cartSliceActions.addToCart({
        _id: "1",
        category: "breakfast",
        name: "dosa",
        price: 102,
        quantity: 1,
      })
    );
  };

  const removeFromCart = () => {
    dispatch(cartSliceActions.removeFromCart({ id: "1" }));
  };

  return (
    <>
      <CustomHelmet title="Restaurant" />
      <PrimaryHeader />
      <MaxWidthLayout>
        <div className={defaultStyle.main_layout}>
          <div className={defaultStyle.back_btn_card}>
            <IoChevronBack color={colorTheme.light_black_200} size={20} />
            <p className={defaultStyle.back_btn_text}>Royal spicy</p>
          </div>
          <div className={defaultStyle.image_card}>
            <img
              src={foodData?.data?.imageUrl}
              alt="food"
              className={defaultStyle.image_style}
            />
          </div>
          <h1 className={defaultStyle.food_name}>{foodData?.data?.name}</h1>
          <p className={defaultStyle.food_paragraph}>
            {foodData?.data?.description}
          </p>
          <div className={defaultStyle.price_cart_card}>
            <div className={defaultStyle.price_card}>
              <h3 className={defaultStyle.price_text}>
                ${foodData?.data?.price}
              </h3>
            </div>
            <div className={defaultStyle.cart_card}>
              <div className={defaultStyle.cart_count_card}>
                <button
                  type="button"
                  className={defaultStyle.cart_count_btn}
                  onClick={removeFromCart}>
                  <FaMinus size={12} color={colorTheme.black} />
                </button>
                <p>1</p>
                <button
                  type="button"
                  className={defaultStyle.cart_count_btn}
                  onClick={addToCart}>
                  <FaPlus size={12} color={colorTheme.black} />
                </button>
              </div>
              <button type="button" className={defaultStyle.add_cart_btn}>
                Add to cart <FaPlus size={12} color={colorTheme.white} />
              </button>
            </div>
          </div>
          <div>
            <div className={defaultStyle.ingredients_card}>
              <h3 className={defaultStyle.ingredients_title}>Ingredients</h3>
              <p className={defaultStyle.ingredients_paragraph}>
                {foodData?.data?.ingredients}
              </p>
            </div>
            <div className={defaultStyle.nutrition_card}>
              <h3 className={defaultStyle.ingredients_title}>Nutritions</h3>
              <p className={defaultStyle.ingredients_paragraph}>
                {foodData?.data?.nutritions}
              </p>
            </div>
          </div>
        </div>
      </MaxWidthLayout>
    </>
  );
};

export default PersonalFood;
