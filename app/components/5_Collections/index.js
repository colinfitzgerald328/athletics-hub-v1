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
  const [collection, setCollection] = useState(
    props.user_collections[0].detailed_athletes,
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [top_competitors, setTopCompetitors] = useState([]);
  const [athlete_data, setAthleteData] = useState([]);
  const [loadingNewAthlete, setLoadingNewAthlete] = useState(false);

  function updateSummaryStyle(athlete, index) {
    var element = document.getElementById(index);
    var newScrollHeight = element.scrollHeight + "px";

    for (let i = 0; i < collection.length; i++) {
      if (collection[i].aaAthleteId == athlete.aaAthleteId) {
        if (collection[i].height == undefined) {
          collection[i].height = newScrollHeight;
          getDataForAthlete(athlete);
        } else if (collection[i].height != "0px") {
          collection[i].height = "0px";
        } else {
          collection[i].height = newScrollHeight;
          getDataForAthlete(athlete);
        }
      }
    }

    setCollection([...collection]);
  }

  function handleSelect(index, collection) {
    setCollection(collection);
    setCurrentIndex(index);
  }

  useEffect(() => {
    setCollection(props.user_collections[currentIndex].detailed_athletes);
  }, [props.user_collections]);

  async function getDataForAthlete(athlete) {
    console.log("running this function");
    setLoadingNewAthlete(true);
    try {
      await Promise.all([
        getResultsForAthlete(athlete.aaAthleteId),
        getTopCompetitors(athlete.aaAthleteId),
      ]);
      setLoadingNewAthlete(false);
    } catch (error) {
      console.error("Error occurred:", error);
      setLoadingNewAthlete(false);
    }
  }

  function getTopCompetitors(athlete_id) {
    return new Promise((resolve, reject) => {
      API.getTopCompetitors(
        athlete_id,
        (data) => {
          setTopCompetitors(data["top_competitors"]), resolve(data); // Resolve the promise with the data
        },
        (error) => {
          console.log(error);
          reject(error); // Reject the promise with the error
        },
      );
    });
  }

  function getResultsForAthlete(athlete_id) {
    return new Promise((resolve, reject) => {
      API.getResultsForAthlete(
        athlete_id,
        (results) => {
          setAthleteData(results["athlete_data"]);
          resolve(results); // Resolve the promise with the data
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
          {props.user_collections &&
            props.user_collections.map((collection, index) => (
              <div
                onClick={() =>
                  handleSelect(index, collection.detailed_athletes)
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
          <AddToCollectionModal
            currentIndex={currentIndex}
            user_collections={props.user_collections}
            getCollectionsForUser={props.getCollectionsForUser}
          />
          {collection.map((athlete, index) => (
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
                  loadingNewAthlete={loadingNewAthlete}
                  athlete_data={athlete_data}
                  top_competitors={top_competitors}
                  // setAthleteFromTopCompetitors={function}
                  // height={props.height}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
