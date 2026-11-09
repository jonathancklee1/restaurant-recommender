import { useContext, useId } from "react";
import { Trash } from "lucide-react";
import styles from "./DeleteButton.module.css";
import Button from "../Button/Button";
import type { RestaurantType } from "../../../utils/types";
import { RestaurantContext } from "../../../context/RestaurantProvider";

export interface DeleteButtonProps {
  className?: string;
  restaurant: RestaurantType;
}

/** Trash button that asks for confirmation before removing a restaurant. */
export const DeleteButton = ({ className = "", restaurant }: DeleteButtonProps) => {
  const dialogId = useId();
  const { dispatch } = useContext(RestaurantContext);

  return (
    <>
      <Button className={className} type="button" command="show-modal" commandfor={dialogId}>
        <Trash />
      </Button>
      <dialog id={dialogId} className={styles.dialog} closedby="any">
        <p>
          Delete <strong>{restaurant.name}</strong>?
        </p>
        <div className={styles.actions}>
          <Button type="button" className={styles.cancel} command="close" commandfor={dialogId}>
            Cancel
          </Button>
          <Button
            type="button"
            command="close"
            commandfor={dialogId}
            onClick={() => dispatch(["REMOVE_RESTAURANT", restaurant.id])}
          >
            Delete
          </Button>
        </div>
      </dialog>
    </>
  );
};

export default DeleteButton;
