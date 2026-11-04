import React, { type Dispatch } from "react";
import styles from "./VisitsCounter.module.css";

export interface VisitsCounterProps {
  children?: React.ReactNode;
  className?: string;
  count?: number;
  setCount?: Dispatch<React.SetStateAction<number | undefined>>;
}

export const VisitsCounter = ({ className = "", count, setCount }: VisitsCounterProps) => {
  return (
    <div className={`${styles.container} ${className}`}>
      <p>Visits </p>
      <div className={styles.counterContainer}>
        <button
          onClick={() => setCount && setCount((prev) => (prev && prev !== 0 ? prev - 1 : prev))}
          className={styles.counterButton}
        >
          -
        </button>
        <span className={styles.counterNumber}>{count ?? 0}</span>
        <button
          onClick={() => setCount && setCount((prev) => prev && prev + 1)}
          className={styles.counterButton}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default VisitsCounter;
