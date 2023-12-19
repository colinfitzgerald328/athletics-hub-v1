import React from "react";
import CustomTabPanel from "./1_Tabs";
import styles from "./styles.module.css";

export default function AthleteBreakDown(props) {
  const disciplinesArr = props.athlete.length !== 0 ? props.athlete.disciplines.split(", ") : undefined
  return (
    <div className={styles.athleteBreakdown}>
      <div className={styles.itemsContainer}>
        <img src={props.athlete.hq_image_url} className={styles.athleteImage} />
        <div className={styles.athleteNameHolder}>
        <img src={props.athlete.hq_image_url} className={styles.profileImage}/>
        <div className={styles.nameVariables}>
          <div className={styles.fullName}>{props.athlete.full_name}</div>
          <div className={styles.disciplines}>
            {disciplinesArr && disciplinesArr.map((discipline, index) => 
              <div key={index} className={styles.tag}>
                {discipline}
              </div>
            )}
          </div>
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
