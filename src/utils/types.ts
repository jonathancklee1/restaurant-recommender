/** Price level from $ to $$$$. */
export type Price = 1 | 2 | 3 | 4;

/** Star rating from 1 to 5. */
export type Rating = 1 | 2 | 3 | 4 | 5;

/** Filters chosen in the filter sheet. Empty means no filter. */
export interface RestaurantFilters {
  searchTerm: string;
  visitStatus?: "Visited" | "Want to Eat" | null;
  prices?: Price[];
  ratings: Rating[];
  cuisines?: string[];
}

/** A restaurant row in the table. */
export interface RestaurantType {
  id: string;
  name?: string;
  imageUrl?: string;
  cuisine?: string;
  rating?: number; // 1-5
  price?: PriceRangeType;
  visits?: number;
  comments?: string;
  address?: string;
  lat?: number;
  lng?: number;
  addedAt?: string; // YYYY-MM-DD
  lastVisitedAt?: string;
}
export type PriceRangeType = "$" | "$$" | "$$$" | "$$$$";
