import { createRef, useState, useCallback, useMemo } from "react";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import cn from "classnames";
import debounce from "lodash/debounce";

import getTranslations from "translations/search";

import styles from "./Search.module.css";

const Search: React.FC = () => {
  const [input, setInput] = useState("");
  const { locale, push } = useRouter();
  const translations = useMemo(() => getTranslations(locale as string), [
    locale,
  ]);

  const inputRef = createRef<HTMLInputElement>();

  const clearSearch = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }, [inputRef]);

  const onChange = useMemo(
    () =>
      debounce(async (e: { target: HTMLInputElement }) => {
        const { value } = e.target;
        setInput(value);
      }, 300),
    []
  );

  const onSubmit = useCallback(
    e => {
      e.preventDefault();
      const value = inputRef.current?.value?.trim();
      if (value !== "") {
        push(`/search/${value}`);
      }
    },
    [inputRef]
  );

  return (
    <div className={styles.searchContainer}>
      <FontAwesomeIcon icon={faSearch} className={styles.searchIcon} />
      <form onSubmit={onSubmit}>
        <input
          ref={inputRef}
          className={styles.searchInput}
          placeholder={translations.searchPlaceholder}
          onChange={onChange}
        />
      </form>
      {!!input && (
        <button onClick={clearSearch} className={styles.closeIcon}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      )}
    </div>
  );
};

export default Search;
