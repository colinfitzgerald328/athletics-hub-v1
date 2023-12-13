import React from "react";
import styles from "./styles.module.css";

export default function TopBar() {
  return (
    <div className={styles.topBarHolder}>
      <div className={styles.pageLabel}>athletics hub</div>
      <div className={styles.pageAction}>
        Stay up to date on your favorite track and field athletes
      </div>
    </div>
  );
}
