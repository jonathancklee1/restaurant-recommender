import React, { memo, useContext } from "react";
import { MapPin, Pencil, Utensils } from "lucide-react";
import styles from "./Table.module.css";
import { COLUMN_HEADERS } from "../../../../utils/constants";
import type { RestaurantFilters, RestaurantType } from "../../../../utils/types";
import Pill from "../../Pill/Pill";
import Rating from "../../Rating/Rating";
import VisitsCounter from "../../../VisitsCounter/VisitsCounter";
import Button from "../../Button/Button";
import FavouriteButton from "../../FavouriteButton/FavouriteButton";
import DeleteButton from "../../DeleteButton/DeleteButton";
import { modalId } from "../../Modal/Modal";
import { getSuburb } from "../../../../utils/helpers/getSuburb";
import { SelectedRestaurantContext } from "../../../../context/SelectedRestaurantProvider";
import { filterRestaurants } from "../../../../utils/helpers/filterRestaurants";
import { sortFavouriteRestaurants } from "../../../../utils/helpers/sortFavouriteRestaurants";
import { RestaurantMapContext } from "../../../../context/RestaurantMapProvider";

export interface TableProps {
  children?: React.ReactNode;
  className?: string;
  restaurants: RestaurantType[];
  deferredFilters: RestaurantFilters;
}

/** Desktop table. Memoised so it only re-renders when the deferred filters catch up. */
export const Table = memo(function Table({
  className = "",
  restaurants,
  deferredFilters,
}: TableProps) {
  const listItems = sortFavouriteRestaurants(filterRestaurants(restaurants, deferredFilters));
  const { setSelectedRestaurant } = useContext(SelectedRestaurantContext);
  const { setRestaurantMap } = useContext(RestaurantMapContext);

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
          {listItems.length === 0 && (
            <tr className={styles.emptyRow}>
              <td colSpan={COLUMN_HEADERS.length}>
                <div className={styles.empty}>
                  <Utensils className={styles.emptyIcon} />
                  <span>No Restaurants</span>
                </div>
              </td>
            </tr>
          )}
          {listItems.map((restaurant) => (
            <tr key={restaurant.id}>
              <td className={styles.nameCell}>
                <div className={styles.name}>
                  <FavouriteButton restaurant={restaurant} />
                  {restaurant.imageUrl && <img src={restaurant.imageUrl} alt={restaurant.name} />}

                  <span>{restaurant.name}</span>
                </div>
              </td>
              <td className={styles.pillCell}>
                <Pill variant="secondary">{restaurant.cuisine ?? "-"}</Pill>
              </td>
              <td className={styles.suburbCell}>{getSuburb(restaurant.address ?? "-")}</td>

              <td className={styles.priceCell}>{restaurant.price ?? "-"}</td>
              <td className={styles.visitsCell}>
                <VisitsCounter count={restaurant.visits} visitId={restaurant.id} />
              </td>
              <td className={styles.ratingCell}>
                <Rating ratingNum={restaurant.rating} />
              </td>
              <td className={styles.commentsCell}>
                <div className={styles.comments}>{restaurant.comments}</div>
              </td>
              <td className={styles.actionCell}>
                <div className={styles.actions}>
                  <Button onClick={() => setRestaurantMap(restaurant)}>
                    <MapPin />
                  </Button>
                  <Button
                    type="button"
                    command="show-modal"
                    commandfor={modalId}
                    onClick={() => setSelectedRestaurant(restaurant)}
                  >
                    <Pencil />
                  </Button>
                  <DeleteButton restaurant={restaurant} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={COLUMN_HEADERS.length} className={styles.totalCell}>
              Showing {listItems.length} restaurants in Sydney
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
});

export default Table;
