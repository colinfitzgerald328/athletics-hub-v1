import React from "react";
import GraphModal from "./1_Graph";
import styles from "./styles.module.css";

export default function PeformanceGraph(props) {
  return (
    <div className={styles.socialProfiles}>
      <div className={styles.label}>Performance Graph</div>
      <GraphModal athlete_data={props.athlete_data} />
    </div>
  );
}
