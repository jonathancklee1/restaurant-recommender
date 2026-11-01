import React from "react";
import styles from "./MobileList.module.css";
import Card from "../../Card/Card";
import type { RestaurantType } from "../../../../utils/types";

export interface MobileListProps {
  children?: React.ReactNode;
  className?: string;
  listItems: RestaurantType[];
}

export const MobileList = ({ className = "", listItems }: MobileListProps) => {
  return (
    <ul className={`${styles.container} ${className}`}>
      {listItems.map((restaurant) => (
        <li key={restaurant.id}>
          <Card restaurant={restaurant} />
        </li>
      ))}
    </ul>
  );
};

export default MobileList;
