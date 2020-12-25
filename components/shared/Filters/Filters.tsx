import { useCallback } from "react";
import cn from "classnames";

import styles from "./Filters.module.css";

interface Props {
  filters: string[];
  activeFilters: string[];
  handleChangeActiveFilters: (filters: string[]) => void;
}

interface FilterProps {
  filter: string;
  handleClickFilter: (filter: string) => void;
  isActive: boolean;
}

const Filter: React.FC<FilterProps> = ({
  filter,
  handleClickFilter,
  isActive,
}: FilterProps) => {
  return (
    <button
      className={cn(styles.filterBtn, { [styles.active]: isActive })}
      onClick={() => handleClickFilter(filter)}
    >
      {filter}
    </button>
  );
};

const Filters: React.FC<Props> = ({
  filters,
  activeFilters,
  handleClickFilter,
}: Props) => {
  return (
    <div className={styles.container}>
      {filters.map(filter => (
        <Filter
          key={`filter-${filter}`}
          filter={filter}
          handleClickFilter={handleClickFilter}
          isActive={activeFilters.includes(filter)}
        />
      ))}
    </div>
  );
};

export default Filters;
