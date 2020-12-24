import { useState, useCallback } from "react";
import cn from "classnames";

import styles from "./Filters.module.css";

interface Props {
  filters: string[];
}

interface FilterProps {
  filter: string;
  handleFilter: (filter: string) => void;
  isActive: boolean;
}

const Filter: React.FC<FilterProps> = ({
  filter,
  handleFilter,
  isActive,
}: FilterProps) => {
  return (
    <button
      className={cn(styles.filterBtn, { [styles.active]: isActive })}
      onClick={() => handleFilter(filter)}
    >
      {filter}
    </button>
  );
};

const Filters: React.FC<Props> = ({ filters }: Props) => {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const handleFilter = useCallback(
    filter => {
      if (activeFilters.includes(filter)) {
        const newActiveFilters = activeFilters.filter(item => item !== filter);
        setActiveFilters(newActiveFilters);
      } else {
        setActiveFilters([...activeFilters, filter]);
      }
    },
    [activeFilters]
  );

  return (
    <div className={styles.container}>
      {filters.map(filter => (
        <Filter
          key={`filter-${filter}`}
          filter={filter}
          handleFilter={handleFilter}
          isActive={activeFilters.includes(filter)}
        />
      ))}
    </div>
  );
};

export default Filters;
