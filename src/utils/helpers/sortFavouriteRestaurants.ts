import type { RestaurantType } from "../types";

/** Favourites first, most recently favourited on top. Others keep their order. */
export function sortFavouriteRestaurants(restaurants: RestaurantType[]) {
  return restaurants.toSorted(
    (a, b) =>
      Number(b.isFavourited) - Number(a.isFavourited) ||
      (b.favouritedAt ?? "").localeCompare(a.favouritedAt ?? ""),
  );
}
