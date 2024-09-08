import React from "react";
import { IconButton } from "@mui/material";
import Close from "@mui/icons-material/Close";
import Button from "@mui/joy/Button";
import { Modal } from "antd";
import markdownit from "markdown-it";
import styles from "./styles.module.css";
import { useAthleteContext } from "../../athlete_context";

export default function SummaryModal(props) {
  const { athlete } = useAthleteContext();
  let result = ""; // Define result outside if block

  if (athlete.athlete.markdown_summary) {
    const md = markdownit();
    result = md.render(athlete.athlete.markdown_summary); // Assign result inside if block
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
            {athlete.athlete.first_name} {athlete.athlete.last_name}
          </div>
          <div className={styles.rightItems}>
            <Button
              color="primary"
              variant="soft"
              sx={{ borderRadius: "25px" }}
              className={styles.openButton}
              onClick={() => window.open(athlete.athlete.wikipedia_url)}
            >
              Read more
            </Button>
            <div
              onClick={() => props.closeMarkdownModal()}
              className={styles.closeButton}
            >
              <IconButton>
                <Close />
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
