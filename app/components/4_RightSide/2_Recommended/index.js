import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";

export default function Recommended(props) {
  const similarAthletesMap = props.similar_athletes.map((similar_athlete, index) => (
    <div
      className={styles.similarAthlete}
      onClick={() => props.setAthlete(similar_athlete)}
      key={index}
    >
      <img src={similar_athlete.hq_image_url} className={styles.athleteImage} />
      <div className={styles.itemsHolder}>
        <div className={styles.athleteName}>{similar_athlete.full_name}</div>
        <div className={styles.athleteDisciplines}>
          {similar_athlete.disciplines}
        </div>
      </div>
    </div>
  ));
  console.log(props);
  return (
    <div className={styles.socialProfiles}>
      <div className={styles.label}>You might also like...</div>
      {similarAthletesMap}
    </div>
  );
}
