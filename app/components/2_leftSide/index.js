import React, { useEffect, useRef } from "react";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import CircularProgress from "@mui/material/CircularProgress";
import styles from "./styles.module.css";
import { getSearchResultsForQuery } from "@/app/api/api";
import { useAthleteContext } from "../athlete_context";

export default function LeftSide() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);
  const [showSearchResults, setShowSearchResults] = React.useState(false);
  const [loadingSearchResults, setLoadingSearchResults] = React.useState(false);
  const inputRef = useRef(null);
  const searchResultsRef = useRef(null);
  useOutsideAlerter(inputRef);
  const xButtonRef = useRef(null);
  const { isMobile, fetchAthleteById } = useAthleteContext();

  async function handleSearchTermChange(searchTerm) {
    const { data, error } = await getSearchResultsForQuery(searchTerm);
    if (error) {
      return;
    }
    setShowSearchResults(true);
    setSearchResults(data);
    setLoadingSearchResults(false);
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

  async function handleChooseAthlete(athlete) {
    setSearchResults([]);
    setSearchTerm("");
    setShowSearchResults(false);
    await fetchAthleteById(athlete.athlete_id);
  }

  return (
    <div className={isMobile ? styles.mobileLeftSide : styles.leftSide}>
      <div className={styles.inputHolder}>
        <SearchIcon
          sx={{
            position: "absolute",
            zIndex: "1000",
            color: "gray",
            marginLeft: "20px",
            height: "100%",
          }}
        />
        {loadingSearchResults ? (
          <CircularProgress
            size={20}
            sx={{
              position: "absolute",
              zIndex: "1000",
              color: "gray",
              marginLeft: "calc(100% - 40px)",
              height: "100%",
              top: "15px",
            }}
          />
        ) : (
          searchTerm.length > 0 && (
            <CloseIcon
              sx={{
                position: "absolute",
                zIndex: "1000",
                color: "gray",
                marginLeft: "calc(100% - 40px)",
                height: "100%",
              }}
              onClick={() => handleClearSearch()}
              className={styles.closeIcon}
            />
          )
        )}
        <input
          className={
            showSearchResults ? styles.searchBarFocused : styles.searchBar
          }
          placeholder="Search for an athlete..."
          value={searchTerm}
          ref={inputRef}
          onChange={(e) => setSearchTerm(e.target.value)}
          spellCheck="false"
        ></input>
      </div>

      {showSearchResults &&
        searchResults.length > 0 &&
        (searchResults.length == 0 ? (
          <div className={styles.searchResults} ref={searchResultsRef}>
            <div className={styles.noResults}>
              😱 Unfortunately no search results for that query...
            </div>
          </div>
        ) : (
          <div className={styles.searchResults} ref={searchResultsRef}>
            {searchResults.map((result) => (
              <div
                key={result.athlete_id}
                onClick={() => handleChooseAthlete(result)}
                className={styles.singleResult}
              >
                <img
                  src={
                    result.hq_images
                      ? result.hq_images[0]
                      : "https://cdn.pixabay.com/photo/2014/04/03/11/07/running-311805_640.png"
                  }
                  alt="Athlete Image"
                  className={styles.searchResultImage}
                />
                <div className={styles.textDisplay}>
                  <div className={styles.fullName}>{result.full_name}</div>
                  <div className={styles.disciplines}>
                    {result.primary_disciplines}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
    </div>
  );
}
