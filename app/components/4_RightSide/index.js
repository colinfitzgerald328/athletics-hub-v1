import React, { useEffect } from "react";
import SocialProfiles from "./1_SocialProfiles";
import Recommended from "./2_Recommended";
import PeformanceGraph from "./3_PerformanceGraph";
import Button from "@mui/material/Button";
import styles from "./styles.module.css";

export default function RightSide(props) {
  function handleFadeOut() {
    var element = document.getElementsByClassName(
      props.isMobile ? styles.mobileRightSide : styles.rightSide,
    )[0];
    element.classList.add(styles.fadeOut);
    setTimeout(() => {
      element.classList.add(styles.removeDisplay);
      element.classList.remove(styles.fadeIn);
    }, 300);
  }

  function handleFadeIn() {
    var element = document.getElementsByClassName(
      props.isMobile ? styles.mobileRightSide : styles.rightSide,
    )[0];
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
  }, [props.showingCollections, props.isMobile]);

  return (
    <div className={props.isMobile ? styles.mobileRightSide : styles.rightSide}>
      <PeformanceGraph
        athlete_data={props.athlete_data}
        loadingNewAthlete={props.loadingNewAthlete}
        athlete={props.athlete}
      />
      <SocialProfiles
        athlete={props.athlete}
        loadingNewAthlete={props.loadingNewAthlete}
      ></SocialProfiles>
      <Recommended
        similar_athletes={props.similar_athletes}
        setAthleteFromTopCompetitors={props.setAthleteFromTopCompetitors}
        loadingNewAthlete={props.loadingNewAthlete}
        fetchAthleteById={props.fetchAthleteById}
      />
    </div>
  );
}
