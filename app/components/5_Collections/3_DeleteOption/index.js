import React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import styles from "./styles.module.css";
import { TrashIcon } from "evergreen-ui";
import { modifyCollection } from "@/app/api/api";

export default function DeleteOptionMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  async function handleDelete() {
    await modifyCollection(
      null,
      "DELETE",
      props.collection_id,
      props.athlete_id,
      null,
    );
    props.getCollectionsForUser();
    setAnchorEl(null);
  }

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <IconButton
          onClick={handleDelete}
          size="small"
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
