




import {
  Box,
  Button,
  Card,
  Skeleton,
  Typography,
  IconButton,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProduct, addToCart, createCart } from "../../lib/shopify";
import { FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [isVisible, setIsVisible] = useState(true);
  const [quantity, setQuantity] = useState(1); // ⬅️ عدد القطع
  const navigate = useNavigate();

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => navigate(-1), 100);
  };

  useEffect(() => {
    if (productId) {
      getProduct(productId).then((data) => {
        setProduct(data);
      });
    }
  }, [productId]);

  const handleAddToCart = async () => {
    try {
      let cartId = localStorage.getItem("cartId");

      if (!cartId) {
        const newCart = await createCart();
        cartId = newCart.id;
        localStorage.setItem("cartId", cartId);
      }

      const updatedCart = await addToCart(cartId, [
        {
          merchandiseId: product.variants[0].id,
          quantity: quantity,
        },
      ]);

      console.log("تمت الإضافة للعربة:", updatedCart);
      alert("تمت إضافة المنتج إلى العربة ✅");
    } catch (error) {
      console.error("خطأ أثناء الإضافة للعربة:", error);
      alert("حدث خطأ أثناء الإضافة إلى العربة ❌");
    }
  };

  const increaseQty = () => setQuantity((prev) => prev + 1);
  const decreaseQty = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  if (!product) {
    return <Skeleton variant="rectangular" width={210} height={60} />;
  }

  return (
    <>
      {isVisible && (
        <Card
          sx={{
            position: "relative",
            margin: "0 auto",
            marginTop: "70px",
            display: "flex",
            flexDirection: { xs: "column-reverse", sm: "row" },
            alignItems: { xs: "center", sm: "flex-start" },
            gap: 4.5,
            maxWidth: { xs: "302px", sm: "650px" },
            padding: "30px",
          }}
        >
          <button
            onClick={handleClose}
            style={{
              position: "absolute",
              top: "5px",
              right: "5px",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            <FaTimes size={20} />
          </button>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              maxWidth: "300px",
              textAlign: "right",
              wordWrap: "break-word",
              overflowWrap: "break-word",
              whiteSpace: "normal",
              height: "250px",
              justifyContent: "space-between",
              lineHeight: "20px",
              marginRight: "10px",
            }}
          >
            <Box>
              <Typography fontSize={"26px"} color={"black"} variant="h5">
                {product.title}
              </Typography>
              <Typography fontSize={"20px"} lineHeight={"40px"} variant="body1">
                {product.description}
              </Typography>
              <Typography
                marginTop={"20px"}
                my={0.4}
                fontSize={"22px"}
                color={"crimson"}
                variant="h5"
              >
                السعر :: {product.priceRange.minVariantPrice.amount}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: "20px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <IconButton
                  size="small"
                  onClick={decreaseQty}
                  sx={{ border: "1px solid gray" }}
                >
                  <FaChevronLeft />
                </IconButton>
                <Typography fontSize="18px" fontWeight="bold">
                  {quantity}
                </Typography>
                <IconButton
                  size="small"
                  onClick={increaseQty}
                  sx={{ border: "1px solid gray" }}
                >
                  <FaChevronRight />
                </IconButton>
              </Box>

              <Button
                onClick={handleAddToCart}
                sx={{
                  backgroundColor: "orange",
                  color: "white",
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  padding: "8px 14px",
                }}
              >
                أضف إلى العربة
              </Button>
            </Box>
          </Box>

          <Box sx={{ flexShrink: 0, marginLeft: "10px" }}>
            <img
              width={300}
              height={300}
              src={product.featuredImage.url}
              alt={product.featuredImage.altText}
              style={{
                maxWidth: "100%",
                height: "250px",
                objectFit: "cover",
              }}
            />
          </Box>
        </Card>
      )}
    </>
  );
};

export default ProductDetails;
