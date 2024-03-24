//packages
import React, {
  FormEventHandler,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Navigate, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Cookies from "js-cookie";

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
import { RefValuesType } from "@interfaces/form.interface";

//Redux
import { usePostLoginMutation } from "../../../services/auth.service";
import { signupActions } from "../../../redux/features/signup.slice";
import { useAppDispatch } from "../../../redux/store/store";
import { VITE_SESSION_TOKEN_NAME } from "@config/index";
import {
  GetSessionToken,
  SetSessionToken,
  TokenData,
} from "@helper/sessionToken.helper";
import { LoginUserBody } from "@interfaces/auth.interface";

//React Element
const Login = (): React.ReactElement => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [validateError, setValidateError] = useState<string[]>([]);
  const dispatch = useAppDispatch();

  const [UserLogin, { data: loginResponse, error: loginError }] =
    usePostLoginMutation();

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

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is Required.")
      .email("Invalid Email Format."),
    password: Yup.string()
      .required("Password is Required.")
      .min(8, "Password must be at least 8 characters.")
      .matches(
        /[!@#$%^&*(),.?":{}|<>=]/,
        "Password must contain at least one symbol"
      ),
  });

  async function handleFormValidation(
    refValues: RefValuesType
  ): Promise<boolean> {
    try {
      await validationSchema.validate(
        { ...refValues },
        {
          abortEarly: false,
        }
      );
      setValidateError([]);
      return true;
    } catch (error) {
      const newErrors: string[] = [];
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      await error?.inner?.map((err: { path: string; message: string }) => {
        newErrors.push(err.message);
      });

      setValidateError(newErrors);

      return false;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  const handleFormSubmit: FormEventHandler<HTMLFormElement> = async (
    event
  ): Promise<void> => {
    event.preventDefault();

    try {
      const refValues: RefValuesType = {
        email: emailRef.current?.value,
        password: passwordRef.current?.value,
      };
      const validate = await handleFormValidation(refValues);

      if (validate) {
        const body: LoginUserBody = {
          email: refValues.email as string,
          password: refValues.password as string,
        };
        await UserLogin(body);
      }
    } catch (err) {
      console.log("error => ", err);
    }
  };

  function handleForgotPassword() {
    navigate(routePaths.forgotPassword);
  }

  const handleSignup = () => {
    navigate(routePaths.signup);
  };

  console.log(loginResponse);
  console.log(validateError);

  useEffect(() => {
    if (GetSessionToken()) {
      navigate(routePaths.personalHome);
    } else if (loginResponse?.statusCode === 200) {
      dispatch(
        signupActions.handleAllData({
          email: emailRef.current?.value,
          password: passwordRef.current?.value,
        })
      );
      const tokenData: TokenData = loginResponse.data.tokenData;
      SetSessionToken(tokenData);
      navigate(routePaths.personalHome);
    }
  }, [loginResponse]);

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
