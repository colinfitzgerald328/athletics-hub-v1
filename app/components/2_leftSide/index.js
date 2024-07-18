import React, { useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import CircularProgress from "@mui/material/CircularProgress";
import { useRef } from "react";
import * as API from "/app/api/api.js";
import ComparisonModal from "./1_Modal";
import styles from "./styles.module.css";
import { Button } from "@mui/material";
import { getSearchResultsForQuery } from "/app/api/api.js";

export default function LeftSide(props) {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);
  const [showSearchResults, setShowSearchResults] = React.useState(false);
  const [loadingSearchResults, setLoadingSearchResults] = React.useState(false);
  const inputRef = useRef(null);
  const searchResultsRef = useRef(null);
  useOutsideAlerter(inputRef);
  const xButtonRef = useRef(null);

  async function handleSearchTermChange(searchTerm) {
    const searchResults = await getSearchResultsForQuery(searchTerm)
    setShowSearchResults(true);
    setSearchResults(searchResults);
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

  function handleChooseAthlete(athlete) {
    props.fetchAthleteById(athlete.athlete_id),
      setSearchResults([]),
      setSearchTerm("");
    setShowSearchResults(false);
  }

  return (
    <div className={props.isMobile ? styles.mobileLeftSide : styles.leftSide}>
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

      {showSearchResults || searchResults.length > 0 ? (
        searchResults.length == 0 ? (
          <div className={styles.searchResults} ref={searchResultsRef}>
            <div className={styles.noResults}>
              😱 Unfortunately no search results for that query...
            </div>
          </div>
        ) : (
          <div className={styles.searchResults} ref={searchResultsRef}>
            {searchResults.map((result) => (
              <div
                key={result.aaAthleteId}
                onClick={() => handleChooseAthlete(result)}
                className={styles.singleResult}
              >
                <img
                  src={
                    result.json_data.athlete.hq_images
                      ? result.json_data.athlete.hq_images[0]
                      : "https://cdn.pixabay.com/photo/2014/04/03/11/07/running-311805_640.png"
                  }
                  className={styles.searchResultImage}
                />
                <div className={styles.textDisplay}>
                  <div className={styles.fullName}>
                    {result.json_data.athlete.first_name}{" "}
                    {result.json_data.athlete.last_name}
                  </div>
                  <div className={styles.disciplines}>
                    {result.json_data.athlete.primary_disciplines}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      ) : (
        ""
      )}
      <ComparisonModal isMobile={props.isMobile} />
      {props.loggedIn && !props.loadingCollections && !props.isMobile ? (
        <Button
          variant="contained"
          sx={{
            width: "100%",
            marginTop: "10px",
            borderRadius: "25px",
            height: "50px",
            fontSize: "20px",
            backgroundColor: "lightslategray",
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            fontFamily: "Bricolage Grotesque, sans-serif",
          }}
          className={styles.animatedButton}
          onClick={() => props.showCollections()}
        >
          Collections
        </Button>
      ) : (
        ""
      )}
    </div>
  );
}
