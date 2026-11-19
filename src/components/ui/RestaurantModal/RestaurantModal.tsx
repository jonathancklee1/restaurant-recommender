import { useContext, useRef, useState } from "react";
import Modal from "../Modal/Modal";
import RestaurantForm from "../RestaurantForm/RestaurantForm";
import type { RestaurantType } from "../../../utils/types";
import { SelectedRestaurantContext } from "../../../context/SelectedRestaurantProvider";

export interface RestaurantModalProps {
  initialPlace?: RestaurantType | null;
}
export const restaurantModalId = "restaurant-modal";

/** Modal for adding or editing a restaurant. */
export const RestaurantModal = ({ initialPlace }: RestaurantModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { setSelectedRestaurant } = useContext(SelectedRestaurantContext);
  const [formVersion, setFormVersion] = useState(0);

  /** Closes the dialog and remounts the form so every input starts fresh. */
  const resetAndClose = () => {
    setFormVersion((v) => v + 1);
    dialogRef.current?.close();
  };

  return (
    <Modal id={restaurantModalId} ref={dialogRef} onClose={() => setSelectedRestaurant(null)}>
      <RestaurantForm
        key={`${initialPlace?.id ?? "new"}-${formVersion}`}
        initialPlace={initialPlace}
        onDone={resetAndClose}
      />
    </Modal>
  );
};

export default RestaurantModal;
