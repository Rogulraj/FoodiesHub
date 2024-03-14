//package
import React from "react";

//css
import defaultStyle from "./Home.module.css";

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
import res1 from "@assets/restaurant/restaurant_1.jpg";
import cupCake from "@assets/cup_cake.png";
import burger from "@assets/burger.png";

//types
import { RestaurantCardPropsType } from "@components/Cards/RestaurantCard/RestaurantCard";

const list: RestaurantCardPropsType[] = [
  {
    deliveryDuration: "30-40 min",
    imageUrl: res1,
    minOrderVal: "$32 min order",
    tags: ["Pizza", "Burger"],
    title: "Royal Spicy House",
  },
  {
    deliveryDuration: "30-40 min",
    imageUrl: res1,
    minOrderVal: "$32 min order",
    tags: ["Pizza"],
    title: "Royal Spicy House",
  },
  {
    deliveryDuration: "30-40 min",
    imageUrl: res1,
    minOrderVal: "$32 min order",
    tags: ["Vegan"],
    title: "Royal Spicy House",
  },
  {
    deliveryDuration: "30-40 min",
    imageUrl: res1,
    minOrderVal: "$32 min order",
    tags: ["Desserts", "Vegan"],
    title: "Royal Spicy House",
  },
];

//React Element
const Home = (): React.ReactElement => {
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
            <div className={defaultStyle.restaurant_card}>
              {list.map((item, _index) => (
                <RestaurantCard {...item} key={_index} />
              ))}
            </div>
          </div>
        </div>
      </MaxWidthLayout>
    </>
  );
};

export default Home;
