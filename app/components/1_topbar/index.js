import React from "react";
import styles from "./styles.module.css";

export default function TopBar() {
  return (
    <div className={styles.topBarHolder}>
      <div className={styles.pageLabel}>athletics hub</div>
      <div className={styles.pageAction}>
        A research tool built for track and field fans
      </div>
    </div>
  );
}
