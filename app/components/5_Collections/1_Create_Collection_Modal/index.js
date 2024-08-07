import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import { Modal } from "antd";
import { Button } from "@mui/joy";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import LinearProgress from "@mui/material/LinearProgress";
import { useRef } from "react";
import * as API from "/app/api/api.js";
import { createCollection, getSearchResultsForQuery } from "/app/api/api.js";

export default function CreateCollectionModal(props) {
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

  async function handleSearchTermChange(searchTerm) {
    const results = await getSearchResultsForQuery(searchTerm)
    setShowSearchResults(true);
    setSearchResults(results);
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
    athletes.push(athlete);
    setSearchResults([]);
    setSearchTerm("");
    setShowSearchResults(false);
  }

  function closeModal() {
    setModalOpen(false);
    setAthletes([]);
    setCollectionName("");
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

  async function saveCollection() {
    if (collectionName === "") {
      alert("Please enter a name for your collection");
      return;
    }

    const athlete_ids = [];
    athletes.forEach((athlete) =>
      athlete_ids.push(athlete.json_data.athlete.athlete_id),
    );

    if (athlete_ids.length === 0) {
      alert("Please add at least one athlete to your collection!");
      return;
    }

    setSavingCollection(true);
    await createCollection(collectionName, athlete_ids)
    setSavingCollection(false);
    setModalOpen(false);
    setCollectionName("");
    setAthletes([]);
    props.getCollectionsForUser();
  }

  const openModal = () => {
    setModalOpen(true);
  };

  return (
    <>
      <div className={styles.contentHolderClone}>
        <Button onClick={openModal}>+ Create Collection</Button>
      </div>
      <Modal
        footer=""
        open={modalOpen}
        onCancel={closeModal}
        width={props.isMobile ? "" : "40vw"}
      >
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
                    key={result.athlete_id}
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
                        athlete.json_data.athlete.hq_images
                          ? athlete.json_data.athlete.hq_images[0]
                          : "https://cdn.pixabay.com/photo/2014/04/03/11/07/running-311805_640.png"
                      }
                      className={styles.athleteImage}
                    />
                    <div className={styles.athleteNameHolder}>
                      <div className={styles.fullName}>
                        {athlete.json_data.athlete.first_name}{" "}
                        {athlete.json_data.athlete.last_name}
                      </div>
                      <div className={styles.disciplines}>
                        {athlete.json_data.athlete.primary_disciplines}
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
