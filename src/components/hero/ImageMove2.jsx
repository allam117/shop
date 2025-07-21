



import { useState, useEffect } from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { getProducts } from "../../lib/shopify"; // ← دالة ترجع كل المنتجات
import { useNavigate } from "react-router-dom";
const ImageMove2 = ({ interval = 7000, transitionDuration = 1500 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imagess, setImagess] = useState([]);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const imageSizeLarge = 218;
  const imageSizeSmall = 160;
  const imageGap = 12;

  useEffect(() => {
    const fetchAllProducts = async () => {
      const allProducts = await getProducts({ first: 15 }); // ← عدّل الرقم حسب عدد المنتجات اللي عايزها
      console.log("Fetched products:", allProducts);

    const images = allProducts.map((product) => ({
      src: product.featuredImage?.url,
      alt: product.title,
      handle: product.handle,
      description: product.description || "", // ← ضيف السطر ده
    }));



      setImagess(images);
    };

    fetchAllProducts();
  }, []);

  useEffect(() => {
    if (imagess.length === 0) return;

    const slideInterval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % imagess.length);
    }, interval);

    return () => clearInterval(slideInterval);
  }, [imagess, interval]);

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEndX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    const deltaX = touchStartX - touchEndX;

    if (Math.abs(deltaX) > 50) {
      if (deltaX > 0) {
        setCurrentIndex((prev) =>
          prev < imagess.length - 1 ? prev + 1 : prev
        );
      } else {
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : 0));
      }
    }
  };

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
          الاكثر مشاهده
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
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {imagess.length > 0 ? (
          imagess.map((image, index) => (
            <Box
              onClick={() => navigate(`/products/${image.handle}`)}
              key={image.handle}
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

export default ImageMove2;
