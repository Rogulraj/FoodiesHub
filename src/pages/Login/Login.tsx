import React, { FormEventHandler, useRef, useState } from "react";

//css
import defaultStyle from "./Login.module.css";

//components
import DefaultTitle from "@components/Elements/DefaultTitle/DefaultTitle";
import MaxWidthLayout from "@components/Layouts/MaxWidthLayout/MaxWidthLayout";
import CustomHelmet from "@components/Elements/CustomHelmet/CustomHelmet";

//react-icons
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";

const Login = (): React.ReactElement => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    const email = emailRef?.current?.value;
    const password = passwordRef?.current?.value;

    // console.log("email ->", email, "password ->", password);
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
          <form className={defaultStyle.form_card} onSubmit={handleFormSubmit}>
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
            <label htmlFor="password" className={defaultStyle.email_label}>
              Password
            </label>
            <br />
            <div className={defaultStyle.password_card}>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="password"
                className={defaultStyle.password_input}
                ref={passwordRef}
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

            <div className={defaultStyle.keep_login_checkbox_card}>
              <input
                type="checkbox"
                name="keep-login"
                id="keep-login"
                className={defaultStyle.keep_login_checkbox}
              />
              <label
                htmlFor="keep-login"
                className={defaultStyle.keep_login_checkbox_label}>
                Keep me logged in
              </label>
            </div>

            <div className={defaultStyle.form_button_card}>
              <button type="submit" className={defaultStyle.login_button}>
                Login
              </button>

              <button type="button" className={defaultStyle.forgot_button}>
                Forgot password
              </button>
            </div>
          </form>
          <div className={defaultStyle.signup_text_card}>
            <p className={defaultStyle.signup_text}>
              Dont have an account? <span>Sign up</span>
            </p>
          </div>
        </div>
      </div>
    </MaxWidthLayout>
  );
};

export default Login;
