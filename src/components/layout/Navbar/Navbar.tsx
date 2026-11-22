import { Plus } from "lucide-react";
import Button from "../../ui/Button/Button";
import Logo from "../../ui/Logo/Logo";
import { restaurantModalId } from "../../ui/RestaurantModal/RestaurantModal";
import styles from "./Navbar.module.css";
import { useContext } from "react";
import { SelectedRestaurantContext } from "../../../context/SelectedRestaurantProvider";

function Navbar() {
  const { setSelectedRestaurant } = useContext(SelectedRestaurantContext);
  return (
    <nav className={`container ${styles.nav}`}>
      <div className={styles.leftContainer}>
        <Logo />
        <div>
          <div className={styles.leftInnerContainer}>
            <h1 className={styles.title}>Where Tonight?</h1>
          </div>
          <h2 className={styles.subtitle}>Personal dining bucket list & picker</h2>
        </div>
      </div>
      <div>
        <Button
          type="button"
          command="show-modal"
          commandfor={restaurantModalId}
          onClick={() => setSelectedRestaurant(null)}
        >
          <Plus size={18} /> Add Restaurant
        </Button>
      </div>
    </nav>
  );
}

export default Navbar;
