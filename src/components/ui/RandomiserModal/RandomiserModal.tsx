import styles from "./RandomiserModal.module.css";
import Modal from "../Modal/Modal";
import Pill from "../Pill/Pill";
import Rating from "../Rating/Rating";
import { CalendarCheck, MapPin } from "lucide-react";
import type { ConstraintType } from "../../layout/RandomiserContainer/RandomiserContainer";
import { randomiserModalId } from "../../../utils/constants";

import type { RestaurantType } from "../../../utils/types";
import RandomiserLoader from "../RandomiserLoader/RandomiserLoader";
import { getGoogleMapsUrl } from "../../../utils/helpers/getGoogleMapsUrl";

export interface RandomiserModalProps {
  className?: string;
  constraints: ConstraintType;
  randomRestaurant: RestaurantType | undefined;
  isLoading: boolean;
  /** Names the loader reel flicks through before the pick is revealed. */
  candidateNames: string[];
}
export const RandomiserModal = ({
  className = "",
  constraints,
  randomRestaurant,
  isLoading,
  candidateNames,
}: RandomiserModalProps) => {
  for (const [key, value] of Object.entries(constraints)) {
    console.log(`${key}: ${value}`);
  }
  console.log(randomRestaurant);

  return (
    <Modal id={randomiserModalId} className={`${styles.container} ${className}`}>
      <div className={styles.modalContent}>
        {isLoading ? (
          <RandomiserLoader names={candidateNames} />
        ) : randomRestaurant ? (
          <RestaurantDetails restaurant={randomRestaurant} />
        ) : (
          <p>No restaurants match your constraints.</p>
        )}
      </div>
    </Modal>
  );
};

const RestaurantDetails = ({ restaurant }: { restaurant: RestaurantType }) => {
  const { name, imageUrl, cuisine, price, rating, visits, address, lastVisitedAt, comments } =
    restaurant;
  const subtitle = [cuisine, price].filter(Boolean).join(" • ");
  const hasVisited = visits !== undefined && visits > 0;

  return (
    <>
      <p className={styles.eyebrow}>Tonight you're eating at</p>
      {imageUrl && <img src={imageUrl} alt={name} className={styles.image} />}
      <div>
        <h3>{name}</h3>
        {subtitle && (
          <p className={styles.subtitle}>
            {subtitle}{" "}
            {rating !== undefined && (
              <div className={styles.subtitleRatingBox}>
                <div>•</div>
                <Rating ratingNum={rating} />
              </div>
            )}
          </p>
        )}
      </div>

      <div className={styles.pillRow}>
        <Pill variant="secondary">
          {hasVisited ? `Visited ${visits} ${visits === 1 ? "time" : "times"}` : "Want to eat"}
        </Pill>
      </div>

      {address && (
        <p className={styles.iconRow}>
          <MapPin size={16} />
          <a
            href={getGoogleMapsUrl(`${name}, ${address}`)}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.mapLink}
          >
            {address}
          </a>
        </p>
      )}
      {lastVisitedAt && (
        <p className={styles.iconRow}>
          <CalendarCheck size={16} /> Last visited {lastVisitedAt}
        </p>
      )}
      {comments && <p className={styles.comments}>{comments}</p>}
    </>
  );
};

export default RandomiserModal;
