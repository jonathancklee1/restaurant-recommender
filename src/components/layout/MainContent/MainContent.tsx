import styles from "./MainContent.module.css";
import TableContainer from "../TableContainer/TableContainer";
import DesktopMapContainer from "../DesktopMapContainer/DesktopMapContainer";
import MobileSideDrawer from "../MobileSideDrawer/MobileSideDrawer";
import { useMediaQuery } from "../../../utils/hooks/useMediaQuery";
import { DESKTOP_QUERY } from "../../../utils/constants";
import RandomiserContainer from "../RandomiserContainer/RandomiserContainer";

export interface MainContentProps {
  className?: string;
}

/** Restaurant table with one map: beside it on desktop, in a drawer on mobile. */
export const MainContent = ({ className = "" }: MainContentProps) => {
  const isDesktop = useMediaQuery(DESKTOP_QUERY);

  return (
    <div className={`${styles.container} ${className}`}>
      <RandomiserContainer />
      <TableContainer className={styles.table} />
      {isDesktop ? <DesktopMapContainer /> : <MobileSideDrawer />}
    </div>
  );
};

export default MainContent;
