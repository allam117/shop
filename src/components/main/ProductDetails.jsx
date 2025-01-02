import { Box, Skeleton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getProductById } from "../../api/product";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState();

  useEffect(() => {
    getProductById(productId).then(setProduct);
  }, [productId]);

  if (!product) {
    return <Skeleton variant="rectangular" width={210} height={60} />;
  }

  return (
    <Box>
      <Box>
        <img width={300} src={product.image} alt="" />
      </Box>
      <Box>
        <Typography variant="h5">{product.name}</Typography>
        <Typography my={0.4} fontSize={"22px"} color={"crimson"} variant="h5">
          {product.price}
        </Typography>
        <Typography variant="body1">{product.description}</Typography>
      </Box>
    </Box>
  );
};

export default ProductDetails;
