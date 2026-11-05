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
        <Table listItems={state} />
      </div>
      <div className={styles.mobileList}>
        <MobileList listItems={state} />
      </div>
      <Modal initialPlace={selectedRestaurant} />
    </div>
  );
};

export default TableContainer;
