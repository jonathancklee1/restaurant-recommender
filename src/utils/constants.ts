import type { Price, RestaurantFilters } from "./types";

export const PRICE_OPTIONS: Price[] = [1, 2, 3, 4];

export const MIN_RATING_OPTIONS = [3, 4, 5];

export const EMPTY_FILTERS: RestaurantFilters = { prices: [], minRating: null, cuisines: [] };

export const COLUMN_HEADERS = [
  "Name",
  "Cuisine",
  "Suburb",
  "Price",
  "Visits",
  "Rating",
  "Comments",
  "Actions",
];
