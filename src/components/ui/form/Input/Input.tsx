import React from "react";
import styles from "./Input.module.css";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export const Input = ({ className = "", ...rest }: InputProps) => {
  return <input className={`${styles.container} ${className}`} {...rest}></input>;
};

export default Input;
