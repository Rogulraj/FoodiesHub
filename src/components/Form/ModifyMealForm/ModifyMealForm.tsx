import React, {
  FC,
  FormEvent,
  FormEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import { IoClose } from "react-icons/io5";
import Modal from "react-modal";
import { MenuCategoryItems } from "src/models/restaurant.model";

import defaultStyle from "./ModifyMealForm.module.css";
import colorTheme from "@constants/colorTheme";
import { FaPlus } from "react-icons/fa";
import * as Yup from "yup";
import { YupFormValidator } from "@utils/yupFormValidator";
import { toast } from "react-toastify";
import { useUpdateFoodByIdMutation } from "../../../services/restaurant.service";
import { useAppSelector } from "../../../redux/store/store";
import { ConvertToBase64 } from "@helper/base64.helper";
import { GetCookies } from "@helper/cookies.helper";

interface MenuCategoryItemsWithCategory extends MenuCategoryItems {
  categoryId: string;
}

interface ModifyMealFormProps {
  isModal: boolean;
  closeModal: () => void;
  refetch?: () => Promise<void>;
  foodItem: MenuCategoryItemsWithCategory;
}

const validationSchema = Yup.object({
  imageUrl: Yup.mixed(),
  name: Yup.string().required("Please enter a name"),
  price: Yup.number()
    .min(1, "Price must be at least 1")
    .required("Please enter a price")
    .typeError("Provide valid Input."),
  description: Yup.string().required("Please enter a description"),
  ingredients: Yup.string().required("Please enter ingredients"),
  nutritions: Yup.string().required("Please enter nutrition information"),
});

const ModifyMealForm: FC<ModifyMealFormProps> = ({
  closeModal,
  isModal,
  foodItem,
  refetch,
}) => {
  const [imageFile, setImageFile] = useState<Blob | string>(foodItem.imageUrl);
  const [name, setName] = useState<string>(foodItem.name);
  const [price, setPrice] = useState<number>(foodItem.price);
  const [description, setDescription] = useState<string>(foodItem.description);
  const [ingredients, setIngredients] = useState<string>(foodItem.ingredients);
  const [nutritions, setNutritions] = useState<string>(foodItem.nutritions);

  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const formRef = useRef<HTMLFormElement>(null);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const restaurantId: string = GetCookies("restaurantId");

  const [
    UpdateFood,
    {
      data: updatedFoodData,
      error: updatedFoodError,
      isError: updatedFoodIsError,
    },
  ] = useUpdateFoodByIdMutation();

  console.log(updatedFoodData, updatedFoodError, updatedFoodIsError);

  const validationErrorSetter = (errors: string[]) => {
    setValidationErrors(errors);
  };

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = async (
    event
  ): Promise<void> => {
    event.preventDefault();
    try {
      const validateData = {
        name,
        imageFile,
        price,
        description,
        ingredients,
        nutritions,
      };
      const yupValidation = new YupFormValidator(
        validationSchema,
        validateData,
        validationErrorSetter
      );
      const isValidate = await yupValidation.validate();
      if (isValidate) {
        const imageUrl: string = await ConvertToBase64(imageFile as Blob);

        await UpdateFood({
          foodId: foodItem._id as string,
          restaurantId,
          categoryId: foodItem.categoryId,
          item: {
            description,
            imageUrl,
            ingredients,
            name,
            nutritions,
            price,
          },
        });
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  useEffect(() => {
    if (updatedFoodData?.statusCode === 200) {
      formRef.current?.reset();
      toast.success("Meal updated!");
      closeModal();
      if (refetch) {
        refetch()
          .then((val) => val)
          .catch(() => toast.info("Re-fresh the page"));
      } else if (updatedFoodIsError) {
        toast.error("Something went wrong!");
      }
    }
  }, [updatedFoodData, updatedFoodIsError]);

  useEffect(() => {
    Modal.setAppElement("body");
  }, []);

  return (
    <Modal
      isOpen={isModal}
      onRequestClose={() => closeModal()}
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
          <h4 className={defaultStyle.title}>Modify meal item</h4>
          <IoClose
            size={30}
            color={colorTheme.light_white}
            onClick={() => closeModal()}
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
                {typeof imageFile !== "string" ? (
                  <img
                    src={URL.createObjectURL(imageFile)}
                    alt="selected-img"
                    className={defaultStyle.selected_image_style}
                  />
                ) : (
                  <img
                    src={imageFile}
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
              onChange={(e) => setImageFile(e?.target?.files[0] || undefined)}
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
                  value={name}
                  onChange={(e) => setName(e?.target?.value)}
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
                  value={price === 0 ? "" : price}
                  onChange={(e) => setPrice(parseInt(e?.target?.value || "0"))}
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
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
                  value={ingredients}
                  onChange={(e) => setIngredients(e?.target?.value)}
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
                  value={nutritions}
                  onChange={(e) => setNutritions(e?.target?.value)}
                />
              </div>
            </div>
          </div>
          {validationErrors.length > 0 && (
            <p className={defaultStyle.error_message}>*{validationErrors[0]}</p>
          )}
          <div className={defaultStyle.button_card}>
            <button
              type="button"
              onClick={() => {
                closeModal();
                setImageFile("");
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

export default ModifyMealForm;
