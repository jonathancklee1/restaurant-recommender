import styles from "./MobileSideDrawer.module.css";
import Map from "../../Map/Map";
import { useContext } from "react";
import { RestaurantMapContext } from "../../../context/RestaurantMapProvider";
import { X } from "lucide-react";
export interface MobileSideDrawerProps {
  className?: string;
}

export const MobileSideDrawer = ({ className = "" }: MobileSideDrawerProps) => {
  const { restaurantMap, isDrawerOpen, closeDrawer } = useContext(RestaurantMapContext);
  return (
    <div className={`${styles.container} ${className}`} data-open={isDrawerOpen || undefined}>
      <div className={styles.mapHeader}>
        <h3>
          Location for <span> {restaurantMap?.name}</span>
        </h3>
        <X onClick={closeDrawer} />
      </div>
      <Map
        address={(restaurantMap && restaurantMap.address) || ""}
        latLong={restaurantMap?.latLong ?? null}
      />
    </div>
  );
};

export default MobileSideDrawer;
