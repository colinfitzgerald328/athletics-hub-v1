import React, { useEffect, useState } from "react";
import CustomTabPanel from "./1_Tabs";
import styles from "./styles.module.css";
import SummaryModal from "./2_SummaryModal";
import CarouselModal from "./3_CarouselModal";
import { IconButton, Skeleton } from "@mui/material";
import Button from "@mui/joy/Button";
import { useAthleteContext } from "../athlete_context";

export default function AthleteBreakDown() {
  const [markdownModalOpen, setMarkdownModalOpen] = useState(false);
  const [carouselModalOpen, setCarouselModalOpen] = useState(false);
  const { athlete, isMobile, loadingNewAthlete } = useAthleteContext();

  const disciplinesArr = athlete
    ? athlete.athlete.primary_disciplines.split(", ")
    : [];

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

  const getImageByScreenSize = () => {
    return isMobile
      ? athlete.high_quality_images?.[0].image_url ??
          athlete.athlete.hq_images[0]
      : athlete.athlete.headshot_image_url;
  };

  const displayHeaderImage = () => {
    return (
      <>
        <img className={styles.athleteImage} src={getImageByScreenSize()} />
        <img
          loading="lazy"
          onClick={() => openCarouselModal()}
          className={styles.expandImage}
          src={"expand.png"}
        ></img>{" "}
        <CarouselModal
          carouselModalOpen={carouselModalOpen}
          closeCarouselModal={closeCarouselModal}
        />
      </>
    );
  };

  const displaySponsors = () => {
    return athlete.sponsors?.sponsors.length > 0 ? (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: "10px",
        }}
      >
        <div
          className="text-lg font-semibold text-gray-700"
          style={{ marginRight: "5px" }}
        >
          Sponsored by:
        </div>
        <div className="flex flex-wrap gap-2">
          {athlete.sponsors?.sponsors.map((sponsor) => (
            <div
              key={sponsor}
              className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ease-in-out hover:bg-blue-200 hover:text-blue-900"
            >
              {sponsor}
            </div>
          ))}
        </div>
      </div>
    ) : null;
  };

  return (
    <div
      className={isMobile ? styles.mobileBreakdown : styles.athleteBreakdown}
    >
      <SummaryModal
        markdownModalOpen={markdownModalOpen}
        closeMarkdownModal={closeMarkdownModal}
      />
      <div className={styles.itemsContainer}>
        {loadingNewAthlete ? (
          <Skeleton
            animation="wave"
            height={350}
            style={{ borderRadius: "25px" }}
            variant="rectangular"
          ></Skeleton>
        ) : (
          displayHeaderImage()
        )}
        <div className={styles.athleteNameHolder}>
          {!isMobile && loadingNewAthlete ? (
            <Skeleton
              sx={{ zIndex: 1000 }}
              animation="wave"
              variant="circular"
              width={150}
              height={150}
            ></Skeleton>
          ) : !isMobile && athlete.athlete.hq_images ? (
            <img
              loading="lazy"
              src={athlete.athlete.hq_images[0]}
              className={styles.profileImage}
            />
          ) : (
            ""
          )}
          <div className={isMobile ? "" : styles.nameVariables}>
            {loadingNewAthlete ? (
              <Skeleton
                animation="wave"
                width={200}
                height={35}
                variant="rectangular"
              ></Skeleton>
            ) : (
              <div className={styles.betaHolder}>
                <div
                  className={isMobile ? styles.mobileFullName : styles.fullName}
                >
                  {athlete.athlete.first_name} {athlete.athlete.last_name}
                </div>
                {athlete.athlete.markdown_summary && (
                  <Button
                    variant="soft"
                    color="success"
                    onClick={() => openMarkdownModal()}
                    sx={{
                      marginLeft: "15px",
                      borderRadius: "25px",
                    }}
                    className={styles.generalButton}
                  >
                    Bio
                  </Button>
                )}
              </div>
            )}
            {loadingNewAthlete ? (
              <Skeleton
                sx={{ marginTop: "5px" }}
                animation="wave"
                width={300}
                height={35}
              ></Skeleton>
            ) : (
              <div className={styles.disciplines}>
                {disciplinesArr.map((discipline) => (
                  <div
                    key={discipline}
                    className={isMobile ? styles.mobileTag : styles.tag}
                  >
                    {discipline}
                  </div>
                ))}
              </div>
            )}
            {loadingNewAthlete ? (
              <Skeleton
                sx={{ marginTop: "5px" }}
                animation="wave"
                width={300}
                height={35}
              ></Skeleton>
            ) : (
              displaySponsors()
            )}
          </div>
        </div>
      </div>
      <CustomTabPanel />
    </div>
  );
}
