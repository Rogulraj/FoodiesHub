import PrimaryHeader from "@components/Headers/PrimaryHeader/PrimaryHeader";
import MaxWidthLayout from "@components/Layouts/MaxWidthLayout/MaxWidthLayout";
import React from "react";

import defaultStyle from "./Home.module.css";
import DealPoster from "@components/Cards/DealPoster/DealPoster";

import cupCake from "@assets/cup_cake.png";
import burger from "@assets/burger.png";
import colorTheme from "@constants/colorTheme";

const Home = (): React.ReactElement => {
  return (
    <>
      <PrimaryHeader />
      <MaxWidthLayout>
        <div className={defaultStyle.main_layout}>
          <div className={defaultStyle.dual_heading}>
            <h4 className={defaultStyle.dual_main_text}>Hottest deals</h4>
            <h5 className={defaultStyle.dual_sub_text}>All Deals</h5>
          </div>
          <div className={defaultStyle.deal_poster_card}>
            <DealPoster
              title="All deserts"
              subTitle="Deserty"
              offerText="20% OFF"
              imageUrl={cupCake}
            />
            <DealPoster
              title="Big Burger"
              subTitle="Foodies"
              offerText="50% OFF"
              imageUrl={burger}
              mainStyle={{ backgroundColor: colorTheme.third_card_bg }}
              offerTextStyle={{ color: colorTheme.third_accent }}
            />
          </div>
        </div>
      </MaxWidthLayout>
    </>
  );
};

export default Home;
