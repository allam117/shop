

import { useState, useEffect } from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ImageMove3 = ({
  company = [],
  interval = 3000,
  transitionDuration = 1500,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleImages, setVisibleImages] = useState([]);
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  
  const imageSizeLarge = 180;
  const imageSizeSmall = 160;
  const imageGap = 22;

  useEffect(() => {
    setVisibleImages(company.slice(11, 20));
  }, [company]);

  useEffect(() => {
    if (visibleImages.length === 0) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % visibleImages.length);
    }, interval);

    return () => clearInterval(timer);
  }, [visibleImages, interval]);

  return (
    <Box
      sx={{
        position: "relative",
        width: "92%",
        maxWidth: "1160px",
        margin: "0 auto",
        overflow: "hidden",
        borderRadius: "3px",
        marginBottom: "10px",
        paddingBottom: "10px",
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        padding="30px 0px 15px 0px"
      >
        <Typography color="black" fontSize="18px" marginLeft="10px">
          شاهد الكل
        </Typography>
        <Typography
          color="black"
          fontSize="25px"
          marginRight="15px"
          fontWeight="bold"
        >
          شركات نتعامل معها
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          transition: `transform ${transitionDuration / 1000}s ease-in-out`,
          transform: `translateX(-${
            isSmallScreen
              ? currentIndex * (imageSizeSmall + imageGap)
              : currentIndex * (imageSizeLarge + imageGap)
          }px)`,
          gap: `${imageGap}px`,
          marginLeft: "10px",
        }}
      >
        {visibleImages.length > 0 ? (
          visibleImages.map((image, index) => (
            <Box
              key={index}
              onClick={() => {
                if (image.handle) {
                  navigate(`/categories/${image.handle}`);
                }
              }}
              sx={{
                cursor: "pointer",
                borderRadius: "8px",
                overflow: "hidden",
                width: {
                  xs: `${imageSizeSmall}px`,
                  sm: `${imageSizeLarge}px`,
                },
                flexShrink: 0,
                // backgroundColor: "#f0f0f0",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  height: {
                    xs: `${imageSizeSmall}px`,
                    sm: `${imageSizeLarge}px`,
                  },
                }}
              >
                <img
                  src={image.src}
                  alt={image.name || `Company ${index + 1}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Box>
            
              <Typography
                variant="body2"
                sx={{
                  marginTop: "20px",
                  textAlign: "center",
                  fontSize: "20px",
                  color: "#333",
                }}
              >
                {image.name}
              </Typography>
            </Box>
          ))
        ) : (
          <Typography sx={{ marginLeft: "20px" }}>
            لا توجد شركات متاحة
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default ImageMove3;
