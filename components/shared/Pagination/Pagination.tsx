import { useCallback } from "react";
import cn from "classnames";

import styles from "./Pagination.module.css";

interface Props {
  currentPage: number;
  maxPage: number;
  handleChangeCurrentPage: (page: number) => void;
}

interface PageProps {
  page: number;
  currentPage: number;
  handleChangeCurrentPage: (page: number) => void;
}

const Page: React.FC<PageProps> = ({
  page,
  currentPage,
  handleChangeCurrentPage,
}: PageProps) => {
  const handleClick = useCallback(() => {
    handleChangeCurrentPage(page);
  }, [page, handleChangeCurrentPage]);
  return (
    <button
      className={cn(styles.page, { [styles.active]: page === currentPage })}
      onClick={handleClick}
      disabled={page === currentPage}
    >
      {page}
    </button>
  );
};

const Pagination: React.FC<Props> = ({
  currentPage,
  maxPage,
  handleChangeCurrentPage,
}: Props) => {
  const range = [
    currentPage - 2,
    currentPage - 1,
    currentPage,
    currentPage + 1,
    currentPage + 2,
  ].filter(item => item > 1 && item < maxPage);
  const handlePrev = useCallback(() => {
    handleChangeCurrentPage(currentPage - 1);
  }, [currentPage, handleChangeCurrentPage]);
  const handleNext = useCallback(() => {
    handleChangeCurrentPage(currentPage + 1);
  }, [currentPage, handleChangeCurrentPage]);

  return (
    <div className={styles.container}>
      <button
        className={styles.page}
        onClick={handlePrev}
        disabled={currentPage === 1}
      >
        &lt;
      </button>
      <Page
        page={1}
        currentPage={currentPage}
        handleChangeCurrentPage={handleChangeCurrentPage}
      />
      {!range.includes(2) && range.length ? (
        <div className={styles.ellipsis}>...</div>
      ) : null}
      {range.map(page => (
        <Page
          key={`page-${page}`}
          page={page}
          currentPage={currentPage}
          handleChangeCurrentPage={handleChangeCurrentPage}
        />
      ))}
      {!range.includes(maxPage - 1) && range.length ? (
        <div className={styles.ellipsis}>...</div>
      ) : null}
      {maxPage > 1 && (
        <Page
          page={maxPage}
          currentPage={currentPage}
          handleChangeCurrentPage={handleChangeCurrentPage}
        />
      )}
      <button
        className={styles.page}
        onClick={handleNext}
        disabled={currentPage === maxPage}
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
