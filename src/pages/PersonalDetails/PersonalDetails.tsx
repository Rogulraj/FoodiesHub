import React from "react";

//components
import CustomHelmet from "@components/Elements/CustomHelmet/CustomHelmet";
import MaxWidthLayout from "@components/Layouts/MaxWidthLayout/MaxWidthLayout";

import defaultStyle from "./PersonalDetails.module.css";
import DefaultTitle from "@components/Elements/DefaultTitle/DefaultTitle";

const PersonalDetails = (): React.ReactElement => {
  return (
    <MaxWidthLayout>
      <div className={defaultStyle.main_layout}>
        <CustomHelmet title="Personal Details" />
        <div className={defaultStyle.sub_layout}>
          <DefaultTitle />
        </div>
      </div>
    </MaxWidthLayout>
  );
};

export default PersonalDetails;
