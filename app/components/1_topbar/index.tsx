import React from "react";
import SummaryModal from "./1_SummaryModal";
import ComparisonModal from "../2_leftSide/1_Modal";
import styles from "./styles.module.css";



const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  height: 570,
  bgcolor: "background.paper",
  boxShadow: 24,
  paddingTop: "30px",
  paddingBottom: "100px",
  paddingLeft: "30px",
  paddingRight: "30px",
  borderRadius: "10px",
  outline: "none",
};

interface TopBarProps {
  isMobile: boolean
  summaryResponse: string
}

const TopBar = (props: TopBarProps) => {


  return (
    <div className={styles.topBarHolder}>
      <div className={styles.leftItems}>
        <div className={props.isMobile ? styles.mobileLabel : styles.pageLabel}>
          Track and Field Hub
        </div>
        <div className={styles.stupidWrapper}>
          <SummaryModal
            summaryResponse={props.summaryResponse}
          />
          <ComparisonModal isMobile={props.isMobile} />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
