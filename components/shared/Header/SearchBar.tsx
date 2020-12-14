import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import fetch from "isomorphic-unfetch";
import debounce from "lodash/debounce";

import styles from "./SearchBar.module.css";

interface SearchGame {
  id: string;
  name: string;
  gameType: string;
}

interface SearchResponse {
  query: string;
  result: SearchGame[];
  error?: string;
}

const SearchBar: React.FC = () => {
  const [searchResult, setSearchResult] = useState<SearchGame[]>([]);

  const handleChangeInput = useMemo(
    () =>
      debounce(async (e: { target: HTMLInputElement }) => {
        const { value: query } = e.target;

        const response = (await fetch("/api/hello", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query }),
        }).then(res => res.json())) as SearchResponse;

        setSearchResult(response.result);
      }, 300),
    []
  );
  const handleClickResult = useCallback(() => {
    setSearchResult([]);
  }, []);

  return (
    <div className={styles.searchContainer}>
      <i aria-hidden className="fas fa-search" />
      <input
        className={styles.searchInput}
        placeholder="You can find it by searching too"
        onChange={handleChangeInput}
      />
      <div className={styles.searchResult}>
        {searchResult.map((game, index) => (
          <Link
            key={`search-item-${index}`}
            href={`/${game.gameType}/${game.id}`}
          >
            <a
              href={`/${game.gameType}/${game.id}`}
              className={styles.searchResultItem}
              onClick={handleClickResult}
            >
              {game.name}
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
