import React from "react";
import styles from "./Button.module.css";

export interface ButtonProps {
  children?: React.ReactNode;
  className?: string;
}

export const Button = ({ children, className = "" }: ButtonProps) => {
  return (
    <button
      className={`${styles.button} ${className}`}
      onClick={() => console.log("Button clicked")}
    >
      {children}
    </button>
  );
};

export default Button;
