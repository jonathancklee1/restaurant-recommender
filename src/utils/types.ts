/** Price level from $ to $$$$. */
export type Price = 1 | 2 | 3 | 4;

/** Filters chosen in the filter sheet. Empty means no filter. */
export interface RestaurantFilters {
  prices: Price[];
  minRating: number | null;
  cuisines: string[];
}

/** A restaurant row in the table. */
export interface RestaurantType {
  id: string;
  name: string;
  imageUrl: string;
  cuisine: string;
  suburb: string;
  rating?: number; // 1-5
  price: PriceRangeType;
  visits: number;
  comments?: string;
  lat?: number;
  lng?: number;
  addedAt?: string; // YYYY-MM-DD
  lastVisitedAt?: string;
}
export type PriceRangeType = "$" | "$$" | "$$$" | "$$$$";
