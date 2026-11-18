import styles from "./MobileSideDrawer.module.css";
import Map from "../../Map/Map";
import { useContext } from "react";
import {
  RestaurantMapActionsContext,
  RestaurantMapContext,
} from "../../../context/RestaurantMapProvider";
import { X } from "lucide-react";
export interface MobileSideDrawerProps {
  className?: string;
}

export const MobileSideDrawer = ({ className = "" }: MobileSideDrawerProps) => {
  const { restaurantMap, isDrawerOpen } = useContext(RestaurantMapContext);
  const { closeDrawer } = useContext(RestaurantMapActionsContext);
  return (
    <div className={`${styles.container} ${className}`} data-open={isDrawerOpen || undefined}>
      <div className={styles.mapHeader}>
        <h3>
          Location for <span> {restaurantMap?.name}</span>
        </h3>
        <button type="button" className={styles.close} aria-label="Close map" onClick={closeDrawer}>
          <X />
        </button>
      </div>
      <Map
        address={(restaurantMap && restaurantMap.address) || ""}
        latLong={restaurantMap?.latLong ?? null}
      />
    </div>
  );
};

export default MobileSideDrawer;
