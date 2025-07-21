

import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { getCollectionProducts } from "../../lib/shopify";
import { Box } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { Rating } from "@mui/material";




export const CollectionProducts = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!categoryId) return;

    const fetchProducts = async () => {
      try {
        const data = await getCollectionProducts({ collection: categoryId });
        console.log("Products:", data);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching collection products:", error);
      }
    };

    fetchProducts();
  }, [categoryId]);

  return (
    <Box
      sx={{
        width: "95%", 
        margin: "0 auto",
        display: "flex",
        gap: 2.5,
        padding: "20px",
        flexWrap: "wrap",
        justifyContent: "center", 
      }}
    >
      {products.map((product) => (
        <ProductCard key={product.handle} {...product} />
      ))}
    </Box>
  );
};


const ProductCard = ({
  title,
  description,
  featuredImage,
  handle,
  priceRange,
}) => {
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        width: 265,
        cursor: "pointer",
        borderRadius: 2,
        boxShadow: 2,
        transition: "transform 0.2s ease-in-out",
        "&:hover": { transform: "scale(1.05)" },
      }}
      onClick={() => navigate(`/products/${handle}`)}
    >
      <CardMedia
        component="img"
        height="194"
        image={featuredImage?.url || "/default-image.jpg"}
        alt={featuredImage?.altText || "Product image"}
      />

      <CardContent
        sx={{
          height: "200px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box sx={{ height: "150px" }}>
          <Typography variant="h6" sx={{ textAlign: "right" }}>
            {title}
          </Typography>
          <Typography
            sx={{ textAlign: "right", color: "text.secondary" }}
            gutterBottom
            variant="body2"
            component="div"
          >
            {description}
          </Typography>
        </Box>

        <hr style={{ border: "1px solid grey", width: "100%", opacity: 0.2 }} />

        <Box sx={{ height: "50px", marginBottom: "0px" }}>
          <Typography color="orange" marginBottom="6px">
            EGP {priceRange.minVariantPrice.amount}
          </Typography>
          <Rating name="product-rating" defaultValue={4} precision={0.5} />
        </Box>
      </CardContent>
    </Card>
  );
};


