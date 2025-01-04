import React from "react";
import { Skeleton } from "@mui/material";
import styles from "./styles.module.css";
import { useAthleteContext } from "../../athlete_context";

export default function Recommended() {
  const { loadingNewAthlete, athlete, fetchAthleteById } = useAthleteContext();
  const similarAthletesMap = athlete.similar_athletes.map((similar_athlete) => (
    <div
      className={styles.similarAthlete}
      onClick={() => fetchAthleteById(similar_athlete.athlete_id)}
      key={similar_athlete.athlete_id}
    >
      {loadingNewAthlete ? (
        <Skeleton
          sx={{ borderRadius: "15px" }}
          animation="wave"
          variant="rectangular"
          width={60}
          height={60}
        />
      ) : (
        <img
          loading="lazy"
          src={
            similar_athlete.hq_images
              ? similar_athlete.hq_images[0]
              : similar_athlete.hq_image_url
          }
          className={styles.athleteImage}
        />
      )}
      <div className={styles.itemsHolder}>
        {loadingNewAthlete ? (
          <Skeleton
            animation="wave"
            variant="rectangular"
            width={150}
            height={18}
          />
        ) : (
          <div className={styles.athleteName}>
            {similar_athlete.first_name} {similar_athlete.last_name}
          </div>
        )}
        {loadingNewAthlete ? (
          <Skeleton
            sx={{ marginTop: "5px" }}
            animation="wave"
            variant="rectangular"
            width={200}
            height={12}
          />
        ) : (
          <div className={styles.athleteDisciplines}>
            {similar_athlete.primary_disciplines}
          </div>
        )}
      </div>
    </div>
  ));

  return athlete.similar_athletes.length == 0 ? (
    ""
  ) : (
    <div className={styles.socialProfiles}>
      <div className={styles.label}>You might also like...</div>
      {similarAthletesMap}
    </div>
  );
}
