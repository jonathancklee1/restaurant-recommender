import React from "react";
import styles from "./Table.module.css";
import { COLUMN_HEADERS } from "../../../../utils/constants";

export interface TableProps {
  children?: React.ReactNode;
  className?: string;
}

export const Table = ({ className = "" }: TableProps) => {
  return (
    <div className={`${styles.container} ${className}`}>
      <table>
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
          <tr>
            <td>HTML tables</td>
            <td>22</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Table;
