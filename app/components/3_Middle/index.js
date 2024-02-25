import React, { useEffect, useState } from "react";
import CustomTabPanel from "./1_Tabs";
import styles from "./styles.module.css";
import SummaryModal from "./2_SummaryModal";
import CarouselModal from "./3_CarouselModal";
import { IconButton, Skeleton } from "@mui/material";
import Button from "@mui/joy/Button";

export default function AthleteBreakDown(props) {
  const [markdownModalOpen, setMarkdownModalOpen] = useState(false);
  const [carouselModalOpen, setCarouselModalOpen] = useState(false);

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

  function openCarouselModal() {
    setCarouselModalOpen(true);
  }

  function closeCarouselModal() {
    setCarouselModalOpen(false);
  }

  return (
    <div className={styles.athleteBreakdown}>
      <SummaryModal
        markdownModalOpen={markdownModalOpen}
        closeMarkdownModal={closeMarkdownModal}
        athleteSummary={props.athlete.markdown_summary}
        athlete={props.athlete}
        
      />
      <div className={styles.itemsContainer}>
        {props.loadingNewAthlete || props.loadingNewAthlete == undefined ? (
          <Skeleton
            animation="wave"
            height={350}
            variant="rectangular"
          ></Skeleton>
        ) : props.athlete.hq_images ? (
          <>
            <img
              className={styles.athleteImage}
              src={props.athlete.hq_images[0]}
            />
            <img
              onClick={() => openCarouselModal()}
              className={styles.expandImage}
              src={"expand.png"}
            ></img>{" "}
            <CarouselModal
              carouselModalOpen={carouselModalOpen}
              closeCarouselModal={closeCarouselModal}
              athlete_images={props.athlete.hq_images}
            />
          </>
        ) : props.athlete.hq_image_url ? (
          <img
            className={styles.athleteImage}
            src={props.athlete.hq_image_url}
          />
        ) : (
          <img
            className={styles.athleteImageContained}
            src={
              "https://cdn.pixabay.com/photo/2014/04/03/11/07/running-311805_640.png"
            }
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
          ) : props.athlete.hq_images ? (
            <img
              src={props.athlete.hq_images[0]}
              className={styles.profileImage}
            />
          ) : props.athlete.hq_image_url ? (
            <img
              src={props.athlete.hq_image_url}
              className={styles.profileImage}
            />
          ) : (
            ''
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
                  variant="soft"
                    color="success"
                    onClick={() => openMarkdownModal()}
                    sx={{
                      marginLeft: "15px",
                      paddingLeft: "40px",
                      paddingRight: "40px",
                      borderRadius: "25px",
                    }}
                    className={styles.generalButton}
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
