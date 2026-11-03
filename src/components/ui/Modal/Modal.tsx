import { useId } from "react";
import styles from "./Modal.module.css";
import Button from "../Button/Button";
import Input from "../form/Input/Input";
import PriceRange from "../form/PriceRange/PriceRange";

export interface ModalProps {
  className?: string;
}

export const Modal = ({ className = "" }: ModalProps) => {
  let id = useId();
  return (
    <>
      <button type="button" command="show-modal" commandfor={id}>
        Open modal
      </button>
      <dialog id={id} className={styles.container + " " + className}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <h2>Add Place</h2>
          <p>Save a new restaurant to your Sydney wishlist</p>

          <div>
            <label htmlFor="cuisine">Restaurant Name</label>
            <Input type="text" id="name" name="name" required autoComplete="name" />
          </div>
          <div>
            <label htmlFor="cuisine">Cuisine</label>
            <Input type="text" id="cuisine" name="cuisine" required autoComplete="cuisine" />
          </div>
          <div>
            <label htmlFor="address">Address</label>
            <Input type="text" id="address" name="address" required autoComplete="address" />
          </div>
          <div>
            <label htmlFor="address">Price Tier</label>
            <PriceRange />
          </div>

          <Button type="submit">Send Message</Button>
        </form>
      </dialog>
    </>
  );
};

export default Modal;
