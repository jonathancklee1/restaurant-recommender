import React from "react";
import styles from "./Pill.module.css";

export interface PillProps {
  children?: React.ReactNode;
  className?: string;
  variant: "primary" | "secondary";
}

export const Pill = ({ children, className = "", variant }: PillProps) => {
  return (
    <div
      className={`${styles.container} ${variant === "primary" ? styles.primary : styles.secondary} ${className}`}
    >
      {children}
    </div>
  );
};

export default Pill;
