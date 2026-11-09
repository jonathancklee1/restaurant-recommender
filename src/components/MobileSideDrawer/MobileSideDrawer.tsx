import styles from "./MobileSideDrawer.module.css";
import Map from "../../components/Map/Map";
import { useContext } from "react";
import { RestaurantMapContext } from "../../context/RestaurantMapProvider";
import { X } from "lucide-react";
export interface MobileSideDrawerProps {
  className?: string;
}

export const MobileSideDrawer = ({ className = "" }: MobileSideDrawerProps) => {
  const { restaurantMap, setRestaurantMap } = useContext(RestaurantMapContext);
  return (
    <div className={`${styles.container} ${className}`} data-open={restaurantMap && true}>
      <div className={styles.mapHeader}>
        <h3>
          Location for <span> {restaurantMap?.name}</span>
        </h3>
        <X onClick={() => setRestaurantMap(null)} />
      </div>
      <Map address={(restaurantMap && restaurantMap.address) || ""} />
    </div>
  );
};

export default MobileSideDrawer;
