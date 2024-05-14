import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import { Modal, ConfigProvider } from "antd";
import { Button, Input } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import LinearProgress from "@mui/material/LinearProgress";
import { useRef } from "react";
import SportsMmaIcon from "@mui/icons-material/SportsMma";
import RectangleIcon from "@mui/icons-material/Rectangle";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import * as API from "/app/api/api.js";
import CircularProgress from "@mui/material/CircularProgress";
import SendIcon from "@mui/icons-material/Send";
import { toaster } from "evergreen-ui";

const trackAndFieldEvents = [
  "100m Dash",
  "200m Dash",
  "400m Dash",
  "800m Run",
  "1500m Run",
  "5000m Run",
  "10,000m Run",
  "110m Hurdles",
  "400m Hurdles",
  "4x100m Relay",
  "4x400m Relay",
  "High Jump",
  "Long Jump",
  "Triple Jump",
  "Pole Vault",
  "Shot Put",
  "Discus Throw",
  "Javelin Throw",
  "Hammer Throw",
  "Decathlon",
  "Heptathlon",
];

export default function ComparisonModal(props) {
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
  const [loadingComparison, setLoadingComparison] = useState(false);
  const [value, setValue] = React.useState(trackAndFieldEvents[0]);
  const [inputValue, setInputValue] = React.useState("");
  const [comparisonSummary, setComparisonSummary] = useState("");

  function handleSearchTermChange(searchTerm) {
    API.getSearchResultsForQuery(searchTerm, (data) => {
      setShowSearchResults(true);
      setSearchResults(data);
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
    if (athletes.length >= 2) {
      alert("You can only choose 2 athletes");
      return;
    }
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
    setComparisonSummary("");
    setAthletes([]);
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

  function getResponse() {
    if (athletes.length < 2) {
      alert("You need to choose 2 athletes to compare");
      return;
    }
    setLoadingComparison(true);
    const athlete_id_1 = athletes[0].athlete_id;
    const athlete_id_2 = athletes[1].athlete_id;
    const comparison_distance = value;
    API.compareTwoAthletes(
      athlete_id_1,
      athlete_id_2,
      comparison_distance,
      (response) => {
        setComparisonSummary(response.comparison_summary);
        setLoadingComparison(false);
      },
    );
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
        <Modal
          footer=""
          open={modalOpen}
          onCancel={closeModal}
          width={props.isMobile ? "" : "60vw"}
        >
          <div className={styles.modalLabel}>
            Head to head <SportsMmaIcon />
          </div>
          <div className={styles.explanation}>
            <RectangleIcon /> Search for 2 athletes to compare their
            performance!
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
            <div className={styles.flexJimmy}>
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
                      <div className={styles.otherItems}>
                        <div className={styles.personalBestsLabel}>
                          Personal Bests
                        </div>
                        <div className={styles.personalBestsHolder}>
                          {athlete.json_data.athlete.personal_bests.map(
                            (pb, index) => (
                              <div key={index}>
                                <div className={styles.pbEvent}>
                                  {pb.discipline}
                                </div>
                                <div className={styles.pbMark}>{pb.result}</div>
                              </div>
                            ),
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
              <div className={styles.basic}>
                <div className={styles.disclosure}>
                  Comparison Result (Generated by AI)
                </div>
                {comparisonSummary}
              </div>
            </div>
          </div>
          <div className={styles.bottomHolder}>
            <Autocomplete
              variant="contained"
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              inputValue={inputValue}
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
              }}
              id="controllable-states-demo"
              options={trackAndFieldEvents}
              renderInput={(params) => (
                <TextField {...params} label="Comparison Distance" />
              )}
              sx={{ width: "calc(100% - 50px);" }}
            />
            <Button
              onClick={getResponse}
              sx={{ marginLeft: "5px" }}
              variant="contained"
            >
              {loadingComparison ? (
                <CircularProgress color="inherit" />
              ) : (
                <SendIcon />
              )}
            </Button>
          </div>
        </Modal>
      </ConfigProvider>
    </>
  );
}
