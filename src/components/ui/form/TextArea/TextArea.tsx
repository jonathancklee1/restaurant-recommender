import type { TextareaHTMLAttributes } from "react";
import styles from "./TextArea.module.css";

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}

export const TextArea = ({ className = "", ...rest }: TextAreaProps) => {
  return <textarea className={`${styles.container} ${className}`} rows={4} {...rest}></textarea>;
};

export default TextArea;
