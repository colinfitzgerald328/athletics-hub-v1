import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Example from "./example";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  width: 800,
  backgroundColor: "black",
  borderRadius: "30px",
};

export default function BasicModal(props) {
  return (
    <Modal
      open={props.carouselModalOpen}
      onClose={() => props.closeCarouselModal()}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Example />
      </Box>
    </Modal>
  );
}
