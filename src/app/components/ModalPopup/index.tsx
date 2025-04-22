import "./index.scss";

import { ReactNode, useEffect } from "react";
import ReactModal from "react-modal";
import Image from "next/image";

import { useBasePath } from "@/app/utils/useBasePath";

interface ModalPopupProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  styles?: {
    width?: string;
    height?: string;
  };
}

const ModalPopup = ({ isOpen, onClose, children, styles }: ModalPopupProps) => {
  const parentId = "main-app";
  const closeIconPath = useBasePath("/icons/close.svg");

  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      zIndex: 1000,
    },
    content: {
      padding: 0,
      width: styles?.width || "80%",
      height: styles?.height || "80%",
      //to center the modal
      inset: "0px",
      margin: "auto",
    },
  };

  useEffect(() => {
    ReactModal.setAppElement(`#${parentId}`);
  }, []);

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      parentSelector={() => document.getElementById(parentId) || document.body}
    >
      <div className="comp-modal-popup">
        <div className="icon-close" onClick={onClose}>
          <Image src={closeIconPath} alt="close" width={20} height={20} />
        </div>
        {children}
      </div>
    </ReactModal>
  );
};

export default ModalPopup;
