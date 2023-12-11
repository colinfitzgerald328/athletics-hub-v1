import React from "react";
import GraphModal from "./1_Graph";
import { Skeleton } from "@mui/material";
import styles from "./styles.module.css";

export default function PeformanceGraph(props) {
  return (
    <div className={styles.socialProfiles}>
      <div className={styles.label}>Performance Graph</div>
      {
        props.loadingNewAthlete ? 
        <Skeleton height={200} animation="wave" variant="rectangulat"/>
        :
        <GraphModal athlete_data={props.athlete_data} />
      }
    </div>
  );
}
