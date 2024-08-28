import React, { useState } from "react";
import CustomTabPanel from "./1_Tabs";
import styles from "./styles.module.css";
import SummaryModal from "./2_SummaryModal";
import CarouselModal from "./3_CarouselModal";
import { Skeleton } from "@mui/material";
import Button from "@mui/joy/Button";



const AthleteBreakDown = () => {
  const [markdownModalOpen, setMarkdownModalOpen] = useState(false);
  const [carouselModalOpen, setCarouselModalOpen] = useState(false);
  const handleMarkdownModal = () => setMarkdownModalOpen(!markdownModalOpen);
  const handleCarouselModal = () => setCarouselModalOpen(!carouselModalOpen);



  return (
    <div
      className={
        isMobile ? styles.mobileBreakdown : styles.athleteBreakdown
      }
    >
      <SummaryModal
        isOpen={markdownModalOpen}
        onClose={handleMarkdownModalClose}
      />
      <div className={styles.itemsContainer}>
        {loadingNewAthlete ? (
          <Skeleton
            animation="wave"
            height={350}
            style={{ borderRadius: "25px" }}
            variant="rectangular"
          />
        ) : (
          <img
            className={styles.athleteImage}
            src={
              athlete.hq_images?.[0] ?? athlete.hq_image_url ??
              "https://cdn.pixabay.com/photo/2014/04/03/11/07/running-311805_640.png"
            }
            alt={athlete.athlete.first_name}
            onClick={
              athlete.hq_images ? handleCarouselModalOpen : undefined
            }
          />
        )}
        {athlete.hq_images && (
          <CarouselModal
            isOpen={carouselModalOpen}
            onClose={handleCarouselModalClose}
            athleteImages={athlete.hq_images}
          />
        )}
        <div className={styles.athleteNameHolder}>
          {loadingNewAthlete ? (
            <Skeleton
              animation="wave"
              variant="circular"
              width={150}
              height={150}
            />
          ) : (
            <img
              src={
                athlete.hqImages?.[0] ?? athlete.hqImageUrl ??
                "https://cdn.pixabay.com/photo/2014/04/03/11/07/running-311805_640.png"
              }
              className={styles.profileImage}
              alt={athlete.athlete.firstName}
            />
          )}
          <div className={isMobile ? "" : styles.nameVariables}>
            {loadingNewAthlete ? (
              <Skeleton
                animation="wave"
                width={200}
                height={35}
                variant="rectangular"
              />
            ) : (
              <div className={styles.betaHolder}>
                <div
                  className={
                    isMobile ? styles.mobileFullName : styles.fullName
                  }
                >
                  {athlete.first_name} {athlete.last_name}
                </div>
                {athlete.markdown_summary && (
                  <Button
                    variant="soft"
                    color="success"
                    onClick={handleMarkdownModalOpen}
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
              />
            ) : (
              <div className={styles.disciplines}>
                {disciplinesArr?.map((discipline, index) => (
                    <div
                      key={discipline}
                      className={isMobile ? styles.mobileTag : styles.tag}
                    >
                      {discipline}
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <CustomTabPanel/>
    </div>
  );
};

export default AthleteBreakDown;

