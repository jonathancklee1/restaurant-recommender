import React from "react";
import styles from "./Logo.module.css";
import { Hamburger } from "lucide-react";

export interface LogoProps {
  children?: React.ReactNode;
  className?: string;
}

export const Logo = ({ className = "" }: LogoProps) => {
  return (
    <div className={`${styles.container} ${className}`}>
      <Hamburger />
    </div>
  );
};

export default Logo;
