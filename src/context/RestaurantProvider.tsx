import { createContext, useReducer, type Dispatch, type ReactNode } from "react";
import { INITIAL_RESTAURANTS } from "../utils/constants";
import { restaurantReducer, type RestaurantActions } from "../store/RestaurantStore";
import type { RestaurantType } from "../utils/types";

export interface RestaurantContextValue {
  state: RestaurantType[];
  dispatch: Dispatch<RestaurantActions>;
}

/** Restaurant list state and its dispatch, shared app-wide. */
export const RestaurantContext = createContext<RestaurantContextValue>({
  state: INITIAL_RESTAURANTS,
  dispatch: () => {},
});

export function RestaurantProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(restaurantReducer, INITIAL_RESTAURANTS);

  return <RestaurantContext value={{ state, dispatch }}>{children}</RestaurantContext>;
}
