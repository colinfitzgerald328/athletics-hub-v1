import React from "react";
import SummaryModal from "./1_SummaryModal";
import ComparisonModal from "../2_leftSide/1_Modal";
import styles from "./styles.module.css";
import { useAthleteContext } from "../athlete_context";



const TopBar = () => {
  const { isMobile } = useAthleteContext();
  return (
    <div className={styles.topBarHolder}>
      <div className={styles.leftItems}>
        <div className={isMobile ? styles.mobileLabel : styles.pageLabel}>
          Track and Field Hub
        </div>
        <div className={styles.stupidWrapper}>
          <SummaryModal/>
          <ComparisonModal/>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
