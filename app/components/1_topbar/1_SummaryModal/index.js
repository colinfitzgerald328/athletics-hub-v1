import React from "react";
import markdownit from "markdown-it";
import CircularProgress from "@mui/joy/CircularProgress";
import Drawer from "@mui/material/Drawer";
import styles from "./styles.module.css";
import { Box } from "@mui/material";

export default function SummaryModal(props) {
  let result = ""; // Define result outside if block

  if (props.summaryResponse) {
    const md = markdownit();
    result = md.render(props.summaryResponse); // Assign result inside if block
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
        open={props.open}
        onClose={() => props.closeSummaryModal()}
      >
        {DrawerList}
      </Drawer>
    </div>
  );
}
