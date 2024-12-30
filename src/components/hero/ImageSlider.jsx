import  { useState, useEffect } from "react";
import { Box, Fade } from "@mui/material";

const ImageSlider = ({ images, interval = 1000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
      marginTop:"70px",
        maxWidth: "1200px",
        padding:"20px",
        // height:"300px",
        margin: "0 auto",
        overflow: "hidden",
        borderRadius: "8px",
      }}
    >
      {images.map((image, index) => (
        <Fade
          in={index === currentIndex}
          timeout={1000}
          key={index}
          unmountOnExit
        >
          <Box
            component="img"
            src={image.src}
            alt={image.alt || `Slide ${index}`}
            sx={{
              width: "100%",
              height: "auto",
              display: index === currentIndex ? "block" : "none",
            }}
          />
        </Fade>
      ))}
    </Box>
  );
};

export default ImageSlider;
