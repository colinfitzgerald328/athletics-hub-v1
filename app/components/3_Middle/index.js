import React from "react";
import styles from "./styles.module.css";

export default function AthleteBreakDown(props) {
  return (
    <div className={styles.athleteBreakdown}>
      <div className={styles.itemsContainer}>
        <div className={styles.gradient}></div>
        <img src={props.athlete.hq_image_url} className={styles.athleteImage} />
        <div className={styles.athleteNameHolder}>
          <div className={styles.fullName}>{props.athlete.full_name}</div>
          <div className={styles.disciplines}>{props.athlete.disciplines}</div>
        </div>
      </div>
    </div>
  );
}
