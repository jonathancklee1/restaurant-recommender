import React from "react";
import styles from "./MobileList.module.css";
import Card from "../../Card/Card";

export interface MobileListProps {
  children?: React.ReactNode;
  className?: string;
  listItems: any[];
}

export const MobileList = ({ className = "", listItems }: MobileListProps) => {
  return (
    <ul className={`${styles.container} ${className}`}>
      {listItems.map((item: any, index: number) => (
        <li key={index}>
          <Card {...item} />
        </li>
      ))}
    </ul>
  );
};

export default MobileList;
