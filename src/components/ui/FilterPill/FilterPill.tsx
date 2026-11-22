import React from "react";
import styles from "./FilterPill.module.css";

export interface FilterPillProps {
  children?: React.ReactNode;
  className?: string;
  selected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export const FilterPill = ({
  children,
  className = "",
  selected,
  disabled,
  onClick,
}: FilterPillProps) => {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`${styles.container} ${selected ? styles.primary : styles.secondary} ${className}`}
    >
      {children}
    </button>
  );
};

export default FilterPill;
