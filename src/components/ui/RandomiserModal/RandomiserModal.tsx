import styles from "./RandomiserModal.module.css";
import Modal from "../Modal/Modal";
import Pill from "../Pill/Pill";
import Rating from "../Rating/Rating";
import { CalendarCheck, MapPin, UtensilsCrossed } from "lucide-react";
import Button from "../Button/Button";
import type { ConstraintType } from "../../layout/RandomiserContainer/RandomiserContainer";
import { randomiserModalId } from "../../../utils/constants";

import type { RestaurantType } from "../../../utils/types";
import RandomiserLoader from "../RandomiserLoader/RandomiserLoader";
import { getGoogleMapsUrl } from "../../../utils/helpers/getGoogleMapsUrl";
import Map from "../../Map/Map";

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
  return (
    <Modal id={randomiserModalId} className={`${styles.container} ${className}`}>
      <div className={styles.modalContent}>
        {isLoading ? (
          <RandomiserLoader names={candidateNames} />
        ) : randomRestaurant ? (
          <RestaurantDetails restaurant={randomRestaurant} />
        ) : (
          <NoMatch constraints={constraints} />
        )}
      </div>
    </Modal>
  );
};

/** Human-readable labels for the constraints currently applied. */
function getActiveConstraintLabels({ distance, price, scope, location }: ConstraintType) {
  const labels = [];
  if (distance && location) labels.push(`Within ${distance} of ${location.suburb}`);
  if (price) labels.push(`Up to ${price}`);
  if (scope) labels.push(scope);
  return labels;
}

const NoMatch = ({ constraints }: { constraints: ConstraintType }) => {
  const labels = getActiveConstraintLabels(constraints);

  return (
    <div className={styles.noMatch}>
      <div className={styles.noMatchIcon}>
        <UtensilsCrossed size={32} />
      </div>
      <p className={styles.eyebrow}>No match</p>
      <h3>Nothing fits the bill</h3>
      <p className={styles.noMatchText}>
        No restaurants match your constraints. Try loosening them and spin again.
      </p>
      {labels.length > 0 && (
        <div className={styles.noMatchPills}>
          {labels.map((label) => (
            <Pill key={label} variant="secondary">
              {label}
            </Pill>
          ))}
        </div>
      )}
      <Button type="button" command="close" commandfor={randomiserModalId}>
        Adjust constraints
      </Button>
    </div>
  );
};

const RestaurantDetails = ({ restaurant }: { restaurant: RestaurantType }) => {
  const { name, cuisine, price, rating, visits, address, latLong, lastVisitedAt, comments } =
    restaurant;
  const subtitle = [cuisine, price].filter(Boolean).join(" • ");
  const hasVisited = visits !== undefined && visits > 0;

  return (
    <>
      <p className={styles.eyebrow}>Tonight you're eating at</p>
      {latLong && <Map address={address ?? null} latLong={latLong} className={styles.map} />}
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
