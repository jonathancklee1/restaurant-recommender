import React from "react";
import styles from "./Pill.module.css";

export interface PillProps {
  children?: React.ReactNode;
  className?: string;
}

export const Pill = ({ children, className = "" }: PillProps) => {
  return <div className={`${styles.container} ${className}`}>{children}</div>;
};

export default Pill;
