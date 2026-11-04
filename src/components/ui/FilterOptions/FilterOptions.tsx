import React from "react";
import styles from "./FilterOptions.module.css";
import FilterPill from "../FilterPill/FilterPill";
import CuisineFilter from "../CuisineFilter/CuisineFilter";
import { MIN_RATING_OPTIONS, PRICE_OPTIONS } from "../../../utils/constants";
import { toggleItem } from "../../../utils/helpers/toggleItem";
import type { RestaurantFilters } from "../../../utils/types";

export interface FilterOptionsProps {
  className?: string;
  filters: RestaurantFilters;
  onChange: (filters: RestaurantFilters) => void;
  cuisines: string[];
  /** "stacked" puts groups in a column; "row" puts them side by side on wide screens. */
  layout?: "stacked" | "row";
}

/** Price, rating and cuisine filter groups. Used in the mobile sheet and the desktop panel. */
export const FilterOptions = ({
  className = "",
  filters,
  onChange,
  cuisines,
  layout = "stacked",
}: FilterOptionsProps) => {
  return (
    <div className={`${styles.container} ${styles[layout]} ${className}`}>
      <FilterGroup title="Price">
        <div className={styles.pills}>
          {PRICE_OPTIONS.map((price) => (
            <FilterPill
              key={price}
              selected={filters.prices.includes(price)}
              onClick={() => onChange({ ...filters, prices: toggleItem(filters.prices, price) })}
            >
              {"$".repeat(price)}
            </FilterPill>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Rating">
        <div className={styles.pills}>
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
        </div>
      </FilterGroup>

      <FilterGroup title="Cuisine">
        <CuisineFilter
          cuisines={cuisines}
          selected={filters.cuisines}
          onChange={(selected) => onChange({ ...filters, cuisines: selected })}
        />
      </FilterGroup>
    </div>
  );
};

/** A titled filter section. */
const FilterGroup = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section>
    <h3 className={styles.title}>{title}</h3>
    {children}
  </section>
);

export default FilterOptions;
