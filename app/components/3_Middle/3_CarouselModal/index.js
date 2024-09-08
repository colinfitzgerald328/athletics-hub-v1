import { Modal, Box } from "@mui/joy";
import styles from "./styles.module.css";
import { Example } from "./example";

export default function CarouselModal(props) {
  const style = {
    display: "flex",
    alignItems: "center",
  };

  return (
    <Modal
      open={props.carouselModalOpen}
      onClose={() => props.closeCarouselModal()}
    >
      <Box onClick={() => props.closeCarouselModal()} sx={style}>
        <div className={styles.exampleContainer}>
          <Example />
        </div>
      </Box>
    </Modal>
  );
}
