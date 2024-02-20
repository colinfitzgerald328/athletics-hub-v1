import React, { useEffect, useState } from "react";
import CustomTabPanel from "./1_Tabs";
import styles from "./styles.module.css";
import SummaryModal from "./2_SummaryModal";
import { Skeleton } from "@mui/material";
import Button from "@mui/joy/Button";
import { Carousel } from "antd";

export default function AthleteBreakDown(props) {
  const [markdownModalOpen, setMarkdownModalOpen] = useState(false);

  const disciplinesArr =
    props.athlete.length !== 0
      ? props.athlete.disciplines.split(", ")
      : undefined;

  function handleFadeOut() {
    var element = document.getElementsByClassName(styles.athleteBreakdown)[0];
    element.classList.add(styles.fadeOut);
    setTimeout(() => {
      element.classList.add(styles.removeDisplay);
      element.classList.remove(styles.fadeIn);
    }, 300);
  }

  function handleFadeIn() {
    var element = document.getElementsByClassName(styles.athleteBreakdown)[0];
    setTimeout(() => {
      element.classList.remove(styles.removeDisplay);
      element.classList.remove(styles.fadeOut);
      setTimeout(() => {
        element.classList.add(styles.fadeIn);
      }, 10);
    }, 300);
  }

  useEffect(() => {
    if (props.showingCollections) {
      handleFadeOut();
    } else if (!props.showingCollections) {
      handleFadeIn();
    }
  }, [props.showingCollections]);

  function openMarkdownModal() {
    setMarkdownModalOpen(true);
  }

  function closeMarkdownModal() {
    setMarkdownModalOpen(false);
  }

  return (
    <div className={styles.athleteBreakdown}>
      <SummaryModal
        markdownModalOpen={markdownModalOpen}
        closeMarkdownModal={closeMarkdownModal}
        athleteSummary={props.athlete.markdown_summary}
      />
      <div className={styles.itemsContainer}>
        {props.loadingNewAthlete || props.loadingNewAthlete == undefined ? (
          <Skeleton
            animation="wave"
            height={230}
            variant="rectangular"
          ></Skeleton>
        ) : props.athlete.hq_images ? (
          <Carousel autoplay>
            {props.athlete.hq_images.map((image, index) => (
              <img className={styles.athleteImage} src={image} key={index} />
            ))}
          </Carousel>
        ) : (
          <img
            className={styles.athleteImage}
            src={props.athlete.hq_image_url}
          />
        )}
        <div className={styles.athleteNameHolder}>
          {props.loadingNewAthlete || props.loadingNewAthlete == undefined ? (
            <Skeleton
              sx={{ zIndex: 1000 }}
              animation="wave"
              variant="circular"
              width={150}
              height={150}
            ></Skeleton>
          ) : (
            <img
              src={props.athlete.hq_image_url}
              className={styles.profileImage}
            />
          )}
          <div className={styles.nameVariables}>
            {props.loadingNewAthlete || props.loadingNewAthlete == undefined ? (
              <Skeleton
                animation="wave"
                width={200}
                height={35}
                variant="rectangular"
              ></Skeleton>
            ) : (
              <div className={styles.betaHolder}>
                <div className={styles.fullName}>{props.athlete.full_name}</div>
                {props.athlete.markdown_summary && (
                  <Button
                    color="success"
                    variant="soft"
                    onClick={() => openMarkdownModal()}
                    sx={{ marginLeft: "10px" }}
                  >
                    Bio
                  </Button>
                )}
              </div>
            )}
            {props.loadingNewAthlete || props.loadingNewAthlete == undefined ? (
              <Skeleton
                sx={{ marginTop: "5px" }}
                animation="wave"
                width={300}
                height={35}
              ></Skeleton>
            ) : (
              <div className={styles.disciplines}>
                {disciplinesArr &&
                  disciplinesArr.map((discipline, index) => (
                    <div key={index} className={styles.tag}>
                      {discipline}
                    </div>
                  ))}
              </div>
            )}
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
