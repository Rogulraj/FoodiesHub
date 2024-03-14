//packages
import React, { FormEventHandler, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";

//css
import defaultStyle from "./Login.module.css";

//components
import DefaultTitle from "@components/Elements/DefaultTitle/DefaultTitle";
import MaxWidthLayout from "@components/Layouts/MaxWidthLayout/MaxWidthLayout";
import CustomHelmet from "@components/Elements/CustomHelmet/CustomHelmet";
import PrimaryForm from "@components/Form/PrimaryForm/PrimaryForm";

//route paths
import routePaths from "@constants/routePaths";

//types
import { InputElementProperties } from "@components/Form/PrimaryForm/PrimaryForm";
import { CustomButtonPropsType } from "@components/Elements/CustomButton/CustomButton";

//React Element
const Login = (): React.ReactElement => {
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
        placeholder: "email",
        ref: emailRef,
      },
      {
        variant: "password_with_icon",
        type: "password",
        id: "password",
        name: "password",
        label: "Password",
        placeholder: "password",
        ref: passwordRef,
      },
    ],
    []
  );

  const buttonList = useMemo<CustomButtonPropsType[]>(
    () => [
      {
        title: "Login",
        type: "submit",
        variant: "primary",
      },
      {
        title: "Forgot password",
        type: "button",
        variant: "secondary",
        onClick: handleForgotPassword,
      },
    ],
    []
  );

  const navigate = useNavigate();

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    const email = emailRef?.current?.value;
    const password = passwordRef?.current?.value;

    // console.log("email ->", email, "password ->", password);
  };

  function handleForgotPassword() {
    navigate(routePaths.forgotPassword);
  }

  const handleSignup = () => {
    navigate(routePaths.signup);
  };

  return (
    <MaxWidthLayout>
      <div className={defaultStyle.main_layout}>
        <CustomHelmet title="Login" />
        <div>
          <DefaultTitle />
          <div className={defaultStyle.title_card}>
            <h1 className={defaultStyle.title}>Login</h1>
            <p className={defaultStyle.paragraph}>
              Sign in with your data that you entered during your registration.
            </p>
          </div>
          <PrimaryForm
            inputList={inputList}
            handleFormSubmit={handleFormSubmit}
            isCheckBox={true}
            checkboxPropertise={{
              id: "keep-login",
              label: "Keep me logged in",
              name: "keep-login",
            }}
            buttonList={buttonList}
          />
          <div className={defaultStyle.signup_text_card}>
            <p className={defaultStyle.signup_text}>
              Dont have an account? <span onClick={handleSignup}>Sign up</span>
            </p>
          </div>
        </div>
      </div>
    </MaxWidthLayout>
  );
};

export default Login;
