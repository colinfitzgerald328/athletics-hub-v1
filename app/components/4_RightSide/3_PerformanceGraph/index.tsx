import React, { useState } from "react";
import CardGraph from "./1_Graph";
import BigGraph from "./2_BigGraph";
import { Skeleton } from "@mui/material";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import { Modal } from "antd";
import styles from "./styles.module.css";
import { useAthleteContext } from "../../athlete_context";

export default function PeformanceGraph() {
  const { athlete, isMobile, loadingNewAthlete } = useAthleteContext();
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
        {!isMobile && (
          <OpenInFullIcon onClick={openModal} sx={{ cursor: "pointer" }} />
        )}
      </div>

      {loadingNewAthlete || athlete.results.length == 0 ? (
        <Skeleton height={200} animation="wave" variant="rectangulat" />
      ) : (
        <CardGraph />
      )}
      <Modal
        open={graphModalOpen}
        onCancel={closeModal}
        footer=""
        width={"80vw"}
        centered
      >
        <div className={styles.divHolder}>
          <BigGraph />
        </div>
      </Modal>
    </div>
  );
}
