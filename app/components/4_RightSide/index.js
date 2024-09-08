import React from "react";
import SocialProfiles from "./1_SocialProfiles";
import Recommended from "./2_Recommended";
import PeformanceGraph from "./3_PerformanceGraph";
import styles from "./styles.module.css";
import { useAthleteContext } from "../athlete_context";

export default function RightSide(props) {
  const { isMobile } = useAthleteContext();
  return (
    <div className={isMobile ? styles.mobileRightSide : styles.rightSide}>
      <PeformanceGraph />
      <SocialProfiles></SocialProfiles>
      <Recommended />
    </div>
  );
}
