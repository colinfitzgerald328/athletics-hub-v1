import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import { Skeleton, Button } from "@mui/material";

export default function DataTable(props) {
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    var element = document.getElementsByClassName(styles.tableContainer)[0];
    if (element) {
      var subtraction = props.height - 600 - element.scrollHeight;
      if (subtraction < 20) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    }
  });

  useEffect(() => {
    setScrolled(false);
  }, [props.athlete]);

  function scrollIntoView() {
    var element = document.getElementsByClassName(styles.tableContainer)[0];
    element.scrollIntoView({ behavior: "smooth" });
    setScrolled(true);
  }
  return (
    <div className={styles.tableContainer}>
      {/* {showScrollButton && !scrolled && !props.loadingNewAthlete ? (
        <Button
          onClick={() => scrollIntoView()}
          sx={{
            width: "150px",
            height: "50px",
            backgroundColor: "#323232",
            fontWeight: "bold",
            borderRadius: "25px",
            paddingTop: "10px",
            paddingBottom: "10px",
            fontSize: "18px",
            color: "white",
          }}
          variant="contained"
          style={{
            position: "absolute",
            top: props.height - 600 + "px",
            zIndex: "1000",
            right: 0,
          }}
        >
          Scroll
        </Button>
      ) : (
        ""
      )} */}
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
                  index % 2 == 0
                    ? styles.tableRow
                    : styles.tableRowAlternate
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
