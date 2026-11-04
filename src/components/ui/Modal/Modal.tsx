import styles from "./Modal.module.css";
import { X } from "lucide-react";
import type { RestaurantType } from "../../../utils/types";
import { useContext, useRef, type MouseEvent } from "react";
import RestaurantForm from "../RestaurantForm/RestaurantForm";
import { SelectedRestaurantContext } from "../../../context/SelectedRestaurantProvider";

export interface ModalProps {
  className?: string;
  initialPlace?: RestaurantType | null;
}
export const modalId = "restaurant-modal";

/** Dialog shell for adding or editing a restaurant. */
export const Modal = ({ className = "", initialPlace }: ModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { setSelectedRestaurant } = useContext(SelectedRestaurantContext);
  const closeModal = () => dialogRef.current?.close();

  const handleBackdropClick = (e: MouseEvent<HTMLDialogElement>) => {
    if (e.target === e.currentTarget) closeModal();
  };

  return (
    <dialog
      id={modalId}
      className={styles.container + " " + className}
      ref={dialogRef}
      onClick={handleBackdropClick}
      onClose={() => setSelectedRestaurant(null)}
    >
      <button type="button" command="close" commandfor={modalId} className={styles.closeButton}>
        <X />
      </button>
      <RestaurantForm
        key={initialPlace?.id ?? "new"}
        initialPlace={initialPlace}
        onDone={closeModal}
      />
    </dialog>
  );
};

export default Modal;
