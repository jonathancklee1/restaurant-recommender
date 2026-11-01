import React from "react";
import styles from "./TableContainer.module.css";
import Table from "../../ui/table/Table/Table";
import MobileList from "../../ui/table/MobileList/MobileList";

export interface TableContainerProps {
  children?: React.ReactNode;
  className?: string;
}

export const TableContainer = ({ className = "" }: TableContainerProps) => {
  return (
    <div className={`container ${styles.container} ${className}`}>
      <div style={{ paddingBlock: "1em", background: "var(--background-secondary)" }}>
        TABLE FILTERS
      </div>
      <div className={styles.table}>
        <Table />
      </div>
      <div className={styles.mobileList}>
        <MobileList listItems={[1, 2, 3, 4]} />
      </div>
    </div>
  );
};

export default TableContainer;
