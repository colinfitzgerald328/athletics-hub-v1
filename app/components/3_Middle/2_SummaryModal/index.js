import React from "react";
import { IconButton } from "@mui/material";
import Button from "@mui/joy/Button";
import { Modal } from "antd";
import markdownit from "markdown-it";

import styles from "./styles.module.css";
import Close from "@mui/icons-material/Close";

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

  if (props.athleteSummary) {
    const md = markdownit();
    result = md.render(props.athleteSummary); // Assign result inside if block
  }


  return (
    <Modal
      open={props.markdownModalOpen}
      closeIcon={false}
      onCancel={props.closeMarkdownModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      footer={null}
      centered
      width={"800px"}
      scroll
    >
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.fullName}>
            {props.athlete.full_name}
          </div>
          <div className={styles.rightItems}>
          <Button color="primary" variant="soft" className={styles.openButton}  onClick={()=> window.open(props.athlete.wikipedia_url)}>
            Read more
          </Button>
          <div onClick={()=> props.closeMarkdownModal()} className={styles.closeButton}>
            <IconButton>
              <Close/>
            </IconButton>
          </div>
          </div>
        </div>
        <div
          className={styles.summaryHolder}
          dangerouslySetInnerHTML={{ __html: result }}
        />
      </div>
    </Modal>
  );
}
