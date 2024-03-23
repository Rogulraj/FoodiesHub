//packages
import React, {
  FormEvent,
  FormEventHandler,
  useMemo,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

//components
import CustomHelmet from "@components/Elements/CustomHelmet/CustomHelmet";
import MaxWidthLayout from "@components/Layouts/MaxWidthLayout/MaxWidthLayout";
import defaultStyle from "./PersonalDetails.module.css";
import DefaultTitle from "@components/Elements/DefaultTitle/DefaultTitle";
import TimelineBar, {
  TimelineListType,
} from "@components/Elements/TimelineBar/TimelineBar";
import PrimaryForm, {
  InputElementProperties,
} from "@components/Form/PrimaryForm/PrimaryForm";
import { CustomButtonPropsType } from "@components/Elements/CustomButton/CustomButton";

//constants
import routePaths from "@constants/routePaths";

//Redux
import { useAppDispatch, useAppSelector } from "../../../redux/store/store";
import { signupActions } from "../../../redux/features/signup.slice";
import { usePostSignupMutation } from "../../../services/auth.service";
import { RefValuesType } from "@interfaces/form.interface";
import { TimelineListFinder } from "@helper/timeline.helper";

//React Elements
const PersonalDetails = (): React.ReactElement => {
  const [createUser] = usePostSignupMutation();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const [validateError, setValidateError] = useState<string[]>([]);
  const navigate = useNavigate();

  const { accountType } = useAppSelector((state) => state.signup);
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
      {
        variant: "password",
        type: "password",
        id: "confirm-password",
        name: "confirm-password",
        label: "Confirm Password",
        placeholder: "min. 8 characters",
        ref: confirmPasswordRef,
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

  function handleBackButton() {
    navigate(routePaths.signup);
  }

  const validationSchema = Yup.object({
    accountType: Yup.string()
      .required("go back & select the account type.")
      .min(3),
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
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm password is required."),
  });

  async function handleFormValidation(): Promise<boolean> {
    try {
      const refValues: RefValuesType = {
        email: emailRef.current?.value,
        password: passwordRef.current?.value,
        confirmPassword: confirmPasswordRef.current?.value,
      };

      await validationSchema.validate(
        { ...refValues, accountType },
        {
          abortEarly: false,
        }
      );

      dispatch(
        signupActions.handleEmailPassword({
          email: refValues.email,
          password: refValues.password,
        })
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
      const isValidate = await handleFormValidation();

      const refValues: RefValuesType = {
        email: emailRef.current?.value,
        password: passwordRef.current?.value,
        confirmPassword: confirmPasswordRef.current?.value,
      };

      if (
        isValidate &&
        refValues.email !== undefined &&
        refValues.password !== undefined
      ) {
        const response = await createUser({
          email: refValues.email,
          password: refValues.password,
          accountType,
        });

        if (response?.data) {
          const statusCode = response?.data?.statusCode;

          if (statusCode === 201) {
            if (accountType === "personal") {
              navigate(routePaths.login);
            } else if (accountType === "restaurant") {
              navigate(routePaths.restaurantDetails);
            }
          }
        }
      }
    } catch (error) {
      console.log("error => ", error);
    }
  };

  const timelineList: TimelineListType[] = TimelineListFinder(accountType);

  return (
    <MaxWidthLayout>
      <div className={defaultStyle.main_layout}>
        <CustomHelmet title="Personal Details" />
        <div className={defaultStyle.sub_layout}>
          <DefaultTitle />
          <div className={defaultStyle.timeline_card}>
            <TimelineBar
              timelineList={timelineList}
              currentTimeline={timelineList[1].title}
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
              validateError={validateError}
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
