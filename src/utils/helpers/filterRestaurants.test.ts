import { describe, expect, test } from "vite-plus/test";
import { filterRestaurants } from "./filterRestaurants";
import { EMPTY_FILTERS, INITIAL_RESTAURANTS } from "../constants";
import type { RestaurantFilters } from "../types";

/** Returns the names left after applying the given filters. */
const namesFor = (filters: Partial<RestaurantFilters>) =>
  filterRestaurants(INITIAL_RESTAURANTS, { ...EMPTY_FILTERS, ...filters }).map((r) => r.name);

describe("filterRestaurants", () => {
  test("returns everything when no filters are set", () => {
    expect(namesFor({})).toHaveLength(INITIAL_RESTAURANTS.length);
  });

  test("searches names ignoring case and outer spaces", () => {
    expect(namesFor({ searchTerm: "  GOLDEN " })).toEqual(["Golden Lotus", "Golden Bao Bar"]);
  });

  test("matches any selected cuisine", () => {
    expect(namesFor({ cuisines: ["French", "Greek"] })).toEqual([
      "Le Petit Bistro",
      "Olympia Taverna",
    ]);
  });

  test("matches any selected price", () => {
    expect(namesFor({ prices: ["$$$$"] })).toEqual(["Sushi Kaito", "Ember & Salt"]);
  });

  test("matches any selected rating and drops unrated", () => {
    expect(namesFor({ ratings: [1, 2] })).toEqual(["Golden Bao Bar", "Taqueria Sol"]);
  });

  test("filters by visit status", () => {
    expect(namesFor({ visitStatus: "Want to Eat" })).toEqual([
      "Pizza Fritta",
      "Hanami Izakaya",
      "Ember & Salt",
      "Le Petit Bistro",
      "Mystery Food Truck",
    ]);
    expect(namesFor({ visitStatus: "Visited" })).not.toContain("Pizza Fritta");
  });

  test("combines filters with AND", () => {
    expect(namesFor({ cuisines: ["Italian"], visitStatus: "Visited" })).toEqual(["Nonna Rosa"]);
  });
});
