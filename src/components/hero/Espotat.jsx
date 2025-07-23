

import image20 from "../../assets/images/image20.webp";
import { Box, Typography, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { fetchCollectionProducts } from "@lib/shopify";

export default function Espotat() {
  const collectionHandle = "الاسبوتات-بأشكالها-المختلفه";
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetchCollectionProducts({ collectionHandle });
        setProducts(res);
      } catch (err) {
        console.error("خطأ في جلب المنتجات:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        marginTop: "40px",
        maxWidth: "1170px",
        padding: "20px",
        margin: "0 auto",
        overflow: "hidden",
        borderRadius: "8px",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        component="img"
        src={image20}
        alt="صورة الصنف"
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.14)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        sx={{
          borderRadius: "8px",
          width: { xs: "335px", sm: "100%" },
          maxWidth: "100%",
          height: "auto",
          marginBottom: "20px",
          transition: "transform 0.8s ease",
        }}
      />

      {loading ? (
        <CircularProgress />
      ) : products.length > 0 ? (
        <Box display="flex" flexWrap="wrap" gap={2} justifyContent="center">
          {products.slice(0, 8).map((product) => (
            <Box
              key={product.id}
              sx={{
                // border: "1px solid #ccc",
                borderRadius: "8px",
                padding: 1,
                width: "213px",
              }}
            >
              <img
                src={product.featuredImage?.url || "/placeholder.jpg"}
                alt={product.title}
                style={{ width: "100%", height: "200px", objectFit: "cover" }}
              />
              <Typography variant="h6" mt={1} sx={{ textAlign: "center" }}>
                {product.description?.substring(0, 80)}
              </Typography>
            </Box>
          ))}
        </Box>
      ) : (
        <Typography>لا توجد منتجات</Typography>
      )}
    </Box>
  );
}
