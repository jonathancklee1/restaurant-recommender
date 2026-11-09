import type { RestaurantFilters, RestaurantType, VisitStatusType } from "../types";

/** Returns restaurants matching every active filter. Empty filters match all. */
export function filterRestaurants(restaurants: RestaurantType[], filters: RestaurantFilters) {
  return restaurants.filter(
    (r) =>
      matchesSearch(r, filters.searchTerm) &&
      matchesAny(r.cuisine, filters.cuisines) &&
      matchesAny(r.price, filters.prices) &&
      matchesAny(r.rating, filters.ratings) &&
      matchesVisitStatus(r, filters.visitStatus),
  );
}

/** True when the name contains the search term, ignoring case and outer spaces. */
function matchesSearch(r: RestaurantType, searchTerm: string) {
  const term = searchTerm.trim().toLowerCase();
  return r.name.toLowerCase().includes(term);
}

/** True when no options are selected, or the value is one of them. */
function matchesAny<T>(value: T | undefined, selected: T[]) {
  return selected.length === 0 || (value !== undefined && selected.includes(value));
}

/** True when no status is chosen, or the visit count matches it. */
function matchesVisitStatus(r: RestaurantType, status: VisitStatusType) {
  const visited = (r.visits ?? 0) > 0;
  return !status || (status === "Visited") === visited;
}
