//packages
import React, {
  FormEvent,
  FormEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import appConfig from "@config/index";

//css
import defaultStyle from "./AdditionalInfo.module.css";

//components
import MaxWidthLayout from "@components/Layouts/MaxWidthLayout/MaxWidthLayout";
import CustomHelmet from "@components/Elements/CustomHelmet/CustomHelmet";
import DefaultTitle from "@components/Elements/DefaultTitle/DefaultTitle";
import TimelineBar, {
  TimelineListType,
} from "@components/Elements/TimelineBar/TimelineBar";
import CustomButton from "@components/Elements/CustomButton/CustomButton";

//constants
import routePaths from "@constants/routePaths";
import { FaPlus } from "react-icons/fa";
import { TimelineListFinder } from "@helper/timeline.helper";
import { useAppSelector } from "../../../redux/store/store";
import colorTheme from "@constants/colorTheme";
import { toast } from "react-toastify";
import { YupFormValidator } from "@utils/yupFormValidator";
import * as Yup from "yup";
import { useCreatePersonalUserDetailsMutation } from "../../../services/personalUserDetails.service";
import { supabaseClient } from "@utils/supabase/client";
import { SUPABASE_FOLDERS } from "@utils/supabase/folders";

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
      let imageUrl = "";

      // Upload image to Supabase storage if a file is selected
      if (imageFile) {
        const fileExt = imageFile.name.split(".").pop();
        const fileName = `image-${Date.now()}.${fileExt}`;
        const filePath = `${SUPABASE_FOLDERS.USERS_PROFILE}/${fileName}`;

        const { error: uploadError } = await supabaseClient.storage
          .from(appConfig.VITE_SUPABASE_BUCKET)
          .upload(filePath, imageFile);

        if (uploadError) {
          console.error("error while uploading image", uploadError);
          throw uploadError;
        }

        // Get the public URL of the uploaded file
        const { data: { publicUrl } } = supabaseClient.storage
          .from(appConfig.VITE_SUPABASE_BUCKET)
          .getPublicUrl(filePath);

        imageUrl = publicUrl;
      }

      const validationData = {
        firstName: firstNameRef.current?.value,
        lastName: lastNameRef.current?.value ?? "",
        imageUrl: imageUrl,
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
      console.error("error while creating user details", error);
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
              <label htmlFor="lastName" className={defaultStyle.name_label}>
                Last Name (optional)
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Enter last name"
                ref={lastNameRef}
                className={defaultStyle.name_input}
              />
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
