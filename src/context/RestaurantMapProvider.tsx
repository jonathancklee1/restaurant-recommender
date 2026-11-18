import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { RestaurantType } from "../utils/types";
import { RestaurantContext } from "./RestaurantProvider";

/** The restaurant shown on the map and whether the mobile drawer is open. */
export const RestaurantMapContext = createContext<{
  restaurantMap: RestaurantType | null;
  isDrawerOpen: boolean;
}>({
  restaurantMap: null,
  isDrawerOpen: false,
});

/** Map actions, kept separate and stable so buttons using them don't re-render on map changes. */
export const RestaurantMapActionsContext = createContext<{
  showOnMap: (id: string) => void;
  closeDrawer: () => void;
}>({
  showOnMap: () => {},
  closeDrawer: () => {},
});

export function RestaurantMapProvider({ children }: { children: ReactNode }) {
  const { state } = useContext(RestaurantContext);
  const [mapId, setMapId] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Look up by id so edits and deletes show on the map straight away.
  const restaurantMap = state.find((restaurant) => restaurant.id === mapId) ?? null;

  const actions = useMemo(
    () => ({
      showOnMap: (id: string) => {
        setMapId(id);
        setIsDrawerOpen(true);
      },
      closeDrawer: () => setIsDrawerOpen(false),
    }),
    [],
  );

  return (
    <RestaurantMapActionsContext value={actions}>
      <RestaurantMapContext value={{ restaurantMap, isDrawerOpen }}>
        {children}
      </RestaurantMapContext>
    </RestaurantMapActionsContext>
  );
}
