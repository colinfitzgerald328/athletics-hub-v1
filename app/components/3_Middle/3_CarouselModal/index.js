import React from "react";
import Modal from "antd/es/modal/Modal";
import Carousel from "react-bootstrap/Carousel";

import styles from "./styles.module.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  height: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  paddingTop: "30px",
  paddingBottom: "30px",
  paddingLeft: "30px",
  paddingRight: "30px",
  borderRadius: "10px",
  outline: "none",
  display: "flex",
  alignItems: "center",
};

export default function CarouselModal(props) {
  return (
    <Modal
      className={styles.generalModal}
      open={props.carouselModalOpen}
      onCancel={props.closeCarouselModal}
      height={"500px"}
      width={800}
      footer={false}
      centered
    >
      <Carousel>
        {props.athlete_images.map((image, index) => (
          <Carousel.Item className={styles.generalItem} key={index}>
            <img className={styles.carouselImage} key={index} src={image} />
          </Carousel.Item>
        ))}
      </Carousel>
    </Modal>
  );
}
