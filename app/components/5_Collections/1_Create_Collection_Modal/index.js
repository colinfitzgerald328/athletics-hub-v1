import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import { Button, Modal, ConfigProvider } from "antd";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import LinearProgress from "@mui/material/LinearProgress";
import { useRef } from "react";
import * as API from "/app/api/api.js";

export default function CreateCollectionModal() {
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
  const [collectionName, setCollectionName] = useState("");
  const [savingCollection, setSavingCollection] = useState(false);

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

  function saveCollection() {
    setSavingCollection(true);
    const athlete_ids = [];
    athletes.forEach((athlete) => athlete_ids.push(athlete.aaAthleteId));
    setTimeout(() => {
      console.log("Delayed for 1 second.");
      API.createCollection(collectionName, athlete_ids, (data) => {
        setSavingCollection(false);
        setModalOpen(false);
      });
    }, 1000);
  }

  return (
    <>
      <Button type="primary" onClick={openModal}>
        + Create New Collection
      </Button>
      <Modal footer="" open={modalOpen} onCancel={closeModal} width={"40vw"}>
        <div className={styles.modalLabel}>Create New Collection</div>
        <div className={styles.collectionName}>
          Step 1: Name your collection
          <input
            className={styles.collectionInput}
            placeholder="your collection name..."
            value={collectionName}
            onChange={(e) => setCollectionName(e.target.value)}
          ></input>
        </div>
        <div className={styles.content}>
          Step 2: Search for athletes to add to your collection
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
                      src={result.hq_image_url}
                      className={styles.searchResultImage}
                    />
                    <div className={styles.textDisplay}>
                      <div className={styles.fullName}>{result.full_name}</div>
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
                      src={athlete.hq_image_url}
                      className={styles.athleteImage}
                    />
                    <div className={styles.athleteNameHolder}>
                      <div className={styles.fullName}>{athlete.full_name}</div>
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
                </div>
              ))}
          </div>
          <div className={styles.buttonsHolder}>
            <Button> Cancel</Button>
            <Button
              loading={savingCollection}
              onClick={saveCollection}
              className={styles.saveButton}
              type="primary"
            >
              {" "}
              Save collection
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
