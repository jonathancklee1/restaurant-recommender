import React from "react";
import styles from "./Card.module.css";

export interface CardProps {
  children?: React.ReactNode;
  className?: string;
}

export const Card = ({ children, className = "" }: CardProps) => {
  return <div className={`${styles.container} ${className}`}>{children}</div>;
};

export default Card;
