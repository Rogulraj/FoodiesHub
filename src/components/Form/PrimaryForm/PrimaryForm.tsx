//packages
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
  variant:
    | "email"
    | "password"
    | "password_with_icon"
    | "date"
    | "text"
    | "number";
}

export interface InputElementProperties {
  label: string;
  name?: string;
  id: string;
  placeholder?: string;
  type: "email" | "password" | "date" | "text" | "number";
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
  handleFormSubmit: (event: FormEventHandler<HTMLFormElement>) => Promise<void>;
  inputList: InputElementProperties[];
  isCheckBox: boolean;
  checkboxPropertise?: CheckBoxProperties;
  buttonList?: CustomButtonPropsType[];
  buttonListStyle?: CSSProperties;
  validateError?: string[];
};

//React Element
const PrimaryForm = ({
  handleFormSubmit,
  inputList,
  isCheckBox,
  checkboxPropertise,
  buttonList,
  buttonListStyle,
  validateError,
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
      {validateError !== undefined && validateError?.length > 0 ? (
        <p className={defaultStyle.error_message}>*{validateError[0]}</p>
      ) : (
        <p className={defaultStyle.error_message}></p>
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
    </form>
  );
};

export default PrimaryForm;
