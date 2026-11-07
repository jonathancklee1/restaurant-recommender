import { describe, expect, it } from "vite-plus/test";
import { sortFavouriteRestaurants } from "./sortFavouriteRestaurants";

describe("sortFavouriteRestaurants", () => {
  it("returns everything when no filters are set", () => {
    expect(sortFavouriteRestaurants([])).toEqual([]);
  });

  it("returns the normal order when there are no favourited restaurants", () => {
    const restaurants = [
      { id: "1", name: "Restaurant A", isFavourited: false },
      { id: "2", name: "Restaurant B", isFavourited: false },
      { id: "3", name: "Restaurant C", isFavourited: false },
    ];
    expect(sortFavouriteRestaurants(restaurants)).toEqual(restaurants);
  });
  it("returns the favourited restaurants first when there are favourited restaurants", () => {
    const restaurants = [
      { id: "1", name: "Restaurant A", isFavourited: false },
      { id: "2", name: "Restaurant B", isFavourited: true },
      { id: "3", name: "Restaurant C", isFavourited: true },
    ];
    const sortedRestaurants = [
      { id: "2", name: "Restaurant B", isFavourited: true },
      { id: "3", name: "Restaurant C", isFavourited: true },
      { id: "1", name: "Restaurant A", isFavourited: false },
    ];
    expect(sortFavouriteRestaurants(restaurants)).toEqual(sortedRestaurants);
  });
  it("returns the same order when all restaurants are favourited", () => {
    const restaurants = [
      { id: "1", name: "Restaurant A", isFavourited: true },
      { id: "2", name: "Restaurant B", isFavourited: true },
      { id: "3", name: "Restaurant C", isFavourited: true },
    ];
    const sortedRestaurants = [
      { id: "1", name: "Restaurant A", isFavourited: true },
      { id: "2", name: "Restaurant B", isFavourited: true },
      { id: "3", name: "Restaurant C", isFavourited: true },
    ];
    expect(sortFavouriteRestaurants(restaurants)).toEqual(sortedRestaurants);
  });
  it("puts the most recently favourited restaurant on top", () => {
    const restaurants = [
      { id: "1", name: "Old", isFavourited: true, favouritedAt: "2026-11-01T10:00:00.000Z" },
      { id: "2", name: "Not", isFavourited: false },
      { id: "3", name: "New", isFavourited: true, favouritedAt: "2026-11-07T10:00:00.000Z" },
      { id: "4", name: "No date", isFavourited: true },
    ];
    expect(sortFavouriteRestaurants(restaurants).map((r) => r.name)).toEqual([
      "New",
      "Old",
      "No date",
      "Not",
    ]);
  });
});
