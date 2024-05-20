import { Modal, Box } from "@mui/joy";
import styles from "./styles.module.css";
import { Example } from "./example";

export default function CarouselModal(props) {
  const athleteImages = props.athlete_images.map((image) => {
    return { original: image, thumbnail: image };
  });

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
          <Example athlete_images={props.athlete_images} />
        </div>
      </Box>
    </Modal>
  );
}
