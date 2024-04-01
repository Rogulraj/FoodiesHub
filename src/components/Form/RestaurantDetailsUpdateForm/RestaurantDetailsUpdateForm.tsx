import React, {
  FormEvent,
  FormEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import Modal from "react-modal";
import * as Yup from "yup";

//css
import defaultStyle from "./RestaurantDetailsUpdateForm.module.css";
import colorTheme from "@constants/colorTheme";
import { IoClose } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import { useAppSelector } from "../../../redux/store/store";
import { toast } from "react-toastify";
import { YupFormValidator } from "@utils/yupFormValidator";
import { string } from "yup";
import { ConvertToBase64 } from "@helper/base64.helper";
import { useUpdateRestaurantMutation } from "../../../services/restaurant.service";

interface RestaurantDetailsUpdateForm {
  isModal: boolean;
  closeModal: () => void;
  refetch?: () => Promise<void>;
}

const yupValidationSchema = Yup.object({
  name: Yup.string().required("Enter name"),
  imageUrl: Yup.string().required("Please select image"),
});

const RestaurantDetailsUpdateForm = ({
  closeModal,
  isModal,
  refetch,
}: RestaurantDetailsUpdateForm) => {
  const userDetails = useAppSelector((state) => state.userDetails);
  const formRef = useRef<HTMLFormElement>(null);
  const [imageFile, setImageFile] = useState<Blob | string>("");
  const [name, setName] = useState<string>("");
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const [
    UpdateRestaurant,
    { data: updateRestaurantData, isError: isUpdateRestaurantError },
  ] = useUpdateRestaurantMutation();

  const validationErrorSetter = (errors: string[]) => {
    setValidationErrors(errors);
  };

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = async (
    event
  ): Promise<void> => {
    event.preventDefault();
    try {
      const base64Image = await ConvertToBase64(imageFile);

      const validationData = {
        name,
        imageUrl: base64Image,
      };
      const yupValidation = new YupFormValidator(
        yupValidationSchema,
        validationData,
        validationErrorSetter
      );

      const validate = await yupValidation.validate();
      if (validate) {
        await UpdateRestaurant(validationData);
      }
    } catch (error) {
      toast.error("something went wrong!");
    }
  };

  useEffect(() => {
    setName(userDetails.name);
    setImageFile(userDetails.imageUrl);
  }, [userDetails]);

  useEffect(() => {
    if (updateRestaurantData?.statusCode === 200) {
      toast.success("Restaurant updated");
      formRef.current?.reset();
      closeModal();
      if (refetch) {
        refetch()
          .then((val) => val)
          .catch(() => toast.warning("Refresh the page"));
      }
    } else if (isUpdateRestaurantError) {
      toast.warning("Restaurant not updated!");
    }
  }, [updateRestaurantData, isUpdateRestaurantError]);

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

export default RestaurantDetailsUpdateForm;
