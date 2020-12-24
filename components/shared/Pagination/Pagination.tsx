import { useCallback } from "react";
import cn from "classnames";

import styles from "./Pagination.module.css";

interface Props {
  currentPage: number;
  maxPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

interface PageProps {
  page: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const Page: React.FC<PageProps> = ({
  page,
  currentPage,
  setCurrentPage,
}: PageProps) => {
  const handleClick = useCallback(() => {
    setCurrentPage(page);
  }, [page, setCurrentPage]);
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
  setCurrentPage,
}: Props) => {
  const range = [
    currentPage - 2,
    currentPage - 1,
    currentPage,
    currentPage + 1,
    currentPage + 2,
  ].filter(item => item > 1 && item < maxPage);
  const handlePrev = useCallback(() => {
    setCurrentPage(currentPage - 1);
  }, [currentPage, setCurrentPage]);
  const handleNext = useCallback(() => {
    setCurrentPage(currentPage + 1);
  }, [currentPage, setCurrentPage]);

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
        setCurrentPage={setCurrentPage}
      />
      {!range.includes(2) && range.length ? (
        <div className={styles.ellipsis}>...</div>
      ) : null}
      {range.map(page => (
        <Page
          key={`page-${page}`}
          page={page}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      ))}
      {!range.includes(maxPage - 1) && range.length ? (
        <div className={styles.ellipsis}>...</div>
      ) : null}
      {maxPage !== 1 && (
        <Page
          page={maxPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
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
