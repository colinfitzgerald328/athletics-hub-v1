import React from "react";
import SocialProfiles from "./1_SocialProfiles";
import Recommended from "./2_Recommended";
import PeformanceGraph from "./3_PerformanceGraph";
import styles from "./styles.module.css";




export default function RightSide(props) {
  return (
    <div className={props.isMobile ? styles.mobileRightSide : styles.rightSide}>
      <PeformanceGraph
        athlete_data={props.athlete_data}
        loadingNewAthlete={props.loadingNewAthlete}
        athlete={props.athlete}
        isMobile={props.isMobile}
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
