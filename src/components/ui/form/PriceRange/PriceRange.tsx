import { useState } from "react";
import styles from "./PriceRange.module.css";

const TIERS = ["$", "$$", "$$$", "$$$$"] as const;
type Tier = (typeof TIERS)[number];

export interface PriceRangeProps {
  className?: string;
}

/** Segmented control for picking a price tier. */
export const PriceRange = ({ className = "" }: PriceRangeProps) => {
  const [selected, setSelected] = useState<Tier>("$");

  return (
    <div className={`${styles.container} ${className}`}>
      {TIERS.map((tier) => (
        <button
          key={tier}
          type="button"
          className={`${styles.button} ${selected === tier ? styles.selected : ""}`}
          onClick={() => setSelected(tier)}
        >
          {tier}
        </button>
      ))}
    </div>
  );
};

export default PriceRange;
