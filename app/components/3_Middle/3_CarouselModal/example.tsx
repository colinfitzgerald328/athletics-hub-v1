import { useAthleteContext } from "../../athlete_context";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { wrap } from "@popmotion/popcorn";
import "./styles.scss";

enum SwipeDirection {
  Left = -1,
  Right = 1,
}

function Example() {
  const [[imageCount, direction], setImageCount] = useState([0, 0]);
  const { athlete } = useAthleteContext();

  const activeImageIndex = wrap(
    0,
    athlete.high_quality_images.length,
    imageCount,
  );

  const swipeToImage = (swipeDirection: SwipeDirection) => {
    setImageCount([imageCount + swipeDirection, swipeDirection]);
  };

  const sliderVariants = {
    incoming: (direction: SwipeDirection) => ({
      x: direction > 0 ? "100%" : "-100%",
      scale: 1.2,
      opacity: 0,
    }),
    active: { x: 0, scale: 1, opacity: 1 },
    exit: (direction: SwipeDirection) => ({
      x: direction > 0 ? "-100%" : "100%",
      scale: 1,
      opacity: 0.2,
    }),
  };

  const sliderTransition = {
    duration: 1,
    ease: [0.56, 0.03, 0.12, 1.04],
  };

  const dragEndHandler = (dragInfo) => {
    const draggedDistance = dragInfo.offset.x;
    const swipeThreshold = 50;
    if (draggedDistance > swipeThreshold) {
      swipeToImage(-1);
    } else if (draggedDistance < -swipeThreshold) {
      swipeToImage(1);
    }
  };

  const skipToImage = (imageId: number) => {
    let changeDirection;
    if (imageId > activeImageIndex) {
      changeDirection = 1;
    } else if (imageId < activeImageIndex) {
      changeDirection = -1;
    }
    setImageCount([imageId, changeDirection]);
  };

  const athleteHasAtLeastOneHighQualityImage =
    athlete.high_quality_images?.length > 0;

  if (!athleteHasAtLeastOneHighQualityImage) {
    return null;
  }

  return (
    <>
      <div className="slider-container">
        <div className="slider">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={imageCount}
              style={{
                backgroundImage: `url(${athlete.high_quality_images[activeImageIndex].image_url})`,
              }}
              custom={direction}
              variants={sliderVariants}
              initial="incoming"
              animate="active"
              exit="exit"
              transition={sliderTransition}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(_, dragInfo) => dragEndHandler(dragInfo)}
              className="image"
            />
          </AnimatePresence>
        </div>

        <div className="buttons">
          <button onClick={() => swipeToImage(-1)}>PREV</button>
          <button onClick={() => swipeToImage(1)}>NEXT</button>
        </div>
      </div>
      <div className="thumbnails">
        {athlete.high_quality_images.map((image, index) => (
          <div
            key={index}
            onClick={() => skipToImage(index)}
            className="thumbnail-container"
          >
            <img src={image.image_url} loading="lazy" />
            <div
              className={`active-indicator ${
                index === activeImageIndex ? "active" : null
              }`}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default Example;
