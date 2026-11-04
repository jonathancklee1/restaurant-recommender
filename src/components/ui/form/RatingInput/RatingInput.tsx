import { useState } from "react";
import { Star } from "lucide-react";
import styles from "./RatingInput.module.css";

export interface RatingInputProps {
  className?: string;
  changeRating: (rating: number) => void;
  initialValue?: number;
}

/** Five clickable stars for picking a rating from 1 to 5. */
export const RatingInput = ({ className = "", changeRating, initialValue }: RatingInputProps) => {
  const [rating, setRating] = useState(initialValue);

  const handleClick = (value: number) => {
    setRating(value);
    changeRating(value);
  };

  return (
    <div className={`${styles.container} ${className}`}>
      {[1, 2, 3, 4, 5].map((value) => (
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
