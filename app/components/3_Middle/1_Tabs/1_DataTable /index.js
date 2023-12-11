import * as React from "react";
import styles from "./styles.module.css";
import { Skeleton } from "@mui/material";

export default function DataTable(props) {
  return (
    <div className={styles.tableContainer}>
      <div className={styles.tableHeader}>
        <div className={styles.markLabel}>Mark</div>
        <div className={styles.markLabel}>Discipline</div>
        <div className={styles.venueLabel}>Venue</div>
        <div className={styles.labeledItem}>Date</div>
      </div>
      <div className={styles.table}>
        {props.loadingNewAthlete ? (
          <div>
            <Skeleton height={70} animation="wave" />
            <Skeleton height={70} animation="wave" />
            <Skeleton height={70} animation="wave" />
            <Skeleton height={70} animation="wave" />
            <Skeleton height={70} animation="wave" />
            <Skeleton height={70} animation="wave" />
            <Skeleton height={70} animation="wave" />
            <Skeleton height={70} animation="wave" />
            <Skeleton height={70} animation="wave" />
            <Skeleton height={70} animation="wave" />
          </div>
        ) : (
          props.athlete_data.map((row, index) => (
            <div
              key={index}
              className={
                index % 2 == 0 ? styles.tableRow : styles.tableRowAlternate
              }
            >
              <div className={styles.mark}>{row.mark}</div>
              <div className={styles.mark}>{row.discipline}</div>
              <div className={styles.venue}>{row.venue}</div>
              <div className={styles.result}>{row.date}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
