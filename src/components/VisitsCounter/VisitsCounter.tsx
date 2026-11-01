import React from "react";
import styles from "./VisitsCounter.module.css";

export interface VisitsCounterProps {
  children?: React.ReactNode;
  className?: string;
}

export const VisitsCounter = ({ className = "" }: VisitsCounterProps) => {
  return (
    <div className={`${styles.container} ${className}`}>
      <p>Visits </p>
      <div className={styles.counterContainer}>
        <button onClick={() => {}} className={styles.counterButton}>
          -
        </button>
        <span className={styles.counterNumber}>{0}</span>
        <button onClick={() => {}} className={styles.counterButton}>
          +
        </button>
      </div>
    </div>
  );
};

export default VisitsCounter;
