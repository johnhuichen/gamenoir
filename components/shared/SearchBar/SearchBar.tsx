import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import debounce from "lodash/debounce";

import styles from "./SearchBar.module.css";

interface SearchGame {
  id: string;
  name: string;
  gameType: string;
}

// interface SearchResponse {
//   query: string;
//   result: SearchGame[];
//   error?: string;
// }

// TODO
// move searchbar to home page so that the data list can be generated with npm build
// no need to call api
const SearchBar: React.FC = () => {
  const [searchResult, setSearchResult] = useState<SearchGame[]>([]);

  const handleChangeInput = useMemo(
    () =>
      // debounce(async (e: { target: HTMLInputElement }) => {
      debounce(() => {
        // const { value: query } = e.target;
        setSearchResult([]);

        // const response = (await fetch("/api/hello", {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify({ query }),
        // }).then(res => res.json())) as SearchResponse;

        // setSearchResult(response.result);
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
