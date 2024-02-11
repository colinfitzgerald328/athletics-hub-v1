import React from "react";
import Box from "@mui/material/Box";
import { Modal } from "antd";
import markdownit from 'markdown-it';

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
  let result = ""; // Define result outside if block

  if (props.dailySummary) {
    const md = markdownit();
    result = md.render(props.dailySummary); // Assign result inside if block
  }

  return (
    <Modal
      open={props.summaryModalOpen}
      onCancel={props.closeSummaryModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      footer={null}
      centered
      width={"800px"}
      scroll
    >
      <div className={styles.container}>
      <div className={styles.summaryHolder} dangerouslySetInnerHTML={{ __html: result }} />
      </div>
        {/* Render parsed HTML content inside div */}
    </Modal>
  );
}

