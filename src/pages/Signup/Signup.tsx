import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

//css
import defaultStyle from "./Signup.module.css";

//components
import CustomHelmet from "@components/Elements/CustomHelmet/CustomHelmet";
import MaxWidthLayout from "@components/Layouts/MaxWidthLayout/MaxWidthLayout";
import DefaultTitle from "@components/Elements/DefaultTitle/DefaultTitle";
import TimelineBar from "@components/Elements/TimelineBar/TimelineBar";

//icons
import { RiShoppingBag3Line } from "react-icons/ri";
import colorTheme from "@constants/colorTheme";
import CustomButton from "@components/Elements/CustomButton/CustomButton";

//constants
import authTimelineList from "@constants/authTimeline";
import routePaths from "@constants/routePaths";

//types
export interface SignupAccountType {
  accountType: "personal" | "restaurant" | null;
}

const Signup = (): React.ReactElement => {
  const [accountType, setAccountType] =
    useState<SignupAccountType["accountType"]>(null);

  const navigate = useNavigate();

  function handleContinue() {
    switch (accountType) {
      case "personal":
        navigate(routePaths.personalDetails);
        break;

      default:
        navigate(routePaths.signup);
        break;
    }
  }

  return (
    <MaxWidthLayout>
      <div className={defaultStyle.main_layout}>
        <CustomHelmet title="Sign up" />
        <div className={defaultStyle.sub_layout}>
          <DefaultTitle />
          <div className={defaultStyle.timeline_card}>
            <TimelineBar
              timelineList={authTimelineList}
              currentTimeline={authTimelineList[0].title}
            />
          </div>
          <div>
            <h1 className={defaultStyle.title}>Sign up</h1>
            <p className={defaultStyle.paragraph}>
              Register to create your restaurant or personal account.
            </p>
          </div>
          <div className={defaultStyle.account_type_card}>
            <div
              className={defaultStyle.account_card}
              onClick={() => setAccountType("personal")}>
              <div className={defaultStyle.account_icon_card}>
                <RiShoppingBag3Line size={25} fill={colorTheme.white} />
              </div>
              <div className={defaultStyle.account_detail_card}>
                <h5 className={defaultStyle.account_title}>Personal</h5>
                <p className={defaultStyle.account_paragraph}>
                  Keep your order in one place
                </p>
              </div>
            </div>
          </div>
          <div className={defaultStyle.continue_button_card}>
            <CustomButton
              variant="primary"
              type="button"
              title="Continue"
              onClick={handleContinue}
            />
          </div>
          <div className={defaultStyle.bottom_text_card}>
            <p className={defaultStyle.bottom_text}>
              Already have an account? <span>Login</span>
            </p>
          </div>
        </div>
      </div>
    </MaxWidthLayout>
  );
};

export default Signup;
