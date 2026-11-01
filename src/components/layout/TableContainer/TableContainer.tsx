import React from "react";
import styles from "./TableContainer.module.css";
import Table from "../../ui/table/Table/Table";
import MobileList from "../../ui/table/MobileList/MobileList";
import { DUMMY_RESTAURANTS } from "../../../utils/dummyData";

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
        <MobileList listItems={DUMMY_RESTAURANTS} />
      </div>
    </div>
  );
};

export default TableContainer;
