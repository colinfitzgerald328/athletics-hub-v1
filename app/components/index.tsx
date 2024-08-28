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
import { components } from "@/src/lib/api/v1";
import type { QueriedAthlete } from "@/app/api/api";
type SummaryResponse = components["schemas"]["LetsrunSummaryForDay"]


export default function MainComponent() {
  const [athlete, setAthlete] = useState<QueriedAthlete>(null);
  const [summaryResponse, setSummaryResponse] = useState<SummaryResponse>(null);
  const [width, setWidth] = useState<number>(null);
  const [height, setHeight] = useState<number>(null);
  const [loadingNewAthlete, setLoadingNewAthlete] = useState<boolean>(false);

  useEffect(() => {
    window.addEventListener("resize", updateWindowDimensions);
    updateWindowDimensions();
    fetchRandomAthlete();
    handleGetLetsRunDailySummary();
  }, []);

  /**
   * Fetches a random athlete, and sets the state of the components to reflect the fetched athlete.
   */
  async function fetchRandomAthlete(): Promise<void> {
    setLoadingNewAthlete(true);
    const { data, error } = await getRandomDoc();

    if (error) {
      setLoadingNewAthlete(false);
      return;
    }

    setAthlete(data);
    setLoadingNewAthlete(false);
  }

  /**
   * Fetches an athlete by their ID, and sets the state of the components to reflect the fetched athlete.
   * @param athlete_id The ID of the athlete to fetch
   */
  async function fetchAthleteById(athlete_id: number): Promise<void> {
    setLoadingNewAthlete(true);
    const { data, error } = await getAthleteById(athlete_id);

    if (error) {
      setLoadingNewAthlete(false);
      return;
    }

    setAthlete(data);
    setLoadingNewAthlete(false);
  }

  function updateWindowDimensions() {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  }

  async function handleGetLetsRunDailySummary() {
    const { data, error } = await getLetsRunDailySummary();

    if (error) {
      return;
    }

    setSummaryResponse(data);
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
  if (width < 1000) {
    return (
      <div>
        <Head>
          <meta property="og:image" content="/icon.png" />
        </Head>
        <TopBar summaryResponse={summaryResponse.summary_text} isMobile={true} />
        <div className={styles.mainDisplayMobile}>
          <LeftSide fetchAthleteById={fetchAthleteById} isMobile={true} />
          <AthleteBreakDown
            athlete={athlete}
            loadingNewAthlete={loadingNewAthlete}
            height={height}
            fetchAthleteById={fetchAthleteById}
            isMobile={true}
          />
          <RightSide
            athlete={athlete}
            loadingNewAthlete={loadingNewAthlete}
            fetchAthleteById={fetchAthleteById}
            isMobile={true}
          />
        </div>
      </div>
    );
  } else if (width > 1000) {
    return (
      <div>
        <Head>
          <meta property="og:image" content="/icon.png" />
        </Head>
        <TopBar isMobile={false} summaryResponse={summaryResponse.summary_text} />
        <div className={styles.mainDisplay}>
          <div className={styles.tempWrapper}>
            <LeftSide fetchAthleteById={fetchAthleteById} />
            <AthleteBreakDown
              athlete={athlete}
              loadingNewAthlete={loadingNewAthlete}
              height={height}
              fetchAthleteById={fetchAthleteById}
            />
          </div>
          <RightSide
            athlete={athlete}
            loadingNewAthlete={loadingNewAthlete}
            fetchAthleteById={fetchAthleteById}
          />
        </div>
      </div>
    );
  }
}
