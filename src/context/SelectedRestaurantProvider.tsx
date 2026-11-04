import { createContext, type ReactNode, useState } from "react";
import type { RestaurantType } from "../utils/types";

export const SelectedRestaurantContext = createContext<{
  selectedRestaurant: RestaurantType | null;
  setSelectedRestaurant: (restaurant: RestaurantType | null) => void;
}>({
  selectedRestaurant: null,
  setSelectedRestaurant: () => {},
});

export function SelectedRestaurantProvider({ children }: { children: ReactNode }) {
  const [selectedRestaurant, setSelectedRestaurant] = useState<RestaurantType | null>(null);

  return (
    <SelectedRestaurantContext.Provider value={{ selectedRestaurant, setSelectedRestaurant }}>
      {children}
    </SelectedRestaurantContext.Provider>
  );
}
