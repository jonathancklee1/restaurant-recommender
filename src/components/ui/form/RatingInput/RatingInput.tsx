import { useState } from "react";
import { Star } from "lucide-react";
import styles from "./RatingInput.module.css";
import type { Rating } from "../../../../utils/types";

export interface RatingInputProps {
  className?: string;
  changeRating: (rating: Rating | undefined) => void;
  initialValue?: Rating;
}

/** Five clickable stars for picking a rating from 1 to 5. Clicking the current rating clears it. */
export const RatingInput = ({ className = "", changeRating, initialValue }: RatingInputProps) => {
  const [rating, setRating] = useState(initialValue);

  const handleClick = (value: Rating) => {
    const next = rating === value ? undefined : value;
    setRating(next);
    changeRating(next);
  };

  return (
    <div className={`${styles.container} ${className}`}>
      {([1, 2, 3, 4, 5] as const).map((value) => (
        <button
          key={value}
          type="button"
          className={styles.star}
          aria-label={`${value} star${value > 1 ? "s" : ""}`}
          onClick={() => handleClick(value)}
        >
          <Star size={24} fill={rating && value <= rating ? "currentColor" : "none"} />
        </button>
      ))}
    </div>
  );
};

export default RatingInput;
