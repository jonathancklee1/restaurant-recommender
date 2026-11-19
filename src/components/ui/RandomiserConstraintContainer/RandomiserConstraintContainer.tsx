import styles from "./RandomiserConstraintContainer.module.css";
import FilterPill from "../FilterPill/FilterPill";
import type { ReactNode } from "react";

export interface RandomiserConstraintContainerProps<T extends string> {
  children?: ReactNode;
  className?: string;
  constraintName: string;
  constraintSubtext: string;
  constraintOptions: T[];
  constraint: T | null;
  handleChange: (value: T | null) => void;
}

export const RandomiserConstraintContainer = <T extends string>({
  className = "",
  constraintName,
  constraintSubtext,
  constraintOptions,
  constraint,
  handleChange,
}: RandomiserConstraintContainerProps<T>) => {
  return (
    <div className={`${styles.container} ${className}`}>
      <div className={`${styles.constraintHeader}`}>
        <span>{constraintName}</span>
        <span>{constraintSubtext}</span>
      </div>
      <div className={styles.constraintPillContainer}>
        {constraintOptions.map((option) => {
          return (
            <FilterPill
              key={option}
              onClick={() => {
                handleChange(constraint === option ? null : option);
              }}
              selected={option === "All" && constraint === null ? true : constraint === option}
            >
              {option}
            </FilterPill>
          );
        })}
      </div>
    </div>
  );
};

export default RandomiserConstraintContainer;
