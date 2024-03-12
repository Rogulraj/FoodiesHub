import React, {
  CSSProperties,
  FormEventHandler,
  RefObject,
  useCallback,
  useState,
} from "react";

//css
import defaultStyle from "./PrimaryForm.module.css";

//react-icons
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";

//types
import CustomButton, {
  CustomButtonPropsType,
} from "@components/Elements/CustomButton/CustomButton";

export interface InputVariantType {
  variant: "email" | "password" | "password_with_icon" | "date" | "text";
}

export interface InputElementProperties {
  label: string;
  name?: string;
  id: string;
  placeholder?: string;
  type: "email" | "password" | "date" | "text";
  variant: InputVariantType["variant"];
  ref?: RefObject<HTMLInputElement>;
}

export interface CheckBoxProperties {
  label: string;
  name: string;
  id: string;
  ref?: RefObject<HTMLInputElement>;
}

export type PrimaryFormPropsType = {
  handleFormSubmit: FormEventHandler<HTMLFormElement>;
  inputList: InputElementProperties[];
  isCheckBox: boolean;
  checkboxPropertise?: CheckBoxProperties;
  buttonList?: CustomButtonPropsType[];
  buttonListStyle?: CSSProperties;
};

//React Element
const PrimaryForm = ({
  handleFormSubmit,
  inputList,
  isCheckBox,
  checkboxPropertise,
  buttonList,
  buttonListStyle,
}: PrimaryFormPropsType): React.ReactElement => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const findInputElement = useCallback(
    (
      variant: InputVariantType["variant"],
      properties: InputElementProperties,
      key: number
    ) => {
      switch (variant) {
        case "email":
          return (
            <div key={key}>
              <label
                htmlFor={properties.id}
                className={defaultStyle.email_label}>
                {properties.label}
              </label>
              <br />
              <input
                type={properties.type}
                name={properties.name}
                id={properties.id}
                placeholder={properties.placeholder}
                className={defaultStyle.email_input}
                ref={properties.ref}
              />
              <br />
            </div>
          );
        case "password_with_icon":
          return (
            <div key={key}>
              <label
                htmlFor={properties.id}
                className={defaultStyle.email_label}>
                {properties.label}
              </label>
              <br />
              <div className={defaultStyle.password_card}>
                <input
                  type={showPassword ? "text" : properties.type}
                  name={properties.name}
                  id={properties.id}
                  placeholder={properties.placeholder}
                  className={defaultStyle.password_input}
                  ref={properties.ref}
                />
                {showPassword ? (
                  <IoEyeOffOutline
                    size={20}
                    onClick={() => setShowPassword(false)}
                    className={defaultStyle.eye_icon}
                  />
                ) : (
                  <IoEyeOutline
                    size={20}
                    onClick={() => setShowPassword(true)}
                    className={defaultStyle.eye_icon}
                  />
                )}
              </div>
            </div>
          );

        default:
          return (
            <div key={key}>
              <label
                htmlFor={properties.id}
                className={defaultStyle.email_label}>
                {properties.label}
              </label>
              <br />
              <input
                type={properties.type}
                name={properties.name}
                id={properties.id}
                placeholder={properties.placeholder}
                className={defaultStyle.email_input}
                ref={properties.ref}
              />
              <br />
            </div>
          );
      }
    },
    [showPassword]
  );

  return (
    <form className={defaultStyle.form_card} onSubmit={handleFormSubmit}>
      <div className={defaultStyle.input_card}>
        {inputList.map((item, _index) => {
          return findInputElement(item.variant, item, _index);
        })}
      </div>
      {isCheckBox && (
        <div className={defaultStyle.keep_login_checkbox_card}>
          <input
            type="checkbox"
            name={checkboxPropertise?.name}
            id={checkboxPropertise?.id}
            className={defaultStyle.keep_login_checkbox}
          />
          <label
            htmlFor={checkboxPropertise?.id}
            className={defaultStyle.keep_login_checkbox_label}>
            {checkboxPropertise?.label}
          </label>
        </div>
      )}
      {buttonList?.length !== undefined && buttonList.length > 0 ? (
        <div className={defaultStyle.button_card} style={buttonListStyle}>
          {buttonList?.map((item, _index) => (
            <CustomButton
              title={item.title}
              type={item.type}
              variant={item.variant}
              onClick={item.onClick}
              style={item.style}
              key={_index}
            />
          ))}
        </div>
      ) : null}
      {/* <label htmlFor="email" className={defaultStyle.email_label}>
        Email
      </label>
      <br />
      <input
        type="email"
        name="email"
        id="email"
        placeholder="email"
        className={defaultStyle.email_input}
        // ref={emailRef}
      />
      <br />
      <label htmlFor="password" className={defaultStyle.email_label}>
        Password
      </label>
      <br />
      <div className={defaultStyle.password_card}>
        <input
          //   type={showPassword ? "text" : "password"}
          name="password"
          id="password"
          placeholder="password"
          className={defaultStyle.password_input}
          //   ref={passwordRef}
        />
        {showPassword ? (
          <IoEyeOffOutline
            size={20}
            onClick={() => setShowPassword(false)}
            className={defaultStyle.eye_icon}
          />
        ) : (
          <IoEyeOutline
            size={20}
            onClick={() => setShowPassword(true)}
            className={defaultStyle.eye_icon}
          />
        )}
      </div>



      <div className={defaultStyle.form_button_card}>
        <button type="submit" className={defaultStyle.login_button}>
          Login
        </button>

        <button
          type="button"
          className={defaultStyle.forgot_button}
          onClick={handleForgotPassword}>
          Forgot password
        </button>
      </div> */}
    </form>
  );
};

export default PrimaryForm;
