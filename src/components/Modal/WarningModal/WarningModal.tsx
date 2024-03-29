import { useEffect } from "react";
import Modal from "react-modal";

import defaultStyle from "./WarningModal.module.css";
import { IoClose } from "react-icons/io5";
import colorTheme from "@constants/colorTheme";

interface WarningModalProps {
  description: string;
  isOpen: boolean;
  closeModal: () => void;
  handleSure?: () => void | Promise<void>;
  handleCancle?: () => void | Promise<void>;
}

const WarningModal = ({
  description,
  isOpen,
  closeModal,
  handleSure,
  handleCancle,
}: WarningModalProps) => {
  useEffect(() => {
    Modal.setAppElement("body");
  }, []);

  const handleClickSure = async (): Promise<void> => {
    if (handleSure) await Promise.resolve(handleSure());
    closeModal();
  };

  const handleClickCancel = async (): Promise<void> => {
    if (handleCancle) await Promise.resolve(handleCancle());
    closeModal();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => closeModal()}
      style={{
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          transform: "translate(-50%, -50%)",
          borderRadius: "20px",
          backgroundColor: "#fff",
          paddingTop: "0px",
        },
        overlay: { backgroundColor: "rgba(0, 0, 0, .5)" },
      }}
      contentLabel="Form Modal"
      ariaHideApp={false}>
      <div className={defaultStyle.main_layout}>
        <div className={defaultStyle.title_close_btn_card}>
          <h4 className={defaultStyle.description}>{description}</h4>
          <IoClose
            size={25}
            color={colorTheme.light_white}
            onClick={() => closeModal()}
          />
        </div>
        <div className={defaultStyle.btn_card}>
          <button
            type="button"
            className={defaultStyle.sure_btn}
            onClick={handleClickSure}>
            sure
          </button>
          <button
            type="button"
            className={defaultStyle.cancel_btn}
            onClick={handleClickCancel}>
            cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default WarningModal;
