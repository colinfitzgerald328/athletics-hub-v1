import React, { useEffect, useState } from "react";
import CreateCollectionModal from "./1_Create_Collection_Modal";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import styles from "./styles.module.css";
import CustomTabPanel from "/app/components/3_Middle/1_Tabs/index.js";
import AddToCollectionModal from "./2_Add_To_Collection_Modal";
import DeleteOptionMenu from "./3_DeleteOption";
import TimeAgo from "javascript-time-ago";
import * as API from "/app/api/api.js";

// English.
import en from "javascript-time-ago/locale/en";

TimeAgo.addLocale(en);

// Create formatter (English).
const timeAgo = new TimeAgo("en-US");

export default function Collections(props) {
  const [collections, setCollections] = useState(
    [],
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadingNewAthlete, setLoadingNewAthlete] = useState(false);

  async function updateSummaryStyle(athlete, index) {
    const currentCollections = collections;
    const theItem = currentCollections[currentIndex].detailed_athletes[index]
    var element = document.getElementById(index);
    var newScrollHeight = element.scrollHeight + "px";

    if (theItem.height == undefined) {
      theItem.height = newScrollHeight;
      const data_fetch_results = await getDataForAthlete(athlete);
      theItem.athlete_results = data_fetch_results.athlete_results
      theItem.top_competitors = data_fetch_results.top_competitors
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
        }
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
                onClick={() =>
                  handleSelect(index)
                }
                key={index}
                className={
                  currentIndex == index ? styles.selected : styles.collection
                }
              >
                <div className={styles.collectionName}>
                  {collection.collection_name}
                </div>
                <div className={styles.collectionCreated}>
                  Created {timeAgo.format(new Date(collection.created_at))}
                </div>
              </div>
            ))}

        </div>
        <div className={styles.panel}>
          <div className={styles.textLabels}>
          <div className={styles.collectionLabel}>
              {props.user_collections.length > 0 && props.user_collections[currentIndex].collection_name}
            </div>
            <AddToCollectionModal
              currentIndex={currentIndex}
              user_collections={props.user_collections}
              getCollectionsForUser={props.getCollectionsForUser}
              collectionName={props.user_collections.length > 0 && props.user_collections[currentIndex].collection_name}
            />
          </div>
          {collections.length > 0 && collections[currentIndex].detailed_athletes.map((athlete, index) => (
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
                          <RemoveIcon sx={{ fontWeight: "bold" }} />
                        ) : (
                          <AddIcon />
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
          ))}
        </div>
      </div>
    </div>
  );
}
