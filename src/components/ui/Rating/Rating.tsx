import styles from "./Rating.module.css";

export interface RatingProps {
  className?: string;
  ratingNum?: number;
}

export const Rating = ({ className = "", ratingNum }: RatingProps) => {
  return (
    <div className={`${styles.container} ${className}`}>
      <span className={styles.star}>★</span>
      <span className={styles.star}>{ratingNum ? ratingNum : "-"}</span>
    </div>
  );
};

export default Rating;
