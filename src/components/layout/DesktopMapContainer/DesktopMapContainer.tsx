import { useContext } from "react";
import styles from "./DesktopMapContainer.module.css";
import Map from "../../Map/Map";
import { RestaurantMapContext } from "../../../context/RestaurantMapProvider";

export interface DesktopMapContainerProps {
  className?: string;
}

export const DesktopMapContainer = ({ className = "" }: DesktopMapContainerProps) => {
  const { restaurantMap } = useContext(RestaurantMapContext);

  return (
    <aside className={`${styles.container} ${className}`}>
      <Map
        address={restaurantMap?.address ?? ""}
        latLong={restaurantMap?.latLong ?? null}
        className={styles.map}
      />
    </aside>
  );
};

export default DesktopMapContainer;
