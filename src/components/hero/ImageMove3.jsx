import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";

const ImageMove3 = ({ imagess, interval = 9000, transitionDuration = 1000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalImages = imagess.length;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalImages);
    }, interval);
    return () => clearInterval(timer);
  }, [totalImages, interval]);

  const imageSizeLarge = 275;
  const imageSizeSmall = 182;
  const imageGap = 12;
  const verticalMargin = 10;

  const initialTranslateX = -10;

  return (
    <Box
      sx={{
        position: "relative",
        width: "92%",
        marginTop: "0px",

        maxWidth: "1160px",
        margin: "0 auto",
        overflow: "hidden",
        borderRadius: "3px",
      
        marginBottom: "10px",
        paddingBottom: "10apx",
       
      }}
    >
      {/* <Box marginTop={"40px"}></Box> */}
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        padding={"30px 0px 15px 0px"}
      >
        <Typography
          color="black"
          fontSize={"18px"}
         
          marginLeft={"10px"}
        >
          شاهد الكل
        </Typography>

        <Typography
          color="black"
          fontSize={"25px"}
          marginRight={"15px"}
          fontWeight={"bold"}
          // marginTop={"5px"}
        >
         شركات نتعامل معاها
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          transition: `transform ${transitionDuration / 1000}s ease-in-out`,
          transform: {
            xs: `translateX(${
              initialTranslateX - currentIndex * (imageSizeSmall + imageGap)
            }px)`,
            sm: `translateX(${
              initialTranslateX - currentIndex * (imageSizeLarge + imageGap)
            }px)`,
          },
          gap: `${imageGap}px`,
          marginLeft: "20px",
        }}
      >
        {imagess.map((image, index) => (
          <Box
            key={index}
            component="img"
            src={image.src}
            alt={image.alt || `Slide ${index}`}
            sx={{
              objectFit: "cover",
              borderRadius: "8px",
              width: {
                xs: `${imageSizeSmall}px`,
                sm: `${imageSizeLarge}px`,
              },
              height: {
                xs: `${imageSizeSmall}px`,
                sm: `${imageSizeLarge}px`,
              },
              marginTop: `${verticalMargin}px`,
              marginBottom: `${verticalMargin}px`,
            }}
          />
        ))}

        {imagess.map((image, index) => (
          <Box
            key={`clone-${index}`}
            component="img"
            src={image.src}
            alt={`Clone ${image.alt || `Slide ${index}`}`}
            sx={{
              objectFit: "cover",
              borderRadius: "8px",
              width: {
                xs: `${imageSizeSmall}px`,
                sm: `${imageSizeLarge}px`,
              },
              height: {
                xs: `${imageSizeSmall}px`,
                sm: `${imageSizeLarge}px`,
              },
              marginTop: `${verticalMargin}px`,
              marginBottom: `${verticalMargin}px`,
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default ImageMove3;
