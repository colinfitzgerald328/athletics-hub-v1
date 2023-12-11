import React from "react";
import { Skeleton } from "@mui/material";
import styles from "./styles.module.css";

export default function Recommended(props) {
  const similarAthletesMap = props.similar_athletes.map(
    (similar_athlete, index) => (
      <div
        className={styles.similarAthlete}
        onClick={() => props.setAthlete(similar_athlete)}
        key={index}
      >
        {props.loadingNewAthlete ? (
          <Skeleton
            sx={{ borderRadius: "15px" }}
            animation="wave"
            variant="rectangular"
            width={60}
            height={60}
          />
        ) : (
          <img
            src={similar_athlete.hq_image_url}
            className={styles.athleteImage}
          />
        )}
        <div className={styles.itemsHolder}>
          {props.loadingNewAthlete ? (
            <Skeleton
              animation="wave"
              variant="rectangular"
              width={150}
              height={18}
            />
          ) : (
            <div className={styles.athleteName}>
              {similar_athlete.full_name}
            </div>
          )}
          {props.loadingNewAthlete ? (
            <Skeleton
              sx={{ marginTop: "5px" }}
              animation="wave"
              variant="rectangular"
              width={200}
              height={12}
            />
          ) : (
            <div className={styles.athleteDisciplines}>
              {similar_athlete.disciplines}
            </div>
          )}
        </div>
      </div>
    ),
  );

  return (
    <div className={styles.socialProfiles}>
      <div className={styles.label}>You might also like...</div>
      {similarAthletesMap}
    </div>
  );
}