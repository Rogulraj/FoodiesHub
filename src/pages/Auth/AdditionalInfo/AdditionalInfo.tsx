//packages
import React, {
  FormEvent,
  FormEventHandler,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";

//css
import defaultStyle from "./AdditionalInfo.module.css";

//components
import MaxWidthLayout from "@components/Layouts/MaxWidthLayout/MaxWidthLayout";
import CustomHelmet from "@components/Elements/CustomHelmet/CustomHelmet";
import DefaultTitle from "@components/Elements/DefaultTitle/DefaultTitle";
import TimelineBar, {
  TimelineListType,
} from "@components/Elements/TimelineBar/TimelineBar";
import PrimaryForm, {
  InputElementProperties,
} from "@components/Form/PrimaryForm/PrimaryForm";
import CustomButton, {
  CustomButtonPropsType,
} from "@components/Elements/CustomButton/CustomButton";

//constants
import routePaths from "@constants/routePaths";
import authTimelineList from "@constants/authTimeline";
import { FaPlus } from "react-icons/fa";
import { TimelineListFinder } from "@helper/timeline.helper";
import { useAppDispatch, useAppSelector } from "../../../redux/store/store";
import colorTheme from "@constants/colorTheme";
import { toast } from "react-toastify";
import { ConvertToBase64 } from "@helper/base64.helper";
import { YupFormValidator } from "@utils/yupFormValidator";
import * as Yup from "yup";
import { useCreatePersonalUserDetailsMutation } from "../../../services/personalUserDetails.service";

const yupValidationSchema = Yup.object({
  imageUrl: Yup.string()
    .notOneOf(["null"], "Please Select image")
    .required("Please Select image"),
  firstName: Yup.string().required("Enter First name"),
  lastName: Yup.string(),
});

//React Element
const AdditionalInfo = (): React.ReactElement => {
  const [imageFile, setImageFile] = useState<Blob | string>("");
  const [validateErrors, setValidateErrors] = useState<string[]>([]);

  const formRef = useRef<HTMLFormElement>(null);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const { accountType, _id: userId } = useAppSelector((state) => state.signup);
  const [
    CreatePersonalUserDetails,
    { data: personalUserDetailsData, isError: isPersonalUserDetailsError },
  ] = useCreatePersonalUserDetailsMutation();

  // function handleContinueButton() {
  //   navigate(routePaths.confirmation);
  // }

  // function handleBackButton() {
  //   navigate(routePaths.personalDetails);
  // }

  const validationErrorSetter = (errors: string[]) => {
    setValidateErrors(errors);
  };

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    try {
      const base64Image = await ConvertToBase64(imageFile);
      const validationData = {
        firstName: firstNameRef.current?.value,
        lastName: lastNameRef.current?.value,
        imageUrl: base64Image,
      };

      const yupValidation = new YupFormValidator(
        yupValidationSchema,
        validationData,
        validationErrorSetter
      );
      const validate = await yupValidation.validate();
      if (validate) {
        await CreatePersonalUserDetails({ ...validationData, _id: userId });
      }
    } catch (error) {
      console.log("error = ", error);
      toast.error("something went wrong!");
    }
  };

  useEffect(() => {
    if (personalUserDetailsData?.statusCode === 201) {
      formRef.current?.reset();
      navigate(routePaths.login);
    } else if (isPersonalUserDetailsError) {
      toast.warning("User details not added");
    }
  }, [personalUserDetailsData, isPersonalUserDetailsError]);

  const timelineList: TimelineListType[] = TimelineListFinder(accountType);

  return (
    <MaxWidthLayout>
      <div className={defaultStyle.main_layout}>
        <CustomHelmet title="Personal Details" />
        <div className={defaultStyle.sub_layout}>
          <DefaultTitle variant="personal" />
          <div className={defaultStyle.timeline_card}>
            <TimelineBar
              timelineList={timelineList}
              currentTimeline={timelineList[2].title}
            />
          </div>
          <h1 className={defaultStyle.title}>Additional Info</h1>
          <form
            className={defaultStyle.form_card}
            onSubmit={handleFormSubmit}
            ref={formRef}>
            <h6 className={defaultStyle.image_title}>Profile image</h6>
            <div className={defaultStyle.image_card}>
              <div className={defaultStyle.select_image_card}>
                <label
                  htmlFor="image-file"
                  className={defaultStyle.image_file_label}>
                  {imageFile === undefined || typeof imageFile === "string" ? (
                    <FaPlus size={15} color={colorTheme.light_white} />
                  ) : (
                    <img
                      src={URL.createObjectURL(imageFile)}
                      alt="selected-img"
                      className={defaultStyle.selected_image_style}
                    />
                  )}
                </label>
              </div>
              <input
                type="file"
                name="image-file"
                id="image-file"
                className={defaultStyle.image_file_input}
                onChange={(e) => setImageFile(e?.target?.files[0])}
              />
            </div>
            <div className={defaultStyle.name_input_card}>
              <label htmlFor="firstName" className={defaultStyle.name_label}>
                Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="Enter Name"
                ref={firstNameRef}
                className={defaultStyle.name_input}
              />
              {/* <label htmlFor="lastName" className={defaultStyle.name_label}>
                Last Name (optional)
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Enter last name"
                ref={lastNameRef}
                className={defaultStyle.name_input}
              /> */}
            </div>
            <div className={defaultStyle.button_card}>
              <CustomButton title="Continue" type="submit" variant="primary" />
            </div>
            {validateErrors?.length > 0 && (
              <p className={defaultStyle.error_message}>*{validateErrors[0]}</p>
            )}
          </form>
        </div>
      </div>
    </MaxWidthLayout>
  );
};

export default AdditionalInfo;
