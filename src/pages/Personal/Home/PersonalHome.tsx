//package
import React, { useEffect } from "react";

//css
import defaultStyle from "./PersonalHome.module.css";

//components
import PrimaryHeader from "@components/Headers/PrimaryHeader/PrimaryHeader";
import MaxWidthLayout from "@components/Layouts/MaxWidthLayout/MaxWidthLayout";
import DealPosterCard from "@components/Cards/DealPoster/DealPosterCard";
import categoryList from "@constants/category";
import CategoryCard from "@components/Cards/CategoryCard/CategoryCard";
import RestaurantCard from "@components/Cards/RestaurantCard/RestaurantCard";
import CustomHelmet from "@components/Elements/CustomHelmet/CustomHelmet";

//constants
import colorTheme from "@constants/colorTheme";

//assets
import cupCake from "@assets/cup_cake.png";
import burger from "@assets/burger.png";

//types
import { useGetAllRestaurantsQuery } from "../../../services/restaurant.service";
import { useNavigate } from "react-router-dom";
import routePaths from "@constants/routePaths";
import { GetCookies } from "@helper/cookies.helper";
import { useGetPersonalUserDetailsByIdQuery } from "../../../services/personalUserDetails.service";
import { toast } from "react-toastify";
import { userDetailsActions } from "../../../redux/features/userDetails.slice";
import { useAppDispatch } from "../../../redux/store/store";

//React Element
const PersonalHome = (): React.ReactElement => {
  const userId: string = GetCookies("personalId");

  console.log(userId);

  const { data: userDetailsData, isError: isUserDetailsError } =
    useGetPersonalUserDetailsByIdQuery({ userId });

  const { data: restaurantData, isError: isRestaurantError } =
    useGetAllRestaurantsQuery("");

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (userDetailsData?.statusCode === 200) {
      dispatch(
        userDetailsActions.handleData({
          name: userDetailsData.data.firstName,
          imageUrl: userDetailsData.data.imageUrl,
        })
      );
    } else if (isUserDetailsError) {
      toast.error("Something went wrong!");
    }
  }, [userDetailsData, isUserDetailsError]);

  return (
    <>
      <CustomHelmet title="Home" />
      <PrimaryHeader />
      <MaxWidthLayout>
        <div className={defaultStyle.main_layout}>
          <div className={defaultStyle.dual_heading}>
            <h4 className={defaultStyle.dual_main_text}>Hottest deals</h4>
            <h5 className={defaultStyle.dual_sub_text}>All Deals</h5>
          </div>
          <div className={defaultStyle.deal_poster_card}>
            <DealPosterCard
              title="All deserts"
              subTitle="Deserty"
              offerText="20% OFF"
              imageUrl={cupCake}
            />
            <DealPosterCard
              title="Big Burger"
              subTitle="Foodies"
              offerText="50% OFF"
              imageUrl={burger}
              mainStyle={{ backgroundColor: colorTheme.third_card_bg }}
              offerTextStyle={{ color: colorTheme.third_accent }}
            />
          </div>
          <div className={defaultStyle.category_card}>
            {categoryList.map((item, _index) => (
              <CategoryCard
                key={_index}
                title={item.title}
                imageUrl={item.imageUrl}
              />
            ))}
          </div>
          <div className={defaultStyle.dual_heading}>
            <h4 className={defaultStyle.dual_main_text}>Nearby restaurants</h4>
            <h5 className={defaultStyle.dual_sub_text}>All Restaurant</h5>
          </div>
          <div className={defaultStyle.restaurant_layout}>
            <ul className={defaultStyle.restaurant_card}>
              {restaurantData?.data.map((item, _index) => (
                <li
                  key={_index}
                  onClick={() =>
                    navigate(`${routePaths.personalRestaurant}/${item._id}`)
                  }>
                  <RestaurantCard
                    name={item.name}
                    imageUrl={item.imageUrl}
                    deliveryDuration={item.deliveryDuration}
                    minOrderVal={item.minOrderVal}
                    tags={item.tags}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </MaxWidthLayout>
    </>
  );
};

export default PersonalHome;
