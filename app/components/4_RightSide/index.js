import React from "react";
import SocialProfiles from "./1_SocialProfiles";
import Recommended from "./2_Recommended";
import PeformanceGraph from "./3_PerformanceGraph";
import Button from "@mui/material/Button";
import styles from "./styles.module.css";

export default function RightSide(props) {
  return (
    <div className={styles.rightSide}>
      <Button
        sx={{
          width: "100%",
          backgroundColor: "#323232",
          fontWeight: "bold",
          borderRadius: "25px",
          paddingTop: "10px",
          paddingBottom: "10px",
          fontSize: "18px",
        }}
        variant="contained"
        onClick={() => window.open(props.athlete.wikipedia_url)}
      >
        DEEP DIVE
      </Button>
      <PeformanceGraph athlete_data={props.athlete_data} />
      <SocialProfiles athlete={props.athlete}></SocialProfiles>
      <Recommended
        similar_athletes={props.similar_athletes}
        setAthlete={props.setAthlete}
        loadingNewAthlete={props.loadingNewAthlete}
      />
    </div>
  );
}
