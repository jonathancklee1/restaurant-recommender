import styles from "./Modal.module.css";
import Button from "../Button/Button";
import Input from "../form/Input/Input";
import PriceRange from "../form/PriceRange/PriceRange";
import RatingInput from "../form/RatingInput/RatingInput";
import TextArea from "../form/TextArea/TextArea";
import { X } from "lucide-react";
import type { RestaurantType } from "../../../utils/types";
import { useContext, useId, useRef, useState, type MouseEvent } from "react";

import { RestaurantContext } from "../../../context/RestaurantProvider";

export interface ModalProps {
  className?: string;
  initialPlace?: RestaurantType;
}
export const modalId = "restaurant-modal";
export const Modal = ({ className = "", initialPlace }: ModalProps) => {
  const id = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [restaurant, setRestaurant] = useState<RestaurantType>(
    initialPlace || {
      id: id,
      name: "",
      cuisine: "",
      address: "",
      price: "$",
      rating: 0,
      comments: "",
    },
  );
  const { dispatch } = useContext(RestaurantContext);
  console.log(initialPlace, "Add restaurant");
  function addRestaurant(restaurant: RestaurantType) {
    dispatch(["ADD_RESTAURANT", restaurant]);
  }
  const closeModal = () => dialogRef.current?.close();

  const handleBackdropClick = (e: MouseEvent<HTMLDialogElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
      setRestaurant({
        id: id,
        name: "",
        cuisine: "",
        address: "",
        price: "$",
        rating: 0,
        comments: "",
      });
    }
  };
  const onFormSubmit = () => {
    addRestaurant(restaurant);
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
            onFormSubmit();
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
              value={restaurant?.name}
              onChange={(e) => {
                setRestaurant({ ...restaurant, name: e.target.value });
              }}
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
              value={restaurant?.cuisine}
              onChange={(e) => {
                setRestaurant({ ...restaurant, cuisine: e.target.value });
              }}
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
              value={restaurant?.suburb}
              onChange={(e) => {
                setRestaurant({ ...restaurant, address: e.target.value });
              }}
            />
          </div>
          <div>
            <label htmlFor="price">Price Tier</label>
            <PriceRange initialPrice={restaurant?.price} />
          </div>
          <div>
            <label htmlFor="rating">Rating</label>
            <RatingInput changeRating={() => {}} initialValue={restaurant?.rating} />
          </div>
          <div>
            <label htmlFor="address">Comments</label>
            <TextArea
              content={restaurant?.comments}
              onChange={(e) => {
                setRestaurant({ ...restaurant, comments: e.target.value });
              }}
            />
          </div>

          <Button type="submit">Add Place</Button>
        </form>
      </dialog>
    </>
  );
};

export default Modal;
