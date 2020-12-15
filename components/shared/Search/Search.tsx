import { createRef, useCallback, useMemo } from "react";
import cn from "classnames";
import debounce from "lodash/debounce";

import styles from "./Search.module.css";

interface Props {
  handleChangeInput: (value: string) => void;
  handleClearSearch: () => void;
}

const Search: React.FC<Props> = ({
  handleChangeInput,
  handleClearSearch,
}: Props) => {
  const inputRef = createRef<HTMLInputElement>();

  const clearSearch = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.value = "";
      handleClearSearch();
    }
  }, [inputRef, handleClearSearch]);

  const onChange = useMemo(
    () =>
      debounce(async (e: { target: HTMLInputElement }) => {
        const { value } = e.target;
        handleChangeInput(value);
      }, 300),
    [handleChangeInput]
  );

  return (
    <div className={styles.searchContainer}>
      <i aria-hidden className={cn("fas fa-search", styles.searchIcon)} />
      <input
        ref={inputRef}
        className={styles.searchInput}
        placeholder="Try searching for the games"
        onChange={onChange}
      />
      <button onClick={clearSearch}>
        <i aria-hidden className="fas fa-times" />
      </button>
    </div>
  );
};

export default Search;
