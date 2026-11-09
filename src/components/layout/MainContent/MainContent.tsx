import styles from "./MainContent.module.css";
import TableContainer from "../TableContainer/TableContainer";
import DesktopMapContainer from "../DesktopMapContainer/DesktopMapContainer";

export interface MainContentProps {
  className?: string;
}

/** Restaurant table with the map beside it on desktop. */
export const MainContent = ({ className = "" }: MainContentProps) => {
  return (
    <div className={`${styles.container} ${className}`}>
      <TableContainer className={styles.table} />
      <DesktopMapContainer />
    </div>
  );
};

export default MainContent;
