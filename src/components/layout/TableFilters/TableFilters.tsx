import { useRef, useState } from "react";
import styles from "./TableFilters.module.css";
import Button from "../../ui/Button/Button";
import { Filter, Search } from "lucide-react";
import FilterPill from "../../ui/FilterPill/FilterPill";
import FilterSheet from "../../ui/FilterSheet/FilterSheet";
import { EMPTY_FILTERS } from "../../../utils/constants";
import type { RestaurantFilters } from "../../../utils/types";

export interface TableFiltersProps {
  className?: string;
  cuisines: string[];
}

export const TableFilters = ({ className = "", cuisines }: TableFiltersProps) => {
  const sheetRef = useRef<HTMLDialogElement>(null);
  const [filters, setFilters] = useState<RestaurantFilters>(EMPTY_FILTERS);
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
    </div>
  );
};

export default TableFilters;
