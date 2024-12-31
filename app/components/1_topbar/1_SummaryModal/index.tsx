import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/joy/Button";
import { useAthleteContext } from "../../athlete_context";

type Anchor = "top" | "left" | "bottom" | "right";

export default function AnchorTemporaryDrawer() {
  const { summaryParts } = useAthleteContext();

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
      style={{ padding: "20px", width: "800px" }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      {summaryParts.map((part) => (
        <div key={part.id}>
          <h3>{part.section_title}</h3>
          <li>{part.summary_text}</li>
          <b>Sources</b>
          {part.source_links.map((link) => (
            <div key={link.id}>
              <a href={link.source_link}>{link.source_name}</a>
            </div>
          ))}
          <hr />
        </div>
      ))}
    </Box>
  );

  return (
    <div>
      {(["right"] as const).map((anchor) => (
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
