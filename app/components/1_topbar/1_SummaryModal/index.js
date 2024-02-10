import React from "react";
import Markdown from "react-markdown";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import styles from "./styles.module.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  height: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  paddingTop: "30px",
  paddingBottom: "30px",
  paddingLeft: "30px",
  paddingRight: "30px",
  borderRadius: "10px",
  outline: "none",
};

export default function SummaryModal(props) {
  return (
    <Modal
      open={props.summaryModalOpen}
      onClose={props.closeSummaryModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      closeButton
    >
      <Box sx={style}>
        <div className={styles.summaryHolder}>
          <Markdown>{props.dailySummary}</Markdown>
        </div>
      </Box>
    </Modal>
  );
}
