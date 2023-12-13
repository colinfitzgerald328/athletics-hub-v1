import React, { useState } from "react";
import CardGraph from "./1_Graph";
import BigGraph from "./2_BigGraph";
import { Skeleton } from "@mui/material";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import { Modal } from "antd";
import styles from "./styles.module.css";

export default function PeformanceGraph(props) {
  const [graphModalOpen, setGraphModalOpen] = useState(false);

  function openModal() {
    setGraphModalOpen(true);
  }

  function closeModal() {
    setGraphModalOpen(false);
  }

  return (
    <div className={styles.socialProfiles}>
      <div className={styles.labelHolder}>
        <div className={styles.label}>Performance Graph</div>
        <OpenInFullIcon onClick={openModal} sx={{ cursor: "pointer" }} />
      </div>

      {props.loadingNewAthlete ? (
        <Skeleton height={200} animation="wave" variant="rectangulat" />
      ) : (
        <CardGraph athlete_data={props.athlete_data} />
      )}
      <Modal
        open={graphModalOpen}
        onCancel={closeModal}
        footer=""
        width={"80vw"}
      >
        <div className={styles.divHolder}>
          <BigGraph athlete={props.athlete} athlete_data={props.athlete_data} />
        </div>
      </Modal>
    </div>
  );
}
