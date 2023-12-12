import React, { useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import LinearProgress from "@mui/material/LinearProgress";
import Image from "next/image";
import { useRef } from "react";
import * as API from "/app/api/api.js";
import styles from "./styles.module.css";

export default function LeftSide(props) {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);
  const [showSearchResults, setShowSearchResults] = React.useState(false);
  const [loadingSearchResults, setLoadingSearchResults] = React.useState(false);
  const inputRef = useRef(null);
  const searchResultsRef = useRef(null);
  useOutsideAlerter(inputRef);
  const xButtonRef = useRef(null);

  function handleSearchTermChange(searchTerm) {
    API.getSearchResultsForQuery(searchTerm, (data) => {
      setTimeout(() => {
        setShowSearchResults(true);
        setSearchResults(data.search_results);
        setLoadingSearchResults(false);
      }, 500);
    });
  }

  function handleClearSearch() {
    setSearchTerm("");
    // fetch results from API
  }

  function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          if (xButtonRef.current && xButtonRef.current.contains(event.target)) {
            setSearchTerm("");
          } else if (
            searchResultsRef.current &&
            searchResultsRef.current.contains(event.target)
          ) {
            return;
          } else {
            setShowSearchResults(false);
            setSearchResults([]);
          }
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  function getAndSetTop20Results() {
    API.getTopRecords((data) => {
      setSearchResults(data.records);
    });
  }

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm == "") {
        return;
      }
      setLoadingSearchResults(true);
      handleSearchTermChange(searchTerm);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  function handleChooseAthlete(athlete) {
    props.setAthlete(athlete), setSearchResults([]), setSearchTerm("");
    setShowSearchResults(false);
  }

  return (
    <div className={styles.leftSide}>
      <input
        className={
          showSearchResults || (loadingSearchResults && searchTerm.length > 0)
            ? styles.searchBarFocused
            : styles.searchBar
        }
        placeholder="Search for an athlete..."
        value={searchTerm}
        ref={inputRef}
        onChange={(e) => setSearchTerm(e.target.value)}
      ></input>
      <SearchIcon className={styles.searchIcon} />
      {searchTerm && (
        <div
          className={styles.xButton}
          onClick={() => handleClearSearch()}
          ref={xButtonRef}
        >
          <CloseIcon />
        </div>
      )}
      {showSearchResults || searchResults.length > 0 ? (
        searchResults.length == 0 ? 
        <div className={styles.searchResults} ref={searchResultsRef}>
          <div className={styles.noResults}>
            😱 Unfortunately no search results for that query...
          </div>
        </div>
        :
        <div className={styles.searchResults} ref={searchResultsRef}>
          {loadingSearchResults && <LinearProgress />}
          {searchResults.map((result) => (
            <div
              key={result.aaAthleteId}
              onClick={() => handleChooseAthlete(result)}
              className={styles.singleResult}
            >
              <img
                src={result.hq_image_url}
                className={styles.searchResultImage}
              />
              <div className={styles.textDisplay}>
                <div className={styles.fullName}>{result.full_name}</div>
                <div className={styles.disciplines}>{result.disciplines}</div>
              </div>
            </div>
          ))}
        </div>
      ) : loadingSearchResults && searchTerm.length > 0 ? (
        <div className={styles.searchResults}>
          <LinearProgress />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
