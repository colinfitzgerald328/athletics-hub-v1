import React from "react";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import { MoreVert } from "@mui/icons-material";
import * as API from "/app/api/api.js";
import styles from "./styles.module.css";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

export default function CollectionDeleteOption(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (e) => {
    e.stopPropagation();
    setAnchorEl(null);
  };

  const handleDelete = () => {
    API.deleteCollection(props.collection_id, (data) => {
      props.getCollectionsForUser();
    });
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <IconButton
          onClick={handleClick}
          size="small"
        >
          <MoreVert
            sx={{ color: props.currentIndex == props.itemIndex ? "white" : "" }}
          />
        </IconButton>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={(e) => handleClose(e)}
        onClick={(e) => handleClose(e)}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem className={styles.theDeleteOption} onClick={handleDelete}>
          <DeleteForeverIcon /> Delete collection
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
