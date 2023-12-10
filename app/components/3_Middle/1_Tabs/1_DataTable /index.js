import * as React from 'react';
import styles from "./styles.module.css";

export default function DataTable(props) {
  return (
    <div className={styles.tableContainer}>
      <div className={styles.tableHeader}>
        <div className={styles.markLabel}>
          Mark 
        </div>
        <div className={styles.markLabel}>
          Discipline
        </div>
        <div className={styles.venueLabel}>
          Venue
        </div>
        <div className={styles.labeledItem}>
          Date
        </div>
      </div>
      <div className={styles.table}>
          {props.athlete_data.map((row, index)=>
                      <div
                      key={index}
                      className={index % 2 == 0 ? styles.tableRow : styles.tableRowAlternate}
                    >
                      <div className={styles.mark}>{row.mark}</div>
                      <div className={styles.mark}>{row.discipline}</div>
                      <div className={styles.venue}>{row.venue}</div>
                      <div className={styles.result}>{row.date}</div>
                    </div>
          )}
      </div>
    </div>
  );
}