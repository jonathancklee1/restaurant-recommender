import type { RestaurantType } from "../types";

export function sortFavouriteRestaurants(restaurants: RestaurantType[]) {
  return restaurants.sort((a, b) => {
    if (a.isFavourited && !b.isFavourited) {
      return -1;
    } else {
      return 1;
    }
  });
}
