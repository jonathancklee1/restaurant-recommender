import React from "react";
import styles from "./FilterSheet.module.css";
import Button from "../Button/Button";
import FilterOptions from "../FilterOptions/FilterOptions";
import { EMPTY_FILTERS } from "../../../utils/constants";
import type { RestaurantFilters } from "../../../utils/types";

export interface FilterSheetProps {
  ref: React.Ref<HTMLDialogElement>;
  className?: string;
  filters: RestaurantFilters;
  onChange: (filters: RestaurantFilters) => void;
  cuisines: string[];
}

/** Mobile bottom sheet of filter options. Open it with ref.current.showModal(). */
export const FilterSheet = ({
  ref,
  className = "",
  filters,
  onChange,
  cuisines,
}: FilterSheetProps) => {
  return (
    <dialog
      ref={ref}
      className={`${styles.container} ${className}`}
      onClick={(e) => e.target === e.currentTarget && e.currentTarget.close()}
    >
      <h2 className={styles.title}>Filters</h2>
      <FilterOptions filters={filters} onChange={onChange} cuisines={cuisines} />
      <form method="dialog" className={styles.footer}>
        <button
          type="button"
          className={styles.clearButton}
          onClick={() => onChange(EMPTY_FILTERS)}
        >
          Clear all
        </button>
        <Button>Show results</Button>
      </form>
    </dialog>
  );
};

export default FilterSheet;
