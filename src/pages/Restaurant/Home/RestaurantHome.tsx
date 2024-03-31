//packages
import React from "react";

//css
import defaultStyle from "./RestaurantHome.module.css";

//components
import MaxWidthLayout from "@components/Layouts/MaxWidthLayout/MaxWidthLayout";
import PrimaryHeader from "@components/Headers/PrimaryHeader/PrimaryHeader";
import CustomHelmet from "@components/Elements/CustomHelmet/CustomHelmet";
import RestaurantMenu from "../Menu/RestaurantMenu";
import SecondaryHeader from "@components/Headers/SecondaryHeader/SecondaryHeader";

//React Element
const RestaurantHome = (): React.ReactElement => {
  return (
    <>
      <CustomHelmet title="Home" />
      <SecondaryHeader />
      <MaxWidthLayout>
        <div className={defaultStyle.main_layout}>
          <RestaurantMenu />
        </div>
      </MaxWidthLayout>
    </>
  );
};

export default RestaurantHome;
