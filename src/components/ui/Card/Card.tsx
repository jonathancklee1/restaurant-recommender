import React from "react";
import styles from "./Card.module.css";
import Rating from "../Rating/Rating";
import VisitsCounter from "../../VisitsCounter/VisitsCounter";
import Pill from "../Pill/Pill";
import { Bookmark, ChevronDown, MapPinned } from "lucide-react";
import Button from "../Button/Button";

export interface CardProps {
  children?: React.ReactNode;
  className?: string;
}

export const Card = ({ className = "" }: CardProps) => {
  return (
    <div className={`${styles.container} ${className}`}>
      <img
        src="https://picsum.photos/seed/restaurant/400/300"
        loading="lazy"
        alt="image of restaurant"
        className={styles.restaurantImage}
      />
      <div className={styles.content}>
        <div className={styles.detailsContainer}>
          <div>
            <p className={styles.name}>Food place</p>
            <span className={styles.details}>Malaysian Street Food • Sydney CBD • $$</span>
          </div>
          <Bookmark />
        </div>

        <div className={styles.pillContainer}>
          <Pill variant="secondary">Want to eat</Pill>
          <Pill variant="secondary">Want to eat</Pill>
          <Pill variant="secondary">Want to eat</Pill>
        </div>

        {/* Expand Comments */}
        <Button className={styles.commentsButton}>
          Show comments <ChevronDown />
        </Button>

        <div className={styles.actionsContainer}>
          <div className={styles.ratingVisitsContainer}>
            <Rating ratingNum={4} />
            <VisitsCounter />
          </div>
          <Button className={styles.mapButton}>
            <MapPinned />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Card;
