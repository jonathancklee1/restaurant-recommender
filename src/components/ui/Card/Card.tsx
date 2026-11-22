import React, { useContext, useState } from "react";
import styles from "./Card.module.css";
import Rating from "../Rating/Rating";
import VisitsCounter from "../../VisitsCounter/VisitsCounter";
import Pill from "../Pill/Pill";
import { ChevronDown, MapPinned, Pencil } from "lucide-react";
import Button from "../Button/Button";
import FavouriteButton from "../FavouriteButton/FavouriteButton";
import DeleteButton from "../DeleteButton/DeleteButton";
import type { RestaurantType } from "../../../utils/types";
import { restaurantModalId } from "../RestaurantModal/RestaurantModal";
import { getSuburb } from "../../../utils/helpers/getSuburb";
import { SelectedRestaurantContext } from "../../../context/SelectedRestaurantProvider";
import { RestaurantMapActionsContext } from "../../../context/RestaurantMapProvider";

export interface CardProps {
  children?: React.ReactNode;
  className?: string;
  restaurant: RestaurantType;
}

export const Card = ({ className = "", restaurant }: CardProps) => {
  const { name, cuisine, address, rating, price, visits, comments } = restaurant;
  const [isCommentVisible, setCommentVisible] = useState(false);

  const { setSelectedRestaurant } = useContext(SelectedRestaurantContext);
  const { showOnMap } = useContext(RestaurantMapActionsContext);
  return (
    <div className={`${styles.container} ${className}`}>
      <div className={styles.content}>
        <div className={styles.detailsContainer}>
          <div>
            <p className={styles.name}>{name}</p>
            <span className={styles.details}>
              {cuisine} • {getSuburb(address)} • {price}{" "}
            </span>
          </div>
          <FavouriteButton restaurant={restaurant} />
        </div>

        <div className={styles.pillContainer}>
          <Pill variant="secondary">{visits === 0 ? "Want to eat" : "Visited"}</Pill>
          {rating !== undefined && <Rating ratingNum={rating} />}
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
            <VisitsCounter visitId={restaurant.id} />
          </div>
          <div className={styles.buttonGroup}>
            {restaurant.latLong && (
              <Button className={styles.actionButton} onClick={() => showOnMap(restaurant.id)}>
                <MapPinned />
              </Button>
            )}

            <Button
              className={styles.actionButton}
              type="button"
              command="show-modal"
              commandfor={restaurantModalId}
              onClick={() => {
                setSelectedRestaurant(restaurant);
              }}
            >
              <Pencil />
            </Button>
            <DeleteButton className={styles.actionButton} restaurant={restaurant} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
