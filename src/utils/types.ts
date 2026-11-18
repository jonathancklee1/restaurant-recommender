/** Star rating from 1 to 5. */
export type Rating = 1 | 2 | 3 | 4 | 5;

/** Filters chosen in the filter sheet. Empty means no filter. */

export type VisitStatusType = "Visited" | "Want to Eat" | null;
export interface RestaurantFilters {
  searchTerm: string;
  visitStatus: VisitStatusType;
  prices: PriceRangeType[];
  ratings: Rating[];
  cuisines: string[];
}

/** Map coordinates as [latitude, longitude]. */
export type LatLong = [lat: number, lng: number];

/** A restaurant row in the table. */
export interface RestaurantType {
  id: string;
  name: string;
  imageUrl?: string;
  cuisine?: string;
  rating?: Rating; // 1-5
  price?: PriceRangeType;
  visits?: number;
  comments?: string;
  address?: string;
  latLong?: LatLong;
  addedAt?: string; // YYYY-MM-DD
  lastVisitedAt?: string;
  isFavourited: boolean;
  favouritedAt?: string; // ISO timestamp, set when favourited
}
export type PriceRangeType = "$" | "$$" | "$$$" | "$$$$";
