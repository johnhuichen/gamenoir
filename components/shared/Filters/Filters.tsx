import { useMemo } from "react";
import Link from "next/link";
import cn from "classnames";

import styles from "./Filters.module.css";

interface Props {
  filters: string[];
  activeFilter: string | null;
  getFilterHref: (filters: string) => string;
}

interface FilterProps {
  filter: string;
  getFilterHref: (filter: string) => string;
  isActive: boolean;
}

const Filter: React.FC<FilterProps> = ({
  filter,
  getFilterHref,
  isActive,
}: FilterProps) => {
  const href = useMemo(() => getFilterHref(filter), [filter, getFilterHref]);

  return (
    <Link href={href}>
      <a
        href={href}
        className={cn(styles.filterBtn, { [styles.active]: isActive })}
      >
        {filter}
      </a>
    </Link>
  );
};

const Filters: React.FC<Props> = ({
  filters,
  activeFilter,
  getFilterHref,
}: Props) => {
  return (
    <div className={styles.container}>
      {filters.map(filter => (
        <Filter
          key={`filter-${filter}`}
          filter={filter}
          isActive={filter === activeFilter}
          getFilterHref={getFilterHref}
        />
      ))}
    </div>
  );
};

export default Filters;
