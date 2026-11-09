import { createContext, useState, type ReactNode } from "react";
import type { RestaurantType } from "../utils/types";

export const RestaurantMapContext = createContext<{
  restaurantMap: RestaurantType | null;
  setRestaurantMap: (map: RestaurantType | null) => void;
}>({
  restaurantMap: null,
  setRestaurantMap: () => {},
});
export function RestaurantMapProvider({ children }: { children: ReactNode }) {
  const [restaurantMap, setRestaurantMap] = useState<RestaurantType | null>(null);

  return (
    <RestaurantMapContext.Provider value={{ restaurantMap, setRestaurantMap }}>
      {children}
    </RestaurantMapContext.Provider>
  );
}
