import React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import styles from "./styles.module.css";
import * as API from "/app/api/api.js";
import { TrashIcon } from "evergreen-ui";

export default function DeleteOptionMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    API.deleteAthleteFromCollection(
      props.collection_id,
      props.athlete_id,
      (data) => {
        props.getCollectionsForUser();
      },
    );
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <IconButton
          onClick={handleDelete}
          size="small"
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          sx={{
            padding: 1,
          }}
          className={styles.deleteHoverable}
        >
          <TrashIcon className={styles.theIcon} />
        </IconButton>
      </Box>
    </React.Fragment>
  );
}
