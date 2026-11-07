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
});
