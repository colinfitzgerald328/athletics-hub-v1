import React, { useEffect } from "react";
import SocialProfiles from "./1_SocialProfiles";
import Recommended from "./2_Recommended";
import PeformanceGraph from "./3_PerformanceGraph";
import Button from "@mui/material/Button";
import styles from "./styles.module.css";

export default function RightSide(props) {

  function handleFadeOut() {
    var element = document.getElementsByClassName(styles.rightSide)[0]
    element.classList.add(styles.fadeOut)
    setTimeout(()=> {
      element.classList.add(styles.removeDisplay)
      element.classList.remove(styles.fadeIn)
    }, 300)
  }

  function handleFadeIn() {
    var element = document.getElementsByClassName(styles.rightSide)[0]
    setTimeout(()=> {
      element.classList.remove(styles.removeDisplay)
      element.classList.remove(styles.fadeOut)
        setTimeout(()=> {
          element.classList.add(styles.fadeIn)
      }, 200)
    }, 300)
  }
  

  useEffect(()=> {
    if (props.showingCollections) {
      handleFadeOut()
    } else if (!props.showingCollections) {
      handleFadeIn()
    }
  }, [props.showingCollections])

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
      <PeformanceGraph
        athlete_data={props.athlete_data}
        loadingNewAthlete={props.loadingNewAthlete}
        athlete={props.athlete}
      />
      <SocialProfiles athlete={props.athlete}></SocialProfiles>
      <Recommended
        similar_athletes={props.similar_athletes}
        setAthlete={props.setAthlete}
        loadingNewAthlete={props.loadingNewAthlete}
      />
    </div>
  );
}
