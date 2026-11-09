import { useContext } from "react";
import { Bookmark } from "lucide-react";
import styles from "./FavouriteButton.module.css";
import { RestaurantContext } from "../../../context/RestaurantProvider";
import type { RestaurantType } from "../../../utils/types";

export interface FavouriteButtonProps {
  className?: string;
  restaurant: RestaurantType;
}

/** Bookmark toggle that saves the restaurant's favourite state to the store. */
export const FavouriteButton = ({ className = "", restaurant }: FavouriteButtonProps) => {
  const { dispatch } = useContext(RestaurantContext);
  const { id, name, isFavourited } = restaurant;

  function handleToggleFavourite() {
    dispatch([
      "UPDATE_RESTAURANT",
      id,
      {
        ...restaurant,
        isFavourited: !isFavourited,
        favouritedAt: isFavourited ? undefined : new Date().toISOString(),
      },
    ]);
  }

  return (
    <button
      type="button"
      className={`${styles.button} ${className}`}
      aria-label={`Favourite ${name}`}
      aria-pressed={isFavourited}
      onClick={handleToggleFavourite}
    >
      <Bookmark fill={isFavourited ? "var(--primary)" : "var(--text-secondary)"} />
    </button>
  );
};

export default FavouriteButton;
