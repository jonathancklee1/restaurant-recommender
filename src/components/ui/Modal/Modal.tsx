import styles from "./Modal.module.css";
import Button from "../Button/Button";
import Input from "../form/Input/Input";
import PriceRange from "../form/PriceRange/PriceRange";
import RatingInput from "../form/RatingInput/RatingInput";
import TextArea from "../form/TextArea/TextArea";
import { X } from "lucide-react";
import type { RestaurantType } from "../../../utils/types";
import { useRef, type MouseEvent } from "react";

export interface ModalProps {
  className?: string;
  initialPlace?: Partial<RestaurantType>;
}
export const modalId = "restaurant-modal";
export const Modal = ({ className = "", initialPlace }: ModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const closeModal = () => dialogRef.current?.close();

  const handleBackdropClick = (e: MouseEvent<HTMLDialogElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };
  return (
    <>
      <dialog
        id={modalId}
        className={styles.container + " " + className}
        ref={dialogRef}
        onClick={(e) => handleBackdropClick(e)}
      >
        <button type="button" command="close" commandfor={modalId} className={styles.closeButton}>
          <X />
        </button>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <h2>{initialPlace ? "Edit" : "Add"} Place</h2>
          <p>
            {initialPlace
              ? "Edit details of your saved restaurant"
              : "Save a new restaurant to your Sydney wishlist"}
          </p>

          <div>
            <label htmlFor="name">Restaurant Name</label>
            <Input
              type="text"
              id="name"
              name="name"
              required
              autoComplete="name"
              value={initialPlace?.name}
            />
          </div>
          <div>
            <label htmlFor="cuisine">Cuisine</label>
            <Input
              type="text"
              id="cuisine"
              name="cuisine"
              required
              autoComplete="cuisine"
              value={initialPlace?.cuisine}
            />
          </div>
          <div>
            <label htmlFor="address">Address</label>
            <Input
              type="text"
              id="address"
              name="address"
              required
              autoComplete="address"
              value={initialPlace?.suburb}
            />
          </div>
          <div>
            <label htmlFor="price">Price Tier</label>
            <PriceRange initialPrice={initialPlace?.price} />
          </div>
          <div>
            <label htmlFor="rating">Rating</label>
            <RatingInput changeRating={() => {}} initialValue={initialPlace?.rating} />
          </div>
          <div>
            <label htmlFor="address">Comments</label>
            <TextArea content={initialPlace?.comments} />
          </div>

          <Button type="submit">Add Place</Button>
        </form>
      </dialog>
    </>
  );
};

export default Modal;
