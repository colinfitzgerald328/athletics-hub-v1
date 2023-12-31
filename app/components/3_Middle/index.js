import React, { useEffect } from "react";
import CustomTabPanel from "./1_Tabs";
import styles from "./styles.module.css";
import { Skeleton } from "@mui/material";

export default function AthleteBreakDown(props) {
  const disciplinesArr =
    props.athlete.length !== 0
      ? props.athlete.disciplines.split(", ")
      : undefined;

  function handleFadeOut() {
    var element = document.getElementsByClassName(styles.athleteBreakdown)[0];
    element.classList.add(styles.fadeOut);
    setTimeout(() => {
      element.classList.add(styles.removeDisplay);
      element.classList.remove(styles.fadeIn);
    }, 300);
  }

  function handleFadeIn() {
    var element = document.getElementsByClassName(styles.athleteBreakdown)[0];
    setTimeout(() => {
      element.classList.remove(styles.removeDisplay);
      element.classList.remove(styles.fadeOut);
      setTimeout(() => {
        element.classList.add(styles.fadeIn);
      }, 10);
    }, 300);
  }

  useEffect(() => {
    if (props.showingCollections) {
      handleFadeOut();
    } else if (!props.showingCollections) {
      handleFadeIn();
    }
  }, [props.showingCollections]);

  return (
    <div className={styles.athleteBreakdown}>
      <div className={styles.itemsContainer}>
        {props.loadingNewAthlete || props.loadingNewAthlete == undefined ? (
          <Skeleton
            animation="wave"
            height={230}
            variant="rectangular"
          ></Skeleton>
        ) : (
          <img
            src={props.athlete.hq_image_url}
            className={styles.athleteImage}
          />
        )}
        <div className={styles.athleteNameHolder}>
          {props.loadingNewAthlete || props.loadingNewAthlete == undefined ? (
            <Skeleton
              sx={{ zIndex: 1000 }}
              animation="wave"
              variant="circular"
              width={150}
              height={150}
            ></Skeleton>
          ) : (
            <img
              src={props.athlete.hq_image_url}
              className={styles.profileImage}
            />
          )}
          <div className={styles.nameVariables}>
            {props.loadingNewAthlete || props.loadingNewAthlete == undefined ? (
              <Skeleton
                animation="wave"
                width={200}
                height={35}
                variant="rectangular"
              ></Skeleton>
            ) : (
              <div className={styles.fullName}>{props.athlete.full_name}</div>
            )}
            {props.loadingNewAthlete || props.loadingNewAthlete == undefined ? (
              <Skeleton
                sx={{ marginTop: "5px" }}
                animation="wave"
                width={300}
                height={35}
              ></Skeleton>
            ) : (
              <div className={styles.disciplines}>
                {disciplinesArr &&
                  disciplinesArr.map((discipline, index) => (
                    <div key={index} className={styles.tag}>
                      {discipline}
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <CustomTabPanel
        athlete={props.athlete}
        loadingNewAthlete={props.loadingNewAthlete}
        athlete_data={props.athlete_data}
        top_competitors={props.top_competitors}
        setAthleteFromTopCompetitors={props.setAthleteFromTopCompetitors}
        height={props.height}
      />
    </div>
  );
}
