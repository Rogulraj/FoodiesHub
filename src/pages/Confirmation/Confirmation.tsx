import { CustomButtonPropsType } from "@components/Elements/CustomButton/CustomButton";
import PrimaryForm, {
  InputElementProperties,
} from "@components/Form/PrimaryForm/PrimaryForm";
import routePaths from "@constants/routePaths";
import React, { FormEvent, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";

import defaultStyle from "./Confirmation.module.css";
import authTimelineList from "@constants/authTimeline";
import MaxWidthLayout from "@components/Layouts/MaxWidthLayout/MaxWidthLayout";
import CustomHelmet from "@components/Elements/CustomHelmet/CustomHelmet";
import DefaultTitle from "@components/Elements/DefaultTitle/DefaultTitle";
import TimelineBar from "@components/Elements/TimelineBar/TimelineBar";

const Confirmation = (): React.ReactElement => {
  const numberRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const inputList = useMemo<InputElementProperties[]>(
    () => [
      {
        id: "number",
        variant: "number",
        label: "Confirmation code",
        type: "number",
        name: "number",
        placeholder: "xxx - xxx - xxx",
        ref: numberRef,
      },
    ],
    []
  );

  const buttonList = useMemo<CustomButtonPropsType[]>(
    () => [
      {
        title: "Complete",
        type: "submit",
        variant: "primary",
        onClick: handleCompleteButton,
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

  function handleCompleteButton() {
    navigate(routePaths.confirmation);
  }

  function handleBackButton() {
    navigate(routePaths.additionalInfo);
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
              currentTimeline={authTimelineList[3].title}
            />
          </div>
          <h1 className={defaultStyle.title}>Confirmation</h1>
          <p className={defaultStyle.paragraph}>
            Enter Your security code that we sent to your phone.
          </p>
          <div>
            <PrimaryForm
              handleFormSubmit={handleFormSubmit}
              inputList={inputList}
              buttonList={buttonList}
              isCheckBox={true}
              checkboxPropertise={{
                id: "check-box",
                label: "Remember this device",
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

export default Confirmation;
