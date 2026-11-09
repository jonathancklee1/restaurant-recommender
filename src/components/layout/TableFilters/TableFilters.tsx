import { useRef, useState, type Dispatch, type SetStateAction } from "react";
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
  filters: RestaurantFilters;
  setFilters: Dispatch<SetStateAction<RestaurantFilters>>;
}

export const TableFilters = ({
  className = "",
  cuisines,
  filters,
  setFilters,
}: TableFiltersProps) => {
  const sheetRef = useRef<HTMLDialogElement>(null);

  const [isFiltersExpanded, setIsFiltersExpanded] = useState(true);

  const activeCount =
    filters.prices &&
    filters.cuisines &&
    filters.prices.length + filters.cuisines.length + filters.ratings.length;

  return (
    <div className={`${styles.container} ${className}`}>
      <div className={`${styles.searchContainer} ${className}`}>
        <search>
          <form>
            <input
              type="search"
              id="restaurant-search"
              placeholder="Search restaurants"
              value={filters.searchTerm}
              onChange={(e) =>
                setFilters((prev) => {
                  return { ...prev, searchTerm: e.target.value };
                })
              }
            />
          </form>
          <Search className={styles.searchIcon} />
        </search>
      </div>
      <div className={`${styles.additionalContainer} `}>
        <div className={`${styles.pillsContainer} `}>
          <FilterPill
            selected={!filters.visitStatus}
            onClick={() => {
              setFilters((prev) => {
                return {
                  ...prev,
                  visitStatus: null,
                };
              });
            }}
          >
            All
          </FilterPill>
          <FilterPill
            selected={filters.visitStatus === "Want to Eat"}
            onClick={() => {
              setFilters((prev) => {
                return {
                  ...prev,
                  visitStatus: "Want to Eat",
                };
              });
            }}
          >
            Want to Eat
          </FilterPill>
          <FilterPill
            selected={filters.visitStatus === "Visited"}
            onClick={() => {
              setFilters((prev) => {
                return {
                  ...prev,
                  visitStatus: "Visited",
                };
              });
            }}
          >
            Visited
          </FilterPill>
        </div>
        <Button onClick={() => sheetRef.current?.showModal()}>
          <Filter />
          {activeCount! > 0 && <span className={styles.badge}>{activeCount}</span>}
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
          {activeCount! > 0 && (
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
          <FilterOptions
            className={styles.filterOptions}
            layout="row"
            filters={filters}
            onChange={setFilters}
            cuisines={cuisines}
          />
        </div>
      </section>
    </div>
  );
};

export default TableFilters;
