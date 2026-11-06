import type { PriceRangeType, Rating, RestaurantFilters, RestaurantType } from "./types";

export const PRICE_OPTIONS: PriceRangeType[] = ["$", "$$", "$$$", "$$$$"];

export const RATING_OPTIONS: Rating[] = [1, 2, 3, 4, 5];

/** Cuisine pills shown before "Show all"; longer lists also get a search box. */
export const CUISINE_PREVIEW_COUNT = 6;

export const EMPTY_FILTERS: RestaurantFilters = {
  searchTerm: "",
  visitStatus: null,
  prices: [],
  ratings: [],
  cuisines: [],
};

export const COLUMN_HEADERS: string[] = [
  "Name",
  "Cuisine",
  "Suburb",
  "Price",
  "Visits",
  "Your Rating",
  "Comments",
  "Actions",
];

export const INITIAL_RESTAURANTS: RestaurantType[] = [
  {
    id: "1",
    name: "Golden Lotus",
    imageUrl: "https://picsum.photos/seed/golden-lotus/400/400",
    cuisine: "Cantonese",
    address: "12 Dixon St, Haymarket NSW 2000",
    rating: 4,
    price: "$$",
    visits: 2,
    comments: "Yum cha trolleys on weekends. Get the prawn cheung fun.",
    lat: -33.8792,
    lng: 151.2045,
    addedAt: "2026-10-12",
    lastVisitedAt: "2026-11-01",
  },
];
