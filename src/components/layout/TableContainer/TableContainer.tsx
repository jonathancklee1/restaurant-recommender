import React, { useContext } from "react";
import styles from "./TableContainer.module.css";
import Table from "../../ui/table/Table/Table";
import MobileList from "../../ui/table/MobileList/MobileList";
import TableFilters from "../TableFilters/TableFilters";
import { RestaurantContext } from "../../../context/RestaurantProvider";

export interface TableContainerProps {
  children?: React.ReactNode;
  className?: string;
}

export const TableContainer = ({ className = "" }: TableContainerProps) => {
  const { state } = useContext(RestaurantContext);
  return (
    <div className={`container ${styles.container} ${className}`}>
      <div className={styles.filtersContainer}>
        <TableFilters
          cuisines={[...new Set(state.map((r) => r.cuisine).filter((c) => c !== undefined))]}
        />
      </div>
      <div className={styles.table}>
        <Table listItems={state} />
      </div>
      <div className={styles.mobileList}>
        <MobileList listItems={state} />
      </div>
    </div>
  );
};

export default TableContainer;
