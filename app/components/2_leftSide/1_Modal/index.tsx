import React, { useState, useEffect, useRef } from "react";
import styles from "./styles.module.css";
import { Modal, ConfigProvider } from "antd";
import Button from "@mui/joy/Button";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import LinearProgress from "@mui/material/LinearProgress";
import SportsMmaIcon from "@mui/icons-material/SportsMma";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import SendIcon from "@mui/icons-material/Send";
import { IconButton } from "@mui/material";
import Close from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import { useAthleteContext } from "../../athlete_context";
import { getSearchResultsForQuery } from "@/app/api/api";
import Drawer from "@mui/material/Drawer";
import Markdown from "react-markdown";
import { getAthleteById } from "@/app/api/api";
import { components } from "@/src/lib/api/v1";
type SearchResult = components["schemas"]["VectorSearchResult"]

import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
});

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

export default function ComparisonModal() {
  const [modalOpen, setModalOpen] = useState(false);
  const [athletes, setAthletes] = useState<SearchResult[]>([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchResults, setSearchResults] = React.useState<SearchResult[]>([]);
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
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { isMobile } = useAthleteContext();

  function toggleDrawer(openState) {
    setDrawerOpen(openState);
  }

  async function handleSearchTermChange(searchTerm) {
    const { data, error } = await getSearchResultsForQuery(searchTerm);
    if (error) {
      console.log(error);
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
    }, 200);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  function handleChooseAthlete(athlete: SearchResult) {
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

  function spliceItem(item: SearchResult) {
    const currentAthletes = [...athletes];

    for (let i = 0; i < currentAthletes.length; i++) {
      if (currentAthletes[i].athlete_id === item.athlete_id) {
        currentAthletes.splice(i, 1); // Use the index i to splice
        break;
      }
    }

    setAthletes(currentAthletes);
  }

  async function getResponse() {
    setComparisonSummary("");
    if (athletes.length < 2) {
      alert("You need to choose 2 athletes to compare");
      return;
    }
    setLoadingComparison(true);
    const athlete_id_1 = athletes[0].athlete_id;
    const athlete_id_2 = athletes[1].athlete_id;  
    const [res_1, res_2] = await Promise.all([
      getAthleteById(athlete_id_1),
      getAthleteById(athlete_id_2),
    ]);

    const comparison_distance = value;
    const prompt = `
    
    Scenario: Head-to-Head Race over ${comparison_distance}

    Two athletes, ${res_1.data.athlete.first_name} ${res_1.data.athlete.last_name} and ${
      res_2.data.athlete.first_name
    } ${res_2.data.athlete.last_name},
    have been asked to compete in a head-to-head race over a distance of ${comparison_distance}.
    To provide a thorough analysis, let's examine the personal bests and performance history of each athlete:
    
    Athlete 1:
    
    <profile>${JSON.stringify(res_1.data.athlete, null, 2)}</profile>
    <personal_bests>${JSON.stringify(
      res_1.data.athlete.personal_bests,
      null,
      2,
    )}</personal_bests>
    <results>${JSON.stringify(res_1.data.results, null, 2)}</results>
    
    Athlete 2:

    <profile>${JSON.stringify(res_2.data.athlete, null, 2)}</profile>
    <personal_bests>${JSON.stringify(
      res_2.data.athlete.personal_bests,
      null,
      2,
    )}</personal_bests>
    <results>${JSON.stringify(res_2.data.results, null, 2)}</results>

    Provide a detailed explanation of your reasoning and a prediction of who is likely to win the race.
    Please take your time to thoroughly evaluate the scenario and provide a well-reasoned response.`;
    let iterations = 0;
    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.1-8b-instant",
      temperature: 1,
      max_tokens: 1024,
      top_p: 1,
      stream: true,
      stop: null,
    });
    for await (const chunk of chatCompletion) {
      if (chunk.choices[0]?.finish_reason === "stop") {
        break;
      }
      if (iterations === 0) {
        setLoadingComparison(false);
        toggleDrawer(true);
      }
      iterations++;
      setComparisonSummary(
        (...prev) => prev + chunk.choices[0]?.delta?.content || "",
      );
    }
  }

  return (
    <>
      <Button
        sx={{
          marginLeft: "15px",
          borderRadius: "25px",
          marginTop: "auto",
          marginBottom: "auto",
        }}
        variant="soft"
        color="primary"
        onClick={openModal}
      >
        Head to head
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
          width={isMobile ? "" : "60vw"}
        >
          <div className={styles.modalLabel}>
            Head to head <SportsMmaIcon />
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
                      key={result.athlete_id}
                      onClick={() => handleChooseAthlete(result)}
                      className={styles.singleResult}
                    >
                      <img
                        loading="lazy"
                        src={
                          result.headshot_image_url
                            ? result.headshot_image_url
                            : "https://cdn.pixabay.com/photo/2014/04/03/11/07/running-311805_640.png"
                        }
                        className={styles.searchResultImage}
                      />
                      <div className={styles.textDisplay}>
                        <div className={styles.fullName}>
                          {result.full_name}
                        </div>
                        <div className={styles.disciplines}>
                          {result.primary_event}
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
                {athletes.length > 0 ? (
                  athletes.map((athlete, index) => (
                    <div key={index} className={styles.athlete}>
                      <div className={styles.itemsContainer}>
                        <div className={styles.gradient}></div>
                        <img
                          loading="lazy"
                          src={
                            athlete.headshot_image_url
                              ? athlete.headshot_image_url
                              : "https://cdn.pixabay.com/photo/2014/04/03/11/07/running-311805_640.png"
                          }
                          className={styles.athleteImage}
                        />
                        <div className={styles.athleteNameHolder}>
                          <div className={styles.fullName}>
                            {athlete.full_name}{" "}
                          </div>
                          <div className={styles.disciplines}>
                            {athlete.primary_event}
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
                  ))
                ) : (
                  <div>
                    Search for two athletes and place them here to compare!{" "}
                  </div>
                )}
              </div>
              <BottomDrawer
                comparisonSummary={comparisonSummary}
                toggleDrawer={toggleDrawer}
                drawerOpen={drawerOpen}
              />
            </div>
          </div>
          <div className={styles.bottomHolder}>
            <Autocomplete
              freeSolo
              // variant="contained"
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
              sx={{ width: "100%" }}
            />
            <Button
              onClick={getResponse}
              sx={{ marginLeft: "5px" }}
              // variant="contained"
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

export function BottomDrawer(props) {
  const DrawerList = (
    <Box role="presentation" onClick={() => props.toggleDrawer(false)}>
      <div className={styles.basic}>
        <div className={styles.header}>
          <div className={styles.disclosure}>Comparison Result</div>
          <div
            onClick={() => props.toggleDrawer(false)}
            className={styles.closeButton}
          >
            <IconButton>
              <Close />
            </IconButton>
          </div>
        </div>
        <Markdown>{props.comparisonSummary}</Markdown>
      </div>
    </Box>
  );

  return (
    <div>
      <Drawer
        anchor="bottom"
        open={props.drawerOpen}
        onClose={() => props.toggleDrawer(false)}
      >
        {DrawerList}
      </Drawer>
    </div>
  );
}
