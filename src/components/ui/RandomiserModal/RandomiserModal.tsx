import styles from "./RandomiserModal.module.css";
import Modal from "../Modal/Modal";
import type { ConstraintType } from "../../layout/RandomiserContainer/RandomiserContainer";
import { randomiserModalId } from "../../../utils/constants";

import type { RestaurantType } from "../../../utils/types";

export interface RandomiserModalProps {
  className?: string;
  constraints: ConstraintType;
  randomRestaurant: RestaurantType | undefined;
}
export const RandomiserModal = ({
  className = "",
  constraints,
  randomRestaurant,
}: RandomiserModalProps) => {
  for (const [key, value] of Object.entries(constraints)) {
    console.log(`${key}: ${value}`);
  }
  console.log(randomRestaurant);
  return (
    <Modal id={randomiserModalId} className={className}>
      <div className={styles.modalContent}>
        <h3>Picking Restaurant - {randomRestaurant?.name}</h3>
      </div>
    </Modal>
  );
};

export default RandomiserModal;
