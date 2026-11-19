import { Plus, Minus, LocateIcon } from "lucide-react";
import Button from "../../ui/Button/Button";
import styles from "./RandomiserContainer.module.css";
import { useState } from "react";
import Pill from "../../ui/Pill/Pill";
import RandomiserConstraintContainer from "../../ui/RandomiserConstraintContainer/RandomiserConstraintContainer";
import { useMediaQuery } from "../../../utils/hooks/useMediaQuery";
import { DESKTOP_QUERY } from "../../../utils/constants";

export interface RandomiserContainerProps {
  className?: string;
}

export const RandomiserContainer = ({ className = "" }: RandomiserContainerProps) => {
  const [isConstraintsExpanded, setIsConstraintsExpanded] = useState(false);
  const isDesktop = useMediaQuery(DESKTOP_QUERY);
  const isExpanded = isDesktop || isConstraintsExpanded;
  return (
    <div className={`${styles.container} ${className}`}>
      <p className={styles.title}>Pick for me</p>
      <div className={styles.header}>
        <Button>Pick a Restaurant</Button>
        <button
          type="button"
          className={styles.toggleButton}
          aria-expanded={isConstraintsExpanded}
          onClick={() => setIsConstraintsExpanded((prev) => !prev)}
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
          />
          <RandomiserConstraintContainer
            constraintName="Price Limit"
            constraintSubtext="Up to $$$$"
            constraintOptions={["$", "$$", "$$$", "$$$$"]}
          />
          <RandomiserConstraintContainer
            constraintName="Wishlist scope"
            constraintSubtext=""
            constraintOptions={["All", "Want to try", "Visited"]}
          />
        </div>
      </div>
    </div>
  );
};

export default RandomiserContainer;
