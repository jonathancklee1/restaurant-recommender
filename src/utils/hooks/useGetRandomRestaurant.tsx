import { useContext, useState } from "react";
import type { ConstraintType } from "../../components/layout/RandomiserContainer/RandomiserContainer";
import type { LatLong, PriceRangeType, RestaurantType } from "../types";
import { RestaurantContext } from "../../context/RestaurantProvider";
import { getDistanceKm } from "../helpers/getDistanceKm";

export function useGetRandomRestaurant(constraints: ConstraintType) {
  const { state } = useContext(RestaurantContext);
  const [randomRestaurant, setRandomRestaurant] = useState<RestaurantType>();
  console.log(state);

  function filterScope(visits: number | undefined) {
    if (visits && visits > 0 && constraints.scope === "Visited") {
      return true;
    } else if (visits && visits === 0 && constraints.scope === "Want to Eat") {
      return true;
    } else if (constraints.scope === null) {
      return true;
    } else {
      return false;
    }
  }
  function filterPrice(price: PriceRangeType | undefined) {
    if (!constraints.price) return true;
    switch (constraints.price) {
      case "$":
        if (price === "$") return true;
        break;
      case "$$":
        if (price == "$$" || price == "$") return true;
        break;
      case "$$$":
        if (price == "$$$" || price == "$$" || price == "$") return true;
        break;
      case null:
        return true;
      default:
        return false;
    }
  }

  function filterDistance(latLong: LatLong | undefined) {
    if (!constraints.distance || !constraints.location) return true;
    if (!latLong) return false;
    const { lat, lon } = constraints.location;
    return getDistanceKm([lat, lon], latLong) <= parseFloat(constraints.distance);
  }
  const filteredRestaurants = state.filter((restaurant) => {
    return (
      filterScope(restaurant.visits) &&
      filterPrice(restaurant.price) &&
      filterDistance(restaurant.latLong)
    );
  });

  function getRandomRestaurant() {
    setRandomRestaurant(
      filteredRestaurants[Math.floor(Math.random() * filteredRestaurants.length)],
    );
  }

  return { getRandomRestaurant, randomRestaurant, filteredRestaurants };
}
