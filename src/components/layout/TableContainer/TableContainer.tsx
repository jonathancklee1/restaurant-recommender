import React, { useContext, useState } from "react";
import styles from "./TableContainer.module.css";
import Table from "../../ui/table/Table/Table";
import MobileList from "../../ui/table/MobileList/MobileList";
import TableFilters from "../TableFilters/TableFilters";
import { RestaurantContext } from "../../../context/RestaurantProvider";
import Modal from "../../ui/Modal/Modal";
import { SelectedRestaurantContext } from "../../../context/SelectedRestaurantProvider";
import type { RestaurantFilters } from "../../../utils/types";
import { EMPTY_FILTERS } from "../../../utils/constants";

export interface TableContainerProps {
  children?: React.ReactNode;
  className?: string;
}

export const TableContainer = ({ className = "" }: TableContainerProps) => {
  const { state } = useContext(RestaurantContext);
  const { selectedRestaurant } = useContext(SelectedRestaurantContext);

  const [filters, setFilters] = useState<RestaurantFilters>(EMPTY_FILTERS);
  console.log(filters);

  const filteredState = state
    .filter((restaurant) => {
      if (restaurant.name?.toLowerCase().includes(filters.searchTerm.toLowerCase())) {
        return restaurant;
      }
    })
    .filter((restaurant) => {
      if (
        filters.cuisines.length === 0 ||
        (restaurant.cuisine && filters.cuisines.includes(restaurant.cuisine))
      ) {
        return restaurant;
      }
    })
    .filter((restaurant) => {
      if (
        filters.prices.length === 0 ||
        (restaurant.price && filters.prices.includes(restaurant.price))
      ) {
        return restaurant;
      }
    })
    .filter((restaurant) => {
      if (
        filters.ratings.length === 0 ||
        (restaurant.rating && filters.ratings.includes(restaurant.rating))
      ) {
        return restaurant;
      }
    })
    .filter((restaurant) => {
      const visited = (restaurant.visits ?? 0) > 0;
      if (
        !filters.visitStatus ||
        (filters.visitStatus === "Visited" && visited) ||
        (filters.visitStatus === "Want to Eat" && !visited)
      ) {
        return restaurant;
      }
    });
  return (
    <div className={`container ${styles.container} ${className}`}>
      <div className={styles.filtersContainer}>
        <TableFilters
          cuisines={[...new Set(state.map((r) => r.cuisine).filter((c) => c !== undefined))]}
          filters={filters}
          setFilters={setFilters}
        />
      </div>
      <div className={styles.table}>
        <Table listItems={filteredState} />
      </div>
      <div className={styles.mobileList}>
        <MobileList listItems={filteredState} />
      </div>
      <Modal initialPlace={selectedRestaurant} />
    </div>
  );
};

export default TableContainer;
