


import { useState, useEffect } from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { fetchLatestProducts } from "../../lib/shopify";

const ImageMove = ({
  collectionHandle = "latestprouct",
  interval = 3000,
  transitionDuration = 1000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imagess, setImagess] = useState([]);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  const imageSizeLarge = 218;
  const imageSizeSmall = 160;
  const imageGapL = 12;
  const imageGapS = 12;


  useEffect(() => {
    const getLatestProducts = async () => {
      const latestProducts = await fetchLatestProducts({
        first: 50,
        collectionHandle,
      });

     const images = latestProducts.map((product) => ({
       src: product.images[0]?.url,
       alt: product.title,
       handle: product.handle,
       description: product.description || "", // ← أضفنا الوصف
     }));


      setImagess(images);
    };

    getLatestProducts();
  }, [collectionHandle]);

  useEffect(() => {
    if (imagess.length === 0) return;

    const slideInterval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % imagess.length);
    }, interval);

    return () => clearInterval(slideInterval);
  }, [imagess, interval]);

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
          أحدث المنتجات
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          transition: `transform ${transitionDuration / 1000}s ease-in-out`,
          transform: `translateX(-${
            currentIndex *
            (isSmallScreen
              ? imageSizeSmall + imageGapS
              : imageSizeLarge + imageGapL)
          }px)`,
          gap: `${imageGapL}px`,
          marginLeft: "10px",
        }}
      >
        {imagess.length > 0 ? (
          imagess.map((image, index) => (
            <Box
              key={image.handel}
              onClick={() => navigate(`/products/${image.handle}`)}
              sx={{
                cursor: "pointer",
                borderRadius: "8px",
                overflow: "hidden",
                width: {
                  xs: `${imageSizeSmall}px`,
                  sm: `${imageSizeLarge}px`,
                },
                flexShrink: 0,
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
                  alt={image.alt || `Product ${index + 1}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Box>

              <Typography
                sx={{
                  fontSize: "19px",
                  paddingTop: "10px",
                  textAlign: "center",
                  color: "#444",
                }}
              >
                {image.description}
              </Typography>
            </Box>
          ))
        ) : (
          <Typography sx={{ marginLeft: "20px" }}>
            لا توجد منتجات متاحة
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default ImageMove;
