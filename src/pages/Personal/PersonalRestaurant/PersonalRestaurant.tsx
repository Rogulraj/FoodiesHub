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

const PersonalRestaurant = () => {
  const { id: restaurantId } = useParams();

  const { data: restaurantData, error: restaurantError } =
    useGetRestaurantByIdQuery({ id: restaurantId as string });

  const navigate = useNavigate();

  console.log(restaurantData?.data, restaurantError);
  // console.log(restaurantId);

  // useEffect(() => {
  //   if (restaurantData?.statusCode === 200) {
  //     const menuTypeLength = Object.keys(
  //       restaurantData?.data?.menuType as object
  //     ).length;
  //     if (menuTypeLength > 0) {
  //       Object.entries(restaurantData?.data.menuType as object).forEach(
  //         (item) => console.log(item)
  //       );
  //     }
  //   }
  // }, [restaurantData]);

  return (
    <>
      <CustomHelmet title="Restaurant" />
      <PrimaryHeader />
      <MaxWidthLayout>
        <div className={defaultStyle.main_layout}>
          <div className={defaultStyle.profile_card}>
            <div className={defaultStyle.profile_image_card}>
              <img
                src={pic}
                alt="profile"
                className={defaultStyle.profile_image_style}
              />
            </div>
            <div className={defaultStyle.profile_details_card}>
              <h3 className={defaultStyle.restaurant_name}>
                Royal Spicy House
              </h3>
            </div>
          </div>
          {restaurantData?.data?.menuType &&
            Object.keys(restaurantData?.data?.menuType).length > 0 &&
            Object.entries(restaurantData?.data?.menuType as object).map(
              (item, _index) => (
                <div key={_index}>
                  <h3 className={defaultStyle.menu_title}>{item[0]}</h3>
                  {item[1].map((menu: MenuItemsType, _index: string) => (
                    <div
                      onClick={() =>
                        navigate(
                          `${routePaths.personalFood}/${menu._id}?restaurantId=${restaurantData.data._id}&category=${item[0]}`
                        )
                      }
                      key={_index}>
                      <RestaurantMenuCard
                        description={menu.description as string}
                        name={menu.name as string}
                        price={menu.price as string}
                        imageUrl={menu.imageUrl as string}
                      />
                    </div>
                  ))}
                </div>
              )
            )}
          {/* {restaurantData?.data.menuType ? (
            <div className={defaultStyle.menu_card}>
              {restaurantData?.data.menuType.map((item, _index) => (
                <RestaurantMenuCard key={_index} />
              ))}
            </div>
          ) : (
            <h5>Something went wrong</h5>
          )} */}
        </div>
      </MaxWidthLayout>
    </>
  );
};

export default PersonalRestaurant;
