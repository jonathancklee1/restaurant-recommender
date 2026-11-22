import React, { useContext, type Dispatch } from "react";
import styles from "./VisitsCounter.module.css";
import { RestaurantContext } from "../../context/RestaurantProvider";
import type { RestaurantType } from "../../utils/types";

export interface VisitsCounterProps {
  children?: React.ReactNode;
  className?: string;
  count?: number;
  setCount?: Dispatch<React.SetStateAction<number | undefined>>;
  visitId: string;
}

export const VisitsCounter = ({ className = "", visitId }: VisitsCounterProps) => {
  const { state, dispatch } = useContext(RestaurantContext);
  const restaurant = state.find((restaurant) => restaurant.id === visitId);
  function handleAddVisit() {
    dispatch([
      "UPDATE_RESTAURANT",
      visitId,
      {
        ...restaurant,
        visits: restaurant && restaurant.visits !== undefined && restaurant?.visits + 1,
      } as RestaurantType,
    ]);
  }
  function handleRemoveVisit() {
    dispatch([
      "UPDATE_RESTAURANT",
      visitId,
      {
        ...restaurant,
        visits: restaurant && restaurant.visits !== undefined && restaurant?.visits - 1,
      } as RestaurantType,
    ]);
  }
  return (
    <div className={`${styles.container} ${className}`}>
      <p>Visits </p>
      <div className={styles.counterContainer}>
        <button onClick={handleRemoveVisit} className={styles.counterButton}>
          -
        </button>
        <span className={styles.counterNumber}>{restaurant?.visits ?? 0}</span>
        <button onClick={handleAddVisit} className={styles.counterButton}>
          +
        </button>
      </div>
    </div>
  );
};

export default VisitsCounter;
