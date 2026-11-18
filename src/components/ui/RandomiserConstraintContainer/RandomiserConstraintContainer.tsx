import React, { useState } from "react";
import styles from "./RandomiserConstraintContainer.module.css";
import FilterPill from "../FilterPill/FilterPill";

export interface RandomiserConstraintContainerProps {
  children?: React.ReactNode;
  className?: string;
  constraintName: string;
  constraintSubtext: string;
  constraintOptions: string[];
}

export const RandomiserConstraintContainer = ({
  className = "",
  constraintName,
  constraintSubtext,
  constraintOptions,
}: RandomiserConstraintContainerProps) => {
  const [selectedOption, setSelectedOption] = useState("");
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
                setSelectedOption(option);
              }}
              selected={selectedOption === option}
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
