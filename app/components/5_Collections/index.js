import React, { useEffect, useState } from "react";
import CreateCollectionModal from "./1_Create_Collection_Modal";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import styles from "./styles.module.css";
import TimeAgo from "javascript-time-ago";

// English.
import en from "javascript-time-ago/locale/en";

TimeAgo.addDefaultLocale(en);

// Create formatter (English).
const timeAgo = new TimeAgo("en-US");

export default function Collections(props) {
  const [collection, setCollection] = useState(
    props.user_collections[0].detailed_athletes,
  );
  const [currentIndex, setCurrentIndex] = useState(0);

  function updateSummaryStyle(athlete) {
    var elements = document.getElementsByClassName(styles.competitorSummary);
    var newScrollHeight;

    for (let item of elements) {
      if (item.textContent == athlete.summary) {
        newScrollHeight = item.scrollHeight + "px";
      }
    }

    for (let i = 0; i < collection.length; i++) {
      if (collection[i].aaAthleteId == athlete.aaAthleteId) {
        if (collection[i].height == undefined) {
          collection[i].height = newScrollHeight;
        } else if (collection[i].height != "0px") {
          collection[i].height = "0px";
        } else {
          collection[i].height = newScrollHeight;
        }
      }
    }

    setCollection([...collection]);
  }

  function handleSelect(index, collection) {
    setCollection(collection);
    setCurrentIndex(index);
  }

  useEffect(()=> {
    setCollection(props.user_collections[0].detailed_athletes)
  }, [props.user_collections])

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
          {collection.map((athlete, index) => (
            <div key={index} className={styles.competitor}>
              <div className={styles.topItems}>
                <img
                  className={styles.competitorImage}
                  src={athlete.hq_image_url}
                />
                <div className={styles.criticalInfo}>
                  <div className={styles.leftItems}>
                    <div
                      // onClick={() =>
                      //   props.setAthleteFromTopCompetitors(
                      //     competitor.aaAthleteId,
                      //   )
                      // }
                      className={styles.competitorName}
                    >
                      {athlete.full_name}
                    </div>
                    <div className={styles.disciplines}>
                      {athlete.disciplines}
                    </div>
                  </div>
                  <div
                    onClick={() => updateSummaryStyle(athlete)}
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
              <div
                className={styles.competitorSummary}
                style={{ height: athlete.height }}
              >
                {athlete.summary}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
