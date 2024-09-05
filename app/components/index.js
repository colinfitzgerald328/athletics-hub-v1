"use client";
import React, { useEffect, useState } from "react";
import TopBar from "./1_topbar";
import LeftSide from "./2_leftSide";
import AthleteBreakDown from "./3_Middle";
import RightSide from "./4_RightSide";
import styles from "./styles.module.css";
import Head from "next/head";
import LinearProgress from "@mui/material/LinearProgress";
import {
  getAthleteById,
  getRandomDoc,
  getLetsRunDailySummary,
} from "../api/api";

export default function MainComponent() {
  const [athlete, setAthlete] = useState(null);
  const [athleteData, setAthleteData] = useState([]);
  const [loadingNewAthlete, setLoadingNewAthlete] = useState(false);
  const [similarAthletes, setSimilarAthletes] = useState([]);
  const [topCompetitors, setTopCompetitors] = useState([]);
  const [summaryResponse, setSummaryResponse] = useState(null);
  const [width, setWidth] = useState(null);
  const [height, setHeight] = useState(null);
  const [pageLoaded, setPageLoaded] = useState(false);

  useEffect(() => {
    window.addEventListener("resize", updateWindowDimensions);
    updateWindowDimensions();
    fetchRandomAthlete();
    getLetsRunDailySummaryFunction();
  }, []);

  async function fetchRandomAthlete() {
    setLoadingNewAthlete(true);
    const { data, error } = await getRandomDoc();
    if (error) {
      setLoadingNewAthlete(false);
      return;
    }
    setAthlete(data.athlete);
    setAthleteData(data.results);
    setSimilarAthletes(data.similar_athletes);
    setTopCompetitors(data.top_competitors);
    setLoadingNewAthlete(false);
    setPageLoaded(true);
  }

  async function fetchAthleteById(athlete_id) {
    setLoadingNewAthlete(true);
    const { data, error } = await getAthleteById(athlete_id);
    if (error) {
      setLoadingNewAthlete(false);
      return;
    }
    setAthlete(data.athlete);
    setAthleteData(data.results);
    setSimilarAthletes(data.similar_athletes);
    setTopCompetitors(data.top_competitors);
    setLoadingNewAthlete(false);
    setPageLoaded(true);
  }

  function updateWindowDimensions() {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  }

  async function getLetsRunDailySummaryFunction() {
    const { data, error } = await getLetsRunDailySummary();
    if (error) {
      return;
    }
    setSummaryResponse(data.summary_text);
  }

  if (!athlete) {
    return (
      <div className={styles.loadingDisplay}>
        <div>
          <LinearProgress />
        </div>
      </div>
    );
  }
  if (width < 1000 && pageLoaded) {
    return (
      <div>
        <Head>
          <meta property="og:image" content="/icon.png" />
        </Head>
        <TopBar summaryResponse={summaryResponse} isMobile={true} />
        <div className={styles.mainDisplayMobile}>
          <LeftSide
            fetchAthleteById={fetchAthleteById.bind(this)}
            isMobile={true}
          />
          <AthleteBreakDown
            athlete={athlete}
            loadingNewAthlete={loadingNewAthlete}
            athlete_data={athleteData}
            top_competitors={topCompetitors}
            height={height}
            fetchAthleteById={fetchAthleteById}
            isMobile={true}
          />
          <RightSide
            athlete={athlete}
            similar_athletes={similarAthletes}
            loadingNewAthlete={loadingNewAthlete}
            athlete_data={athleteData}
            fetchAthleteById={fetchAthleteById}
            isMobile={true}
          />
        </div>
      </div>
    );
  } else if (width > 1000 && pageLoaded) {
    return (
      <div>
        <Head>
          <meta property="og:image" content="/icon.png" />
        </Head>
        <TopBar summaryResponse={summaryResponse} />
        <div className={styles.mainDisplay}>
          <div className={styles.tempWrapper}>
            <LeftSide fetchAthleteById={fetchAthleteById} />
            <AthleteBreakDown
              athlete={athlete}
              loadingNewAthlete={loadingNewAthlete}
              athlete_data={athleteData}
              top_competitors={topCompetitors}
              height={height}
              fetchAthleteById={fetchAthleteById}
            />
          </div>
          <RightSide
            athlete={athlete}
            similar_athletes={similarAthletes}
            loadingNewAthlete={loadingNewAthlete}
            athlete_data={athleteData}
            fetchAthleteById={fetchAthleteById}
          />
        </div>
      </div>
    );
  }
}
