import React, { useState } from "react";
import styles from "./Card.module.css";
import Rating from "../Rating/Rating";
import VisitsCounter from "../../VisitsCounter/VisitsCounter";
import Pill from "../Pill/Pill";
import { Bookmark, ChevronDown, MapPinned, Pencil, Trash } from "lucide-react";
import Button from "../Button/Button";
import type { RestaurantType } from "../../../utils/types";
import { modalId } from "../Modal/Modal";

export interface CardProps {
  children?: React.ReactNode;
  className?: string;
  restaurant: RestaurantType;
}

export const Card = ({ className = "", restaurant }: CardProps) => {
  const { name, imageUrl, cuisine, suburb, rating, price, visits, comments } = restaurant;
  const [isCommentVisible, setCommentVisible] = useState(false);
  const [isFavourited, setIsFavourited] = useState(false);
  const [visitCount, setVisitCount] = useState(visits);
  return (
    <div className={`${styles.container} ${className}`}>
      {imageUrl ? (
        <img src={imageUrl} loading="lazy" alt={name} className={styles.restaurantImage} />
      ) : (
        <></>
      )}

      <div className={styles.content}>
        <div className={styles.detailsContainer}>
          <div>
            <p className={styles.name}>{name}</p>
            <span className={styles.details}>
              {cuisine} • {suburb} • {price}
            </span>
          </div>
          <Bookmark
            fill={isFavourited ? "var(--primary)" : "var(--text-secondary)"}
            onClick={() => {
              setIsFavourited((prev) => !prev);
            }}
          />
        </div>

        <div className={styles.pillContainer}>
          <Pill variant="secondary">{visits === 0 ? "Want to eat" : "Visited"}</Pill>
        </div>

        {comments && (
          <>
            <Button
              className={styles.commentsButton}
              onClick={() => setCommentVisible(!isCommentVisible)}
            >
              Show comments <ChevronDown />
            </Button>
            <div className={`${styles.commentsContainer} ${isCommentVisible ? styles.open : ""}`}>
              <div className={styles.comments}>{comments}</div>
            </div>
          </>
        )}

        <div className={styles.actionsContainer}>
          <div className={styles.ratingVisitsContainer}>
            {rating !== undefined && <Rating ratingNum={rating} />}
            <VisitsCounter count={visitCount} setCount={setVisitCount} />
          </div>
          <div className={styles.buttonGroup}>
            <Button className={styles.actionButton}>
              <MapPinned />
            </Button>
            <Button
              className={styles.actionButton}
              type="button"
              command="show-modal"
              commandfor={modalId}
            >
              <Pencil />
            </Button>
            <Button className={styles.actionButton}>
              <Trash />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
