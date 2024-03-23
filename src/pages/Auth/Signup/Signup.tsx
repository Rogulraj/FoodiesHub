//packages
import React from "react";
import { useNavigate } from "react-router-dom";

//css
import defaultStyle from "./Signup.module.css";

//components
import CustomHelmet from "@components/Elements/CustomHelmet/CustomHelmet";
import MaxWidthLayout from "@components/Layouts/MaxWidthLayout/MaxWidthLayout";
import DefaultTitle from "@components/Elements/DefaultTitle/DefaultTitle";
import TimelineBar, {
  TimelineListType,
} from "@components/Elements/TimelineBar/TimelineBar";

//icons
import { RiShoppingBag3Line } from "react-icons/ri";
import colorTheme from "@constants/colorTheme";
import CustomButton from "@components/Elements/CustomButton/CustomButton";
import { FaRegUser } from "react-icons/fa";

//constants
import routePaths from "@constants/routePaths";
import { useAppDispatch, useAppSelector } from "../../../redux/store/store";

//redux
import { signupActions } from "../../../redux/features/signup.slice";
import { TimelineListFinder } from "@helper/timeline.helper";

//types
import { AccountType } from "@interfaces/accountType.interface";

//React Element
const Signup = (): React.ReactElement => {
  // const [accountType, setAccountType] =
  //   useState<AccountType["accountType"] | null>(null);

  const navigate = useNavigate();

  const { accountType } = useAppSelector((state) => state.signup);
  const dispatch = useAppDispatch();

  function handleAccountTypeDispatch(value: AccountType["accountType"]) {
    dispatch(signupActions.handleAccountType(value));
  }

  function handleContinue(value: AccountType["accountType"]) {
    switch (value) {
      case "personal":
        navigate(routePaths.personalDetails);
        break;

      case "restaurant":
        navigate(routePaths.personalDetails);
        break;

      default:
        navigate(routePaths.signup);
        break;
    }
  }

  const timelineList: TimelineListType[] = TimelineListFinder(accountType);

  return (
    <MaxWidthLayout>
      <div className={defaultStyle.main_layout}>
        <CustomHelmet title="Sign up" />
        <div className={defaultStyle.sub_layout}>
          <DefaultTitle />
          <div className={defaultStyle.timeline_card}>
            <TimelineBar
              timelineList={timelineList}
              currentTimeline={timelineList[0].title}
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
              className={`${defaultStyle.account_card} ${
                accountType === "personal" && defaultStyle.account_card_active
              }`}
              onClick={() => handleAccountTypeDispatch("personal")}>
              <div className={defaultStyle.account_icon_card}>
                <FaRegUser size={20} fill={colorTheme.white} />
              </div>
              <div className={defaultStyle.account_detail_card}>
                <h5 className={defaultStyle.account_title}>Personal</h5>
                <p className={defaultStyle.account_paragraph}>
                  Keep your order in one place
                </p>
              </div>
            </div>
            <div
              className={`${defaultStyle.account_card} ${
                accountType === "restaurant" && defaultStyle.account_card_active
              }`}
              onClick={() => handleAccountTypeDispatch("restaurant")}>
              <div className={defaultStyle.account_icon_card}>
                <RiShoppingBag3Line size={25} fill={colorTheme.white} />
              </div>
              <div className={defaultStyle.account_detail_card}>
                <h5 className={defaultStyle.account_title}>Restaurant</h5>
                <p className={defaultStyle.account_paragraph}>
                  Manage your own restaurant
                </p>
              </div>
            </div>
          </div>
          <div className={defaultStyle.continue_button_card}>
            <CustomButton
              variant="primary"
              type="button"
              title="Continue"
              onClick={() => handleContinue(accountType)}
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
