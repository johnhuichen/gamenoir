import { createRef, useCallback, useMemo } from "react";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import cn from "classnames";
import debounce from "lodash/debounce";

import getTranslations from "translations/search";

import styles from "./Search.module.css";

interface Props {
  handleChangeInput: (value: string) => void;
  handleClearSearch: () => void;
}

const Search: React.FC<Props> = ({
  handleChangeInput,
  handleClearSearch,
}: Props) => {
  const { locale } = useRouter();
  const translations = useMemo(() => getTranslations(locale as string), [
    locale,
  ]);

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
      <FontAwesomeIcon icon={faSearch} className={styles.searchIcon} />
      <input
        ref={inputRef}
        className={styles.searchInput}
        placeholder={translations.searchPlaceholder}
        onChange={onChange}
      />
      <button onClick={clearSearch}>
        <FontAwesomeIcon icon={faTimes} />
      </button>
    </div>
  );
};

export default Search;
