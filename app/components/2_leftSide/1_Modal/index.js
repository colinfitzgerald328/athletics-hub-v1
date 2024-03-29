import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import { Modal, ConfigProvider } from "antd";
import { Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import LinearProgress from "@mui/material/LinearProgress";
import { useRef } from "react";
import SportsMmaIcon from "@mui/icons-material/SportsMma";
import RectangleIcon from "@mui/icons-material/Rectangle";
import * as API from "/app/api/api.js";

export default function ComparisonModal() {
  const [modalOpen, setModalOpen] = useState(false);
  const [athletes, setAthletes] = useState([]);
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
      setShowSearchResults(true);
      setSearchResults(data.search_results);
      setLoadingSearchResults(false);
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
    athletes.push(athlete);
    setSearchResults([]);
    setSearchTerm("");
    setShowSearchResults(false);
  }

  function openModal() {
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
  }

  function spliceItem(item) {
    const currentAthletes = [...athletes];

    for (let i = 0; i < currentAthletes.length; i++) {
      if (currentAthletes[i].aaAthleteId === item.aaAthleteId) {
        currentAthletes.splice(i, 1); // Use the index i to splice
        break;
      }
    }

    setAthletes(currentAthletes);
  }

  return (
    <>
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
        onClick={openModal}
      >
        Head to head <SportsMmaIcon />
      </Button>
      <ConfigProvider
        theme={{
          components: {
            Modal: {
              contentBg: "lightgray",
              fontFamily: "Bricolage Grotesque, sans-serif",
            },
          },
        }}
      >
        <Modal footer="" open={modalOpen} onCancel={closeModal} width={"60vw"}>
          <div className={styles.modalLabel}>
            Head to head <SportsMmaIcon />
          </div>
          <div className={styles.explanation}>
            <RectangleIcon /> Search for an athlete, click, and it will add it
            to the display. Repeat to compare the personal bests of as many
            athletes as you would like 😊
          </div>
          <div className={styles.content}>
            <input
              className={
                showSearchResults ||
                (loadingSearchResults && searchTerm.length > 0)
                  ? styles.searchBarFocused
                  : styles.searchBar
              }
              placeholder="Search for an athlete..."
              value={searchTerm}
              ref={inputRef}
              onChange={(e) => setSearchTerm(e.target.value)}
              spellCheck="false"
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
              searchResults.length == 0 ? (
                <div className={styles.searchResults} ref={searchResultsRef}>
                  <div className={styles.noResults}>
                    😱 Unfortunately no search results for that query...
                  </div>
                </div>
              ) : (
                <div className={styles.searchResults} ref={searchResultsRef}>
                  {loadingSearchResults && <LinearProgress />}
                  {searchResults.map((result) => (
                    <div
                      key={result.aaAthleteId}
                      onClick={() => handleChooseAthlete(result)}
                      className={styles.singleResult}
                    >
                      <img
                        src={
                          result.hq_images
                            ? result.hq_images[0]
                            : result.hq_image_url
                        }
                        className={styles.searchResultImage}
                      />
                      <div className={styles.textDisplay}>
                        <div className={styles.fullName}>
                          {result.full_name}
                        </div>
                        <div className={styles.disciplines}>
                          {result.disciplines}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )
            ) : loadingSearchResults && searchTerm.length > 0 ? (
              <div className={styles.searchResults}>
                <LinearProgress />
              </div>
            ) : (
              ""
            )}
            <div className={styles.athletesHolder}>
              {athletes &&
                athletes.map((athlete, index) => (
                  <div key={index} className={styles.athlete}>
                    <div className={styles.itemsContainer}>
                      <div className={styles.gradient}></div>
                      <img
                        src={
                          athlete.hq_images
                            ? athlete.hq_images[0]
                            : athlete.hq_image_url
                        }
                        className={styles.athleteImage}
                      />
                      <div className={styles.athleteNameHolder}>
                        <div className={styles.fullName}>
                          {athlete.full_name}
                        </div>
                        <div className={styles.disciplines}>
                          {athlete.disciplines}
                        </div>
                      </div>
                      <div
                        onClick={() => spliceItem(athlete)}
                        className={styles.xButtonHolder}
                      >
                        <CloseIcon />
                      </div>
                    </div>
                    <div className={styles.otherItems}>
                      <div className={styles.personalBestsLabel}>
                        Personal Bests
                      </div>
                      <div className={styles.personalBestsHolder}>
                        {athlete.personal_bests.map((pb, index) => (
                          <div key={index}>
                            <div className={styles.pbEvent}>
                              {pb.discipline}
                            </div>
                            <div className={styles.pbMark}>{pb.result}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </Modal>
      </ConfigProvider>
    </>
  );
}
