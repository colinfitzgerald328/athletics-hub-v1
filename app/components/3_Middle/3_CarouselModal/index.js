import { Modal } from "@mui/joy";
import styles from "./styles.module.css";
import { Example } from "./example";

export default function CarouselModal(props) {
  const athleteImages = props.athlete_images.map((image) => {
    return { original: image, thumbnail: image };
  });

  return (
    <Modal
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      open={props.carouselModalOpen}
      onClose={() => props.closeCarouselModal()}
    >
      <div className={styles.exampleContainer}>
        <Example athlete_images={props.athlete_images} />
      </div>
    </Modal>
  );
}
