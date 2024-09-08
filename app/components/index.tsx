"use client";
import React, { useEffect } from "react";
import TopBar from "./1_topbar";
import LeftSide from "./2_leftSide";
import AthleteBreakDown from "./3_Middle";
import RightSide from "./4_RightSide";
import styles from "./styles.module.css";
import Head from "next/head";
import LinearProgress from "@mui/material/LinearProgress";
import { useAthleteContext } from "./athlete_context";

export default function MainComponent() {
  const { athlete, width } = useAthleteContext();

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
        <TopBar />
        <div className={styles.mainDisplayMobile}>
          <LeftSide />
          <AthleteBreakDown />
          <RightSide />
        </div>
      </div>
    );
  } else if (width > 1000) {
    return (
      <div>
        <Head>
          <meta property="og:image" content="/icon.png" />
        </Head>
        <TopBar />
        <div className={styles.mainDisplay}>
          <div className={styles.tempWrapper}>
            <LeftSide />
            <AthleteBreakDown />
          </div>
          <RightSide />
        </div>
      </div>
    );
  }
}
