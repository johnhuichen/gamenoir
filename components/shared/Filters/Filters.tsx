import { useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import cn from "classnames";

import getTranslations from "translations/genre";

import styles from "./Filters.module.css";

interface Props {
  filters: string[];
  activeFilter: string | null;
  getFilterHref: (filters: string) => string;
}

interface FilterProps {
  label: string;
  isActive: boolean;
  href: string;
}

const Filter: React.FC<FilterProps> = ({
  label,
  href,
  isActive,
}: FilterProps) => {
  return (
    <Link href={href}>
      <a
        href={href}
        className={cn(styles.filterBtn, { [styles.active]: isActive })}
      >
        {label}
      </a>
    </Link>
  );
};

const Filters: React.FC<Props> = ({
  filters,
  activeFilter,
  getFilterHref,
}: Props) => {
  const { locale } = useRouter();
  const translations = useMemo(() => getTranslations(locale as string), [
    locale,
  ]);

  return (
    <div className={styles.container}>
      <Filter
        label={translations.ALL}
        href="/home/1"
        isActive={!activeFilter}
      />
      {filters.map(filter => (
        <Filter
          key={`filter-${filter}`}
          label={translations[filter]}
          href={getFilterHref(filter)}
          isActive={filter === activeFilter}
        />
      ))}
    </div>
  );
};

export default Filters;
