import React from "react";
import styles from "./FilterSheet.module.css";
import Button from "../Button/Button";
import FilterPill from "../FilterPill/FilterPill";
import { EMPTY_FILTERS, MIN_RATING_OPTIONS, PRICE_OPTIONS } from "../../../utils/constants";
import { getDollarSigns } from "../../../utils/helpers/getDollarSigns";
import { toggleItem } from "../../../utils/helpers/toggleItem";
import type { RestaurantFilters } from "../../../utils/types";

export interface FilterSheetProps {
  ref: React.Ref<HTMLDialogElement>;
  className?: string;
  filters: RestaurantFilters;
  onChange: (filters: RestaurantFilters) => void;
  cuisines: string[];
}

/** Bottom sheet of price, rating and cuisine pills. Open it with ref.current.showModal(). */
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
      <h2>Filters</h2>

      <FilterGroup title="Price">
        {PRICE_OPTIONS.map((price) => (
          <FilterPill
            key={price}
            selected={filters.prices.includes(price)}
            onClick={() => onChange({ ...filters, prices: toggleItem(filters.prices, price) })}
          >
            {getDollarSigns(price)}
          </FilterPill>
        ))}
      </FilterGroup>

      <FilterGroup title="Rating">
        <FilterPill
          selected={filters.minRating === null}
          onClick={() => onChange({ ...filters, minRating: null })}
        >
          Any
        </FilterPill>
        {MIN_RATING_OPTIONS.map((rating) => (
          <FilterPill
            key={rating}
            selected={filters.minRating === rating}
            onClick={() => onChange({ ...filters, minRating: rating })}
          >
            {rating === 5 ? "5" : `${rating}+`} ★
          </FilterPill>
        ))}
      </FilterGroup>

      <FilterGroup title="Cuisine">
        {cuisines.map((cuisine) => (
          <FilterPill
            key={cuisine}
            selected={filters.cuisines.includes(cuisine)}
            onClick={() =>
              onChange({ ...filters, cuisines: toggleItem(filters.cuisines, cuisine) })
            }
          >
            {cuisine}
          </FilterPill>
        ))}
      </FilterGroup>

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

/** A titled, wrapping row of pills. */
const FilterGroup = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section>
    <h3>{title}</h3>
    <div className={styles.pillGroup}>{children}</div>
  </section>
);

export default FilterSheet;
