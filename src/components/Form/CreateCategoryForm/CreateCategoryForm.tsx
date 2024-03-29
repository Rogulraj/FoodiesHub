//packages
import { FormEvent, useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import * as Yup from "yup";

//css
import defaultStyle from "./CreateCategoryForm.module.css";
import { ModalType } from "@pages/Restaurant/Menu/RestaurantMenu";
import { IoClose } from "react-icons/io5";
import colorTheme from "@constants/colorTheme";
import { useCreateMenuTypeMutation } from "../../../services/restaurant.service";
import { CreateMenuCategoryModels } from "../../../models/restaurant.model";
import { toast } from "react-toastify";

//types
export interface CategoryFormPropsType {
  isModal: boolean;
  closeModal: (type: ModalType) => void;
  modalType: ModalType;
  refetch: () => Promise<void>;
}

interface RefValues {
  category: string | undefined;
}

// React Elements
const CreateCategoryForm = ({
  closeModal,
  isModal,
  modalType,
  refetch,
}: CategoryFormPropsType) => {
  const categoryRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [validationError, setValidationError] = useState<string[]>([]);

  const [
    CreateMenu,
    {
      data: createMenuData,
      error: createMenuError,
      isError: createMenuIsError,
    },
  ] = useCreateMenuTypeMutation();

  const validationSchema = Yup.object({
    category: Yup.string().required("Enter category"),
  });

  const handleFormValidation = async (
    validationData: RefValues
  ): Promise<boolean> => {
    try {
      await validationSchema.validate(validationData, { abortEarly: false });

      setValidationError([]);
      return true;
    } catch (error) {
      const newErrors: string[] = [];

      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      await error?.inner?.map((err: { message: string }) => {
        newErrors.push(err.message);
      });

      setValidationError(newErrors);
      return false;
    }
  };

  const handleFormSubmit = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    const validationData = {
      category: categoryRef.current?.value,
    };

    try {
      const validate = await handleFormValidation(validationData);

      if (validate) {
        const menuCategory: CreateMenuCategoryModels = {
          category: validationData.category as string,
        };
        await CreateMenu(menuCategory);
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  useEffect(() => {
    if (createMenuData?.statusCode === 201) {
      toast.success("Category Added");
      formRef?.current?.reset();
      closeModal("category");
      refetch()
        .then((val) => val)
        .catch((error) => console.log(error));
    } else if (createMenuIsError) {
      toast.error("Something went wrong!");
    }
  }, [createMenuData, createMenuIsError]);

  useEffect(() => {
    Modal.setAppElement("body");
  }, []);

  return (
    <Modal
      isOpen={isModal && modalType === "category"}
      onRequestClose={() => closeModal("category")}
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
          <h4 className={defaultStyle.title}>Create category</h4>
          <IoClose
            size={30}
            color={colorTheme.light_white}
            onClick={() => closeModal("category")}
          />
        </div>
        <form
          className={defaultStyle.form_card}
          ref={formRef}
          onSubmit={handleFormSubmit}>
          <label htmlFor="category" className={defaultStyle.category_label}>
            Category
          </label>
          <input
            id="category"
            name="category"
            type="text"
            placeholder="Enter category"
            ref={categoryRef}
            className={defaultStyle.category_input}
          />
          {validationError.length > 0 && (
            <p className={defaultStyle.error_message}>*{validationError[0]}</p>
          )}
          <div className={defaultStyle.submit_btn_card}>
            <button type="submit" className={defaultStyle.submit_btn}>
              Create
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default CreateCategoryForm;
