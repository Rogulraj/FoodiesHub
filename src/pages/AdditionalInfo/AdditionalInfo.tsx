//packages
import React, { FormEvent, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";

//css
import defaultStyle from "./AdditionalInfo.module.css";

//components
import MaxWidthLayout from "@components/Layouts/MaxWidthLayout/MaxWidthLayout";
import CustomHelmet from "@components/Elements/CustomHelmet/CustomHelmet";
import DefaultTitle from "@components/Elements/DefaultTitle/DefaultTitle";
import TimelineBar from "@components/Elements/TimelineBar/TimelineBar";
import PrimaryForm, {
  InputElementProperties,
} from "@components/Form/PrimaryForm/PrimaryForm";
import { CustomButtonPropsType } from "@components/Elements/CustomButton/CustomButton";

//constants
import routePaths from "@constants/routePaths";
import authTimelineList from "@constants/authTimeline";

//React Element
const AdditionalInfo = (): React.ReactElement => {
  const numberRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const inputList = useMemo<InputElementProperties[]>(
    () => [
      {
        id: "number",
        variant: "number",
        label: "Phone number",
        type: "number",
        name: "number",
        placeholder: "(217) 555-0113",
        ref: numberRef,
      },
    ],
    []
  );

  const buttonList = useMemo<CustomButtonPropsType[]>(
    () => [
      {
        title: "continue",
        type: "submit",
        variant: "primary",
        onClick: handleContinueButton,
      },
      {
        title: "Back",
        type: "button",
        variant: "secondary",
        onClick: handleBackButton,
      },
    ],
    []
  );

  function handleContinueButton() {
    navigate(routePaths.confirmation);
  }

  function handleBackButton() {
    navigate(routePaths.personalDetails);
  }

  function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <MaxWidthLayout>
      <div className={defaultStyle.main_layout}>
        <CustomHelmet title="Additional Details" />
        <div className={defaultStyle.sub_layout}>
          <DefaultTitle />
          <div className={defaultStyle.timeline_card}>
            <TimelineBar
              timelineList={authTimelineList}
              currentTimeline={authTimelineList[2].title}
            />
          </div>
          <h1 className={defaultStyle.title}>Additional Info</h1>
          <p className={defaultStyle.paragraph}>
            Enter Your additional information.
          </p>
          <div>
            <PrimaryForm
              handleFormSubmit={handleFormSubmit}
              inputList={inputList}
              buttonList={buttonList}
              isCheckBox={true}
              checkboxPropertise={{
                id: "check-box",
                label: "Turn on 2 factor authentication",
                name: "check-box",
              }}
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

export default AdditionalInfo;
