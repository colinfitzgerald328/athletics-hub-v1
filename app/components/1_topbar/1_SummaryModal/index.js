import React from "react";
import { Modal } from "antd";
import markdownit from "markdown-it";
import moment from "moment";
import CircularProgress from "@mui/joy/CircularProgress";
import Drawer from "@mui/material/Drawer";
import styles from "./styles.module.css";
import { Box } from "@mui/material";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function SummaryModal(props) {
  let result = ""; // Define result outside if block

  if (props.summaryResponse?.summary_text) {
    const md = markdownit();
    result = md.render(props.summaryResponse.summary_text); // Assign result inside if block
  }
  const DrawerList = (
    <Box
      style={{ padding: "20px" }}
      role="presentation"
      onClick={() => props.closeSummaryModal()}
    >
      {props.summaryResponse ? (
        <div className={styles.container}>
          <div className={styles.topItemsHolder}>
            <h1 className={styles.title}>Today in Track and Field</h1>
            <div className={styles.rightItems}>
              {!props.isMobile && (
                <div className={styles.indicator}>
                  Created{" "}
                  {moment.utc(props.summaryResponse?.created_at).fromNow()}
                </div>
              )}
              <div
                onClick={() => props.toggleDrawer(false)}
                className={styles.closeButton}
              >
                <IconButton>
                  <CloseIcon />
                </IconButton>
              </div>
            </div>
          </div>
          <div className={styles.summaryJamison}>
            <div
              className={styles.summaryHolder}
              dangerouslySetInnerHTML={{ __html: result }}
            />
          </div>
        </div>
      ) : (
        <div className={styles.containerCenter}>
          <CircularProgress />
        </div>
      )}
    </Box>
  );

  return (
    <div>
      <Drawer
        anchor="bottom"
        open={props.summaryModalOpen}
        onClose={() => props.closeSummaryModal()}
      >
        {DrawerList}
      </Drawer>
    </div>
  );
}
