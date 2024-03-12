import React, { FormEvent, useMemo, useRef } from "react";

//components
import CustomHelmet from "@components/Elements/CustomHelmet/CustomHelmet";
import MaxWidthLayout from "@components/Layouts/MaxWidthLayout/MaxWidthLayout";

import defaultStyle from "./PersonalDetails.module.css";
import DefaultTitle from "@components/Elements/DefaultTitle/DefaultTitle";
import TimelineBar from "@components/Elements/TimelineBar/TimelineBar";
import authTimelineList from "@constants/authTimeline";
import PrimaryForm, {
  InputElementProperties,
} from "@components/Form/PrimaryForm/PrimaryForm";
import { CustomButtonPropsType } from "@components/Elements/CustomButton/CustomButton";

const PersonalDetails = (): React.ReactElement => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const inputList = useMemo<InputElementProperties[]>(
    () => [
      {
        id: "email",
        variant: "email",
        label: "Email",
        type: "email",
        name: "email",
        placeholder: "name@example.com",
        ref: emailRef,
      },
      {
        variant: "password_with_icon",
        type: "password",
        id: "password",
        name: "password",
        label: "Password",
        placeholder: "min. 8 characters",
        ref: passwordRef,
      },
      {
        variant: "password",
        type: "password",
        id: "password",
        name: "password",
        label: "Confirm Password",
        placeholder: "min. 8 characters",
        ref: passwordRef,
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

  function handleBackButton() {}

  function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <MaxWidthLayout>
      <div className={defaultStyle.main_layout}>
        <CustomHelmet title="Personal Details" />
        <div className={defaultStyle.sub_layout}>
          <DefaultTitle />
          <div className={defaultStyle.timeline_card}>
            <TimelineBar
              timelineList={authTimelineList}
              currentTimeline={authTimelineList[1].title}
            />
          </div>
          <h1 className={defaultStyle.title}>Personal Details</h1>
          <p className={defaultStyle.paragraph}>
            Enter Your data that you will use for entering.
          </p>
          <div className={defaultStyle.form_card}>
            <PrimaryForm
              handleFormSubmit={handleFormSubmit}
              inputList={inputList}
              buttonList={buttonList}
              isCheckBox={false}
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

export default PersonalDetails;
