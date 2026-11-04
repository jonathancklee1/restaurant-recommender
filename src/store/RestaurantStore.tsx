import { INITIAL_RESTAURANTS } from "../utils/constants";
import type { RestaurantType } from "../utils/types";

/** Actions as tuples: [type, ...payload]. */
export type RestaurantActions =
  | AddRestaurantAction
  | RemoveRestaurantAction
  | UpdateRestaurantAction
  | ClearRestaurantsAction;

type AddRestaurantAction = ["ADD_RESTAURANT", RestaurantType];
type RemoveRestaurantAction = ["REMOVE_RESTAURANT", string];
type UpdateRestaurantAction = ["UPDATE_RESTAURANT", string, RestaurantType];
type ClearRestaurantsAction = ["CLEAR_RESTAURANTS"];

export function restaurantReducer(
  state: RestaurantType[],
  action: RestaurantActions,
): RestaurantType[] {
  switch (action[0]) {
    case "ADD_RESTAURANT": {
      //["ADD_RESTAURANT", {}]
      const updatedItems = [...state, action[1]];
      console.log(updatedItems, "Added restaurant");
      return updatedItems;
    }
    case "REMOVE_RESTAURANT": {
      //["REMOVE_RESTAURANT", "id"]
      const itemIndex = state.findIndex((item) => item.id === action[1]);
      if (itemIndex === -1) return state;

      const updatedItems = state.filter((_, index) => index !== itemIndex);
      return updatedItems;
    }
    case "UPDATE_RESTAURANT": {
      //["UPDATE_RESTAURANT", "id", {}]
      const newArray = state.map((item) => {
        if (item.id === action[1]) {
          return { ...item, ...action[2] };
        } else {
          return item;
        }
      });
      return newArray;
    }
    case "CLEAR_RESTAURANTS":
      return INITIAL_RESTAURANTS;
    default:
      return state;
  }
}
