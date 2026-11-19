import styles from "./Modal.module.css";
import { X } from "lucide-react";
import type { MouseEvent, ReactNode, Ref } from "react";

export interface ModalProps {
  id: string;
  children: ReactNode;
  className?: string;
  ref?: Ref<HTMLDialogElement>;
  onClose?: () => void;
}

/** Generic dialog shell with a close button. Closes on backdrop click. */
export const Modal = ({ id, children, className = "", ref, onClose }: ModalProps) => {
  const handleBackdropClick = (e: MouseEvent<HTMLDialogElement>) => {
    if (e.target === e.currentTarget) e.currentTarget.close();
  };

  return (
    <dialog
      id={id}
      className={styles.container + " " + className}
      ref={ref}
      onClick={handleBackdropClick}
      onClose={onClose}
    >
      <button type="button" command="close" commandfor={id} className={styles.closeButton}>
        <X />
      </button>
      {children}
    </dialog>
  );
};

export default Modal;
