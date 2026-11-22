import { Plus, Minus, LocateIcon, LoaderCircle, Dices } from "lucide-react";
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
import { getLocation } from "../../../utils/helpers/getLocation";
import { ToastContainer, toast } from "react-toastify";
export interface RandomiserContainerProps {
  className?: string;
}
export interface ConstraintType {
  distance: string | null;
  price: PriceRangeType | null;
  scope: VisitStatusType;
  location: {
    lat: number;
    lon: number;
    suburb: string;
  } | null;
}
export const RandomiserContainer = ({ className = "" }: RandomiserContainerProps) => {
  const initialConstraintState = {
    distance: null,
    price: null,
    scope: null,
    location: null,
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

  const { getRandomRestaurant, randomRestaurant, filteredRestaurants } =
    useGetRandomRestaurant(constraints);

  const [isLoading, setIsLoading] = useState(false);
  function handlePickRestaurantClick() {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    getRandomRestaurant();
  }

  const [isLocating, setIsLocating] = useState(false);
  async function handleLocationClick() {
    setIsLocating(true);
    try {
      const position = await getLocation();
      setConstraints((prev) => ({ ...prev, location: position }));
    } catch {
      toast.error("Error getting location, please enable location services in your browser.");
      console.error("Error getting location");
    } finally {
      setIsLocating(false);
    }
  }

  function locationLabel() {
    if (isLocating) return "Retrieving location";
    return constraints.location ? constraints.location.suburb : "Get Your location";
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
          <Dices size={18} /> Pick a Restaurant
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
            <div className={styles.locationPill} onClick={handleLocationClick}>
              {isLocating ? (
                <LoaderCircle size={16} className={styles.spinner} />
              ) : (
                <LocateIcon size={16} />
              )}
              <span>{locationLabel()}</span>
            </div>
          </Pill>
          <RandomiserConstraintContainer
            constraintName="Max distance"
            constraintSubtext="Within km"
            constraintOptions={["1 km", "3 km", "5 km", "10 km"]}
            handleChange={setDistance}
            constraint={constraints.distance}
            disabled={!constraints.location}
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
        <ToastContainer
          position="top-center"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
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
