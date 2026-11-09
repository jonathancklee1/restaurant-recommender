import { useState } from "react";
import styles from "./CuisineFilter.module.css";
import FilterPill from "../FilterPill/FilterPill";
import { CUISINE_PREVIEW_COUNT } from "../../../utils/constants";
import { toggleItem } from "../../../utils/helpers/toggleItem";

export interface CuisineFilterProps {
  className?: string;
  cuisines: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
}

export const CuisineFilter = ({
  className = "",
  cuisines,
  selected,
  onChange,
}: CuisineFilterProps) => {
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState(false);
  const isLong = cuisines.length > CUISINE_PREVIEW_COUNT;
  const search = query.trim().toLowerCase();

  const visible =
    cuisines.length > 0 && (search || expanded || !isLong)
      ? cuisines.filter((c) => c.toLowerCase().includes(search))
      : cuisines.filter((c, i) => i < CUISINE_PREVIEW_COUNT || selected.includes(c));

  return (
    <div className={`${styles.container} ${className}`}>
      {isLong && (
        <input
          type="search"
          className={styles.search}
          placeholder="Search cuisines"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      )}
      <div className={styles.pills}>
        {visible.map((cuisine) => (
          <FilterPill
            key={cuisine}
            selected={selected.includes(cuisine)}
            onClick={() => onChange(toggleItem(selected, cuisine))}
          >
            {cuisine}
          </FilterPill>
        ))}
        {visible.length === 0 && <p className={styles.empty}>No cuisines match "{query}"</p>}
      </div>
      {isLong && !search && (
        <button type="button" className={styles.toggle} onClick={() => setExpanded(!expanded)}>
          {expanded ? "Show less" : `Show all ${cuisines.length}`}
        </button>
      )}
    </div>
  );
};

export default CuisineFilter;
