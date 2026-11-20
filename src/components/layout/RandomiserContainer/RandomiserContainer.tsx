import { Plus, Minus, LocateIcon } from "lucide-react";
import Button from "../../ui/Button/Button";
import styles from "./RandomiserContainer.module.css";
import { useState } from "react";
import Pill from "../../ui/Pill/Pill";
import RandomiserConstraintContainer from "../../ui/RandomiserConstraintContainer/RandomiserConstraintContainer";
import { useMediaQuery } from "../../../utils/hooks/useMediaQuery";
import { DESKTOP_QUERY, randomiserModalId } from "../../../utils/constants";
import type { PriceRangeType, VisitStatusType } from "../../../utils/types";
import RandomiserModal from "../../ui/RandomiserModal/RandomiserModal";
import { useGetRandomRestaurant } from "../../../utils/hooks/useGetRandomRestaurant";

export interface RandomiserContainerProps {
  className?: string;
}
export interface ConstraintType {
  distance: string | null;
  price: PriceRangeType | null;
  scope: VisitStatusType;
}
export const RandomiserContainer = ({ className = "" }: RandomiserContainerProps) => {
  const initialConstraintState = {
    distance: null,
    price: null,
    scope: null,
  };
  const [isConstraintsExpanded, setIsConstraintsExpanded] = useState(false);
  const isDesktop = useMediaQuery(DESKTOP_QUERY);
  const isExpanded = isDesktop || isConstraintsExpanded;
  const [constraints, setConstraints] = useState<ConstraintType>(initialConstraintState);
  function setDistance(value: string | null) {
    setConstraints((prev) => ({ ...prev, distance: value }));
  }
  function setPrice(value: PriceRangeType | null) {
    setConstraints((prev) => ({ ...prev, price: value }));
  }
  function setScope(value: VisitStatusType | "All") {
    setConstraints((prev) => ({ ...prev, scope: value === "All" ? null : value }));
  }
  function resetConstraints() {
    setConstraints(initialConstraintState);
  }
  console.log(constraints);

  const { getRandomRestaurant, randomRestaurant, filteredRestaurants } =
    useGetRandomRestaurant(constraints);

  const [isLoading, setIsLoading] = useState(false);
  function handlePickRestaurantClick() {
    setIsLoading(true);
    console.log("loading");
    setTimeout(() => {
      setIsLoading(false);
      console.log("not loading");
    }, 3000);
    getRandomRestaurant();
  }

  return (
    <div className={`${styles.container} ${className}`}>
      <p className={styles.title}>Pick for me</p>
      <div className={styles.header}>
        <Button
          type="button"
          command="show-modal"
          commandfor={randomiserModalId}
          onClick={handlePickRestaurantClick}
        >
          Pick a Restaurant
        </Button>
        <button
          type="button"
          className={styles.toggleButton}
          aria-expanded={isConstraintsExpanded}
          onClick={() => {
            setIsConstraintsExpanded((prev) => !prev);
            if (isConstraintsExpanded) resetConstraints();
          }}
        >
          {isConstraintsExpanded ? <Minus size={14} /> : <Plus size={14} />}
          {isConstraintsExpanded ? "Remove" : "Set "}
          {" Constraints"}
        </button>
      </div>
      <div
        className={`${styles.constraintsContainer} ${isExpanded ? "" : styles.collapsed}`}
        inert={!isExpanded}
      >
        <div className={styles.randomiserContent}>
          <p>Can't decide where to eat? Let fate pick your next feast!</p>
          <Pill variant="primary">
            <div className={styles.locationPill}>
              <LocateIcon size={16} />
              <span>Your location</span>
            </div>
          </Pill>
          <RandomiserConstraintContainer
            constraintName="Max distance"
            constraintSubtext="Within km"
            constraintOptions={["1 km", "3 km", "5 km", "10 km"]}
            handleChange={setDistance}
            constraint={constraints.distance}
          />
          <RandomiserConstraintContainer
            constraintName="Price Limit"
            constraintSubtext="Up to $$$$"
            constraintOptions={["$", "$$", "$$$", "$$$$"]}
            handleChange={setPrice}
            constraint={constraints.price}
          />
          <RandomiserConstraintContainer
            constraintName="Wishlist scope"
            constraintSubtext=""
            constraintOptions={["All", "Want to Eat", "Visited"]}
            handleChange={setScope}
            constraint={constraints.scope}
          />
        </div>
      </div>
      <RandomiserModal
        constraints={constraints}
        randomRestaurant={randomRestaurant}
        isLoading={isLoading}
        candidateNames={filteredRestaurants.map((restaurant) => restaurant.name)}
      ></RandomiserModal>
    </div>
  );
};

export default RandomiserContainer;
