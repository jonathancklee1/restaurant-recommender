import { createContext, useState, type ReactNode } from "react";
import type { RestaurantType } from "../utils/types";

export const RestaurantMapContext = createContext<{
  restaurantMap: RestaurantType | null;
  isDrawerOpen: boolean;
  showOnMap: (restaurant: RestaurantType) => void;
  closeDrawer: () => void;
}>({
  restaurantMap: null,
  isDrawerOpen: false,
  showOnMap: () => {},
  closeDrawer: () => {},
});

/** Holds the restaurant shown on the map and whether the mobile drawer is open. */
export function RestaurantMapProvider({ children }: { children: ReactNode }) {
  const [restaurantMap, setRestaurantMap] = useState<RestaurantType | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const showOnMap = (restaurant: RestaurantType) => {
    setRestaurantMap(restaurant);
    setIsDrawerOpen(true);
  };

  return (
    <RestaurantMapContext.Provider
      value={{ restaurantMap, isDrawerOpen, showOnMap, closeDrawer: () => setIsDrawerOpen(false) }}
    >
      {children}
    </RestaurantMapContext.Provider>
  );
}
