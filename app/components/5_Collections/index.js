import React, { useEffect, useRef, useState } from "react";
import CreateCollectionModal from "./1_Create_Collection_Modal";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import RemoveIcon from "@mui/icons-material/Remove";
import styles from "./styles.module.css";
import CustomTabPanel from "/app/components/3_Middle/1_Tabs/index.js";
import AddToCollectionModal from "./2_Add_To_Collection_Modal";
import DeleteOptionMenu from "./3_DeleteOption";
import CollectionDeleteOption from "./4_MenuDeleteOption";
import moment from "moment";
import { toaster } from 'evergreen-ui'
import * as API from "/app/api/api.js";

export default function Collections(props) {
  const [collections, setCollections] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const editingRef = useRef(null);
  useOutsideAlerter(editingRef)

  async function updateSummaryStyle(athlete, index) {
    const currentCollections = collections;
    const theItem = currentCollections[currentIndex].detailed_athletes[index];
    var element = document.getElementById(index);
    var newScrollHeight = element.scrollHeight + "px";

    if (theItem.height == undefined) {
      theItem.height = newScrollHeight;
      const data_fetch_results = await getDataForAthlete(athlete);
      theItem.athlete_results = data_fetch_results.athlete_results;
      theItem.top_competitors = data_fetch_results.top_competitors;
      return;
    } else if (theItem.height != "0px") {
      theItem.height = "0px";
    } else {
      theItem.height = newScrollHeight;
      getDataForAthlete(athlete);
    }
    setCollections([...currentCollections]);
  }

  function handleSelect(index) {
    setCurrentIndex(index);
  }

  useEffect(() => {
    setCollections(props.user_collections);
  }, [props.user_collections]);

  async function getDataForAthlete(athlete) {
    setLoadingNewAthlete(true);

    try {
      const athleteResultsPromise = getResultsForAthlete(athlete.aaAthleteId);
      const topCompetitorsPromise = getTopCompetitors(athlete.aaAthleteId);

      const [athleteResults, topCompetitors] = await Promise.all([
        athleteResultsPromise,
        topCompetitorsPromise,
      ]);

      setLoadingNewAthlete(false);

      return {
        athlete_results: athleteResults,
        top_competitors: topCompetitors,
      };
    } catch (error) {
      console.error("Error fetching data for athlete:", error);
      setLoadingNewAthlete(false);
      throw error; // Rethrow the error to handle it further up the call stack
    }
  }

  function getTopCompetitors(athlete_id) {
    return new Promise((resolve, reject) => {
      API.getTopCompetitors(
        athlete_id,
        (data) => {
          resolve(data["top_competitors"]);
        },
        (error) => {
          console.error("Error fetching top competitors:", error);
          reject(error);
        },
      );
    });
  }

  function getResultsForAthlete(athlete_id) {
    return new Promise((resolve, reject) => {
      API.getResultsForAthlete(
        athlete_id,
        (results) => {
          resolve(results["athlete_data"]); // Resolve the promise with the data
        },
        (error) => {
          reject(error); // Reject the promise with the error
        },
      );
    });
  }


  function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          checkForNameChangeAndSendAPICall(collections, currentIndex)
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref, collections, currentIndex]);
  }

  function handleChangeName(newName) {
    let collectionsCopy = [...collections];
    collectionsCopy[currentIndex].collection_name = newName
    setCollections(collectionsCopy);
  }

  function checkForNameChangeAndSendAPICall(collections, currentIndex) {
    if (collections[currentIndex].collection_name !== props.collections_local_copy[currentIndex].collection_name) {
      API.updateCollectionName(collections[currentIndex]["_id"], collections[currentIndex].collection_name, (data) => {
        toaster.success('Collection name updated')
        props.getCollectionsForUser()
      }
      )
    } else {
      return; 
    }
  }


  return (
    <div className={styles.basic}>
      <div className={styles.topItems}>
        <div onClick={() => props.closeCollections()} className={styles.goBack}>
          <ArrowBackIcon />
        </div>
        <div className={styles.createCollection}>
          <CreateCollectionModal
            getCollectionsForUser={props.getCollectionsForUser}
          />
        </div>
      </div>
      <div className={styles.contentHolder}>
        <div className={styles.collections}>
          {props.user_collections.length > 0 &&
            props.user_collections.map((collection, index) => (
              <div
                onClick={() => handleSelect(index)}
                key={index}
                className={
                  currentIndex == index ? styles.selected : styles.collection
                }
              >
                <div className={styles.leftItems}>
                  <div className={styles.collectionName}>
                    {collection.collection_name}
                  </div>
                  <div className={styles.collectionCreated}>
                    Created {moment.unix(collection.created_at).fromNow()}
                  </div>
                </div>
                <div>
                  <CollectionDeleteOption
                    collection_id={collection["_id"]}
                    getCollectionsForUser={props.getCollectionsForUser}
                  />
                </div>
              </div>
            ))}
        </div>
        <div className={styles.panel}>
          <div className={styles.textLabels}>
              <input
              ref={editingRef}
                onChange={(e)=> handleChangeName(e.target.value)}
                value={collections.length > 0 ? collections[currentIndex].collection_name : []}
                className={styles.collectionLabel}
              >
              </input>
            <AddToCollectionModal
              currentIndex={currentIndex}
              user_collections={props.user_collections}
              getCollectionsForUser={props.getCollectionsForUser}
              collectionName={
                props.user_collections.length > 0 &&
                props.user_collections[currentIndex].collection_name}
            />
          </div>
          {collections.length > 0 &&
            collections[currentIndex].detailed_athletes.map(
              (athlete, index) => (
                <div key={index} className={styles.competitor}>
                  <div className={styles.topItems}>
                    <img
                      className={styles.competitorImage}
                      src={athlete.hq_image_url}
                    />
                    <div className={styles.criticalInfo}>
                      <div className={styles.leftItems}>
                        <div className={styles.competitorName}>
                          {athlete.full_name}
                        </div>
                        <div className={styles.disciplines}>
                          {athlete.disciplines}
                        </div>
                      </div>
                      <div className={styles.rightItemsContainer}>
                        <DeleteOptionMenu
                          athlete_id={athlete.aaAthleteId}
                          collection_id={
                            props.user_collections[currentIndex]["_id"]
                          }
                          getCollectionsForUser={props.getCollectionsForUser}
                        />
                        <div
                          onClick={() => updateSummaryStyle(athlete, index)}
                          className={styles.rightItems}
                        >
                          {athlete.summary &&
                            (athlete.height && athlete.height != "0px" ? (
                              <IconButton
                                size="small"
                                aria-controls={
                                  open ? "account-menu" : undefined
                                }
                                aria-haspopup="true"
                                aria-expanded={open ? "true" : undefined}
                                sx={{
                                  padding: 1,
                                }}
                              >
                                <RemoveIcon sx={{ fontWeight: "bold" }} />
                              </IconButton>
                            ) : (
                              <IconButton
                                size="small"
                                aria-controls={
                                  open ? "account-menu" : undefined
                                }
                                aria-haspopup="true"
                                aria-expanded={open ? "true" : undefined}
                                sx={{
                                  padding: 1,
                                }}
                              >
                                <AddIcon />
                              </IconButton>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    id={index}
                    className={styles.competitorSummary}
                    style={{ height: athlete.height }}
                  >
                    <CustomTabPanel
                      athlete={athlete}
                      loadingNewAthlete={false}
                      athlete_data={athlete.athlete_results || []}
                      top_competitors={athlete.top_competitors}
                    />
                  </div>
                </div>
              ),
            )}
        </div>
      </div>
    </div>
  );
}
