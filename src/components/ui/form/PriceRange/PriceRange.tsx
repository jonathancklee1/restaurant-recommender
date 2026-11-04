import React, { useState } from "react";
import styles from "./PriceRange.module.css";
import type { PriceRangeType } from "../../../../utils/types";

export interface PriceRangeProps {
  children?: React.ReactNode;
  className?: string;
  initialPrice?: PriceRangeType;
  changePrice: (price: PriceRangeType) => void;
}

export const PriceRange = ({
  className = "",
  initialPrice = "$",
  changePrice,
}: PriceRangeProps) => {
  const [selected, setSelected] = useState<PriceRangeType>(initialPrice);

  const handleClick = (value: PriceRangeType) => {
    setSelected(value);
    changePrice(value);
  };

  return (
    <div className={`${styles.container} ${className}`}>
      <button
        type="button"
        className={`${styles.button} ${selected === "$" ? styles.selected : ""}`}
        onClick={() => handleClick("$")}
      >
        $
      </button>
      <button
        type="button"
        className={`${styles.button} ${selected === "$$" ? styles.selected : ""} ${className}`}
        value={"$$"}
        onClick={() => handleClick("$$")}
      >
        $$
      </button>
      <button
        type="button"
        className={`${styles.button} ${selected === "$$$" ? styles.selected : ""} ${className}`}
        value={"$$$"}
        onClick={() => handleClick("$$$")}
      >
        $$$
      </button>
      <button
        type="button"
        className={`${styles.button} ${selected === "$$$$" ? styles.selected : ""} ${className}`}
        value={"$$$$"}
        onClick={() => handleClick("$$$$")}
      >
        $$$$
      </button>
    </div>
  );
};

export default PriceRange;
