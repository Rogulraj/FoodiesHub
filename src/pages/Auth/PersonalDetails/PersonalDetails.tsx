//packages
import React, { FormEvent, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

//components
import CustomHelmet from "@components/Elements/CustomHelmet/CustomHelmet";
import MaxWidthLayout from "@components/Layouts/MaxWidthLayout/MaxWidthLayout";
import defaultStyle from "./PersonalDetails.module.css";
import DefaultTitle from "@components/Elements/DefaultTitle/DefaultTitle";
import TimelineBar from "@components/Elements/TimelineBar/TimelineBar";
import PrimaryForm, {
  InputElementProperties,
} from "@components/Form/PrimaryForm/PrimaryForm";
import { CustomButtonPropsType } from "@components/Elements/CustomButton/CustomButton";

//constants
import authTimelineList from "@constants/authTimeline";
import routePaths from "@constants/routePaths";
import { useAppDispatch, useAppSelector } from "../../../redux/store/store";
import { signupActions } from "../../../redux/features/signup.slice";
import { usePostSignupMutation } from "../../../services/signup.service";

//React Elements
const PersonalDetails = (): React.ReactElement => {
  const [createUser] = usePostSignupMutation();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [minLength, setMinLength] = useState<boolean>(false);

  const navigate = useNavigate();

  const { email, password } = useAppSelector((state) => state.signup);
  const dispatch = useAppDispatch();

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
    ],
    []
  );

  const buttonList = useMemo<CustomButtonPropsType[]>(
    () => [
      {
        title: "Signup",
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

  function handleContinueButton() {
    navigate(routePaths.additionalInfo);
  }

  function handleBackButton() {
    navigate(routePaths.signup);
  }

  async function handleFormSubmit(
    event: FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();

    const emailRefVal = emailRef.current?.value;
    const passwordRefVal = passwordRef.current?.value;

    if (
      emailRefVal !== null &&
      passwordRefVal !== null &&
      passwordRefVal?.length !== undefined &&
      passwordRefVal.length >= 8
    ) {
      setMinLength(true);
      dispatch(
        signupActions.handleEmailPassword({
          email: emailRefVal,
          password: passwordRefVal,
        })
      );
      const res = await createUser({ email, password });
      console.log("res = ", res);
    } else {
      setMinLength(false);
    }
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
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
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
