import React, { FormEventHandler, useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import * as Yup from "yup";

//css
import defaultStyle from "./CreateMealForm.module.css";

//icons
import { IoClose } from "react-icons/io5";
import colorTheme from "@constants/colorTheme";
import { FaPlus } from "react-icons/fa6";

//types
export interface ModalFormPropsType {
  isModal: boolean;
  closeModal: () => void;
}

const CreateMealForm = ({
  isModal,
  closeModal,
}: ModalFormPropsType): React.ReactElement => {
  const [imageFile, setImageFile] = useState<File>();

  const nameRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const ingredientsRef = useRef<HTMLInputElement>(null);
  const nutritionRef = useRef<HTMLInputElement>(null);

  const validationSchema = Yup.object({
    name: Yup.string().required("please enter name"),
    price: Yup.string().required("please enter price"),
    description: Yup.string().required("please enter description"),
    ingredients: Yup.string().required("please enter ingredients"),
    nutrition: Yup.string().required("please enter nutrition"),
    imageFile: Yup.mixed().required("please select image"),
  });

  type FormDataType = Yup.InferType<typeof validationSchema>;

  const handleFormValidation = async (
    formData: FormDataType
  ): Promise<boolean> => {
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      return true;
    } catch (error) {
      console.log("error = ", error);
      return false;
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  const handleFormSubmit: FormEventHandler<HTMLFormElement> = async (
    event
  ): Promise<void> => {
    event.preventDefault();

    const name = nameRef.current?.value;
    const price = priceRef.current?.value;
    const description = descriptionRef.current?.value;
    const ingredients = ingredientsRef.current?.value;
    const nutrition = nutritionRef.current?.value;

    if (name && price && description && ingredients && nutrition && imageFile) {
      const formData: FormDataType = {
        name,
        price,
        description,
        ingredients,
        nutrition,
        imageFile,
      };

      const validate = await handleFormValidation(formData);

      // if (validate) {
      // }
    }
  };

  useEffect(() => {
    Modal.setAppElement("body");
  }, []);
  return (
    <Modal
      isOpen={isModal}
      onRequestClose={closeModal}
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
          <IoClose size={30} color={colorTheme.light_white} />
        </div>
        <form onSubmit={handleFormSubmit}>
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
                  ref={nutritionRef}
                  // value={nutritionRef.current?.value}
                />
              </div>
            </div>
          </div>
          <div className={defaultStyle.button_card}>
            <button
              type="button"
              onClick={closeModal}
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
