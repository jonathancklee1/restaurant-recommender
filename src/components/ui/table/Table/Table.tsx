import React from "react";
import { MapPin, Pencil, Trash } from "lucide-react";
import styles from "./Table.module.css";
import { COLUMN_HEADERS } from "../../../../utils/constants";
import type { RestaurantType } from "../../../../utils/types";
import Pill from "../../Pill/Pill";
import Rating from "../../Rating/Rating";
import { getDollarSigns } from "../../../../utils/helpers/getDollarSigns";
import VisitsCounter from "../../../VisitsCounter/VisitsCounter";

export interface TableProps {
  children?: React.ReactNode;
  className?: string;
  listItems: RestaurantType[];
}

export const Table = ({ className = "", listItems }: TableProps) => {
  return (
    <div className={`${styles.container} ${className}`}>
      <table className={styles.table}>
        <thead>
          <tr>
            {COLUMN_HEADERS.map((columnHeaders) => {
              return (
                <th key={COLUMN_HEADERS.indexOf(columnHeaders)} scope="col">
                  {columnHeaders}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {listItems.map((restaurant) => (
            <tr key={restaurant.id}>
              <td className={styles.nameCell}>
                <div className={styles.name}>{restaurant.name}</div>
              </td>
              <td className={styles.pillCell}>
                <Pill variant="secondary">{restaurant.cuisine}</Pill>
              </td>
              <td className={styles.suburbCell}>{restaurant.suburb}</td>
              <td className={styles.ratingCell}>
                <Rating ratingNum={restaurant.rating} />
              </td>
              <td className={styles.priceCell}>{getDollarSigns(restaurant.price)}</td>
              <td className={styles.visitsCell}>
                <VisitsCounter count={restaurant.visits} />
              </td>
              <td className={styles.commentsCell}>
                <div className={styles.comments}>{restaurant.comments}</div>
              </td>
              <td className={styles.actionCell}>
                <div className={styles.actions}>
                  <MapPin />
                  <Pencil />
                  <Trash />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
