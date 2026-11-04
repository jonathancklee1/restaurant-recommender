import React from "react";
import styles from "./Button.module.css";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Button = ({ children, className = "", onClick, ...rest }: ButtonProps) => {
  return (
    <button className={`${styles.button} ${className}`} onClick={onClick} {...rest}>
      {children}
    </button>
  );
};

export default Button;
