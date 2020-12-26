import { useMemo } from "react";
import Link from "next/link";
import cn from "classnames";

import styles from "./Pagination.module.css";

interface Props {
  activePage: number;
  maxPage: number;
  getPageHref: (page: number) => string;
}

interface PageProps {
  page: number;
  activePage: number;
  getPageHref: (page: number) => string;
}

const Page: React.FC<PageProps> = ({
  page,
  activePage,
  getPageHref,
}: PageProps) => {
  const href = useMemo(() => getPageHref(page), [page, getPageHref]);

  if (page === activePage) {
    return <div className={cn(styles.page, styles.active)}>{page}</div>;
  }

  return (
    <Link href={href}>
      <a href={href} className={styles.page}>
        {page}
      </a>
    </Link>
  );
};

const Pagination: React.FC<Props> = ({
  activePage,
  maxPage,
  getPageHref,
}: Props) => {
  const range = [
    activePage - 2,
    activePage - 1,
    activePage,
    activePage + 1,
    activePage + 2,
  ].filter(item => item > 1 && item < maxPage);

  return (
    <div className={styles.container}>
      <div className={styles.page}>&lt;</div>
      <Page page={1} activePage={activePage} getPageHref={getPageHref} />
      {!range.includes(2) && range.length ? (
        <div className={styles.ellipsis}>...</div>
      ) : null}
      {range.map(page => (
        <Page
          key={`page-${page}`}
          page={page}
          activePage={activePage}
          getPageHref={getPageHref}
        />
      ))}
      {!range.includes(maxPage - 1) && range.length ? (
        <div className={styles.ellipsis}>...</div>
      ) : null}
      {maxPage > 1 && (
        <Page
          page={maxPage}
          activePage={activePage}
          getPageHref={getPageHref}
        />
      )}
      <div className={styles.page}>&gt;</div>
    </div>
  );
};

export default Pagination;
