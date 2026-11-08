import React, { memo } from "react";
import { Utensils } from "lucide-react";
import styles from "./MobileList.module.css";
import Card from "../../Card/Card";
import type { RestaurantFilters, RestaurantType } from "../../../../utils/types";
import { filterRestaurants } from "../../../../utils/helpers/filterRestaurants";
import { sortFavouriteRestaurants } from "../../../../utils/helpers/sortFavouriteRestaurants";

export interface MobileListProps {
  children?: React.ReactNode;
  className?: string;
  restaurants: RestaurantType[];
  deferredFilters: RestaurantFilters;
}

/** Mobile card list. Memoised so it only re-renders when the deferred filters catch up. */
export const MobileList = memo(function MobileList({
  className = "",
  restaurants,
  deferredFilters,
}: MobileListProps) {
  const listItems = sortFavouriteRestaurants(filterRestaurants(restaurants, deferredFilters));

  return (
    <ul className={`${styles.container} ${className}`}>
      {listItems.length === 0 && (
        <li className={styles.empty}>
          <Utensils className={styles.emptyIcon} />
          <span>No Restaurants</span>
        </li>
      )}
      {listItems.map((restaurant) => (
        <li key={restaurant.id}>
          <Card restaurant={restaurant} />
        </li>
      ))}
    </ul>
  );
});

export default MobileList;
