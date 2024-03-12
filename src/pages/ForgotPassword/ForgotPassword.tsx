import React, { useMemo, useRef } from "react";

//components
import CustomHelmet from "@components/Elements/CustomHelmet/CustomHelmet";
import MaxWidthLayout from "@components/Layouts/MaxWidthLayout/MaxWidthLayout";

//css
import defaultStyle from "./ForgotPassword.module.css";
import DefaultTitle from "@components/Elements/DefaultTitle/DefaultTitle";

//icons
import { IoChevronBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import routePaths from "@constants/routePaths";
import PrimaryForm, {
  InputElementProperties,
} from "@components/Form/PrimaryForm/PrimaryForm";
import { CustomButtonPropsType } from "@components/Elements/CustomButton/CustomButton";

const ForgotPassword = (): React.ReactElement => {
  const emailRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const inputList = useMemo<InputElementProperties[]>(
    () => [
      {
        id: "email",
        variant: "email",
        label: "Email",
        type: "email",
        name: "email",
        placeholder: "email",
        ref: emailRef,
      },
    ],
    []
  );

  const buttonList = useMemo<CustomButtonPropsType[]>(
    () => [
      {
        title: "Send instructions",
        type: "button",
        variant: "primary",
      },
    ],
    []
  );

  const handleGoBack = () => {
    navigate(routePaths.login);
  };

  function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {}

  return (
    <MaxWidthLayout>
      <div className={defaultStyle.main_layout}>
        <CustomHelmet title="Forgot Password" />
        <div className={defaultStyle.sub_layout}>
          <DefaultTitle />
          <div className={defaultStyle.back_login_card} onClick={handleGoBack}>
            <IoChevronBackOutline
              size={20}
              className={defaultStyle.back_icon}
            />
            <p className={defaultStyle.back_login_text}>Back to login</p>
          </div>
          <div>
            <h1 className={defaultStyle.title}>Forgot Password</h1>
            <p className={defaultStyle.paragraph}>
              Enter the email associated with your account and we will send an
              email with instructions to reset your password.
            </p>
          </div>
          <div className={defaultStyle.form_card}>
            <PrimaryForm
              handleFormSubmit={handleFormSubmit}
              inputList={inputList}
              buttonList={buttonList}
              isCheckBox={false}
              buttonListStyle={{ marginTop: "15px" }}
            />
          </div>
          {/* <form className={defaultStyle.form_card}>
            <label htmlFor="email" className={defaultStyle.email_label}>
              Email
            </label>
            <br />
            <input
              type="email"
              name="email"
              id="email"
              placeholder="email"
              className={defaultStyle.email_input}
              ref={emailRef}
            />
            <br />
            <button className={defaultStyle.send_btn}>Send Instruction</button>
          </form> */}
          <div className={defaultStyle.signup_text_card}>
            <p className={defaultStyle.signup_text}>
              Do you have any questions? <span>FAQ</span>
            </p>
          </div>
        </div>
      </div>
    </MaxWidthLayout>
  );
};

export default ForgotPassword;
