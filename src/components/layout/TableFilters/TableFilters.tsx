import { useRef, useState } from "react";
import styles from "./TableFilters.module.css";
import Button from "../../ui/Button/Button";
import { ChevronDown, ChevronUp, Filter, Search } from "lucide-react";
import FilterPill from "../../ui/FilterPill/FilterPill";
import FilterSheet from "../../ui/FilterSheet/FilterSheet";
import FilterOptions from "../../ui/FilterOptions/FilterOptions";
import { EMPTY_FILTERS } from "../../../utils/constants";
import type { RestaurantFilters } from "../../../utils/types";

export interface TableFiltersProps {
  className?: string;
  cuisines: string[];
}

export const TableFilters = ({ className = "", cuisines }: TableFiltersProps) => {
  const sheetRef = useRef<HTMLDialogElement>(null);
  const [filters, setFilters] = useState<RestaurantFilters>(EMPTY_FILTERS);
  const [isFiltersExpanded, setIsFiltersExpanded] = useState(true);

  const activeCount = filters.prices.length + filters.cuisines.length + (filters.minRating ? 1 : 0);

  return (
    <div className={`${styles.container} ${className}`}>
      <div className={`${styles.searchContainer} ${className}`}>
        <search>
          <form>
            <input type="search" id="restaurant-search" placeholder="Search restaurants" />
          </form>
          <Search className={styles.searchIcon} />
        </search>
      </div>
      <div className={`${styles.additionalContainer} `}>
        <div className={`${styles.pillsContainer} `}>
          <FilterPill selected>All</FilterPill>
          <FilterPill>Want to Eat</FilterPill>
          <FilterPill>Visited</FilterPill>
        </div>
        <Button onClick={() => sheetRef.current?.showModal()}>
          <Filter />
          {activeCount > 0 && <span className={styles.badge}>{activeCount}</span>}
        </Button>
      </div>
      <FilterSheet ref={sheetRef} filters={filters} onChange={setFilters} cuisines={cuisines} />
      <section className={styles.panel} aria-label="Filters">
        <div className={styles.panelHeader}>
          <h2>
            <button
              type="button"
              className={styles.toggleButton}
              aria-expanded={isFiltersExpanded}
              onClick={() => setIsFiltersExpanded((prev) => !prev)}
            >
              {isFiltersExpanded ? "Collapse" : "Expand"} Filters{" "}
              {isFiltersExpanded ? <ChevronUp /> : <ChevronDown />}
            </button>
          </h2>
          {activeCount > 0 && (
            <button
              type="button"
              className={styles.clearButton}
              onClick={() => setFilters(EMPTY_FILTERS)}
            >
              Clear all ({activeCount})
            </button>
          )}
        </div>
        <div
          className={`${styles.filtersContainer} ${isFiltersExpanded ? "" : styles.collapsed}`}
          inert={!isFiltersExpanded}
        >
          <div>
            <FilterOptions
              className={styles.filterOptions}
              layout="row"
              filters={filters}
              onChange={setFilters}
              cuisines={cuisines}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default TableFilters;
