// packages
import React, {
  FormEvent,
  FormEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import * as Yup from "yup";

// css
import defaultStyle from "./RestaurantDetails.module.css";
import MaxWidthLayout from "@components/Layouts/MaxWidthLayout/MaxWidthLayout";
import CustomHelmet from "@components/Elements/CustomHelmet/CustomHelmet";
import TimelineBar, {
  TimelineListType,
} from "@components/Elements/TimelineBar/TimelineBar";
import DefaultTitle from "@components/Elements/DefaultTitle/DefaultTitle";
import { TimelineListFinder } from "@helper/timeline.helper";
import { useAppSelector } from "../../../redux/store/store";
import { FaPlus } from "react-icons/fa";
import colorTheme from "@constants/colorTheme";
import CustomButton from "@components/Elements/CustomButton/CustomButton";
import { useCreateRestaurantMutation } from "../../../services/restaurant.service";
import { ConvertToBase64 } from "@helper/base64.helper";
import { CreateRestaurantModels } from "../../../models/restaurant.model";
import { restaurantTagsList } from "@constants/restaurant";
import { usePostSignupMutation } from "../../../services/auth.service";
import { Navigate, useNavigate } from "react-router-dom";
import routePaths from "@constants/routePaths";

interface RefValueType {
  name: string | undefined;
  imageUrl: Blob | undefined;
  deliveryDuration: string | undefined;
  minOrderVal: number | undefined;
  tags: string[];
}

const RestaurantDetails = (): React.ReactElement => {
  const [imageFile, setImageFile] = useState<Blob>();
  const [tagsList, setTagsList] = useState<string[]>([]);
  const [validateError, setValidateError] = useState<string[]>([]);

  const nameRef = useRef<HTMLInputElement>(null);
  const deliverDurationRef = useRef<HTMLInputElement>(null);
  const minOrderValRef = useRef<HTMLInputElement>(null);

  const [
    CreateRestaurant,
    {
      data: createRestaurantData,
      // error: createRestaurantError,
      // status: createRestaurantStatus,
    },
  ] = useCreateRestaurantMutation();
  const { accountType, _id } = useAppSelector((state) => state.signup);
  const navigate = useNavigate();

  const validateSchema = Yup.object({
    name: Yup.string().required("Enter restaurant name"),
    imageUrl: Yup.mixed().required("Select Profile image"),
    deliveryDuration: Yup.string().required("Enter delivery duration"),
    minOrderVal: Yup.number()
      .required("Enter Min. order value")
      .typeError("Enter valid Min. order value"),
    tags: Yup.array().of(Yup.string()).min(1, "Select atleast one tag"),
  });

  console.log(validateError);

  const handleValidateSchema = async (
    refValues: RefValueType
  ): Promise<boolean> => {
    try {
      await validateSchema.validate(refValues, { abortEarly: false });

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
  };

  const handleFormSubmit = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    const refValues: RefValueType = {
      name: nameRef.current?.value,
      imageUrl: imageFile,
      deliveryDuration: deliverDurationRef.current?.value,
      minOrderVal: parseInt(minOrderValRef.current?.value as string),
      tags: tagsList,
    };

    try {
      const validate = await handleValidateSchema(refValues);

      if (validate) {
        const base64Image = await ConvertToBase64(imageFile as Blob);

        const body: CreateRestaurantModels = {
          _id,
          name: refValues.name as string,
          imageUrl: base64Image,
          deliveryDuration: refValues.deliveryDuration as string,
          minOrderVal: refValues.minOrderVal as number,
          tags: refValues.tags,
          menuType: {},
        };
        const response = await CreateRestaurant(body);
        console.log("response = ", response);
      }
    } catch (error) {
      console.log("err ", error);
    }
  };

  const handleTagsList = (value: string) => {
    const isAlready = tagsList.includes(value);

    if (!isAlready) {
      setTagsList([...tagsList, value]);
    } else {
      setTagsList(tagsList.filter((item) => item !== value));
    }
  };

  const timelineList: TimelineListType[] = TimelineListFinder(accountType);

  useEffect(() => {
    if (createRestaurantData?.statusCode === 201) {
      navigate(routePaths.restaurantHome);
    }
  }, [createRestaurantData]);

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
          <h1 className={defaultStyle.title}>Restaurant Details</h1>
          <form className={defaultStyle.form_card} onSubmit={handleFormSubmit}>
            <h6 className={defaultStyle.image_title}>Profile image</h6>
            <div className={defaultStyle.image_card}>
              <div className={defaultStyle.select_image_card}>
                <label
                  htmlFor="image-file"
                  className={defaultStyle.image_file_label}>
                  <FaPlus size={15} color={colorTheme.light_white} />
                  {imageFile !== undefined && (
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
              <label htmlFor="name" className={defaultStyle.name_label}>
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter restaurant name"
                ref={nameRef}
                className={defaultStyle.name_input}
              />
              <label htmlFor="delivery" className={defaultStyle.name_label}>
                Delivery Duration
              </label>
              <input
                type="text"
                id="delivery"
                name="delivery"
                placeholder="Ex. 30-40 minutes"
                ref={deliverDurationRef}
                className={defaultStyle.name_input}
              />
              <label htmlFor="min-order" className={defaultStyle.name_label}>
                Min. Order Value
              </label>
              <input
                type="number"
                id="min-order"
                name="min-order"
                placeholder="Ex. 143"
                ref={minOrderValRef}
                className={defaultStyle.name_input}
              />
            </div>
            <div className={defaultStyle.tag_card}>
              <h4 className={defaultStyle.tag_title}>Select Tags</h4>
              <ul className={defaultStyle.tag_list_card}>
                {restaurantTagsList.map((item: string, _index) => (
                  <li
                    key={_index}
                    className={`${defaultStyle.tag_list_item} ${
                      tagsList.includes(item) &&
                      defaultStyle.active_tag_list_item
                    }`}
                    onClick={() => handleTagsList(item)}>
                    <p
                      className={`${defaultStyle.tag_list_item_text} ${
                        tagsList.includes(item) &&
                        defaultStyle.active_tag_list_item_text
                      }`}>
                      {item}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            <div className={defaultStyle.button_card}>
              <CustomButton title="Continue" type="submit" variant="primary" />
            </div>
            {validateError.length > 0 && (
              <p className={defaultStyle.error_message}>*{validateError[0]}</p>
            )}
          </form>
        </div>
      </div>
    </MaxWidthLayout>
  );
};

export default RestaurantDetails;
