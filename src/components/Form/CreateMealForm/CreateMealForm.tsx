import React, { FormEventHandler, useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import * as Yup from "yup";

//css
import defaultStyle from "./CreateMealForm.module.css";

//icons
import { IoClose } from "react-icons/io5";
import colorTheme from "@constants/colorTheme";
import { FaPlus } from "react-icons/fa6";
import { ModalType } from "@pages/Restaurant/Menu/RestaurantMenu";
import {
  CreateMenuItemModels,
  MenuType,
} from "../../../models/restaurant.model";
import { useCreateMenuItemMutation } from "../../../services/restaurant.service";
import { ConvertToBase64 } from "@helper/base64.helper";
import { toast } from "react-toastify";
import { SUPABASE_FOLDERS, supabaseClient } from "@utils/supabase";
import appConfig from "@config/index";

//types
export interface ModalFormPropsType {
  isModal: boolean;
  closeModal: (type: ModalType) => void;
  modalType: ModalType;
  refetch: () => Promise<void>;
  menuList: MenuType[];
}
interface RefValuesType {
  category: string | undefined;
  name: string | undefined;
  price: number | undefined;
  description: string | undefined;
  ingredients: string | undefined;
  nutritions: string | undefined;
  imageUrl: string | undefined;
}

const CreateMealForm = ({
  isModal,
  closeModal,
  modalType,
  refetch,
  menuList,
}: ModalFormPropsType): React.ReactElement => {
  const [imageFile, setImageFile] = useState<Blob | undefined>();

  const [validationError, setValidationError] = useState<string[]>([]);

  const [
    CreateMenuItem,
    { data: createMenuItemData, isError: createMenuItemIsError },
  ] = useCreateMenuItemMutation();

  const formRef = useRef<HTMLFormElement>(null);
  const categoryRef = useRef<HTMLSelectElement>("lunch");
  const nameRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const ingredientsRef = useRef<HTMLInputElement>(null);
  const nutritionsRef = useRef<HTMLInputElement>(null);

  const validationSchema = Yup.object({
    category: Yup.string().required("please select category"),
    name: Yup.string().required("please enter name"),
    price: Yup.number().required("please enter price"),
    description: Yup.string().required("please enter description"),
    ingredients: Yup.string().required("please enter ingredients"),
    nutritions: Yup.string().required("please enter nutrition"),
    imageUrl: Yup.mixed().required("please select image"),
  });

  const handleFormValidation = async (
    refValues: RefValuesType
  ): Promise<boolean> => {
    try {
      await validationSchema.validate(refValues, { abortEarly: false });

      setValidationError([]);
      return true;
    } catch (error) {
      const newErrors: string[] = [];
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      error?.inner?.map((item: { message: string }) =>
        newErrors.push(item.message)
      );

      setValidationError(newErrors);
      return false;
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  const handleFormSubmit: FormEventHandler<HTMLFormElement> = async (
    event
  ): Promise<void> => {
    event.preventDefault();

    const category = categoryRef.current?.value;
    const name = nameRef.current?.value;
    const price = priceRef.current?.value;
    const description = descriptionRef.current?.value;
    const ingredients = ingredientsRef.current?.value;
    const nutritions = nutritionsRef.current?.value;

    try {

      let imageUrl = "";

      // Upload image to Supabase storage if a file is selected
      if (imageFile) {
        const fileExt = imageFile.name.split(".").pop();
        const fileName = `image-${Date.now()}.${fileExt}`;
        const filePath = `${SUPABASE_FOLDERS.FOODS}/${fileName}`;

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


      const refValues: RefValuesType = {
        category,
        name,
        price: parseInt(price as string),
        description,
        ingredients,
        nutritions,
        imageUrl,
      };

      const validate = await handleFormValidation(refValues);

      if (validate) {
        // setting form data
        const body: CreateMenuItemModels = {
          category: refValues.category as string,
          item: {
            name: refValues.name as string,
            price: refValues.price as number,
            description: refValues.description as string,
            imageUrl,
            ingredients: refValues.ingredients as string,
            nutritions: refValues.nutritions as string,
          },
        };

        // api call
        await CreateMenuItem(body);
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };
  useEffect(() => {
    Modal.setAppElement("body");
  }, []);

  useEffect(() => {
    if (createMenuItemData?.statusCode === 201) {
      toast.success("Meal Added!");
      formRef.current?.reset();
      setImageFile(undefined);
      closeModal("meal");
      refetch()
        .then((val) => val)
        .catch((err) => {
          console.log(err);
        });
    } else if (createMenuItemIsError) {
      toast.error("Something went wrong!");
    }
  }, [createMenuItemData, createMenuItemIsError]);

  return (
    <Modal
      isOpen={isModal && modalType === "meal"}
      onRequestClose={() => closeModal("meal")}
      style={{
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          borderRadius: "30px",
          backgroundColor: "#fff",
        },
        overlay: { backgroundColor: "rgba(0, 0, 0, .5)" },
      }}
      contentLabel="Form Modal"
      //   closeTimeoutMS={200}
      ariaHideApp={false}>
      <div className={defaultStyle.main_layout}>
        <div className={defaultStyle.title_card}>
          <h4 className={defaultStyle.title}>Create meal item</h4>
          <IoClose
            size={30}
            color={colorTheme.light_white}
            onClick={() => closeModal("meal")}
          />
        </div>
        <form onSubmit={handleFormSubmit} ref={formRef}>
          <h6 className={defaultStyle.form_label_text}>Meal images</h6>
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
            <div className={defaultStyle.select_category_card}>
              <label
                htmlFor="category"
                className={defaultStyle.select_category_label}>
                Select Category
              </label>
              <select
                name="category"
                id="category"
                ref={categoryRef}
                className={defaultStyle.select_category_input}>
                {menuList?.map((item, _index) => (
                  <option
                    key={_index}
                    value={item.category}
                    className={defaultStyle.select_category_option}>
                    {item.category}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className={defaultStyle.input_card}>
            <div className={defaultStyle.name_price_input_card}>
              <div className={defaultStyle.column}>
                <label htmlFor="name" className={defaultStyle.form_label_text}>
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter Meal Name"
                  className={defaultStyle.name_input}
                  ref={nameRef}
                />
              </div>
              <div className={defaultStyle.column}>
                <label htmlFor="price" className={defaultStyle.form_label_text}>
                  Price
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  placeholder="Enter Meal Price"
                  className={defaultStyle.name_input}
                  ref={priceRef}
                />
              </div>
            </div>
            <label
              htmlFor="description"
              className={defaultStyle.form_label_text}>
              Description
            </label>
            <input
              type="text"
              id="description"
              name="description"
              placeholder="Enter Meal Description"
              className={defaultStyle.name_input}
              ref={descriptionRef}
            />
            <div className={defaultStyle.name_price_input_card}>
              <div className={defaultStyle.column}>
                <label
                  htmlFor="ingredients"
                  className={defaultStyle.form_label_text}>
                  Ingredients
                </label>
                <input
                  type="text"
                  id="ingredients"
                  name="ingredients"
                  placeholder="Enter Meal ingredients"
                  className={defaultStyle.name_input}
                  ref={ingredientsRef}
                />
              </div>
              <div className={defaultStyle.column}>
                <label
                  htmlFor="nutrition"
                  className={defaultStyle.form_label_text}>
                  Nutritional Value
                </label>
                <input
                  type="text"
                  id="nutrition"
                  name="nutrition"
                  placeholder="Enter Meal Nutritional Value"
                  className={defaultStyle.name_input}
                  ref={nutritionsRef}
                />
              </div>
            </div>
          </div>
          {validationError.length > 0 && (
            <p className={defaultStyle.error_message}>*{validationError[0]}</p>
          )}
          <div className={defaultStyle.button_card}>
            <button
              type="button"
              onClick={() => {
                closeModal("meal");
                setImageFile(undefined);
              }}
              className={defaultStyle.cancel_btn}>
              cancel
            </button>
            <button type="submit" className={defaultStyle.submit_btn}>
              Publish meal item
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default CreateMealForm;
