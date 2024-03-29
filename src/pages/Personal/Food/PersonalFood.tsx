import React, { useMemo } from "react";
import defaultStyle from "./PersonalFood.module.css";
import PrimaryHeader from "@components/Headers/PrimaryHeader/PrimaryHeader";
import MaxWidthLayout from "@components/Layouts/MaxWidthLayout/MaxWidthLayout";
import CustomHelmet from "@components/Elements/CustomHelmet/CustomHelmet";

import { IoChevronBack } from "react-icons/io5";
import { FaMinus, FaPlus } from "react-icons/fa6";
import colorTheme from "@constants/colorTheme";

import pic from "@assets/restaurant/restaurant_1.jpg";
import CustomButton from "@components/Elements/CustomButton/CustomButton";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/store/store";
import {
  CartListItems,
  cartSliceActions,
} from "../../../redux/features/cart.slice";
import { useGetFoodByIdQuery } from "../../../services/restaurant.service";
import routePaths from "@constants/routePaths";

const PersonalFood = (): React.ReactElement => {
  const { id } = useParams();
  const foodId: string = id as string;
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // Get individual query parameters
  const restaurantId: string = queryParams.get("restaurantId");
  const categoryQuery: string = queryParams.get("category");

  const naviagte = useNavigate();

  const { data: foodData, error: foodError } = useGetFoodByIdQuery({
    foodId,
    restaurantId,
    category: categoryQuery,
  });
  console.log(foodData, foodError);

  const dispatch = useAppDispatch();
  const { cartList } = useAppSelector((state) => state.cart);

  const itemQuantity: number | undefined = useMemo(() => {
    const item = cartList.find((cart) => cart._id === foodId);
    return item?.quantity;
  }, [cartList]);

  const addToCart = () => {
    dispatch(
      cartSliceActions.addToCart({
        _id: foodData?.data?._id as string,
        category: categoryQuery,
        name: foodData?.data?.name as string,
        price: foodData?.data?.price as number,
        quantity: 1,
        imageUrl: foodData?.data?.imageUrl as string,
        description: foodData?.data?.description as string,
      })
    );
  };

  const removeFromCart = () => {
    dispatch(
      cartSliceActions.removeFromCart({ id: foodData?.data?._id as string })
    );
  };

  const cartBtnHandler = () => {
    addToCart();
    naviagte(routePaths.personalCart);
  };

  return (
    <>
      <CustomHelmet title="Restaurant" />
      <PrimaryHeader />
      <MaxWidthLayout>
        <div className={defaultStyle.main_layout}>
          <div
            className={defaultStyle.back_btn_card}
            onClick={() => naviagte(-1)}>
            <IoChevronBack
              color={colorTheme.light_black_200}
              className={defaultStyle.back_icon}
            />
            <p className={defaultStyle.back_btn_text}>Restaurant</p>
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
                  onClick={() => removeFromCart()}>
                  <FaMinus size={12} color={colorTheme.black} />
                </button>
                {itemQuantity ? (
                  <p className={defaultStyle.quantity_text}>{itemQuantity}</p>
                ) : (
                  <p className={defaultStyle.quantity_text}>{0}</p>
                )}
                <button
                  type="button"
                  className={defaultStyle.cart_count_btn}
                  onClick={() => addToCart()}>
                  <FaPlus size={12} color={colorTheme.black} />
                </button>
              </div>
              <button
                type="button"
                className={defaultStyle.add_cart_btn}
                onClick={cartBtnHandler}>
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
