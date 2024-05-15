import React from "react";
import { Modal } from "antd";
import markdownit from "markdown-it";
import moment from "moment";
import CircularProgress from "@mui/joy/CircularProgress";

import styles from "./styles.module.css";
import { Box } from "@mui/material";

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

  if (props.summaryResponse?.summary_text) {
    const md = markdownit();
    result = md.render(props.summaryResponse.summary_text); // Assign result inside if block
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
      {props.summaryResponse ? (
        <div className={styles.container}>
          <div className={styles.topItemsHolder}>
            <h1 className={styles.title}>Today in Track and Field</h1>
            {!props.isMobile && (
              <div className={styles.indicator}>
                Created $
                {moment.utc(props.summaryResponse?.created_at).fromNow()}
              </div>
            )}
          </div>
          <div
            className={styles.summaryHolder}
            dangerouslySetInnerHTML={{ __html: result }}
          />
        </div>
      ) : (
        <div className={styles.containerCenter}>
          <CircularProgress />
        </div>
      )}
    </Modal>
  );
}
