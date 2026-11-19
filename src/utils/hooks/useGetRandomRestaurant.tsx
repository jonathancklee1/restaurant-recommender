import { useContext, useState } from "react";
import type { ConstraintType } from "../../components/layout/RandomiserContainer/RandomiserContainer";
import type { RestaurantType } from "../types";
import { RestaurantContext } from "../../context/RestaurantProvider";

export function useGetRandomRestaurant(constraints: ConstraintType) {
  const { state } = useContext(RestaurantContext);
  const [randomRestaurant, setRandomRestaurant] = useState<RestaurantType>();
  console.log(state);
  const filteredRestaurants = state.filter((restaurant) => {
    if (restaurant.visits && restaurant.visits > 0 && constraints.scope === "Visited") {
      return true;
    } else if (
      restaurant.visits &&
      restaurant.visits === 0 &&
      constraints.scope === "Want to Eat"
    ) {
      return true;
    } else if (constraints.scope === null) {
      return true;
    } else {
      return false;
    }
  });
  console.log(filteredRestaurants);
  function getRandomRestaurant() {
    setRandomRestaurant(
      filteredRestaurants[Math.floor(Math.random() * filteredRestaurants.length)],
    );
  }

  return { getRandomRestaurant, randomRestaurant };
}
