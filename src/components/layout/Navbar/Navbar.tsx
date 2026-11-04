import Button from "../../ui/Button/Button";
import Logo from "../../ui/Logo/Logo";
import { modalId } from "../../ui/Modal/Modal";
import Pill from "../../ui/Pill/Pill";
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
            <Pill variant="primary">
              <div className={styles.liveDot}>
                <span className={styles.pinDot}></span>
                <span className={styles.pingRing}></span>
              </div>
              <span>Sydney</span>
            </Pill>
          </div>
          <h2 className={styles.subtitle}>Personal Sydney dining bucket list & picker</h2>
        </div>
      </div>
      <div>
        <Button
          type="button"
          command="show-modal"
          commandfor={modalId}
          onClick={() => setSelectedRestaurant(null)}
        >
          Add Restaurant
        </Button>
      </div>
    </nav>
  );
}

export default Navbar;
