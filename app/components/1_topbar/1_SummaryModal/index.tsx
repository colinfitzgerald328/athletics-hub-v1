import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/joy/Button";
import styles from "./styles.module.css";
import { CircularProgress } from "@mui/material";
import markdownit from "markdown-it";

type Anchor = "top" | "left" | "bottom" | "right";

export default function AnchorTemporaryDrawer(props) {
  let result: string; // Define result outside if block

  if (props.summaryResponse) {
    const md = markdownit();
    result = md.render(props.summaryResponse); // Assign result inside if block
  }
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    <Box
      style={{ padding: "20px" }}
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
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
      {(["bottom"] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <Button
            sx={{
              marginLeft: "15px",
              borderRadius: "25px",
              marginTop: "auto",
              marginBottom: "auto",
            }}
            variant="soft"
            color="primary"
            onClick={toggleDrawer(anchor, true)}
          >
            Daily News
          </Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
