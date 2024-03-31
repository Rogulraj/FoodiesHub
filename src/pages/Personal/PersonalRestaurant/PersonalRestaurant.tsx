import CustomHelmet from "@components/Elements/CustomHelmet/CustomHelmet";
import PrimaryHeader from "@components/Headers/PrimaryHeader/PrimaryHeader";
import MaxWidthLayout from "@components/Layouts/MaxWidthLayout/MaxWidthLayout";
import React, { useEffect } from "react";

import defaultStyle from "./PersonalRestaurant.module.css";

import pic from "@assets/restaurant/restaurant_1.jpg";
import RestaurantMenuCard from "@components/Cards/RestaurantMenuCard/RestaurantMenuCard";
import { useGetRestaurantByIdQuery } from "../../../services/restaurant.service";
import { useNavigate, useParams } from "react-router-dom";
import { MenuItemsType } from "src/models/restaurant.model";
import routePaths from "@constants/routePaths";
import { RiShoppingCartLine } from "react-icons/ri";
import colorTheme from "@constants/colorTheme";
import { FiClock } from "react-icons/fi";
import { BsDot } from "react-icons/bs";
import { IoChevronBack } from "react-icons/io5";

const PersonalRestaurant = () => {
  const { id: restaurantId } = useParams();

  const { data: restaurantData, error: restaurantError } =
    useGetRestaurantByIdQuery({ id: restaurantId as string });

  const navigate = useNavigate();

  console.log(restaurantData?.data, restaurantError);

  return (
    <>
      <CustomHelmet title="Restaurant" />
      <PrimaryHeader />
      <MaxWidthLayout>
        <div className={defaultStyle.main_layout}>
          <div
            className={defaultStyle.back_btn_card}
            onClick={() => navigate(-1)}>
            <IoChevronBack
              color={colorTheme.light_black_200}
              className={defaultStyle.back_icon}
            />
            <p className={defaultStyle.back_btn_text}>Home</p>
          </div>
          <div className={defaultStyle.profile_card}>
            <div className={defaultStyle.profile_image_card}>
              <img
                src={restaurantData?.data.imageUrl}
                alt="profile"
                className={defaultStyle.profile_image_style}
              />
            </div>
            <div className={defaultStyle.profile_details_card}>
              <h3 className={defaultStyle.restaurant_name}>
                {restaurantData?.data.name}
              </h3>
              <div className={defaultStyle.duration_card}>
                <FiClock size={15} color={colorTheme.primary_border} />
                <p className={defaultStyle.duration_text}>
                  {restaurantData?.data?.deliveryDuration}
                </p>
                <BsDot />
                <p
                  className={
                    defaultStyle.min_order_text
                  }>{`$${restaurantData?.data?.minOrderVal} min order`}</p>
              </div>
            </div>
          </div>

          {restaurantData?.data?.menu ? (
            <div className={defaultStyle.menu_card}>
              {restaurantData?.data.menu.map((item, _index) => (
                <div key={_index}>
                  <h4 className={defaultStyle.menu_name}>{item.category}</h4>
                  <div className={defaultStyle.menu_card_list}>
                    {item?.items.length > 0 ? (
                      item?.items.map((food, foodIndex) => (
                        <div
                          key={foodIndex}
                          onClick={() =>
                            navigate(
                              `${routePaths.personalFood}/${food._id}?restaurantId=${restaurantData?.data?._id}&category=${item.category}`
                            )
                          }>
                          <RestaurantMenuCard
                            description={food.description}
                            imageUrl={food.imageUrl}
                            name={food.name}
                            price={food.price}
                          />
                        </div>
                      ))
                    ) : (
                      <div className={defaultStyle.empty_menu_card}>
                        <RiShoppingCartLine
                          size={25}
                          color={colorTheme.primary_accent}
                        />
                        <h3 className={defaultStyle.empty_menu_text}>
                          Menu is Empty
                        </h3>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <h5>Something went wrong</h5>
          )}
        </div>
      </MaxWidthLayout>
    </>
  );
};

export default PersonalRestaurant;
